import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kobiqfblpidnyadgmotw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvYmlxZmJscGlkbnlhZGdtb3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NjI3MjMsImV4cCI6MjA2MzUzODcyM30.-bDSCdPPSXe7L9qHypD7i_aRDIf8eV0bkKoW2CK6Ekc';
export const supabase = createClient(supabaseUrl, supabaseKey);