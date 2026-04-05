import type { BookResult } from "../types/bookResult";

interface BookProps {
    details: BookResult;
}

export const Book = (
    {details}: BookProps
) => {

    return (
        <img src={details.cover_url}/>
    )
}
