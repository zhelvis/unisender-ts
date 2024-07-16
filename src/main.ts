import {
	send,
	type EmailSendRequestParams,
	type EmailSendResponseData,
} from "./send";
import {
	subscribe,
	type EmailSubscribeRequestParams,
	type EmailSubscribeResponseData,
} from "./subscribe";
import {
	validate,
	type EmailValidateRequestParams,
	type EmailValidateResponseData,
} from "./validate";

export class Unisender {
	constructor(
		private baseUrl: string,
		private apiKey: string,
        private api = {
            send,
            subscribe,
            validate,
        },
	) {}

	public async send(
		params: EmailSendRequestParams,
	): Promise<EmailSendResponseData> {
		return this.api.send(this.baseUrl, this.apiKey, params);
	}

	public async subscribe(
		params: EmailSubscribeRequestParams,
	): Promise<EmailSubscribeResponseData> {
		return this.api.subscribe(this.baseUrl, this.apiKey, params);
	}

	public async validate(
		params: EmailValidateRequestParams,
	): Promise<EmailValidateResponseData> {
		return this.api.validate(this.baseUrl, this.apiKey, params);
	}
}
