import { CLIPTokenizer, env, PreTrainedTokenizer } from "@huggingface/transformers";
import { Tensor } from "onnxruntime-web/wasm";
import { CLIP_PATH } from "../constants";

env.allowLocalModels = true;

let tokenizer: PreTrainedTokenizer | null = null;

export const getTensorFromText = async (text: string) => {
    const tokenizerDir = CLIP_PATH;
    console.log("Tokenizer dir:", tokenizerDir);
    if (tokenizer === null) {
        tokenizer = await CLIPTokenizer.from_pretrained(tokenizerDir, {local_files_only: true});
    }

    const tokens: { input_ids: Tensor } = await tokenizer(text, {return_tensor: 'np', padding: 'max_length'});
    return tokens.input_ids;
}
