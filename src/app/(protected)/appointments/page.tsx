import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import {
	PageActions,
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeaderContent,
	PageTitle,
} from "@/components/shared/page-container";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import AddAppointmentButton from "./_components/add-appointment-button";
import { appointmentsTableColumns } from "./_components/table-columns";

export default async function AppointmentsPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/authentication");
	if (!session.clinic) redirect("/clinic-form");
	const [patients, doctors, appointments] = await Promise.all([
		db.query.patientsTable.findMany({
			where: eq(patientsTable.clinicId, session.clinic.id),
		}),
		db.query.doctorsTable.findMany({
			where: eq(doctorsTable.clinicId, session.clinic.id),
		}),
		db.query.appointmentsTable.findMany({
			where: eq(appointmentsTable.clinicId, session.clinic.id),
			with: {
				patient: true,
				doctor: true,
			},
		}),
	]);

	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Agendamentos</PageTitle>
					<PageDescription>Esta é a página de agendamentos.</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<AddAppointmentButton patients={patients} doctors={doctors} />
				</PageActions>
			</PageHeader>
			<PageContent>
				<PageContent>
					<DataTable data={appointments} columns={appointmentsTableColumns} />
				</PageContent>
			</PageContent>
		</PageContainer>
	);
}
