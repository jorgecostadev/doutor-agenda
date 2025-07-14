"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const registerSchema = z.object({
	name: z.string().trim().min(1, "Nome é obrigatório"),
	email: z
		.string()
		.trim()
		.min(1, "E-mail é obrigatório")
		.email("E-mail inválido"),
	password: z.string().trim().min(6, "Senha deve ter pelo menos 6"),
});

const AuthenticationPage = () => {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		console.log(values);
	}

	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<div className="flex flex-col gap-6 w-full max-w-sm">
				<Tabs defaultValue="login">
					<TabsList className="w-full">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Criar Conta</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<Card>
							<CardHeader>
								<CardTitle>Login</CardTitle>
								<CardDescription>Faça login para continuar.</CardDescription>
							</CardHeader>
							<CardContent className="gap-6 grid"></CardContent>
							<CardFooter>
								<Button>Entrar</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="register">
						<Card>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<CardHeader>
										<CardTitle>Criar Conta</CardTitle>
										<CardDescription>
											Criar uma conta para acessar o sistema.
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
														<Input
															placeholder="Digite o seu e-mail"
															{...field}
														/>
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
														<Input
															placeholder="Digite a sua senha"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</CardContent>
									<CardFooter>
										<Button type="submit" className="w-full">
											Criar conta
										</Button>
									</CardFooter>
								</form>
							</Form>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default AuthenticationPage;
