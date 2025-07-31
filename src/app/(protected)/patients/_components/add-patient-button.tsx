"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import UpsertPatientForm from "./upsert-patient-form";

export default function AddPatientButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="cursor-pointer">
					<Plus />
					Adicionar Paciente
				</Button>
			</DialogTrigger>
			<UpsertPatientForm onSuccess={() => setIsOpen(false)} />
		</Dialog>
	);
}
