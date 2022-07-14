import type {TodolistType} from '../Todolist';

export const todolistsReducer = (state: TodolistType[], action: TodolistReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(td => td.id !== action.payload.todolistId1);
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
export const changeTodolistTitleAC = (todolistID: string, todolistTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistID,
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