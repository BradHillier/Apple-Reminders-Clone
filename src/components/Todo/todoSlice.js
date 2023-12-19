import { createSlice } from '@reduxjs/toolkit'
import {v4 as uuidv4 } from 'uuid'

const saveToLocalStorage = state => {
    window.localStorage.setItem('state', JSON.stringify(state))
}

const getInitialState = () => {
    const state = JSON.parse(window.localStorage.getItem('state'))
    if (state !== null) {
        return state
    }
    return []
}

const initialState = {
    selected: null,
    todos: getInitialState()
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

        create: state => {
            const id = uuidv4()
            state.selected = id
            state.todos.push({
                id: id,
                description: "",
                isComplete: false,
                isFlagged: false
            })
        },

        startEditing: (state, action) => {
            state.selected = action.payload
        },

        toggleComplete: (state, action) => {
            state.todos.find(todo => todo.id === action.payload).isComplete = !state.todos.find(todo => todo.id === action.payload).isComplete
        },

        toggleFlagged: (state, action) => {
            state.todos.find(todo => todo.id === action.payload).isFlagged = !state.todos.find(todo => todo.id === action.payload).isFlagged
        },

        updateText: (state, action) => {
            state.todos.find(todo => todo.id === action.payload.id)
                .description = action.payload.description
        },

        stopEditing: (state, action) => {
            if (action.payload === 'Enter') {
                state.selected = null
            }
        },

        remove: (state, action) => {
            state.todos.splice(state.todos.findIndex(todo => todo.id === action.payload), 1)
        }
    }
})

export const { toggleFlagged, toggleComplete, create, startEditing, updateText, stopEditing, remove } = todoSlice.actions

export default todoSlice.reducer
