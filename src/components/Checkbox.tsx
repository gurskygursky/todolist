import React, {ChangeEvent} from 'react';

type CheckboxPropsType = {
    callback: (event: boolean) => void;
    checked: boolean;
    className: string;
}

export const Checkbox = (props: CheckboxPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked);
    }

    return (
        <input type="checkbox"
               checked={props.checked}
               onChange={onChangeHandler}
               className={props.className}
        />
    );
};
