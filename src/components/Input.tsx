import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from "../Todolist.module.css";

type InputPropsType = {
    inputValue: string;
    onChangeInputValue: (inputValue: string) => void;
    addTask: (inputValue: string) => void;
    error: string | null;
    setError: (error:string | null) => void;
}

export const Input = (props: InputPropsType) => {

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeInputValue(event.currentTarget.value);
        if (event.currentTarget.value) {
            props.setError(null);
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(props.inputValue);
            props.onChangeInputValue('');
        }
    }

    return (
        <input type={"text"}
               className={props.error ? styles.error : ''}
               value={props.inputValue}
               onChange={onChangeInputValueHandler}
               onKeyDown={onKeyPressHandler}
        />
    );
};
