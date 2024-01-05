import { configureStore } from '@reduxjs/toolkit'
import formSlice from './slice/formSlice'
import { initialState } from './slice/formSlice'
export const store = configureStore({
  reducer: {
    blogs: formSlice
  },
  
})