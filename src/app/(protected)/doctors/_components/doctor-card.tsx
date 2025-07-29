"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import {
	CalendarIcon,
	ClockIcon,
	DollarSignIcon,
	TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { deleteDoctor } from "@/actions/delete-doctor";
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
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { doctorsTable } from "@/db/schema";
import { getAvailability } from "@/helpers/availability";
import { formatCurrencyInCents } from "@/helpers/currency";
import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
	doctor: typeof doctorsTable.$inferSelect;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const initials = doctor.name
		.split(" ")
		.map((name) => name.charAt(0).toUpperCase())
		.join("");

	const deleteDoctorAction = useAction(deleteDoctor, {
		onSuccess: () => toast.success("Médico excluído com sucesso!"),
		onError: (error: any) =>
			toast.error(error.message || "Erro ao excluir médico"),
	});

	const handleDelete = async () => {
		deleteDoctorAction.execute({ id: doctor.id });
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex gap-2">
					<Avatar className="justify-center items-center bg-gray-100 w-10 h-10">
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="font-medium text-sm">{doctor.name}</h3>
						<p className="text-muted-foreground text-sm">{doctor.specialty}</p>
					</div>
				</div>
			</CardHeader>
			<Separator />
			<CardContent className="flex flex-col gap-2">
				<Badge variant="outline">
					<CalendarIcon />
					{getAvailability(doctor).from.format("dddd")} a{" "}
					{getAvailability(doctor).to.format("dddd")}
				</Badge>
				<Badge variant="outline">
					<ClockIcon />
					{doctor.availableFromTime} as {doctor.availableToTime}
				</Badge>
				<Badge variant="outline">
					<DollarSignIcon />
					{formatCurrencyInCents(doctor.appointmentPriceInCents)}
				</Badge>
			</CardContent>
			<Separator />
			<CardFooter>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<div className="flex gap-2 w-full">
						<DialogTrigger asChild>
							<Button className="flex-1 w-full cursor-pointer">
								Ver detalhes
							</Button>
						</DialogTrigger>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									className="flex-1 w-full cursor-pointer"
									variant={"outline"}
								>
									<TrashIcon />
									Excluir
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Confirma a exclusão do médico?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Esta ação não pode ser desfeita. Isso excluirá
										permanentemente os seus dados de nossos servidores.
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
					</div>
					<UpsertDoctorForm
						doctor={doctor}
						onSucccess={() => setIsOpen(false)}
					/>
				</Dialog>
			</CardFooter>
		</Card>
	);
}
