// Base API service for communicating with the NestJS backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchFromAPI(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = `${API_URL}/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
