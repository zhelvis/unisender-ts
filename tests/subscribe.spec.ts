import { describe, mock, it, expect } from "bun:test";
import { subscribe } from "../src/subscribe";

describe("subscribe", () => {
    it("should send request", async () => {
        const mockedSendRequest = mock();
        const baseUrl = "http://example.com";
        const key = "key";

        const params = {
			from_email: "test@example.com",
			from_name: "Test",
			to_email: "recipient@example.com"
		}

        await subscribe(baseUrl, key, params, mockedSendRequest);

        expect(mockedSendRequest).toBeCalledTimes(1);
        expect(mockedSendRequest).toBeCalledWith(baseUrl, "/email/subscribe.json", key, params);
    });
});