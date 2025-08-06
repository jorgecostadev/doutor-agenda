import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const actionClient = createSafeActionClient();
