import { API_KEY, API_URL } from "@env";
import axios from "axios";
import { Http } from "../interfaces/http";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "x-api-key": API_KEY,
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
};

const instance = axios.create({
    baseURL: API_URL,
    timeout: 5_000,
    headers,
});

// Response interceptor for API calls
instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        throw error;
    }
);

/**
 * Axios instance for main requests.
 */
export const axiosInstance: Http = {
    get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
        const response = await instance.get(path, {
            ...config,
            params: params,
            headers,
        });
        return response.data as T;
    },
    post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
        const response = await instance.post(
            path,
            { ...params },
            { ...config, headers }
        );
        return response.data as T;
    },
    put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
        const response = await instance.put(path, params, {
            ...config,
            headers: {
                ...headers,
                ...config?.headers,
            },
        });
        return response.data as T;
    },
    patch: async <T>(
        path: string,
        params?: Record<string, any>,
        config?: any
    ) => {
        const response = await instance.patch(path, params, {
            ...config,
            headers: {
                ...headers,
                ...config?.headers,
            },
        });
        return response.data as T;
    },
    delete: async <T>(path: string, params?: any, config?: any) => {
        const response = await instance.delete(path, {
            ...config,
            params: params,
            headers,
        });
        return response.data as T;
    },
};

/**
 * Update the main instance token.
 * @param newToken New token to update the main instance.
 */
export async function updateAxiosInstanceToken(newToken: string) {
    if (!newToken) {
        return;
    }
    instance.defaults.headers.common["authorization"] = `Bearer ${newToken}`;
}
