"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
	const router = useRouter();
	const handleSignOut = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/authentication");
				},
			},
		});
	};

	return (
		<Button variant="outline" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
}
