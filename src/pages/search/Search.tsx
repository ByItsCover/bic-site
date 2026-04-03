import { getTensorFromText } from "../../utils/tokenHelper";
import { embedTokens } from "../../utils/modelHelper";

function Search() {
    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log("Clicked enter.");
            const myText = "Howdy folks";
            const tokens = await getTensorFromText(myText);
            await embedTokens(tokens);
        }
    }

    return (
        <>
            <h1>Howdy</h1>
            <p>Do</p>

            <input type={"search"} onKeyDown={handleKeyDown} />
        </>
    )
}

export default Search;
