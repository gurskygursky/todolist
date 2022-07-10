import Input from '@mui/material/Input';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    value: string;
    callback: (value: string) => void;
}

export const EditableSpan = (props: EditableSpanType) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(props.value);


    const editHandler = () => {
        setEdit(!edit);
        addInputValue();
    }

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }
    const addInputValue = () => {
        if (inputValue !== '') {
            props.callback(inputValue);
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editHandler();
        }
    }
    return (
        edit
            ? <Input value={inputValue}
                     onBlur={editHandler}
                     onKeyDown={onKeyPressHandler}
                     onChange={onChangeInputValueHandler}
                     autoFocus
            />
            // ? <input value={inputValue}
            //          onBlur={editHandler}
            //          onKeyDown={onKeyPressHandler}
            //          onChange={onChangeInputValueHandler}
            //          autoFocus
            // />
            : <span onDoubleClick={editHandler}>{props.value}</span>
    );
};
