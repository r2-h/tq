const BASE_URL = "https://rickandmortyapi.com/api";

class ApiError extends Error {
  constructor(public response: Response) {
    super("ApiError" + response.status);
  }
}

export const rickmortyApiInstance = async <T>(
  url: string,
  init?: RequestInit,
) => {
  try {
    const result = await fetch(`${BASE_URL}${url}`, { ...init });

    if (!result.ok) {
      throw new ApiError(result);
    }

    const data = (await result.json()) as Promise<T>;

    return data;
  } catch (e) {
    console.log(e);
  }
};
