import type {TasksType} from '../../Todolist';
import {AddTodolistActionType} from '../../reducers/todolist-reducer/todolist-reducer';
import { v1 } from 'uuid';

export const tasksReducer = (state: TasksType, action: TaskReducerActionType | AddTodolistActionType) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolistID]: []}
        case 'ADD_TASK':
            const task = {id: v1(), taskTitle: action.payload.taskTitle, isDone: false};
            return {
            ...state, [action.payload.todolistID]: [...state[action.payload.todolistID], task]
        }
        case 'REMOVE_TASK': return {
            ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(removedTask => removedTask.id !== action.payload.taskID)
        }
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(removedTask => removedTask.id !== taskID)});

    }
}

export const addTaskAC = (todolistID: string, taskTitle: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistID,
            taskTitle,
        }
    } as const
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistID,
            taskID,
        }
    } as const
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type TaskReducerActionType =
    AddTaskActionType |
    RemoveTaskActionType;