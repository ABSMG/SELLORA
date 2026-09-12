import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://iebadwesxpviugbtryob.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_mLr5DIwEDeIkWTpuc41oGw_DgfP9iTv";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
