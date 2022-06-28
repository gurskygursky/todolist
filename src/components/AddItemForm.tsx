import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from './AddItemForm.module.css';

type AddItemFormType = {
    addFormCallback: (value: string) => void;
}

export const AddItemForm = (props: AddItemFormType) => {

    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<string | null>('')

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value) {
            setError('');
        }
        setInputValue(event.currentTarget.value);
    }
    const addFormValue = () => {
        if (inputValue !== '') {
            props.addFormCallback(inputValue);
            setInputValue('');
        } else {
            setError('Title is required');
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addFormValue();
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
            <button onClick={addFormValue}>+</button>
            <div className={error ? style.errorMessage : ''}>{error}</div>
        </div>
    );
};
