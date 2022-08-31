import {v1} from 'uuid';
import type {TaskFilterType, TodolistType} from '../../Todolist';

const initialState: TodolistType[] = [];

export const todolistReducer = (state = initialState , action: TodolistReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            const newTodolist: TodolistType = {
                id: action.payload.todolistID,
                todolistTitle: action.payload.todolistTitle,
                filter: 'All'
            };
            return [...state, newTodolist]
        case 'REMOVE_TODOLIST':
            return state.filter(td => td.id !== action.payload.todolistID);
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(td => td.id === action.payload.todolistID
                ? {...td, todolistTitle: action.payload.todolistTitle}
                : td);
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(td => td.id === action.payload.todolistID
                ? {...td, filter: action.payload.filter}
                : td);
        default: return state;
            // throw new Error('I don\'t understand this type')
    }
}

//actions
export const addTodolistAC = (todolistTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            todolistID: v1(),
            todolistTitle
        }
    } as const
}
export const changeTodolistTitleAC = (todolistID: string, todolistTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistID,
            todolistTitle,
        }
    } as const
}
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {todolistID}
    } as const
}
export const changeTodolistFilterAC = (todolistID: string, filter: TaskFilterType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todolistID,
            filter,
        }
    } as const
}


//action types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type TodolistReducerActionType =
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    RemoveTodolistActionType |
    ChangeTodolistFilterActionType;
