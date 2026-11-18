import { NextResponse } from 'next/server';
import { fetchTMDB } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await fetchTMDB('/search/movie', { query });
    return NextResponse.json({ results: data?.results || [] });
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}