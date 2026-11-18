import SideBar from '@/components/SideBar';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { fetchTMDB } from '@/lib/tmdb';
import Link from 'next/link';

export const instant = false;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  let movies: any[] = [];

  if (query) {
    try {
      const data = await fetchTMDB('/search/movie', { query });
      movies = data?.results || [];
    } catch {
      movies = [];
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <SideBar />
        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-8">
          <div className="block sm:hidden">
            <SearchBar />
          </div>

          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight border-l-4 border-red-600 pl-3">
              {query ? `Search Results for "${query}"` : 'Search Movies'}
            </h1>
            <Link
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              &larr; Back Home
            </Link>
          </div>

          {!query ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <p className="text-slate-400 text-sm">
                Type a movie title in the search bar to see results.
              </p>
            </div>
          ) : movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <p className="text-slate-400 text-sm">
                No movies found matching &ldquo;{query}&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full justify-items-center">
              {movies.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-slate-900 bg-slate-950/80 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span className="font-black text-lg bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
            FC MOVIES
          </span>
          <p>&copy; 2026 FC MOVIES. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}