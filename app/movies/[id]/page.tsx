import SideBar from '@/components/SideBar';
import WatchlistButton from '@/components/WatchlistButton';
import FavoriteButton from '@/components/FavoriteButton';
import { fetchTMDB, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

export const instant = false;

export default async function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await fetchTMDB(`/movie/${id}`);

  if (!movie || !movie.title) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <SideBar />
        <p className="text-slate-400">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <SideBar />

        <div className="relative w-full pt-16 px-4 max-w-4xl mx-auto flex flex-col gap-6 pb-20">
          {movie.backdrop_path && (
            <div className="absolute inset-0 h-[45vh] w-full overflow-hidden z-0 opacity-25 pointer-events-none">
              <Image 
                src={getImageUrl(movie.backdrop_path, 'original')}
                alt={movie.title}
                fill
                priority
                className="object-cover blur-md"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center sm:items-start gap-6 pt-4">
            <div className="w-full flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {movie.poster_path && (
                <div className="relative w-48 h-72 sm:w-64 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex-shrink-0">
                  <Image 
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-4 w-full text-center sm:text-left">
                <div className="hidden sm:flex items-center gap-3">
                  <span className="px-3 py-1 bg-red-600/30 border border-red-600/50 rounded-full text-xs font-semibold text-red-400 backdrop-blur-md">
                    ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
                  </span>
                  {movie.release_date && (
                    <span className="text-xs text-slate-400 font-medium">
                      {movie.release_date.split('-')[0]}
                    </span>
                  )}
                  {movie.runtime && (
                    <span className="text-xs text-slate-400 font-medium">
                      {movie.runtime} mins
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {movie.genres?.map((genre: any) => (
                    <Link 
                      key={genre.id} 
                      href={`/genres/${genre.id}`}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500/50 rounded-full text-xs font-semibold text-red-400 transition-all cursor-pointer"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <WatchlistButton movie={movie} />
                  <FavoriteButton movie={movie} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full mt-2">
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:hidden">
                <span className="px-3 py-1 bg-red-600/30 border border-red-600/50 rounded-full text-xs font-semibold text-red-400 backdrop-blur-md">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
                </span>
                {movie.release_date && (
                  <span className="text-xs text-slate-400 font-medium">
                    {movie.release_date.split('-')[0]}
                  </span>
                )}
                {movie.runtime && (
                  <span className="text-xs text-slate-400 font-medium">
                    {movie.runtime} mins
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white text-center sm:text-left">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm italic text-red-400/90 text-center sm:text-left">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              <p className="text-sm md:text-base text-slate-300 leading-relaxed text-center sm:text-left">
                {movie.overview}
              </p>

              <div className="mt-4">
                <a 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' official trailer')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/30 text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Now
                </a>
              </div>
            </div>
          </div>
        </div>
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