"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, "E-mail é obrigatório")
		.email("E-mail inválido"),
	password: z.string().trim().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function SignInForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Faça login para continuar.</CardDescription>
					</CardHeader>
					<CardContent className="gap-6 grid">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="Digite o seu e-mail" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input placeholder="Digite a sua senha" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Entrar
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
