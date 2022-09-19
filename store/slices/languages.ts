import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { supabaseClient } from '../../libs/supabase'

export type Language = {
  id: string
  created_at: string
  title: string
  code: string
  flag: string
}

export type SliceState = {
  languages: Language[]
}

const initialState: SliceState = {
  languages: [],
}

export const fetchLanguage = createAsyncThunk('languages/fetch', () => {
  if (!supabaseClient) return null
  return supabaseClient.from('languages').select()
})

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguage.fulfilled, (state: SliceState, { payload }) => {
        // @ts-ignore
        state.languages = payload?.data || []
      })
  },
})

export const { reset } = languagesSlice.actions

export default languagesSlice
