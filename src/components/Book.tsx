import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useAuth } from "../hooks/useAuth.ts";
import { rateBook } from "../utils/rateBook.ts";
import { RatingValues } from "../types/bookResult";
import type { BookResult, Rating } from "../types/bookResult";


interface BookProps {
    details: BookResult;
    ratingUpdate: (cover_id: number, rating: Rating) => void;
}

const Book = (
    { details, ratingUpdate }: BookProps
) => {
    const { user, getToken } = useAuth();

    const currentRating = details.rating === null ? null
        : RatingValues[details.rating] ?? null;

    const handleRating = async (event: SelectChangeEvent<Rating>) => {
        event.preventDefault();

        ratingUpdate(details.cover_id, event.target.value);

        console.log("Calling rating API...");
        const token = user !== null ? await getToken() : null;
        if (token === null) {
            console.error("Cannot rate as unauthenticated user");
            return;
        }

        await rateBook(details.cover_id, event.target.value, token);
    };

    return (
        <div>
            {user !== null && <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentRating ?? ''}
                    label="Rating"
                    onChange={handleRating}
                >
                    {RatingValues.map((val) => {
                        return <MenuItem value={val}>{val}</MenuItem>
                    })}
                </Select>
            </FormControl>}
            <img alt={`Book with ISBN13 ${details.isbn_13}`} src={details.cover_url}/>
        </div>
    )
}

export default Book;
