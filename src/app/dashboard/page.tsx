import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "./components/sign-out-button";

export default async function DashboardPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/authentication");

	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<h1 className="mb-4 font-bold text-2xl">Dashboard</h1>
			<p className="mb-4">
				Welcome to the dashboard,{" "}
				{session?.user ? session?.user?.name : "Guest"}
			</p>
			{session && <SignOutButton />}
		</div>
	);
}
