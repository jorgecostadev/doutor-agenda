import dayjs from "dayjs";
import { Calendar } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard } from "@/data/get-dashboards";
import { auth } from "@/lib/auth";
import { appointmentsTableColumns } from "../appointments/_components/table-columns";
import AppointmentsChart from "./_components/appointment-chart";
import { DatePicker } from "./_components/date-picker";
import StatsCards from "./_components/stats-chart";
import TopDoctors from "./_components/top-doctor";
import TopSpecialties from "./_components/top-specialties";

interface DashboardPageProps {
	searchParams: Promise<{
		from: string;
		to: string;
	}>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const { from, to } = await searchParams;
	if (!from || !to) {
		redirect(
			`/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
		);
	}
	const {
		totalRevenue,
		totalAppointments,
		totalPatients,
		totalDoctors,
		topDoctors,
		topSpecialties,
		todayAppointments,
		dailyAppointmentsData,
	} = await getDashboard({
		from,
		to,
		session: {
			user: {
				clinic: {
					id: session!.clinic!.id,
				},
			},
		},
	});

	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Dashboard</PageTitle>
					<PageDescription>
						Tenha uma visão geral da sua clínica.
					</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<DatePicker />
				</PageActions>
			</PageHeader>
			<PageContent>
				<StatsCards
					totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : null}
					totalAppointments={totalAppointments.total}
					totalPatients={totalPatients.total}
					totalDoctors={totalDoctors.total}
				/>
				<div className="gap-4 grid grid-cols-[2.25fr_1fr]">
					<AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
					<TopDoctors doctors={topDoctors} />
				</div>
				<div className="gap-4 grid grid-cols-[2.25fr_1fr]">
					<Card>
						<CardHeader>
							<div className="flex items-center gap-3">
								<Calendar className="text-muted-foreground" />
								<CardTitle className="text-base">
									Agendamentos de hoje
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<DataTable
								columns={appointmentsTableColumns}
								data={todayAppointments}
							/>
						</CardContent>
					</Card>
					<TopSpecialties topSpecialties={topSpecialties} />
				</div>
			</PageContent>
		</PageContainer>
	);
};

export default DashboardPage;
