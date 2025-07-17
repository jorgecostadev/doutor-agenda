import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

export default async function AuthenticationPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (session) redirect("/dashboard");

	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<div className="flex flex-col gap-6 w-full max-w-sm">
				<Tabs defaultValue="login">
					<TabsList className="w-full">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Criar Conta</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<SignInForm />
					</TabsContent>
					<TabsContent value="register">
						<SignUpForm />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
