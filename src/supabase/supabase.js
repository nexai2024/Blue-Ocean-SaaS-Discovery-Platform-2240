import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://almqglytjgwcdbjvafjf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsbXFnbHl0amd3Y2RianZhZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODkyNTksImV4cCI6MjA4MjQ2NTI1OX0.d0JyMjaeqB0039wSfNXp0B2gbujQhKUGK4CS-kwOcug';

if(!SUPABASE_URL || !SUPABASE_ANON_KEY ){
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})