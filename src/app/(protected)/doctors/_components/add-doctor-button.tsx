"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpsertDoctorForm from "./upsert-doctor-form";

export default function AddDoctorButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="cursor-pointer">
					<Plus />
					Adicionar médico
				</Button>
			</DialogTrigger>
			<UpsertDoctorForm
				onSucccess={() => {
					setIsOpen(false);
					console.log("Médico adicionado com sucesso");
				}}
			/>
		</Dialog>
	);
}
