import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabaseClient = !supabaseUrl || !supabaseKey ? null : createClient(supabaseUrl, supabaseKey)