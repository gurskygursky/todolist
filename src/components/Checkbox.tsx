import Checkbox from '@mui/material/Checkbox/Checkbox';
import React, {ChangeEvent} from 'react';

type CheckboxPropsType = {
    callback: (event: boolean) => void;
    checked: boolean;
    className: string;
}

export const CheckboxComponent = (props: CheckboxPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked);
    }

    return (
        <Checkbox checked={props.checked}
                  onChange={onChangeHandler}
        />
        // <input type="checkbox"
        //        checked={props.checked}
        //        onChange={onChangeHandler}
        //        className={props.className}
        // />
    );
};
