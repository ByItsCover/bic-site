import type { JWT } from "aws-amplify/auth";


export const rateBook = async (token: JWT) => {
    const endpoint = window._env_.RECOMMEND_URL + "/suggest/rate"; // TODO: Do more intelligent joining

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({})
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
