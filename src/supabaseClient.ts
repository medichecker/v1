import { createClient } from '@supabase/supabase-js';



const supabaseUrl = "https://eifubbnljqheepsxdxqg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZnViYm5sanFoZWVwc3hkeHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjQxMjIsImV4cCI6MjA1Nzc0MDEyMn0.L5l2yEjZU3HLHiouiksBSBHPxjVYY4mxqcOsUkG2yE8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
