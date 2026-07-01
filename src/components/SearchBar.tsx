import { handleEnterPress, handleInputChange } from "../utils/formHelper";

interface SearchBarProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

export const SearchBar = (
    {query, setQuery, searchSubmit}: SearchBarProps
) => {

    return (
        <form onSubmit={searchSubmit}>
            <textarea
                value={query}
                onChange={(e) => handleInputChange(e, setQuery)}
                onKeyDown={(e) => handleEnterPress(e, searchSubmit)}
            />
        </form>
    )
}
