import {
	Activity,
	Baby,
	Bone,
	Brain,
	Eye,
	Hand,
	Heart,
	Hospital,
	Stethoscope,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TopSpecialtiesProps {
	topSpecialties: {
		specialty: string;
		appointments: number;
	}[];
}

const getSpecialtyIcon = (specialty: string) => {
	const specialtyLower = specialty.toLowerCase();

	if (specialtyLower.includes("cardiolog")) return Heart;
	if (
		specialtyLower.includes("ginecolog") ||
		specialtyLower.includes("obstetri")
	)
		return Baby;
	if (specialtyLower.includes("pediatr")) return Activity;
	if (specialtyLower.includes("dermatolog")) return Hand;
	if (
		specialtyLower.includes("ortoped") ||
		specialtyLower.includes("traumatolog")
	)
		return Bone;
	if (specialtyLower.includes("oftalmolog")) return Eye;
	if (specialtyLower.includes("neurolog")) return Brain;

	return Stethoscope;
};

export default function TopSpecialties({
	topSpecialties,
}: TopSpecialtiesProps) {
	const maxAppointments = Math.max(
		...topSpecialties.map((i) => i.appointments),
	);
	return (
		<Card className="mx-auto w-full">
			<CardContent>
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center gap-3">
						<Hospital className="text-muted-foreground" />
						<CardTitle className="text-base">Especialidades</CardTitle>
					</div>
				</div>

				{/* specialtys List */}
				<div className="space-y-6">
					{topSpecialties.map((specialty) => {
						const Icon = getSpecialtyIcon(specialty.specialty);
						// Porcentagem de ocupação da especialidade baseando-se no maior número de agendamentos
						const progressValue =
							(specialty.appointments / maxAppointments) * 100;

						return (
							<div
								key={specialty.specialty}
								className="flex items-center gap-2"
							>
								<div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
									<Icon className="w-5 h-5 text-primary" />
								</div>
								<div className="flex flex-col justify-center w-full">
									<div className="flex justify-between w-full">
										<h3 className="text-sm">{specialty.specialty}</h3>
										<div className="text-right">
											<span className="font-medium text-muted-foreground text-sm">
												{specialty.appointments} agend.
											</span>
										</div>
									</div>
									<Progress value={progressValue} className="w-full" />
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
