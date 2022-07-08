import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createSuperbaseClient = () => {
  if (!supabaseUrl) {
    throw new Error('supabase url is undefined');
  }

  if (!supabaseAnonKey) {
    throw new Error('supabase url is undefined');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSuperbaseClient();
