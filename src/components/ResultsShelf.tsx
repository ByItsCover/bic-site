import * as React from "react";
import { Skeleton } from "@mui/material";
import Book from "./Book.tsx"
import { RatingMap } from "../types/rating";
import type { Rating } from "../types/rating";
import type { BookResult } from "../types/bookResult";
import "./results.css";


interface ResultsShelfProps {
    results: BookResult[];
    setResults:  React.Dispatch<React.SetStateAction<BookResult[]>>;
    loading: boolean;
}

export const ResultsShelf = (
    { results, setResults, loading }: ResultsShelfProps
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
        <div className="book-grid">
            {(loading ? Array(20).fill(null) : results).map((book: BookResult | null, ind) => {
                return book !== null ? <Book
                        key={book.cover_id}
                        details={book}
                        ratingUpdate={handleRatingUpdate}
                    />
                    : <Skeleton
                        key={ind}
                        className="loading-skeleton"
                        variant="rectangular"
                    />
                })
            }
        </div>
    )
}
