import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    title: string;
    setTitle: (title: string) => void;
    addTask: (title: string) => void;
}

export const Input = (props: InputPropsType) => {

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value);
    }
    // const addTask = () => {
    //     props.addTask(props.title);
    //     props.setTitle('');
    // }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(props.title);
            props.setTitle('');
        }
    }

    return (
        <div>
            <input type={"text"} value={props.title}
                   onChange={onChangeInputValueHandler}
                   onKeyDown={onKeyPressHandler}
            />
        </div>
    );
};
