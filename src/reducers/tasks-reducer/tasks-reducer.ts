import type {TasksType} from '../../Todolist';
import {AddTodolistActionType, RemoveTodolistActionType} from '../../reducers/todolist-reducer/todolist-reducer';
import {v1} from 'uuid';

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: TaskReducerActionType | AddTodolistActionType | RemoveTodolistActionType) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolistID]: []}
        case 'ADD_TASK':
            const task = {id: v1(), taskTitle: action.payload.taskTitle, isDone: false};
            return {
                ...state, [action.payload.todolistID]: [...state[action.payload.todolistID], task]
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(removedTask => removedTask.id !== action.payload.taskID)
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskID
                    ? {...task, isDone: action.payload.isDone}
                    : task)
            }
        case 'EDIT_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    taskTitle: action.payload.taskTitle
                } : task)
            }
        case 'REMOVE_TODOLIST':
                const copyState = {...state};
                delete copyState[action.payload.todolistID];
                return copyState;
        default: return state;
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
export const editTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
    return {
        type: 'EDIT_TASK_TITLE',
        payload: {
            todolistID,
            taskID,
            taskTitle,
        }
    } as const
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistID,
            taskID,
            isDone,
        }
    } as const
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type EditTaskTitleActionType = ReturnType<typeof editTaskTitleAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type TaskReducerActionType =
    AddTaskActionType |
    RemoveTaskActionType |
    EditTaskTitleActionType |
    ChangeTaskStatusActionType;