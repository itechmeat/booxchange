import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { supabaseClient } from '../../libs/supabase'

export type Currancy = {
  id: string
  created_at: string
  title: string
  code: string
  symbol: string
}

export type SliceState = {
  currancies: Currancy[]
}

const initialState: SliceState = {
  currancies: [],
}

export const fetchCurrancies = createAsyncThunk('currancies/fetch', () => {
  if (!supabaseClient) return null
  return supabaseClient.from('currancies').select()
})

const curranciesSlice = createSlice({
  name: 'currancies',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrancies.fulfilled, (state: SliceState, { payload }) => {
        // @ts-ignore
        state.currancies = payload?.data || []
      })
  },
})

export const { reset } = curranciesSlice.actions

export default curranciesSlice
