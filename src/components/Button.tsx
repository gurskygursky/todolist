import React from 'react';

type ButtonPropsType = {
    buttonTitle: string;
    callback: () => void;
}

export const Button = (props: ButtonPropsType) => {

    const onClickButtonHandler = () => {
        props.callback();
    }
    return (
        <div>
            <button onClick={onClickButtonHandler}>{props.buttonTitle}</button>
        </div>
    );
};

