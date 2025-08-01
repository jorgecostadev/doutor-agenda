"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { patientsTable } from "@/db/schema";
import UpsertPatientForm from "./upsert-patient-form";

interface EditPatientTableButtonProps {
	patient: typeof patientsTable.$inferSelect;
}

export default function EditPatientTableButton({
	patient,
}: EditPatientTableButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon" className="cursor-pointer">
					<Edit />
				</Button>
			</DialogTrigger>
			<UpsertPatientForm patient={patient} onSuccess={() => setIsOpen(false)} />
		</Dialog>
	);
}
