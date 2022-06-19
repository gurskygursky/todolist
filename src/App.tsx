import React, {useState} from 'react';
import './App.css';
import {TaskFilterType, TasksType, Todolist, TodolistType} from './Todolist';
import {v1} from "uuid";

export const App = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let [tasks, setTasks] = useState<TasksType>({
            [todolistID1]: [
                {id: v1(), taskTitle: 'HTML&CSS', isDone: true},
                {id: v1(), taskTitle: 'JS', isDone: true},
                {id: v1(), taskTitle: 'ReactJS', isDone: false},
                {id: v1(), taskTitle: 'NodeJS', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), author: 'Douglas Murray', taskTitle: 'The Madness Of Crowds', isDone: true},
                {id: v1(), author: 'James Clear' , taskTitle: 'Atomic Habits:', isDone: true},
                {id: v1(), author: 'William L. Shirer' , taskTitle: 'The Rise and Fall of the Third Reich', isDone: true},
                {id: v1(), author: 'Nick Morgan' , taskTitle: 'JavaScript for Kids', isDone: true},
            ],
        },
    );

    let [todolists, setTodolists] = useState<TodolistType[]>([
            {id: todolistID1, todolistTitle: 'What to learn', filter: 'All'},
            {id: todolistID2, todolistTitle: 'Reading list', filter: 'All'},
        ],
    );

    // let [filter, setFilterTasks] = useState<TaskFilterType>('All');

    // let filteredTasks = tasks;
    //
    // if (filter === 'Completed') {
    //     filteredTasks = tasks.filter((task) => task.isDone)
    // }
    // if (filter === 'Active') {
    //     filteredTasks = tasks.filter((task) => !task.isDone)
    // }

    const changeFilterTask = (todolistID: string, taskFilterValue: TaskFilterType) => {
        // console.log(todolistID);
        // setFilterTasks(taskFilterValue);
        // setTodolists(todolists.map(
        //     (todolist) => todolist.id === todolistID ? {...todolist, filter: taskFilterValue} : todolist));
    }

    const addTask = (taskTitle: string) => {
        // const task = {id: v1(), taskTitle: taskTitle, isDone: false};
        // const newTask = [task, ...tasks];
        // setTasks(newTask);
    }

    const removeTask = (taskID: string) => {
        // const afterRemove = tasks.filter((task) => task.id !== taskID);
        // setTasks(afterRemove);
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        // setTasks(tasks.map((task) => task.id === taskID ? {...task, isDone} : task));
    }

    return (
        <div className="App">
            {
                todolists.map((todolist) => {
                    let filteredTasks = tasks[todolist.id];

                    if (todolist.filter === 'Completed') {
                        filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                    }
                    if (todolist.filter === 'Active') {
                        filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                    }
                    return (
                        <Todolist key={todolist.id}
                                  todolistID={todolist.id}
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
