import * as ort from 'onnxruntime-web/wasm';
import { CLIP_PATH, GLINER_PATH, NER_QUERY_LABELS } from '../constants';
import { Gliner } from "gliner";
//import { AutoTokenizer, ModelRegistry } from "@huggingface/transformers";

let session: ort.InferenceSession | null = null;
let glinerModel: Gliner | null = null;

const getClipSession = async () => {
    const modelPath = CLIP_PATH + "/clip_quantized.onnx"; // Todo: Use path joiner
    return await ort.InferenceSession.create(
        modelPath,
        { executionProviders: ['wasm'], graphOptimizationLevel: 'all'}
    );
}

const getGlinerModel = async () => {
    // const tokenizerFiles = await ModelRegistry.get_tokenizer_files(GLINER_PATH);
    // console.log("Tokenizer Files:", tokenizerFiles);
    // const tokenizer = await AutoTokenizer.from_pretrained("/gliner_model");
    // console.log("Tokenizer:", tokenizer);

    return new Gliner({
        tokenizerPath: GLINER_PATH,
        onnxSettings: {
            //"/glinner.onnx"
            modelPath: GLINER_PATH + "/gliner_quantized.onnx", // Todo: Use path joiner
            executionProvider: 'wasm',
            multiThread: false,
            fetchBinary: true
        },
        transformersSettings: {
            allowLocalModels: true,
            useBrowserCache: true,
        }
    });
}

export const embedTokens = async (tokens: ort.Tensor) => {
    if (session === null) {
        session = await getClipSession();
    }
    
    return await session.run({"text": tokens});
}

export const extractNER = async (text: string) => {
    if (glinerModel === null) {
        glinerModel = await getGlinerModel();
        await glinerModel.initialize();
    }
    console.log("Text:", text);

    return await glinerModel.inference({
        texts: [text],
        entities: NER_QUERY_LABELS
    });
}
