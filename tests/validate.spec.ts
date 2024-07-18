import { describe, mock, it, expect } from "bun:test";
import { validate } from "../src/validate";

describe("validate", () => {
    it("should send request", async () => {
        const mockedSendRequest = mock();
        const baseUrl = "http://example.com";
        const key = "key";

        const params = {
			email: "recipient@example.com"
		}

        await validate(baseUrl, key, params, mockedSendRequest);

        expect(mockedSendRequest).toBeCalledTimes(1);
        expect(mockedSendRequest).toBeCalledWith(baseUrl, "/email-validation/single.json", key, params);
    });
});