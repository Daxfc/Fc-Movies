'use client';

import { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite, isFavorite } from '@/lib/favorites';

export default function FavoriteButton({ movie }: { movie: any }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(movie.id));
    const handleUpdate = () => setSaved(isFavorite(movie.id));
    window.addEventListener('favorites_updated', handleUpdate);
    return () => window.removeEventListener('favorites_updated', handleUpdate);
  }, [movie.id]);

  const handleClick = () => {
    const isNowSaved = toggleFavorite(movie);
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {saved ? 'In Favorites' : 'Add to Favorites'}
    </button>
  );
}