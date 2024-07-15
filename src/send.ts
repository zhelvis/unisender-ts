import { sendRequest } from "./common";

type EmailSendAttachment = {
	type: string;
	name: string;
	content: string;
};

type Language =
	| "be"
	| "de"
	| "en"
	| "es"
	| "fr"
	| "it"
	| "pl"
	| "pt"
	| "ru"
	| "ua"
	| "kz";

type TemplateEngine = "simple" | "velocity" | "none";

type EmailSendBody = ({ plaintext: string } | { html: string }) & {
	amp?: string;
};

type EmailSendOptions = Partial<{
	send_at: string;
	unsubscribe_url: string;
	custom_backend_id: number;
	smtp_pool_id: string;
}>;

type EmailSendRecipient = {
	email: string;
	substitutions?: Record<string, unknown>;
	metadata?: Record<string, string>;
};

type EmailSendMessage = {
	recipients: EmailSendRecipient[];
	template_id?: string;
	tags?: string[];
	skip_unsubscribe?: number;
	global_language?: Language;
	template_engine?: TemplateEngine;
	global_substitutions?: Record<string, unknown>;
	global_metadata?: Record<string, string>;
	body: EmailSendBody;
	subject: string;
	from_email?: string;
	from_name?: string;
	reply_to?: string;
	reply_to_name?: string;
	track_links?: 0 | 1;
	track_read?: 0 | 1;
	bypass_global?: 0 | 1;
	bypass_unavailable?: 0 | 1;
	bypass_unsubscribed?: 0 | 1;
	bypass_complained?: 0 | 1;
	headers?: Record<string, string>;
	attachments?: EmailSendAttachment[];
	inline_attachments?: EmailSendAttachment[];
	options?: EmailSendOptions;
};

type FailedEmailStatus =
	| "unsubscribed"
	| "invalid"
	| "duplicate"
	| "temporary_unavailable"
	| "permanent_unavailable"
	| "complained"
	| "blocked";

type EmailSendRequestParams = {
	message: EmailSendMessage;
};

type EmailSendResponseData = {
	status: "success";
	job_id: string;
	emails: string[];
	failed_emails: Record<string, FailedEmailStatus>;
};

export async function send(
	baseUrl: string,
	key: string,
	params: EmailSendRequestParams,
): Promise<EmailSendResponseData> {
	return sendRequest<EmailSendResponseData>(
		baseUrl,
		"/email/send.json",
		key,
		params,
	);
}