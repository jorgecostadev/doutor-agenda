import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";

const FIVE_MINUTES = 5 * 60;

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	user: {
		modelName: "usersTable",
	},
	session: {
		modelName: "sessionsTable",
	},
	account: {
		modelName: "accountsTable",
	},
	verification: {
		modelName: "verificationsTable",
	},
	emailAndPassword: {
		enabled: true,
	},
});
