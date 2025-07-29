"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

const upsertDoctorSchema = z
	.object({
		id: z.string().uuid().optional(),
		name: z.string().min(1, "Preenchimento obrigatório"),
		specialty: z.string().min(1, "Preenchimento obrigatório"),
		appointmentPriceInCents: z
			.number()
			.min(1, "O preço da consulta deve ser maior ou igual a zero"),
		availableFromWeekDay: z.number().min(0).max(6),
		availableToWeekDay: z.number().min(0).max(6),
		availableFromTime: z.string().min(1, "Preenchimento obrigatório"),
		availableToTime: z.string().min(1, "Preenchimento obrigatório"),
	})
	.refine(
		(data) => {
			return data.availableFromTime < data.availableToTime;
		},
		{
			message: "O horário final deve ser maior que o horário inicial",
			path: ["availableToTime"],
		},
	);

export const upsertDoctor = actionClient
	.inputSchema(upsertDoctorSchema)
	.action(async ({ parsedInput }) => {
		// TODO: recuperar a sessão do usuário a partir de um método especializado
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session) throw new Error("Usuário não autenticado");
		if (!session.clinic) redirect("/clinic-form");

		await db
			.insert(doctorsTable)
			.values({ ...parsedInput, clinicId: session.clinic.id })
			.onConflictDoUpdate({
				target: [doctorsTable.id],
				set: { ...parsedInput },
			});
		revalidatePath("/doctors");
	});
