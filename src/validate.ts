import { sendRequest } from "./common";

type Status = "valid" | "invalid" | "suspicious" | "unknown";

type Cause =
	| "no_mx_record"
	| "syntax_error"
	| "possible_typo"
	| "mailbox_not_found"
	| "global_suppression"
	| "disposable"
	| "role"
	| "abuse"
	| "spamtrap"
	| "smtp_connection_failed";

type EmailValidateRequestParams = {
	email: string;
};

type EmailValidateResponseData = {
	status: "success";
	email: string;
	result: Status;
	cause: Cause;
	validity: number;
	local_part: string;
	domain: string;
	mx_found: boolean;
	mx_record: number;
	did_you_mean: string;
	processed_at: string;
};

export async function validate(
	baseUrl: string,
	key: string,
	params: EmailValidateRequestParams,
): Promise<EmailValidateResponseData> {
	return sendRequest<EmailValidateResponseData>(
		baseUrl,
		"/email-validation/single.json",
		key,
		params,
	);
}