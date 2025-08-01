import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";
import { upsertPatient } from "@/actions/upsert-patient";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { patientsTable } from "@/db/schema";

const formSchema = z.object({
	name: z.string().min(1, "Preenchimento obrigatório"),
	email: z.string().email("Email inválido"),
	phoneNumber: z.string().min(10, "Número de telefone inválido"),
	sex: z.enum(["male", "female"], { required_error: "Selecione o sexo" }),
});

interface UpsertPatientFormProps {
	patient?: typeof patientsTable.$inferSelect;
	onSuccess?: () => void;
}

export default function UpsertPatientForm({
	patient,
	onSuccess,
}: UpsertPatientFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		shouldUnregister: true,
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: patient?.name || "",
			email: patient?.email || "",
			phoneNumber: patient?.phoneNumber || "",
			sex: patient?.sex || undefined,
		},
	});

	const upsertPatientAction = useAction(upsertPatient, {
		onSuccess: () => {
			toast.success("Paciente salvo com sucesso!");
			onSuccess?.();
		},
		onError: (error: any) => {
			toast.error(error.message || "Erro ao salvar paciente");
		},
	});

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		upsertPatientAction.execute({ ...values, id: patient?.id });
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Adicionar Paciente</DialogTitle>
				<DialogDescription>Preencha os dados do paciente.</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input placeholder="Digite o nome" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Digite o email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Telefone</FormLabel>
								<FormControl>
									<PatternFormat
										format="(##) #####-####"
										mask="_"
										placeholder="(11) 99999-9999"
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value.value);
										}}
										customInput={Input}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="sex"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sexo</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione o sexo" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">Masculino</SelectItem>
										<SelectItem value="female">Feminino</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter>
						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={upsertPatientAction.isPending}
						>
							{upsertPatientAction.isPending ? "Salvando..." : "Salvar"}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}
