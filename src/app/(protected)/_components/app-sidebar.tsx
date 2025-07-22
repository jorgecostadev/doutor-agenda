"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import {
	CalendarDays,
	LayoutDashboard,
	LogOut,
	Stethoscope,
	UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Agendamentos",
		url: "/appointments",
		icon: CalendarDays,
	},
	{
		title: "Médicos",
		url: "/doctors",
		icon: Stethoscope,
	},
	{
		title: "Pacientes",
		url: "/patients",
		icon: UsersRound,
	},
];

export function AppSidebar() {
	const session = authClient.useSession();
	const router = useRouter();
	const handleSignout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/authentication");
				},
			},
		});
	};

	return (
		<Sidebar>
			<SidebarHeader className="p-4 border-b">
				<Image src="/logo.svg" alt="Logo" width={136} height={28} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton size="lg">
									<Avatar className="justify-center items-center bg-blue-200">
										<AvatarFallback>JC</AvatarFallback>
									</Avatar>
									<div className="m-2">
										<p className="text-sm">{session.data?.clinic.name}</p>
										<p className="text-muted-foreground text-sm">
											{session.data?.user.email}
										</p>
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={handleSignout}>
									<LogOut />
									Sair
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
