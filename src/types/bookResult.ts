const RatingValues = [
    "Dislike", "Neutral", "Like", "Love"
] as const;

type Rating = typeof RatingValues[number];

const RatingMap = new Map(RatingValues.map((val, ind) => {
    return [val, ind];
}));

type BookResult = {
    cover_id: number,
    cover_url: string,
    isbn_13: string,
    rating: number | null,
};

export { RatingValues, RatingMap };
export type { Rating, BookResult };
