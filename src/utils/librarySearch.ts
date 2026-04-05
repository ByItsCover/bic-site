import type { BookResult } from "../types/bookResult";


export const callLibrarySearch = async (embedding: number[]) => {
    const endpoint = window._env_.LIBRARY_SEARCH_URL + "/search"; // TODO: Do more intelligent joining

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
