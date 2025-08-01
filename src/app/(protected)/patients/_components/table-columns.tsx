"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { patientsTable } from "@/db/schema";
import DeletePatientTableButton from "./delete-patient-table-button";
import EditPatientTableButton from "./edit-patient-table-button";

type Patient = typeof patientsTable.$inferSelect;

export const patientsTableColumns: ColumnDef<Patient>[] = [
	{
		id: "actions",
		cell: (params) => (
			<div className="flex items-center gap-1">
				<EditPatientTableButton patient={params.row.original} />
				<DeletePatientTableButton patient={params.row.original} />
			</div>
		),
	},
	{
		id: "name",
		accessorKey: "name",
		header: "Nome",
	},
	{
		id: "email",
		accessorKey: "email",
		header: "E-mail",
	},
	{
		id: "phoneNumber",
		accessorKey: "phoneNumber",
		header: "Telefone",
		cell: (params) => {
			const patient = params.row.original;
			const phoneNumber = patient.phoneNumber;
			if (!phoneNumber) return "";
			const formatted = phoneNumber.replace(
				/(\d{2})(\d{5})(\d{4})/,
				"($1) $2-$3",
			);
			return formatted;
		},
	},
	{
		id: "sex",
		accessorKey: "sex",
		header: "Sexo",
		cell: (params) => {
			const patient = params.row.original;
			return patient.sex === "male" ? "Masculino" : "Feminino";
		},
	},
];
