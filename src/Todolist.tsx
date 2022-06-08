import React from 'react';

type TaskType = {
    id: number;
    taskTitle: string;
    isDone: boolean;
}
type PropsType = {
    todolistTitle: string;
    tasks: TaskType[];
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}><input type="checkbox"
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
