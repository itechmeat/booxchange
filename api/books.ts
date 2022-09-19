import { supabaseClient } from '../libs/supabase'

export type Book = {
  id: string
  created_at: string
  title: string
  isbn?: string
  owner_id: string
  country_id: string
  city_id?: string
  currancy_id?: string
  language_id?: string
  description?: string
  price: number
  year: number
  school_classes?: number[]
  status?: number
}

export type NewBook = {
  id?: string
  title?: string
  created_at?: string
  isbn?: string
  owner_id?: string
  country_id?: string
  city_id?: string
  currancy_id?: string
  language_id?: string
  description?: string
  price?: number
  year?: number
  school_classes?: number[]
  status?: number
}

export const emptyBook: NewBook = {
  title: '',
  created_at: '',
  isbn: '',
  owner_id: '',
  country_id: '',
  city_id: '',
  currancy_id: '',
  language_id: '',
  description: '',
  price: 0,
  year: 0,
  school_classes: [],
  status: 0,
}

export const fetchBooksAsync = async () => {
  if (!supabaseClient) return null
  return await supabaseClient.from('books').select()
  // return await supabaseClient.from('books').select('*, currancy:currancies(*), country:countries(*)')
}

export const fetchBookAsync = async (id: string) => {
  if (!supabaseClient) return null
  const response = await supabaseClient.from('books').select().eq('id', id)
  return response.data?.[0] || null
}

export const postBookAsync = async (book: any) => {
  if (!supabaseClient) return
  const { data, error } = await supabaseClient
    .from('books')
    .insert([book])
  return data?.[0]
}

export const updateBookAsync = async (id: string, data: any) => {
  if (!supabaseClient) return null
  const response = await supabaseClient.from('books').update(data).eq('id', id)
  return response.data?.[0] || null
}
