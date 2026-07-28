import Book from "./Book.tsx"
import type { BookResult } from "../types/bookResult";

interface ResultsShelfProps {
    results: BookResult[];
}

export const ResultsShelf = (
    { results }: ResultsShelfProps
) => {
    return (
        <div className="book-grid">
            {results.map((book) => {
                return <Book key={book.cover_id} details={book}></Book>
            })}
        </div>
    )
}
