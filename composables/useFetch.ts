import { useRuntimeConfig } from "#app";
import accessToken from "~/composables/useCookies";

interface FetchResponse<T> {
  data: {} | null;
  error: {} | null;
  refresh: () => Promise<void>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type CreateRequestOptions<T> = {
  url: string;
  method: HttpMethod;
  errorMessage: string;
  body?: T | null;
};

const createRequest = async <T = any, B = any>({
  url,
  method,
  errorMessage,
  body = null,
}: CreateRequestOptions<B>): Promise<FetchResponse<T>> => {
  const config = useRuntimeConfig();
  const token = accessToken();

  const { data, error, refresh } = await useFetch<T>(url, {
    baseURL: config.public.apiBaseUrl,
    onRequest({ request, options }) {
      options.method = method;
      options.headers = options.headers || new Headers();
      options.headers.set("Accept", "application/json");

      if (body) {
        options.body = body;
      }

      if (token) {
        options.headers.set("Authorization", `Bearer ${token}`);
      }
    },
    onRequestError({ request, options, error }) {
      console.error("Request error:", error);
    },
    onResponseError({ request, response, options }) {
      switch (response.status) {
        case 422:
          console.error("Validation error:", errorMessage);
          break;
        case 500:
          console.error("Server error:", errorMessage);
          break;
        case 404:
          console.error("Not found:", errorMessage);
          break;
        default:
          console.error("Unhandled error:", errorMessage);
      }
    },
  });

  return { data, error, refresh };
};

export const getData = async <T = any>(
  url: string,
  errorMessage = "Something went wrong"
): Promise<FetchResponse<T>> => {
  return createRequest<T>({ url, method: "GET", errorMessage });
};

export const postData = async <T = any, B = any>(
  url: string,
  body: B
): Promise<FetchResponse<T>> => {
  return createRequest<T, B>({
    url,
    method: "POST",
    errorMessage: "Something went wrong",
    body,
  });
};

export const deleteData = async <T = any>(
  url: string
): Promise<FetchResponse<T>> => {
  return createRequest<T>({
    url,
    method: "DELETE",
    errorMessage: "Something went wrong",
  });
};

export const bulkDelete = async <T = any, B = any>(
  url: string,
  body: B
): Promise<FetchResponse<T>> => {
  return createRequest<T, B>({
    url,
    method: "DELETE",
    errorMessage: "Something went wrong",
    body,
  });
};

export const putData = async <T = any, B = any>(
  url: string,
  body: B
): Promise<FetchResponse<T>> => {
  return createRequest<T, B>({
    url,
    method: "PUT",
    errorMessage: "Something went wrong",
    body,
  });
};
