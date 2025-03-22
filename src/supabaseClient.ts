import { createClient } from '@supabase/supabase-js';

// if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//   throw new Error('Supabase URL or anon key is missing');
// }

const supabaseUrl ="https://eifubbnljqheepsxdxqg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZnViYm5sanFoZWVwc3hkeHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjQxMjIsImV4cCI6MjA1Nzc0MDEyMn0.L5l2yEjZU3HLHiouiksBSBHPxjVYY4mxqcOsUkG2yE8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
