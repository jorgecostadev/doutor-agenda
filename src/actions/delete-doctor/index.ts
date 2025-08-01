"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const deleteDoctor = actionClient
	.inputSchema(z.object({ id: z.string().uuid() }))
	.action(async ({ parsedInput }) => {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) throw new Error("Unauthorized");
		const doctor = await db.query.doctorsTable.findFirst({
			where: eq(doctorsTable.id, parsedInput.id),
		});
		if (!doctor) throw new Error("Doctor not found");
		if (doctor.clinicId !== session.clinic?.id)
			throw new Error("You do not have permission to delete this doctor");
		await db.delete(doctorsTable).where(eq(doctorsTable.id, parsedInput.id));
		revalidatePath("doctors");
	});
