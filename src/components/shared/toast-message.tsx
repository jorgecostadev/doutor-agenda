import type { ReactNode } from "react";
import { toast } from "sonner";

interface ToastMessageProps {
	title: string;
	message: string;
}

export default function toastError({ title, message }: ToastMessageProps) {
	toast.error(`${title}\n${message}`, {
		style: { whiteSpace: "pre-line" },
	});
}
