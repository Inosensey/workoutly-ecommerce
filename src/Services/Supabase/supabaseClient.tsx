import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey: any = process.env.NEXT_PUBLIC_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  autoRefreshToken: true,
});
