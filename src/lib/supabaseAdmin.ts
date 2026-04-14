import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.warn('Falta SUPABASE_SERVICE_ROLE_KEY o URL en las variables de entorno.');
}

// Initialize the client only if keys are present, or use dummy strings to prevent build crashes
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://dummy.supabase.co', 
  serviceRoleKey || 'dummy_key'
);
