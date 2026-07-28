import type { JWT } from "aws-amplify/auth";
import type { Rating } from "../types/bookResult.ts";


export const rateBook = async (cover_id: number, rating: Rating, token: JWT) => {
    const endpoint = window._env_.RECOMMEND_URL + "/suggest/rate"; // TODO: Do more intelligent joining

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                rating: {
                    cover_id: cover_id,
                    score: rating,
                }
            })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
    }

    return [];
}
