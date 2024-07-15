type ErrorResponseData = {
	status: "error";
	message: string;
	code: number;
};

class ApiError extends Error {
	public code: number;

	constructor(data: ErrorResponseData) {
		super(data.message);
		this.code = data.code;
		this.name = "API Error";
	}
}

export async function sendRequest<T>(
	baseUrl: string,
	path: string,
	key: string,
	params: unknown,
): Promise<T> {
	const response = await fetch(`${baseUrl}${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			"X-API-KEY": key,
		},
		body: JSON.stringify(params),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new ApiError(data);
	}

	return data;
}
