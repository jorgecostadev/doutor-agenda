"use server";

import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { db } from "@/db";
import { appointmentsTable, doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { getAvailableTimes } from "../get-available-times";

const addAppointmentSchema = z.object({
	patientId: z.string().uuid({
		message: "Paciente é obrigatório.",
	}),
	doctorId: z.string().uuid({
		message: "Médico é obrigatório.",
	}),
	date: z.date({
		message: "Data é obrigatória.",
	}),
	time: z.string().min(1, {
		message: "Horário é obrigatório.",
	}),
	appointmentPriceInCents: z.number().min(1, {
		message: "Valor da consulta é obrigatório.",
	}),
});

export const addAppointment = actionClient
	.inputSchema(addAppointmentSchema)
	.action(async ({ parsedInput }) => {
		// TODO: move user session to a separete function
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) throw new Error("Unauthorized");
		if (!session.clinic) throw new Error("Clinic not found");
		const doctor = await db.query.doctorsTable.findFirst({
			where: eq(doctorsTable.id, parsedInput.doctorId),
		});
		if (!doctor) throw new Error("Doctor not found");

		const availableTimes = await getAvailableTimes({
			doctorId: parsedInput.doctorId,
			date: dayjs(parsedInput.date).format("YYYY-MM-DD"),
		});
		if (!availableTimes?.data) {
			throw new Error("No available times");
		}
		const isTimeAvailable = availableTimes.data?.some(
			(time) => time.value === parsedInput.time && time.available,
		);
		if (!isTimeAvailable) {
			throw new Error("Time not available");
		}
		const appointmentDateTime = dayjs(parsedInput.date)
			.set("hour", parseInt(parsedInput.time.split(":")[0]))
			.set("minute", parseInt(parsedInput.time.split(":")[1]))
			.toDate();

		await db.insert(appointmentsTable).values({
			...parsedInput,
			clinicId: session.clinic.id,
			date: appointmentDateTime,
		});

		revalidatePath("/appointments");
		revalidatePath("/dashboard");
	});
