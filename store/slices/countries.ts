import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { supabaseClient } from '../../libs/supabase'

export type Country = {
  id: string
  created_at: string
  title: string
  code: string
  flag: string
  language_id: string
  currancy_id: string
}

export type SliceState = {
  countries: Country[]
}

const initialState: SliceState = {
  countries: [],
}

export const fetchCountries = createAsyncThunk('countries/fetch', () => {
  if (!supabaseClient) return null
  return supabaseClient.from('countries').select()
})

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state: SliceState, { payload }) => {
        // @ts-ignore
        state.countries = payload?.data || []
      })
  },
})

export const { reset } = countriesSlice.actions

export default countriesSlice
