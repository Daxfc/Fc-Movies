import MovieCard from '@/components/MovieCard';
import Sidebar from '@/components/SideBar';
import SearchBar from '@/components/SearchBar';
import { fetchTMDB, getImageUrl } from '@/lib/tmdb';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const [
    trendingData, 
    actionData, 
    dramaData, 
    animeData
  ] = await Promise.all([
    fetchTMDB('/trending/movie/day'),
    fetchTMDB('/discover/movie', { with_genres: '28' }),
    fetchTMDB('/discover/movie', { with_genres: '18' }),
    fetchTMDB('/discover/movie', { with_genres: '16', with_original_language: 'ja' })
  ]);

  const trendingMovies = trendingData.results || [];
  const heroMovie = trendingMovies[0];
  const actionMovies = actionData.results || [];
  const dramaMovies = dramaData.results || [];
  const animeMovies = animeData.results || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      {heroMovie && (
        <div className="relative w-full h-[65vh] md:h-[70vh] overflow-hidden pt-14">
          <Image 
            src={getImageUrl(heroMovie.backdrop_path, 'original')}
            alt={heroMovie.title}
            fill
            priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute top-16 left-4 right-4 z-20 block sm:hidden">
            <SearchBar />
          </div>

          <div className="absolute bottom-10 left-4 md:left-12 max-w-2xl flex flex-col gap-3 z-10">
            <span className="px-3 py-1 bg-red-600/30 border border-red-600/50 rounded-full text-xs font-semibold text-red-400 w-fit backdrop-blur-md">
              Trending #1 Today
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              {heroMovie.title}
            </h1>
            <p className="text-sm md:text-base text-slate-300 line-clamp-3">
              {heroMovie.overview}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Link href={`/movies/${heroMovie.id}`} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/20 text-sm">
                Watch Details
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-10 overflow-hidden">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight text-white border-l-4 border-red-600 pl-3">
              Trending Now
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {trendingMovies.slice(1, 15).map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight text-white border-l-4 border-red-600 pl-3">
              Action Movies
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {actionMovies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight text-white border-l-4 border-red-600 pl-3">
              Anime
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {animeMovies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight text-white border-l-4 border-red-600 pl-3">
              Drama
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {dramaMovies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>

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