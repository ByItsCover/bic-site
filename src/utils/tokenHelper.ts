import { CLIPTokenizer, env } from "@huggingface/transformers";
import { Tensor } from "onnxruntime-web/wasm";
import { CLIP_PATH } from "../constants";

env.allowLocalModels = true;

export const getTensorFromText = async (text: string) => {
    const tokenizerDir = CLIP_PATH;
    console.log("Tokenizer dir:", tokenizerDir);
    const tokenizer = await CLIPTokenizer.from_pretrained(tokenizerDir, {local_files_only: true});

    const tokens: { input_ids: Tensor } = await tokenizer(text, {return_tensor: 'pt', padding: 'max_length'});
    console.log("Tokens:")
    console.log(tokens);

    return tokens.input_ids;
}
