const RatingValues = [
    "Dislike", "Neutral", "Like", "Love"
] as const;

type Rating = typeof RatingValues[number];

const RatingMap = new Map(RatingValues.map((val, ind) => {
    return [val, ind];
}));

export { RatingValues, RatingMap };
export type { Rating };