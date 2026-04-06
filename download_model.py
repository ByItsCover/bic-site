import os
import sys

from typing import Optional

from huggingface_hub import hf_hub_download
from transformers import CLIPTokenizer

import torch
import open_clip

import onnx
from onnxruntime.quantization import quantize_dynamic, QuantType
from onnxruntime.quantization.shape_inference import quant_pre_process


def hf_download(destination: str):

    repo_id = "laion/CLIP-ViT-B-32-256x256-DataComp-s34B-b86K"
    filenames = ["open_clip_model.safetensors", "tokenizer.json", "tokenizer_config.json", "special_tokens_map.json"]

    os.makedirs(destination, exist_ok=True)

    for name in filenames:

        hf_hub_download(
            repo_id=repo_id,
            filename=name,
            local_dir=destination
        )

    print(f"Model {repo_id} downloaded to {destination}/")

def quantized_download(
        destination: str, 
        clean_cache: bool = True
    ):

    filename = "open_clip_model.safetensors"

    script_state = {
        "model_name": "ViT-B-32",
        "pretrained_name": os.path.join(
            destination,
            filename
        ),
        "onnx_model_path": os.path.join(
            destination,
            "clip.onnx"
        ),
        "onnx_model_shapes_path": os.path.join(
            destination,
            "clip_shapes.onnx"
        ),
        "quant_pre_model_path": os.path.join(
            destination,
            "clip_pre_quantized.onnx"
        ),
        "quant_model_path": os.path.join(
            destination,
            "clip_quantized.onnx"
        ),
        "preprocess_path": os.path.join(
            destination,
            "preprocess.onnx"
        ),
        "device": "cpu"
    }

    os.makedirs(destination, exist_ok=True)


    print("Loading Clip...")

    class CLIPText(torch.nn.Module):
        def __init__(self, model):
            super().__init__()
            self.transformer = model.transformer
            self.positional_embedding = model.positional_embedding
            self.ln_final = model.ln_final
            self.text_projection = model.text_projection
            self.token_embedding = model.token_embedding
            self.text_pool_type = model.text_pool_type
            self.text_eos_id = model.text_eos_id
            self.register_buffer('attn_mask', model.attn_mask, persistent=False)

        def forward(self, text):
            cast_dtype = self.transformer.get_cast_dtype()

            x = self.token_embedding(text)  # [batch_size, n_ctx, d_model]

            x = x + self.positional_embedding.to(cast_dtype)
            x = self.transformer(x, attn_mask=self.attn_mask)
            x = self.ln_final(x)  # [batch_size, n_ctx, transformer.width]
            x = self.text_global_pool(x, text, self.text_pool_type, eos_token_id=getattr(self, "text_eos_id", None))
            if self.text_projection is not None:
                if isinstance(self.text_projection, torch.nn.Linear):
                    x = self.text_projection(x)
                else:
                    x = x @ self.text_projection

            return x

        def text_global_pool(
                self,
                x: torch.Tensor,
                text: Optional[torch.Tensor] = None,
                pool_type: str = 'argmax',
                eos_token_id: Optional[int] = None,
        ) -> torch.Tensor:
            if pool_type == 'first':
                pooled = x[:, 0]
            elif pool_type == 'last':
                pooled = x[:, -1]
            elif pool_type == 'argmax':
                # take features from the eot embedding (eot_token is the highest number in each sequence)
                assert text is not None
                pooled = x[torch.arange(x.shape[0], device=x.device), text.argmax(dim=-1)]
            elif pool_type == 'eos':
                # take features from tokenizer specific eos
                assert text is not None
                assert eos_token_id is not None
                idx = (text == eos_token_id).int().argmax(dim=-1)
                pooled = x[torch.arange(x.shape[0], device=x.device), idx]
            else:
                pooled = x

            return pooled

    clip_model, _, _ = open_clip.create_model_and_transforms(
        script_state["model_name"],
        pretrained=script_state["pretrained_name"],
        device=script_state["device"]
    )
    tokenizer: CLIPTokenizer = CLIPTokenizer.from_pretrained(destination)
    clip_text = CLIPText(clip_model)
    clip_text.eval()

    print(clip_text)


    print("Exporting model to onnx format...")

    #input_tensor = torch.ones((2, 3, 224, 224), dtype=torch.float32)
    tokens = tokenizer(["some dummy", "text", "and something"], return_tensors='pt', padding="max_length")
    print("Tokens:")
    print(tokens)
    #input_tensor = torch.tensor(tokens.get("input_ids"))
    input_tensor = tokens.get("input_ids")

    torch.onnx.export(clip_text,
                  (input_tensor,),
                  script_state["onnx_model_path"],
                  input_names = ['text'],
                  output_names = ['embeddings'],
                  dynamic_shapes=({0: torch.export.Dim.DYNAMIC},),
                  external_data=False
                  )


    print("Quantizing model...")
    
    model = onnx.load(script_state["onnx_model_path"])
    model = onnx.shape_inference.infer_shapes(model)
    onnx.save(model, script_state["onnx_model_shapes_path"])

    quant_pre_process(script_state["onnx_model_shapes_path"],
        script_state["quant_pre_model_path"],
        skip_optimization=False,
        skip_symbolic_shape=True,
        verbose=3)

    quantize_dynamic(script_state["quant_pre_model_path"],
                                   script_state["quant_model_path"],
                                   weight_type=QuantType.QUInt8)


    if clean_cache:
        print("Cleaning up...")
        os.remove(script_state["pretrained_name"])
    
    os.remove(script_state["onnx_model_path"])
    os.remove(script_state["onnx_model_shapes_path"])
    os.remove(script_state["quant_pre_model_path"])

    if os.path.isfile(script_state["onnx_model_path"] + '.data'):
        os.remove(script_state["onnx_model_path"] + '.data')


    print(f"Model {script_state["pretrained_name"]} quantized to {destination}/")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise ValueError("Destination path is missing")

    destination = os.path.join(sys.argv[1], "clip_model")
    hf_download(destination)
    quantized_download(destination)
