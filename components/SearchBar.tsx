'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        setResults((data?.results || []).slice(0, 4));
        setIsOpen(true);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search movies..."
          className="w-full bg-slate-950/70 backdrop-blur-md border border-slate-700/60 focus:border-red-600/60 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 outline-none shadow-xl transition-all"
        />
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="flex flex-col divide-y divide-slate-800/70">
            {results.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-2.5 hover:bg-slate-800/80 transition-colors"
              >
                <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">N/A</div>
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-grow">
                  <span className="text-sm font-semibold text-slate-100 truncate">
                    {movie.title || movie.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{movie.release_date ? movie.release_date.split('-')[0] : 'TBA'}</span>
                    {movie.vote_average > 0 && (
                      <span className="text-amber-400 font-semibold">★ {movie.vote_average.toFixed(1)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            }}
            className="w-full py-2.5 px-4 bg-slate-950/90 hover:bg-red-600 text-xs font-bold text-red-400 hover:text-white transition-colors border-t border-slate-800 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>More...</span>
          </button>
        </div>
      )}
    </div>
  );
}