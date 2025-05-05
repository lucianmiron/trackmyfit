// Base API service for communicating with the NestJS backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function fetchFromAPI(
  endpoint: string,
  options: FetchOptions = {}
) {
  const url = `${API_URL}/${endpoint}`;
  const { skipAuth, ...fetchOptions } = options;

  // Default options for all requests
  const defaultOptions: RequestInit = {
    credentials: 'include', // This is important for cookie handling
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...fetchOptions,
    headers: {
      ...defaultOptions.headers,
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }

  // For endpoints that don't return JSON (like logout)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
}

// Auth specific API calls
export const auth = {
  async login(email: string, password: string) {
    return fetchFromAPI('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
  },

  async register(email: string, password: string) {
    return fetchFromAPI('auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
  },

  async logout() {
    return fetchFromAPI('auth/logout', {
      method: 'POST',
    });
  },

  async getCurrentUser() {
    return fetchFromAPI('auth/me', {
      method: 'GET',
    }).catch(() => null); // Silently fail if not authenticated
  },
};
