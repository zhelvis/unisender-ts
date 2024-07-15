import { sendRequest } from "./common";

type EmailSubscribeRequestParams = {
	from_email: string;
	from_name: string;
	to_email: string;
};

type EmailSubscribeResponseData = {
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
