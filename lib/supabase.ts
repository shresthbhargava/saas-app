import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        async getSession() {
          const { getToken } = await auth();
          const token = await getToken({ template: "supabase" });
          return token ? { access_token: token, refresh_token: "", user: null } : null;
        },
      },
    }
  );
};