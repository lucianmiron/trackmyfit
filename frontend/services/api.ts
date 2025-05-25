// Base API service - simplified for single backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
  endpoint: string,
  options: FetchOptions = {}
) {
  const url = `${BASE_URL}/api/${endpoint}`;
  const { skipAuth, ...fetchOptions } = options;

  const defaultOptions: RequestInit = {
    credentials: 'include',
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

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
}

// Auth API calls
export const auth = {
  async login(email: string, password: string) {
    return fetchFromAPI('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
  },

  async register(email: string, password: string) {
    return fetchFromAPI('auth/users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
  },

  async logout() {
    await fetchFromAPI('auth/logout', {
      method: 'POST',
    });
    return null;
  },

  async getCurrentUser() {
    return fetchFromAPI('auth/users', {
      method: 'GET',
    }).catch(() => null);
  },
};

// Activities API calls
export const activities = {
  async getAll() {
    return fetchFromAPI('activities');
  },

  async getById(id: string | number) {
    return fetchFromAPI(`activities/${id}`);
  },

  async create(activity: any) {
    return fetchFromAPI('activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  },

  async getPerformanceData(params: PerformanceCalculationParams = {}) {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, value.toString());
      }
    });

    const queryString = urlParams.toString();
    const endpoint = queryString ? `activities/performance?${queryString}` : 'activities/performance';
    
    return fetchFromAPI(endpoint);
  },
};

export { activities as performance };