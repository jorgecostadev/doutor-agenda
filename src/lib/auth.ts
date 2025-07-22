import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { env } from "./env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [
		customSession(async ({ user, session }) => {
			const [clinic] = await db.query.usersToClinicsTable.findMany({
				where: eq(schema.usersToClinicsTable.userId, user.id),
				with: { clinic: true },
			});
			return {
				user: {
					...user,
				},
				clinic: clinic
					? {
							id: clinic.clinicId,
							name: clinic.clinic.name,
						}
					: undefined,
			};
		}),
	],
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
