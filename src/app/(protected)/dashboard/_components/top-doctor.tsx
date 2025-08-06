import { Stethoscope } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface TopDoctorsProps {
	doctors: {
		id: string;
		name: string;
		avatarImageUrl: string | null;
		specialty: string;
		appointments: number;
	}[];
}

export default function TopDoctors({ doctors }: TopDoctorsProps) {
	return (
		<Card className="mx-auto w-full">
			<CardContent>
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center gap-3">
						<Stethoscope className="text-muted-foreground" />
						<CardTitle className="text-base">Médicos</CardTitle>
					</div>
				</div>

				{/* Doctors List */}
				<div className="space-y-6">
					{doctors.map((doctor) => (
						<div key={doctor.id} className="flex justify-between items-center">
							<div className="flex items-center gap-4">
								<Avatar className="w-10 h-10">
									<AvatarFallback className="bg-gray-100 font-medium text-gray-600 text-lg">
										{doctor.name
											.split(" ")
											.map((n) => n[0])
											.join("")
											.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="text-sm">{doctor.name}</h3>
									<p className="text-muted-foreground text-sm">
										{doctor.specialty}
									</p>
								</div>
							</div>
							<div className="text-right">
								<span className="font-medium text-muted-foreground text-sm">
									{doctor.appointments} agend.
								</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
