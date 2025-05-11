// Base API service for communicating with the NestJS backend
export const ACTIVITIES_API_URL =
  process.env.NEXT_PUBLIC_API_ACTIVITIES_URL || 'http://localhost:3001';

export const AUTH_API_URL =
  process.env.NEXT_PUBLIC_API_AUTH_URL || 'http://localhost:3002';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

// Performance calculation parameters interface
export interface PerformanceCalculationParams {
  activityName?: string;
  exerciseName?: string;
  volumeWeight?: number;
  durationWeight?: number;
  fatigueWeight?: number;
  fatigueModel?: 'position' | 'time' | 'complex';
}

export async function fetchFromAPI(
  baseUrl: string,
  endpoint: string,
  options: FetchOptions = {}
) {
  const url = `${baseUrl}/${endpoint}`;
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
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    }
    throw new Error((await response.text()) || response.statusText);
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
    return fetchFromAPI(AUTH_API_URL, 'login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
  },

  async register(email: string, password: string) {
    return fetchFromAPI(AUTH_API_URL, 'users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
  },

  async logout() {
    await fetchFromAPI(AUTH_API_URL, 'logout', {
      method: 'POST',
    });
    return null;
  },

  async getCurrentUser() {
    return fetchFromAPI(AUTH_API_URL, 'users', {
      method: 'GET',
    }).catch(() => null); // Silently fail if not authenticated
  },
};

// Performance specific API calls
export const performance = {
  async getPerformanceData(params: PerformanceCalculationParams = {}) {
    let endpoint = 'activities/performance';
    const urlParams = new URLSearchParams();

    // Add all parameters to the URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, value.toString());
      }
    });

    const queryString = urlParams.toString();
    if (queryString) {
      endpoint += `?${queryString}`;
    }
    console.log(`Lucian endpoint is: ${endpoint}`);
    return fetchFromAPI(ACTIVITIES_API_URL, endpoint);
  },
};
