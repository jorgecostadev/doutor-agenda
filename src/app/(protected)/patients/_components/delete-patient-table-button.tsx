"use client";

import { TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { deletePatient } from "@/actions/delete-patient";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { patientsTable } from "@/db/schema";

interface DeletePatientTableButtonProps {
	patient: typeof patientsTable.$inferSelect;
}

export default function DeletePatientTableButton({
	patient,
}: DeletePatientTableButtonProps) {
	const deletePatientAction = useAction(deletePatient, {
		onSuccess: () => toast.success("Paciente excluído com sucesso!"),
		onError: (error: any) =>
			toast.error(error.message || "Erro ao excluir paciente"),
	});

	const handleDelete = async () => {
		deletePatientAction.execute({ id: patient.id });
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="cursor-pointer" variant="ghost" size="icon">
					<TrashIcon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirma a exclusão do paciente?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta ação não pode ser desfeita. Isso excluirá permanentemente os
						seus dados de nossos servidores.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>
						Continuar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
