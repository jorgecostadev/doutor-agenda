import { createAuthClient } from "better-auth/react";
import toastError from "@/components/shared/toast-message";

export const authClient = createAuthClient({
	/** Se estiver utilizando uma API separada, é necessário informar a URL dela abaixo */
	// baseURL: "http://localhost:3000",
});

type ErrorTypes = Partial<
	Record<
		keyof typeof authClient.$ERROR_CODES,
		{
			pt: string;
		}
	>
>;

const errorCodes = {
	USER_ALREADY_EXISTS: {
		pt: "Usuario já cadastrado",
	},
	INVALID_EMAIL_OR_PASSWORD: {
		pt: "E-mail ou senha inválidos",
	},
} satisfies ErrorTypes;

const getErrorMessage = (code: string, lang: "pt") => {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes][lang];
	}
	return "";
};

interface SignInWithEmailAndPasswordParams {
	email: string;
	password: string;
	onSuccess?: () => void;
}

export const signInWithEmailAndPassword = async (
	params: SignInWithEmailAndPasswordParams,
) => {
	const { email, password, onSuccess } = params;
	await authClient.signIn.email(
		{ email: email, password: password },
		{
			onSuccess: onSuccess,
			onError: ({ error }) => {
				toastError({
					title: "Atenção",
					message: getErrorMessage(error.code, "pt"),
				});
			},
		},
	);
};

interface SignUpWithEmailAndPasswordParams {
	name: string;
	email: string;
	password: string;
	onSuccess?: () => void;
}

export const signUpWithEmailAndPassword = async (
	params: SignUpWithEmailAndPasswordParams,
) => {
	const { name, email, password, onSuccess } = params;
	await authClient.signUp.email(
		{
			name: params.name,
			email: params.email,
			password: params.password,
		},
		{
			onSuccess: onSuccess,
			onError: ({ error }) => {
				toastError({
					title: "Atenção",
					message: getErrorMessage(error.code, "pt"),
				});
				console.error("Erro ao criar conta:", error);
			},
		},
	);
};
