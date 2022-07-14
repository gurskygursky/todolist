import {v1} from 'uuid';
import type {TodolistType} from '../Todolist';

export const todolistsReducer = (state: TodolistType[], action: TodolistReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            const newTodolist: TodolistType = {id: v1(), todolistTitle: action.payload.todolistTitle, filter: 'All'};
            return [...state, newTodolist]
        case 'REMOVE_TODOLIST':
            return state.filter(td => td.id !== action.payload.todolistId1);
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(td => td.id === action.payload.todolistId2
                ? {...td, todolistTitle: action.payload.todolistTitle}
                : td);
        default:
            throw new Error('I don\'t understand this type')
    }
}

//actions
export const addTodolistAC = (todolistTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {todolistTitle}
    } as const
}
export const changeTodolistTitleAC = (todolistId2: string, todolistTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistId2,
            todolistTitle,
        }
    } as const
}
export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {todolistId1}
    } as const
}

//action types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type TodolistReducerActionType =
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    RemoveTodolistActionType;
