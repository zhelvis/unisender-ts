import { describe, mock, it, expect } from "bun:test";
import { send } from "../src/send";

describe("EmailSend", () => {
    it("should send request", async () => {
        const mockedSendRequest = mock();
        const baseUrl = "http://example.com";
        const key = "key";

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
		}

        await send(baseUrl, key, params, mockedSendRequest);

        expect(mockedSendRequest).toBeCalledTimes(1);
        expect(mockedSendRequest).toBeCalledWith(baseUrl, "/email/send.json", key, params);
    });
});
