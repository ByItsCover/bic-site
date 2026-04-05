export const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, 
    setState: React.Dispatch<React.SetStateAction<string>>
) => {

    setState(event.target.value);
};
