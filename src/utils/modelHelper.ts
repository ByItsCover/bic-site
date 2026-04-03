import * as ort from 'onnxruntime-web';
import { CLIP_PATH } from '../constants';

const getModelSession = async () => {
    const modelPath = CLIP_PATH + "/clip_quantized.onnx"; // Todo: Use path joiner
    const session = await ort.InferenceSession.create(
        modelPath,
        { executionProviders: ['webgl', 'wasm'], graphOptimizationLevel: 'all'}
    )

    return session;
}

export const embedTokens = async (tokens: ort.Tensor) => {
    const session = await getModelSession();
    console.log("Tokens before embed:", tokens);
    const embedding = await session.run({"text": tokens});
    
    console.log("Embedding:");
    console.log(embedding);
}
