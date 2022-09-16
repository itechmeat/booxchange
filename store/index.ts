import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userReducer from './slices/user'

export const store= configureStore({
  reducer: {
    user: userReducer.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
