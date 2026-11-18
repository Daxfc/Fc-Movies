'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/tmdb';

export default function MovieCard({ movie }: { movie: any }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('fc_favorites') || '[]');
    setIsFavorite(storedFavorites.some((item: any) => item.id === movie.id));

    const storedWatchlist = JSON.parse(localStorage.getItem('fc_watchlist') || '[]');
    setIsWatchlist(storedWatchlist.some((item: any) => item.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const stored = JSON.parse(localStorage.getItem('fc_favorites') || '[]');
    const exists = stored.some((item: any) => item.id === movie.id);

    const updated = exists
      ? stored.filter((item: any) => item.id !== movie.id)
      : [...stored, movie];

    localStorage.setItem('fc_favorites', JSON.stringify(updated));
    setIsFavorite(!exists);
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const stored = JSON.parse(localStorage.getItem('fc_watchlist') || '[]');
    const exists = stored.some((item: any) => item.id === movie.id);

    const updated = exists
      ? stored.filter((item: any) => item.id !== movie.id)
      : [...stored, movie];

    localStorage.setItem('fc_watchlist', JSON.stringify(updated));
    setIsWatchlist(!exists);
    window.dispatchEvent(new Event('watchlistUpdated'));
  };

  return (
    <div className="group relative flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-red-600/50 transition-all duration-300 shadow-lg w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] flex-shrink-0">
      <div className="relative w-full h-[240px] sm:h-[280px] md:h-[330px] lg:h-[360px] overflow-hidden bg-slate-950 flex-shrink-0">
        <Link href={`/movies/${movie.id}`} className="absolute inset-0 z-0">
          <Image 
            src={getImageUrl(movie.poster_path, 'w500')} 
            alt={movie.title || movie.name}
            fill
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 220px, 240px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

      
        <div className="absolute top-2 left-2 z-10 hidden md:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
         
          <button
            type="button"
            onClick={toggleFavorite}
            aria-label="Toggle Favorite"
            className={`flex items-center justify-center w-8 h-8 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 hover:bg-slate-900 transition-all duration-200 ${
              isFavorite ? 'text-red-500 border-red-500/40' : 'text-slate-300 hover:text-red-400'
            }`}
          >
            <svg
              className="w-4 h-4 transition-transform active:scale-125"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

         
          <button
            type="button"
            onClick={toggleWatchlist}
            aria-label="Toggle Watchlist"
            className={`flex items-center justify-center w-8 h-8 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 hover:bg-slate-900 transition-all duration-200 ${
              isWatchlist ? 'text-blue-400 border-blue-500/40' : 'text-slate-300 hover:text-blue-400'
            }`}
          >
            <svg
              className="w-4 h-4 transition-transform active:scale-125"
              fill={isWatchlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        <div className="absolute top-2 right-2 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2 py-1 rounded-lg text-xs font-bold text-amber-400 flex items-center gap-1 shadow">
          ★ {rating}
        </div>
      </div>

      <Link href={`/movies/${movie.id}`} className="p-3 flex flex-col justify-between flex-grow">
        <h3 className="font-semibold text-sm text-slate-100 line-clamp-1 group-hover:text-red-500 transition-colors">
          {movie.title || movie.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {movie.release_date ? movie.release_date.split('-')[0] : 'TBA'}
        </p>
      </Link>
    </div>
  );
}