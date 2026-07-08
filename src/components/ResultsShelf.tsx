import type { BookResult } from "../types/bookResult";
import type { BookCover } from "../types/bookCover.ts";

interface ResultsShelfProps {
    results: BookResult[];
}

export const ResultsShelf = (
    { results }: ResultsShelfProps
) => {

    const imagesArray: BookCover[] = results.map((result) =>  ({
        id: result.cover_id,
        alt: `Book Cover with id ${result.cover_id}`,
        src: result.cover_url,
    }));

    return (
        <div className="book-grid">
            {imagesArray.map((image) => (
                <img key={image.id} src={image.src} alt={image.alt} ></img>
            ))}
        </div>
    )
}
