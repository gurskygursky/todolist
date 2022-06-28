import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from './AddItemForm.module.css';

type AddItemFormType = {
    addFormValue: (value: string) => void;
}

export const AddItemForm = (props: AddItemFormType) => {

    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>('')

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }
    const addValue = () => {
        if (inputValue !== '') {
            props.addFormValue(inputValue);
            setInputValue('');
        } else {
            setError('Title is required');
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addValue();
            setInputValue('');
        }
    }

    return (
        <div>
            <input type={"text"}
                   value={inputValue}
                   onChange={onChangeInputValueHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? style.error : ''}
            />
            <button onClick={addValue}>+</button>
            <span className={error ? style.errorMessage : ''}>{error}</span>
        </div>
    );
};
