const RatingValues = {
    Dislike: "Dislike",
    Neutral: "Neutral",
    Like: "Like",
    Love: "Love",
} as const;

type Rating = (typeof RatingValues)[keyof typeof RatingValues];

type BookResult = {
    cover_id: number,
    cover_url: string,
    isbn_13: string,
    rating: Rating | null,
};

export { RatingValues };
export type { Rating, BookResult };
