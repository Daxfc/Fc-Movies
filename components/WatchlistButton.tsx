'use client';

import { useState, useEffect } from 'react';
import { getWatchlist, toggleWatchlist, isInWatchlist } from '@/lib/watchlist';

export default function WatchlistButton({ movie }: { movie: any }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWatchlist(movie.id));
    const handleUpdate = () => setSaved(isInWatchlist(movie.id));
    window.addEventListener('watchlist_updated', handleUpdate);
    return () => window.removeEventListener('watchlist_updated', handleUpdate);
  }, [movie.id]);

  const handleClick = () => {
    const isNowSaved = toggleWatchlist(movie);
    setSaved(isNowSaved);
  };

  return (
    <button 
      onClick={handleClick}
      className={`w-full sm:w-auto px-5 py-2.5 border font-semibold rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer ${
        saved 
          ? 'bg-red-600 border-red-500 text-white shadow-red-600/30' 
          : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-white'
      }`}
    >
      <svg className={`w-4 h-4 ${saved ? 'text-white fill-current' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {saved ? 'In Watchlist' : 'Add to Watchlist'}
    </button>
  );
}