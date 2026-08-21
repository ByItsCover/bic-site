import * as React from "react";


const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement, HTMLTextAreaElement | HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
) => {

    setState(event.target.value);
};

const handleEnterPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    searchSubmit: React.EventHandler<React.SubmitEvent<HTMLFormElement> | React.KeyboardEvent<HTMLDivElement>>
) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        searchSubmit(event);
    }
};

export { handleInputChange, handleEnterPress };
