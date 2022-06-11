import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type FullInputType = {
    addTask: (title: string) => void;
}

export const FullInput = (props: FullInputType) => {

    let [title, setTitle] = useState('');

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }
    const addTask = () => {
        props.addTask(title);
        setTitle('');
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask();
            setTitle('');
        }
    }

    return (
        <div>
            <input type={"text"} value={title} onChange={onChangeInputValueHandler} onKeyDown={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
        </div>
    );
};
