import type { Tensor } from "onnxruntime-web/wasm";
import type { BookResult } from "../types/bookResult";


export const callLibrarySearch = async (embedding: Tensor) => {
    const endpoint = new URL("search", __API_URL__);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({vector: embedding})
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result: {covers: BookResult[]} = await response.json();
        return result.covers;
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
    }

    return [];
}
