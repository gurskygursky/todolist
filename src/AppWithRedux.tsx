import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskFilterType, TasksType, TaskType, Todolist, TodolistType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {BasicAppBar} from './components/BasicAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistReducer
} from './reducers/todolist-reducer/todolist-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './reducers/tasks-reducer/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import { AppRootStateType } from './state/store';

export const AppWithRedux = () => {

    // const todolistID1 = v1();
    // const todolistID2 = v1();

    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //         [todolistID1]: [
    //             {id: v1(), taskTitle: 'HTML&CSS', isDone: true},
    //             {id: v1(), taskTitle: 'JS', isDone: true},
    //             {id: v1(), taskTitle: 'ReactJS', isDone: false},
    //             {id: v1(), taskTitle: 'NodeJS', isDone: false},
    //         ],
    //         [todolistID2]: [
    //             {id: v1(), author: 'Douglas Murray', taskTitle: 'The Madness Of Crowds', isDone: true},
    //             {id: v1(), author: 'James Clear', taskTitle: 'Atomic Habits:', isDone: true},
    //             {id: v1(), author: 'William L. Shirer', taskTitle: 'The Rise and Fall of the Third Reich', isDone: true},
    //             {id: v1(), author: 'Nick Morgan', taskTitle: 'JavaScript for Kids', isDone: true},
    //         ],
    //     },
    // );

    // let [todolists, dispatchTodolist] = useReducer(todolistReducer, [
    //         {id: todolistID1, todolistTitle: 'What to learn', filter: 'All'},
    //         {id: todolistID2, todolistTitle: 'Reading list', filter: 'All'},
    //     ],
    // );

    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const dispatch = useDispatch();

    //filter
    const changeFilterTask = useCallback((todolistID: string, taskFilterValue: TaskFilterType) => {
        dispatch(changeTodolistFilterAC(todolistID, taskFilterValue));
    }, [dispatch]);

    //tasks
    // const addTask = (todolistID: string, taskTitle: string) => {
    //     dispatch(addTaskAC(todolistID, taskTitle));
    // }
    const addTask = useCallback((todolistID: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistID, taskTitle));
    }, [dispatch]);

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }, [dispatch]);

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
    }, [dispatch]);

    const editTaskTitle = useCallback((todolistID: string, taskID: string, taskTitle: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, taskTitle));
    }, [dispatch]);

    //todolist
    // const addTodolist = (todolistTitle: string) => {
    //     const action = addTodolistAC(todolistTitle);
    //     dispatch(action);
    //     // dispatch(action);
    // }

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle);
        dispatch(action);
    }, [dispatch]);

    const editTodolistTitle = useCallback((todolistID: string, todolistTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, todolistTitle));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch]);

    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addFormCallback={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((todolist) => {
                            // let filteredTasks = tasks[todolist.id];
                            //
                            // if (todolist.filter === 'Completed') {
                            //     filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                            // }
                            // if (todolist.filter === 'Active') {
                            //     filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                            // }
                            return (
                                <Grid item key={todolist.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist key={todolist.id}
                                                  todolistID={todolist.id}
                                                  tasks={tasks[todolist.id]}
                                                  todolistTitle={todolist.todolistTitle}
                                                  changeFilterTask={changeFilterTask}
                                                  addTask={addTask}
                                                  removeTask={removeTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  taskFilter={todolist.filter}
                                                  editTodolistTitle={editTodolistTitle}
                                                  editTaskTitle={editTaskTitle}
                                                  removeTodolist={removeTodolist}
                                        />
                                    </Paper>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
