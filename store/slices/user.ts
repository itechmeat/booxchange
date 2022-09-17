import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '@supabase/supabase-js'
import { supabaseClient } from '../../libs/supabase'

export type Auth = {
  email: string
  password: string
}

export type Profile = {
  id: string
  created_at: string
  owner_id: string
  country_id: string
  citi_id: string
  currancy_id: string
  first_name: string
  last_name: string
  description: string
  avatar_url: string
  status: number
}

export type SliceState = {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isUserLoaded: boolean
  isProfileLoaded: boolean
  error: string | null
}

const initialState: SliceState = {
  user: null,
  profile: null,
  isLoading: false,
  isUserLoaded: false,
  isProfileLoaded: false,
  error: null
}

export const fetchUser = createAsyncThunk('user/fetch', () => {
  if (!supabaseClient) return null
  return supabaseClient.auth.user()
})

export const signInAsync = createAsyncThunk('signIn/fetch', async (data: Auth) => {
  if (!supabaseClient) return null
  return await supabaseClient.auth.signIn({
    email: data.email,
    password: data.password,
  })
})

export const signUpAsync = createAsyncThunk('signUp/fetch', async (data: Auth) => {
  if (!supabaseClient) return null
  return await supabaseClient.auth.signUp({
    email: data.email,
    password: data.password,
  })
})

export const fetchProfile = createAsyncThunk('profile/fetch', async (id: string) => {
  if (!supabaseClient) return null
  let result = await supabaseClient.from('profiles').select().eq('owner_id', id)
  if (result.status === 200 && !result.data?.length) {
    result = await supabaseClient.from('profiles').insert({
      owner_id: id,
      status: 1,
    })
  }

  return result?.data?.[0] || null
})

export const logoutAsync = createAsyncThunk('logout/fetch', async () => {
  if (!supabaseClient) return null
  const { error } = await supabaseClient.auth.signOut()
  return error
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state: SliceState, { payload }) => {
        state.user = payload
        state.isUserLoaded = true
      })
      .addCase(signInAsync.fulfilled, (state: SliceState, { payload }) => {
        if (payload?.user) {
          state.user = payload.user
          state.error = null
        }
        if (payload?.error) {
          state.error = payload.error.message
        }
        state.isUserLoaded = true
      })
      .addCase(signUpAsync.fulfilled, (state: SliceState, { payload }) => {
        if (payload?.user) {
          state.user = payload.user
          state.error = null
        }
        if (payload?.error) {
          state.error = payload.error.message
        }
        state.isUserLoaded = true
      })
      .addCase(fetchProfile.fulfilled, (state: SliceState, { payload }) => {
        state.profile = payload
        state.isProfileLoaded = true
      })
      .addCase(logoutAsync.fulfilled, (state: SliceState) => {
        // state.user = null
        // state.profile = null
        return initialState
      })
  },
})

export const { reset } = userSlice.actions

export default userSlice
