"use server";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db";
import { appointmentsTable, doctorsTable } from "@/db/schema";
import { generateTimeSlots } from "@/helpers/time";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

dayjs.extend(utc);
dayjs.extend(timezone);

const getAvailableTimesSchema = z.object({
	doctorId: z.string().uuid(),
	date: z.string().date(),
});

export const getAvailableTimes = actionClient
	.inputSchema(getAvailableTimesSchema)
	.action(async ({ parsedInput }) => {
		const { doctorId, date } = parsedInput;
		// TODO: move user session to a separete function
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) throw new Error("Unauthorized");
		if (!session.clinic) throw new Error("Clinic not found");
		const doctor = await db.query.doctorsTable.findFirst({
			where: eq(doctorsTable.id, doctorId),
		});
		if (!doctor) throw new Error("Doctor not found");

		const selectedDayOfWeek = dayjs(date).day();
		const doctorIsAvailable =
			selectedDayOfWeek >= doctor.availableFromWeekDay &&
			selectedDayOfWeek <= doctor.availableToWeekDay;
		if (!doctorIsAvailable) return [];
		const appointments = await db.query.appointmentsTable.findMany({
			where: eq(appointmentsTable.doctorId, doctorId),
		});
		const appointmentsOnSelectedDate = appointments
			.filter((appointment) => {
				return dayjs(appointment.date).isSame(date, "day");
			})
			.map((appointment) => dayjs(appointment.date).format("HH:mm:ss"));
		const timeSlots = generateTimeSlots();
		const doctorAvailableFrom = dayjs()
			.utc()
			.set("hour", Number(doctor.availableFromTime.split(":")[0]))
			.set("minute", Number(doctor.availableFromTime.split(":")[1]))
			.set("second", 0)
			.local();
		const doctorAvailableTo = dayjs()
			.utc()
			.set("hour", Number(doctor.availableToTime.split(":")[0]))
			.set("minute", Number(doctor.availableToTime.split(":")[1]))
			.set("second", 0)
			.local();
		const doctorTimeSlots = timeSlots.filter((time) => {
			const date = dayjs()
				.utc()
				.set("hour", Number(time.split(":")[0]))
				.set("minute", Number(time.split(":")[1]))
				.set("second", 0)
				.local();
			return (
				date.format("HH:mm:ss") >= doctorAvailableFrom.format("HH:mm:ss") &&
				date.format("HH:mm:ss") <= doctorAvailableTo.format("HH:mm:ss")
			);
		});
		return doctorTimeSlots.map((time) => {
			return {
				value: time,
				available: !appointmentsOnSelectedDate.includes(time),
				label: time.substring(0, 5),
			};
		});
	});
