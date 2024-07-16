import { sendRequest } from "./common";

export type EmailSubscribeRequestParams = {
	from_email: string;
	from_name: string;
	to_email: string;
};

export type EmailSubscribeResponseData = {
	status: "success";
};

export async function subscribe(
	baseUrl: string,
	key: string,
	params: EmailSubscribeRequestParams,
): Promise<EmailSubscribeResponseData> {
	return sendRequest<EmailSubscribeResponseData>(
		baseUrl,
		"/email/subscribe.json",
		key,
		params,
	);
}
