"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ShowPassword from "@/components/shared/show-password";
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
import { signUpWithEmailAndPassword } from "@/lib/auth-client";

const registerSchema = z.object({
	name: z.string().trim().min(1, "Nome é obrigatório"),
	email: z
		.string()
		.trim()
		.min(1, "E-mail é obrigatório")
		.email("E-mail inválido"),
	password: z.string().trim().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
		await signUpWithEmailAndPassword({
			name: values.name,
			email: values.email,
			password: values.password,
			onSuccess: () => {
				router.push("/dashboard");
			},
		});
	};

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
					<CardHeader>
						<CardTitle>Criar Conta</CardTitle>
						<CardDescription>
							Crie sua conta para acessar o sistema..
						</CardDescription>
					</CardHeader>
					<CardContent className="gap-6 grid">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Digite o seu nome" {...field} />
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
										<div className="relative">
											<Input
												placeholder="Digite a sua senha"
												type={showPassword ? "text" : "password"}
												{...field}
											/>
											<ShowPassword
												isVisible={showPassword}
												toggleVisibility={() => setShowPassword(!showPassword)}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<Loader2 className="animate-spin" />
							) : (
								"Criar Conta"
							)}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
