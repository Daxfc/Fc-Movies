'use client';

import { useState } from 'react';
import MovieCard from '@/components/MovieCard';

export default function LoadMoreGrid({ movies }: { movies: any[] }) {
  const [visibleCount, setVisibleCount] = useState(10);

  const displayedMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  return (
    <div className="flex flex-col gap-6 w-full">
     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className={`w-full ${index >= visibleCount ? 'hidden lg:block' : 'block'}`}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

     
      {hasMore && (
        <div className="flex justify-center mt-2 lg:hidden">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-red-600 border border-slate-800 hover:border-red-500 text-slate-200 hover:text-white font-semibold rounded-xl text-sm transition-all shadow-lg cursor-pointer group"
          >
            <span>View More</span>
            <svg className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}