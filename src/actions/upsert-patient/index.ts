"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

const upsertPatientSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(1, "Preenchimento obrigatório"),
	email: z.string().email("Email inválido"),
	phoneNumber: z.string().min(10, "Número de telefone inválido"),
	sex: z.enum(["male", "female"], { required_error: "Selecione o sexo" }),
});

export const upsertPatient = actionClient
	.inputSchema(upsertPatientSchema)
	.action(async ({ parsedInput }) => {
		// TODO: recuperar a sessão do usuário a partir de um método especializado
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) throw new Error("Usuário não autenticado");
		if (!session.clinic) redirect("/clinic-form");
		await db
			.insert(patientsTable)
			.values({ ...parsedInput, clinicId: session.clinic.id })
			.onConflictDoUpdate({
				target: [patientsTable.id],
				set: { ...parsedInput },
			});
		revalidatePath("/patients");
	});
