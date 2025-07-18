import z from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string().url(),
	GOOGLE_CLIENT_ID: z.string().min(10).max(100),
	GOOGLE_CLIENT_SECRET: z.string().min(10).max(100),
});

export const env = envSchema.parse(process.env);
