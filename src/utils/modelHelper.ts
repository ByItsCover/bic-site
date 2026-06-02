import * as ort from 'onnxruntime-web/wasm';
import { CLIP_PATH, GLINER_PATH, NER_QUERY_LABELS } from '../constants';
import { Gliner } from "gliner";

let clipSessionPromise: Promise<ort.InferenceSession> | null = null;
let glinerModelPromise: Promise<Gliner> | null = null;

export const loadClip = () => {
    if (!clipSessionPromise) {
        const modelPath = CLIP_PATH + "/clip.onnx"; // Not using Quantized model. Also, Todo: Use path joiner
        clipSessionPromise = ort.InferenceSession.create(
            modelPath,
            { executionProviders: ['wasm'], graphOptimizationLevel: 'all'}
        );
    }

    return clipSessionPromise;
}

const loadGlinerModel = async () => {
    const glinerModel = new Gliner({
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
    await glinerModel.initialize();
    return glinerModel;
}

export const loadGliner = () => {
    if (!glinerModelPromise) {
        glinerModelPromise = loadGlinerModel();
    }

    return glinerModelPromise;
}

export const embedTokens = async (tokens: ort.Tensor) => {
    const clipSession = await loadClip();
    return await clipSession.run({"text": tokens});
}

export const extractNER = async (text: string) => {
    const glinerModel = await loadGliner();
    console.log("Text:", text);

    return await glinerModel.inference({
        texts: [text],
        entities: NER_QUERY_LABELS
    });
}
