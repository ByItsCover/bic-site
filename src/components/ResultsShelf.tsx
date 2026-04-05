import type { BookResult } from "../types/bookResult";
import { Book } from "./Book";

interface ResultsShelfProps {
    results: BookResult[];
}

export const ResultsShelf = (
    {results}: ResultsShelfProps
) => {

    return (
        <ul>
            {results.map(book => 
                <Book key={book.cover_id} details={book}/>
            )}
        </ul>
    )
}
