import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '@supabase/supabase-js'
import { supabaseClient } from '../../libs/supabase'

export type SliceState = {
  user: User | null
  isUserLoaded: boolean
}

const initialState: SliceState = {
  user: null,
  isUserLoaded: false,
}

export const fetchUser = createAsyncThunk('tenantSettings/fetch', () => {
  if (!supabaseClient) return null
  return supabaseClient.auth.user()
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset(state) {
      state.user = null
      state.isUserLoaded = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state: SliceState, { payload }) => {
      state.user = payload
      state.isUserLoaded = true
    })
  },
})

export const { reset } = userSlice.actions

export default userSlice
