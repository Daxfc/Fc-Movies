const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  if (API_KEY) {
    url.searchParams.append('api_key', API_KEY);
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), { cache: 'force-cache' });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`TMDB ${res.status}: ${errorBody} | Key loaded: ${Boolean(API_KEY)}`);
  }

  return res.json();
}

export function getImageUrl(path: string | null, size: string = 'w500') {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}