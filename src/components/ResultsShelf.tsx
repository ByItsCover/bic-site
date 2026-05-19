import { ImageGallery } from "react-image-grid-gallery";
import type { BookResult } from "../types/bookResult";
import type { BookCover } from "../types/bookCover.ts";

interface ResultsShelfProps {
    results: BookResult[];
}

export const ResultsShelf = (
    {results}: ResultsShelfProps
) => {

    const imagesArray: BookCover[] = results.map((result) =>  ({
        id: result.cover_id,
        alt: `Book Cover with id ${result.cover_id}`,
        src: result.cover_url,
    }));

    return (
        imagesArray.length == 0 ? <></> :
            <ImageGallery imagesData={imagesArray} />
    )
}
