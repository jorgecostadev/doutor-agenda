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
import { DatePicker } from "./_components/date-picker";

export default async function DashboardPage() {
	// TODO: move user session to a separete function
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/authentication");
	if (!session.clinic) redirect("/clinic-form");

	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Dashboard</PageTitle>
					<PageDescription>Visão geral da sua clínica</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<DatePicker />
				</PageActions>
			</PageHeader>
			<PageContent>
				<p>Bem-vindo ao painel de controle da sua clínica!</p>
			</PageContent>
		</PageContainer>
	);
}
