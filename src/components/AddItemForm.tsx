import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
// import style from './AddItemForm.module.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack/Stack';

type AddItemFormType = {
    addFormCallback: (value: string) => void;
}

export const AddItemForm = memo((props: AddItemFormType) => {

    console.log('AddItemForm rendered');

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
            {/*<input type={"text"}*/}
            {/*       value={inputValue}*/}
            {/*       onChange={onChangeInputValueHandler}*/}
            {/*       onKeyDown={onKeyPressHandler}*/}
            {/*       className={error ? style.error : ''}*/}
            {/*/>*/}
            <Stack direction="row" alignItems="center" spacing={1}>
                <TextField id="outlined-basic"
                           error={!!error}
                           label={error}
                           variant="outlined"
                           size={'small'}
                           value={inputValue}
                           onChange={onChangeInputValueHandler}
                           onKeyDown={onKeyPressHandler}
                />
                <Button variant="outlined"
                        style={{minWidth:'40px', minHeight:'40px', maxWidth:'40px', maxHeight:'40px'}}
                        onClick={addFormValue}>+</Button>
            </Stack>
            {/*<button onClick={addFormValue}>+</button>*/}
            {/*<div className={error ? style.errorMessage : ''}>{error}</div>*/}
        </div>
    );
});
