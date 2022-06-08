import React, {useState} from 'react';
import {ChangeEvent} from "react";

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
    changeFilterTask: (taskFilterValue: TaskFilterType) => void;
}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState<string>('');

    const onChangeFilter = (taskFilterValue: TaskFilterType) => {
        props.changeFilterTask(taskFilterValue);
    }

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value;
        setTitle(inputValue);
    }
    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle);
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input type={"text"} onChange={onChangeInputValueHandler}/>
                <button onClick={() => addTask(title)}>+</button>
            </div>
            <ul>
                {props.tasks.map((task, index) => {
                    return (
                        <li key={index}><input type="checkbox"
                                                 checked={task.isDone}
                        />
                            <span>{task.taskTitle}</span>
                        </li>
                    )
                })}
                {/*<li><input type="checkbox"*/}
                {/*           checked={props.tasks[0].isDone}*/}
                {/*/>*/}
                {/*    <span>{props.tasks[0].taskTitle}</span>*/}
                {/*</li>*/}
                {/*<li><input type="checkbox"*/}
                {/*           checked={props.tasks[1].isDone}*/}
                {/*/>*/}
                {/*    <span>{props.tasks[1].taskTitle}</span>*/}
                {/*</li>*/}
                {/*<li><input type="checkbox"*/}
                {/*           checked={props.tasks[2].isDone}*/}
                {/*/>*/}
                {/*    <span>{props.tasks[2].taskTitle}</span>*/}
                {/*</li>*/}
            </ul>
            <div>
                <button onClick={() => onChangeFilter('All')}>All</button>
                <button onClick={() => onChangeFilter('Active')}>Active</button>
                <button onClick={() => onChangeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}
