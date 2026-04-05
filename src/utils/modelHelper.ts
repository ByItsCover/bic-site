import * as ort from 'onnxruntime-web/wasm';
import { CLIP_PATH } from '../constants';

let session: ort.InferenceSession | null = null;

const getModelSession = async () => {
    const modelPath = CLIP_PATH + "/clip_quantized.onnx"; // Todo: Use path joiner
    const session = await ort.InferenceSession.create(
        modelPath,
        { executionProviders: ['wasm'], graphOptimizationLevel: 'all'}
    );

    return session;
}

export const embedTokens = async (tokens: ort.Tensor) => {
    if (session === null) {
        session = await getModelSession();
    }
    
    console.log("Tokens before embed:", tokens);
    const embedding = await session.run({"text": tokens});
    
    console.log("Embedding:");
    console.log(embedding);
    return embedding;
}
