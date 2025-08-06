import {
	CalendarIcon,
	DollarSignIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyInCents } from "@/helpers/currency";

interface StatsCardsProps {
	totalRevenue: number | null;
	totalAppointments: number;
	totalPatients: number;
	totalDoctors: number;
}

const StatsCards = ({
	totalRevenue,
	totalAppointments,
	totalPatients,
	totalDoctors,
}: StatsCardsProps) => {
	const stats = [
		{
			title: "Faturamento",
			value: totalRevenue ? formatCurrencyInCents(totalRevenue) : "R$ 0,00",
			icon: DollarSignIcon,
		},
		{
			title: "Agendamentos",
			value: totalAppointments.toString(),
			icon: CalendarIcon,
		},
		{
			title: "Pacientes",
			value: totalPatients.toString(),
			icon: UserIcon,
		},
		{
			title: "Médicos",
			value: totalDoctors.toString(),
			icon: UsersIcon,
		},
	];

	return (
		<div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => {
				const Icon = stat.icon;
				return (
					<Card key={stat.title} className="gap-2">
						<CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
							<div className="flex justify-center items-center bg-primary/10 rounded-full w-8 h-8">
								<Icon className="w-4 h-4 text-primary" />
							</div>
							<CardTitle className="font-medium text-muted-foreground text-sm">
								{stat.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">{stat.value}</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};

export default StatsCards;
