"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { doctorsTable, patientsTable } from "@/db/schema";
import UpsertAppointmentForm from "./upsert-appointment-form";

interface AddAppointmentButtonProps {
	patients: (typeof patientsTable.$inferSelect)[];
	doctors: (typeof doctorsTable.$inferSelect)[];
}

export default function AddAppointmentButton({
	patients,
	doctors,
}: AddAppointmentButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="cursor-pointer">
					<Plus />
					Incluir Agendamento
				</Button>
			</DialogTrigger>
			<UpsertAppointmentForm
				isOpen={isOpen}
				patients={patients}
				doctors={doctors}
				onSuccess={() => setIsOpen(false)}
			/>
		</Dialog>
	);
}
