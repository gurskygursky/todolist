import React, {useState} from 'react';
import './App.css';
import {TaskFilterType, TaskType, Todolist, TodolistType} from './Todolist';
import {v1} from "uuid";

export const App = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
            {id: v1(), taskTitle: "HTML&CSS", isDone: true},
            {id: v1(), taskTitle: "JS", isDone: true},
            {id: v1(), taskTitle: "ReactJS", isDone: false},
            {id: v1(), taskTitle: "NodeJS", isDone: false},
        ],
    );

    let [todolists, setTodolists] = useState<TodolistType[]>([
            {id: v1(), todolistTitle: 'What to learn', filter: 'All'},
            {id: v1(), todolistTitle: 'What to read', filter: 'All'},
        ],
    );

    let [filter, setFilterTasks] = useState<TaskFilterType>('All');

    let filteredTasks = tasks;

    if (filter === 'Completed') {
        filteredTasks = tasks.filter((task) => task.isDone)
    }
    if (filter === 'Active') {
        filteredTasks = tasks.filter((task) => !task.isDone)
    }

    const changeFilterTask = (taskFilterValue: TaskFilterType) => {
        setFilterTasks(taskFilterValue);
    }

    const addTask = (taskTitle: string) => {
        const task = {id: v1(), taskTitle: taskTitle, isDone: false};
        const newTask = [task, ...tasks];
        setTasks(newTask);
    }

    const removeTask = (taskID: string) => {
        const afterRemove = tasks.filter((task) => task.id !== taskID);
        setTasks(afterRemove);
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map((task) => task.id === taskID ? {...task, isDone} : task));
    }

    return (
        <div className="App">
            {
                todolists.map((todolist) => {
                    return (
                        <Todolist key={todolist.id}
                                  tasks={filteredTasks}
                                  todolistTitle={todolist.todolistTitle}
                                  changeFilterTask={changeFilterTask}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  changeTaskStatus={changeTaskStatus}
                                  taskFilter={todolist.filter}
                        />
                    )
                })
            }
            {/*<Todolist tasks={filteredTasks}*/}
            {/*          todolistTitle={'What to learn'}*/}
            {/*          changeFilterTask={changeFilterTask}*/}
            {/*          addTask={addTask}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeTaskStatus={changeTaskStatus}*/}
            {/*          taskFilter={filter}*/}
            {/*/>*/}
        </div>
    );
}
