import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../components/Todo/todoSlice'

export default configureStore({
  reducer: {
      todo: todoReducer
  },
})
