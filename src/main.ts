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
		/** @hidden */
		private sendImpl = send,
		/** @hidden */
		private subscribeImpl = subscribe,
		/** @hidden */
		private validateImpl = validate,
	) {}

	public async send(
		params: EmailSendRequestParams,
	): Promise<EmailSendResponseData> {
		return this.sendImpl(this.baseUrl, this.apiKey, params);
	}

	public async subscribe(
		params: EmailSubscribeRequestParams,
	): Promise<EmailSubscribeResponseData> {
		return this.subscribeImpl(this.baseUrl, this.apiKey, params);
	}

	public async validate(
		params: EmailValidateRequestParams,
	): Promise<EmailValidateResponseData> {
		return this.validateImpl(this.baseUrl, this.apiKey, params);
	}
}
