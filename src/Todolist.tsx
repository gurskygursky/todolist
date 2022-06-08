import React from 'react';

export type TaskType = {
    id: number;
    taskTitle: string;
    isDone: boolean;
}
export type TaskFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    todolistTitle: string;
    tasks: TaskType[];
    changeFilterTask: (taskFilterValue: TaskFilterType) => void;
}

export const Todolist = (props: PropsType) => {

    const onChangeFilter = (taskFilterValue: TaskFilterType) => {
        props.changeFilterTask(taskFilterValue);
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input/>
                <button>+</button>
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
