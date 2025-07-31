import { eq } from "drizzle-orm";
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
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import AddPatientButton from "./_components/add-patient-button";

export default async function PatientsPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/authentication");
	if (!session.clinic) redirect("/clinic-form");
	const patients = await db.query.patientsTable.findMany({
		where: eq(patientsTable.clinicId, session.clinic.id),
	});

	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Pacientes</PageTitle>
					<PageDescription>
						Gerencie os pacientes da sua clínica.
					</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<AddPatientButton />
				</PageActions>
			</PageHeader>
			<PageContent>
				<div className="gap-6 grid grid-cols-3">
					{patients.map((patient) => (
						<>
							<p key={patient.id}>{patient.name}</p>
							{/* <PatientCard key={patient.id} patient={patient} /> */}
						</>
					))}
				</div>
			</PageContent>
		</PageContainer>
	);
}
