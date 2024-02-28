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
    return [
        {
            id: "d4e6d13b-02b3-4a4d-b9e1-37e3db4d4cc5",
            description: "\u{1F9FD} Wash the Dishes",
            isComplete: true,
            isFlagged: true
        },
        {
            id: "7f1b01bc-aeaf-40ef-b1c2-5c848ab3b3eb",
            description: "\u{1F9FA} Do the Laundry",
            isComplete: false,
            isFlagged: false
        },
        {
            id: "bc2a6f1a-81f2-4655-b6c3-602348bc56db",
            description: "\u{1F5D1} Take Out the Trash",
            isComplete: false,
            isFlagged: false
        },
    ]
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

        remove: (state, action) => {
            state.todos.splice(state.todos.findIndex(todo => todo.id === action.payload), 1)
        }
    }
})

export const { toggleFlagged, toggleComplete, create, startEditing, updateText, remove } = todoSlice.actions

export default todoSlice.reducer
