import React, {useState} from 'react';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {Checkbox} from "./components/Checkbox";
import styles from "./Todolist.module.css";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
    id: string;
    taskTitle: string;
    author?: string;
    isDone: boolean;
}
export type TasksType = {
    [key: string]: TaskType[],
}
export type TaskFilterType = 'All' | 'Active' | 'Completed';

export type TodolistType = {
    id: string;
    todolistTitle: string;
    filter: TaskFilterType;
}

type PropsType = {
    todolistID: string;
    todolistTitle: string;
    tasks: TaskType[];
    addTask: (todolistID: string, title: string) => void;
    removeTask: (todolistID: string, taskID: string) => void;
    changeFilterTask: (todolistID: string, taskFilterValue: TaskFilterType) => void;
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
    taskFilter: TaskFilterType;
    editTodolistTitle: (todolistID: string, todolistTitle: string) => void;
}

enum Filter {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}

export const Todolist = (props: PropsType) => {

    let [inputValue, setInputValue] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeFilter = (todolistID: string, taskFilterValue: TaskFilterType) => {
        props.changeFilterTask(props.todolistID, taskFilterValue);
    }
    const addTask = (title: string) => {
        if (title.trim() !== '') {
            props.addTask(props.todolistID, title.trim());
        }
        setInputValue('');
        if (!title) {
            setError('Title is required!');
        }
    }
    const removeTask = (taskID: string) => {
        props.removeTask(props.todolistID, taskID);
    }
    const onCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistID, taskID, isDone)
    }
    const editTodolistTitle = (value: string) => {
        props.editTodolistTitle(props.todolistID, value);
    }

    return (
        <div>
            {/*<h3>{props.todolistTitle}</h3>*/}
            <h3>
                <EditableSpan value={props.todolistTitle}
                              callback={(value) => editTodolistTitle(value)}
                />
            </h3>
            <span className={styles.errorMessage}>{error}</span>
            <AddItemForm addFormCallback={addTask}/>
            {/*<div className={styles.btn}>*/}
            {/*    <Input inputValue={inputValue}*/}
            {/*           onChangeInputValue={setInputValue}*/}
            {/*           addTask={addTask}*/}
            {/*           error={error}*/}
            {/*           setError={setError}*/}
            {/*    />*/}
            {/*    <Button buttonTitle={'+'}*/}
            {/*            callback={() => addTask(inputValue)}*/}
            {/*    />*/}
            {/*</div>*/}

            <ul>
                {props.tasks.map((task, index) => {
                    return (
                        <li key={index} className={task.isDone ? styles.isDone : ''}>
                            <div className={styles.btn}>
                                <Checkbox checked={task.isDone}
                                          className={styles.btn}
                                          callback={(isDone) => onCheckboxHandler(task.id, isDone)}
                                />
                                <Button buttonTitle={'x'} callback={() => removeTask(task.id)}/>
                                <span>{task.taskTitle}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.btn}>
                <Button buttonTitle={Filter.All}
                        callback={() => onChangeFilter(props.todolistID, Filter.All)}
                        className={props.taskFilter === Filter.All ? styles.activeFilter : ''}/>
                <Button buttonTitle={Filter.Active}
                        callback={() => {
                            onChangeFilter(props.todolistID, Filter.Active)
                        }}
                        className={props.taskFilter === Filter.Active ? styles.activeFilter : ''}/>
                <Button buttonTitle={Filter.Completed}
                        callback={() => {
                            onChangeFilter(props.todolistID, Filter.Completed)
                        }}
                        className={props.taskFilter === Filter.Completed ? styles.activeFilter : ''}/>
            </div>
        </div>
    );
}
