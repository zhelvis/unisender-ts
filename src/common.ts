type ErrorResponseData = {
	status: "error";
	message: string;
	code: number;
};

export class ApiError extends Error {
	public code: number;

	constructor(data: ErrorResponseData) {
		super(data.message);
		this.code = data.code;
		this.name = "API Error";
	}

	public static isErrorResponseData(data: unknown): data is ErrorResponseData {
		return typeof data === 'object'
			&& data !== null
			&& 'status' in data
			&& 'message' in data
			&& 'code' in data
			&& data.status === 'error'
			&& typeof data.message === 'string'
			&& typeof data.code === 'number';
	}
}

export async function sendRequest<T>(
	baseUrl: string,
	path: string,
	key: string,
	params: unknown,
	fetchImpl = fetch,
): Promise<T> {
	const response = await fetchImpl(`${baseUrl}${path}`, {
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
		if (ApiError.isErrorResponseData(data)) {
			throw new ApiError(data);
		}

		throw new Error('Unexpected API error');	
	}

	return data;
}
