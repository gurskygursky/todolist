import React, {useState} from 'react';
import {ChangeEvent} from "react";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

export type TaskType = {
    id: string;
    taskTitle: string;
    isDone: boolean;
}
export type TaskFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    todolistTitle: string;
    tasks: TaskType[];
    addTask: (title: string) => void;
    removeTask: (taskID: string) => void;
    changeFilterTask: (taskFilterValue: TaskFilterType) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;

}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('');

    const onChangeFilter = (taskFilterValue: TaskFilterType) => {
        props.changeFilterTask(taskFilterValue);
    }

    // const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.currentTarget.value);
    // }
    const addTask = (title: string) => {
        props.addTask(title);
        setTitle('');
    }
    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         addTask();
    //         setTitle('');
    //     }
    // }
    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }
    const onCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone);
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <Input title={title} setTitle={setTitle} addTask={addTask}/>
                <Button buttonTitle={'+'} callback={() => addTask(title)}/>
            </div>
            {/*<FullInput addTask={addTask}/>*/}
            {/*<div>*/}
            {/*    <input type={"text"} value={title} onChange={onChangeInputValueHandler} onKeyDown={onKeyPressHandler}/>*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*</div>*/}
            <ul>
                {props.tasks.map((task, index) => {

                    return (
                        <li key={index}><input type="checkbox"
                                               checked={task.isDone}
                                               onChange={(event: ChangeEvent<HTMLInputElement>) => onCheckboxHandler(task.id, event.currentTarget.checked)}
                        />
                            <button onClick={() => {
                                removeTask(task.id)
                            }}>x
                            </button>
                            <span>{task.taskTitle}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onChangeFilter('All')}>All</button>
                <button onClick={() => onChangeFilter('Active')}>Active</button>
                <button onClick={() => onChangeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}
