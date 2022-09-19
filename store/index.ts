import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import countriesSlice from './slices/countries'
import curranciesSlice from './slices/currancies'
import languagesSlice from './slices/languages'

export const store= configureStore({
  reducer: {
    user: userReducer.reducer,
    countries: countriesSlice.reducer,
    currancies: curranciesSlice.reducer,
    languages: languagesSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
