import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	/** Se estiver utilizando uma API separada, é necessário informar a URL dela abaixo */
	// baseURL: "http://localhost:3000",
});
