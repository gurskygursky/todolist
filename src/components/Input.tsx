import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    inputValue: string;
    onChangeInputValue: (inputValue: string) => void;
    addTask: (inputValue: string) => void;
}

export const Input = (props: InputPropsType) => {

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeInputValue(event.currentTarget.value);
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(props.inputValue);
            props.onChangeInputValue('');
        }
    }

    return (
        <input type={"text"}
               value={props.inputValue}
               onChange={onChangeInputValueHandler}
               onKeyDown={onKeyPressHandler}
        />
    );
};
