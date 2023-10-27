import { createClient } from "@supabase/supabase-js";
import { Database } from "../types_db";

export const createAdminClient = () =>
  createClient<Database>(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
