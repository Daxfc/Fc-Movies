'use client';

import { useState, useEffect } from 'react';
import SideBar from '@/components/SideBar';
import MovieCard from '@/components/MovieCard';
import { getWatchlist } from '@/lib/watchlist';
import Link from 'next/link';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
    const handleUpdate = () => setWatchlist(getWatchlist());
    window.addEventListener('watchlist_updated', handleUpdate);
    return () => window.removeEventListener('watchlist_updated', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <SideBar />
        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-6">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight border-l-4 border-red-600 pl-3">
            My Watchlist
          </h1>

          {watchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <p className="text-slate-400 text-sm">Your watchlist is currently empty.</p>
              <Link href="/" className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-red-600/20">
                Explore Movies
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {watchlist.map((movie) => (
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