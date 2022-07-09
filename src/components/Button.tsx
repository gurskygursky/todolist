import React from 'react';


type ButtonPropsType = {
    buttonTitle: string;
    callback: () => void;
    className?: string;
}

export const Button = (props: ButtonPropsType) => {

    const onClickButtonHandler = () => {
        props.callback();
    }
    return (
        <button onClick={onClickButtonHandler} className={props.className}>{props.buttonTitle}</button>
    );
};
