import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import SignOutButton from "./components/sign-out-button";

export default async function DashboardPage() {
	// TODO: move user session to a separete function
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/authentication");

	const clinics = await db.query.usersToClinicsTable.findMany({
		where: eq(usersToClinicsTable.userId, session.user.id),
	});
	if (clinics.length === 0) redirect("/clinic-form");

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
