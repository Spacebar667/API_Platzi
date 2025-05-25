import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfshlsyxkzmgokasxaca.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmc2hsc3l4a3ptZ29rYXN4YWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjIwMTIsImV4cCI6MjA2MzQzODAxMn0.AQlRmaeGqCeF4kegkWZUBnjOESM24b_uvITKkE8IWvA';
export const supabase = createClient(supabaseUrl, supabaseKey);