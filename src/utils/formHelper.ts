import * as React from "react";


const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
) => {

    setState(event.target.value);
};

const handleEnterPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    searchSubmit: React.EventHandler<React.SubmitEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>>
) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        searchSubmit(event);
    }
};

export { handleInputChange, handleEnterPress };
