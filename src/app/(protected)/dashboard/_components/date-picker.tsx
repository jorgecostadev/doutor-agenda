"use client";

import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import type * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const [from, setFrom] = useQueryState(
		"from",
		parseAsIsoDate.withDefault(new Date()),
	);
	const [to, setTo] = useQueryState(
		"to",
		parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
	);
	const handleDateSelect = (dateRange: DateRange | undefined) => {
		if (dateRange?.from) {
			setFrom(dateRange.from, {
				shallow: false,
			});
		}
		if (dateRange?.to) {
			setTo(dateRange.to, {
				shallow: false,
			});
		}
	};
	const date = {
		from,
		to,
	};
	return (
		<div className={cn("gap-2 grid", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"justify-start font-normal text-left",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y", {
										locale: ptBR,
									})}{" "}
									-{" "}
									{format(date.to, "LLL dd, y", {
										locale: ptBR,
									})}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0 w-auto" align="start">
					<Calendar
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={handleDateSelect}
						numberOfMonths={2}
						locale={ptBR}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
