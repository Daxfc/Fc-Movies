import SideBar from '@/components/SideBar';
import { fetchTMDB } from '@/lib/tmdb';
import Link from 'next/link';
import LoadMoreGrid from '@/components/LoadMoreGrid';

export const instant = false;

export default async function GenreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const genreNames: Record<string, string> = {
    '28': 'Action',
    '12': 'Adventure',
    '16': 'Anime & Animation',
    '35': 'Comedy',
    '80': 'Crime',
    '99': 'Documentary',
    '18': 'Drama',
    '10751': 'Family',
    '14': 'Fantasy',
    '36': 'History',
    '27': 'Horror',
    '10402': 'Music',
    '9648': 'Mystery',
    '10749': 'Romance',
    '878': 'Science Fiction',
    '53': 'Thriller',
    '10752': 'War',
    '37': 'Western',
  };

  const genreName = genreNames[id] || 'Category';

  const data = await fetchTMDB('/discover/movie', {
    with_genres: id,
    sort_by: 'popularity.desc',
  });

  const movies = data.results || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <SideBar />
        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight border-l-4 border-red-600 pl-3">
              {genreName} Movies
            </h1>
            <Link href="/genres" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
              &larr; Back to Categories
            </Link>
          </div>

          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <p className="text-slate-400 text-sm">No movies found for this category.</p>
            </div>
          ) : (
            <LoadMoreGrid movies={movies} />
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