import { describe, mock, afterEach, it, expect } from "bun:test";
import { sendRequest, ApiError } from "../src/common";

describe("sendRequest", () => {
    const baseUrl = "http://example.com";
    const key = "key";
    const path = "/test";
    const params = { test: "test" };

    const mockedFetch = mock();

    afterEach(() => {
        mockedFetch.mockClear();
    });

    it("should return response body", async () => {
        mockedFetch.mockResolvedValueOnce({
            json: () => { },
            ok: true,
        });

        await sendRequest(baseUrl, path, key, params, mockedFetch);

        expect(mockedFetch).toBeCalledTimes(1);
        expect(mockedFetch).toBeCalledWith(`${baseUrl}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-KEY": key,
            },
            body: JSON.stringify(params),
        });
    });

    it("should throw API error", async () => {
        mockedFetch.mockResolvedValueOnce({
            json: () => ({
                status: "error",
                message: "test",
                code: 400,
            }),
            ok: false,
        });

        expect(
            sendRequest(baseUrl, path, key, params, mockedFetch),
        ).rejects.toBeInstanceOf(ApiError);
    });

    it("should throw unexpected API error", async () => {
        mockedFetch.mockResolvedValueOnce({
            json: () => ({
                data: 'unexpected',
            }),
            ok: false,
        });

        expect(
            sendRequest(baseUrl, path, key, params, mockedFetch),
        ).rejects.toBeInstanceOf(Error);
    })
});