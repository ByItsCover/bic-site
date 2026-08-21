import * as React from "react";
import { IconButton, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { handleEnterPress, handleInputChange } from "../utils/formHelper";
import "./search.css";


interface SearchBarProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

export const SearchBar = (
    { query, setQuery, searchSubmit }: SearchBarProps
) => {

    return (
        <form className="search-container" onSubmit={searchSubmit}>
            <TextField
                value={query}
                onChange={(e) => handleInputChange(e, setQuery)}
                onKeyDown={(e) => handleEnterPress(e, searchSubmit)}
                multiline
            />
            <IconButton
                color="inherit"
                aria-label="search covers"
                type="submit"
            >
                <Search />
            </IconButton>
        </form>
    )
}
