import { describe, mock, it, expect } from "bun:test";
import { Unisender } from "../src/main";

describe("Unisender", () => {
	const baseUrl = "http://example.com";
	const apiKey = "key";

	const mockedSend = mock();
	const mockedSubscribe = mock();
	const mockedValidate = mock();

	const unisender = new Unisender(
		baseUrl,
		apiKey,
		mockedSend,
		mockedSubscribe,
		mockedValidate,
	);

	it("should send email", async () => {
		const params = {
			message: {
				from_email: "test@example.com",
				subject: "test",
				recipients: [{
					email: "recipient@example.com",
				}],
				body: {
					plaintext: "test",
				}
			}
		};

		await unisender.send(params);

		expect(mockedSend).toBeCalledTimes(1);
		expect(mockedSend).toBeCalledWith(baseUrl, apiKey, params);
	});

	it("should subscribe email", async () => {
		const params = {
			from_email: "test@example.com",
			from_name: "Test",
			to_email: "recipient@example.com"
		};

		await unisender.subscribe(params);

		expect(mockedSubscribe).toBeCalledTimes(1);
		expect(mockedSubscribe).toBeCalledWith(baseUrl, apiKey, params);
	});

	it("should validate email", async () => {
		const params = {
			email: "recipient@example.com",
		};

		await unisender.validate(params);

		expect(mockedValidate).toBeCalledTimes(1);
		expect(mockedValidate).toBeCalledWith(baseUrl, apiKey, params);
	})
});
