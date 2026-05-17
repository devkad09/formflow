import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing. Using mock/fallback authentication client.");
  supabaseInstance = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: new Error("Supabase credentials not configured") }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => { throw new Error("Supabase is not configured."); },
      signUp: async () => { throw new Error("Supabase is not configured."); },
      signOut: async () => {},
    }
  };
} else {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
    supabaseInstance = {
      auth: {
        getSession: async () => ({ data: { session: null }, error }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => { throw new Error("Supabase initialization failed."); },
        signUp: async () => { throw new Error("Supabase initialization failed."); },
        signOut: async () => {},
      }
    };
  }
}

export const supabase = supabaseInstance;

