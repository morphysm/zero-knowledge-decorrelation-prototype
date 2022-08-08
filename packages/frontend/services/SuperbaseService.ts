import { createClient } from '@supabase/supabase-js';


const createSuperbaseClient = () => {
  console.log( process.env)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log( supabaseUrl)

  if (supabaseUrl === undefined || supabaseUrl === '') {
    console.log("What",supabaseUrl)
    throw new Error('supabase url is undefined');
  }

  if (!supabaseAnonKey) {
    throw new Error('supabase anon key is undefined');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSuperbaseClient();
