import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
	PageActions,
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeaderContent,
	PageTitle,
} from "@/components/shared/page-container";
import { auth } from "@/lib/auth";
import AddDoctorButton from "./_components/add-doctor-button";

export default async function DoctorsPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/authentication");
	if (!session.clinic) redirect("/clinic-form");

	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Médicos</PageTitle>
					<PageDescription>Gerencie os médicos da sua clínica.</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<AddDoctorButton />
				</PageActions>
			</PageHeader>
			<PageContent>Médicos</PageContent>
		</PageContainer>
	);
}
