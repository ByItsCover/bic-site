import * as React from "react";
import Book from "./Book.tsx"
import { RatingMap } from "../types/rating";
import type { Rating } from "../types/rating";
import type { BookResult } from "../types/bookResult";


interface ResultsShelfProps {
    results: BookResult[];
    setResults:  React.Dispatch<React.SetStateAction<BookResult[]>>;
}

export const ResultsShelf = (
    { results, setResults }: ResultsShelfProps
) => {
    const handleRatingUpdate = (cover_id: number, rating: Rating | "") => {
        const updatedResults = results.map((res) => {
            return res.cover_id === cover_id ? {
                ...res,
                rating: rating == "" ? null : RatingMap.get(rating) ?? null
            } : res
        });
        setResults(updatedResults);
    }

    return (
        <div>
            {results.map((book) => {
                return <Book key={book.cover_id} details={book} ratingUpdate={handleRatingUpdate}></Book>
            })}
        </div>
    )
}
