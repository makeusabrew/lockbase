import { createClient } from "@supabase/supabase-js";
import { Database } from "../types_db";

// TODO: line up with stripe: either make both functions, or make both just exports pre-initialised objects

// TODO: possibly bring them into the same file
export const createAdminClient = () =>
  createClient<Database>(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
