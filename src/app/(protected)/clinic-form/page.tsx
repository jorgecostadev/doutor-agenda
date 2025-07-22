import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import ClinicForm from "./_components/form";

export default function ClinicFormPage() {
	return (
		<Dialog open>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar Clínica</DialogTitle>
					<DialogDescription>
						Adicione uma clínica para continuar.
					</DialogDescription>
				</DialogHeader>
				<ClinicForm />
			</DialogContent>
		</Dialog>
	);
}
