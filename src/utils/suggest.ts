import type { JWT } from "aws-amplify/auth";
import type { BookResult, Rating } from "../types/bookResult";


const suggestBooks = async (token: JWT | null) => {
    const endpoint = window._env_.RECOMMEND_URL + "/suggest"; // TODO: Do more intelligent joining

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ... token !== null && {"Authorization": `Bearer ${token}`},
            },
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

const rateBook = async (cover_id: number, rating: Rating, token: JWT) => {
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

const deleteRating = async (cover_id: number, token: JWT) => {
    const endpoint = window._env_.RECOMMEND_URL + `/suggest/rate/${cover_id}`; // TODO: Do more intelligent joining

    try {
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
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

export { suggestBooks, rateBook, deleteRating };
