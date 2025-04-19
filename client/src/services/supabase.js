import { createClient } from '@supabase/supabase-js';
import process from 'node:process';

const supabase = createClient(
  process.env.SUPERBASE_PROJECT_URL,
  process.env.SUPABASE_PROJECT_PUBLIC_KEY
);

export { supabase };
