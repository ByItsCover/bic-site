import type { BookResult } from "../types/bookResult";
import type { JWT } from "aws-amplify/auth";


export const callLibrarySearch = async (query: string, token: JWT | null) => {
    const endpoint = window._env_.RECOMMEND_URL + "/search"; // TODO: Do more intelligent joining

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ... token !== null && {"Authorization": `Bearer ${token}`},
            },
            body: JSON.stringify({
                query: query
            })
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
