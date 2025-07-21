"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { createClinic } from "@/actions/create-clinic";
import toastError from "@/components/shared/toast-message";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const clinicFormSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
});

export default function ClinicForm() {
	const form = useForm<z.infer<typeof clinicFormSchema>>({
		resolver: zodResolver(clinicFormSchema),
		defaultValues: {
			name: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof clinicFormSchema>) => {
		try {
			await createClinic(values.name);
			toast.success("Clínica criada com sucesso!");
		} catch (error) {
			if (isRedirectError(error)) return;
			console.error("Error creating clinic:", error);
			toastError({
				title: "Atenção",
				message: "Erro ao criar clínica. Tente novamente.",
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder="Digite o nome da clínica" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter>
					<Button
						type="submit"
						className="cursor-pointer"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							"Salvar"
						)}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
