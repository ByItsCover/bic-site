import { handleInputChange } from "../utils/formHelper";

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
            <input
                value={query}
                onChange={(e) => handleInputChange(e, setQuery)}
            />
        </form>
    )
}
