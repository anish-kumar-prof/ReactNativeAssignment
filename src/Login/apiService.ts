import { getTokens } from "./authService";

export async function apiService(endpoint: string, options = {}) {
  const tokens = await getTokens();

  const headers = {
    ...(options.headers || {}),
    Authorization: tokens?.accessToken ? `Bearer ${tokens.accessToken}` : "",
  };

  return fetch(`https://your-api.com/${endpoint}`, {
    ...options,
    headers,
  });
}
