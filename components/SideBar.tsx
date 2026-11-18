'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-red-900/30 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="font-black text-2xl tracking-wider bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent cursor-pointer">
            FC MOVIES
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-72 sm:w-80 md:w-96 hidden sm:block">
              <SearchBar />
            </div>
            
            <button 
              onClick={() => setIsOpen(true)}
              className="outline-none p-2 bg-red-600/10 hover:bg-red-600/25 border border-red-600/30 rounded-xl transition-all cursor-pointer flex items-center justify-center group"
            >
              <svg className="w-5 h-5 text-red-500 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity"
        />
      )}

      <div className={`fixed top-0 right-0 bottom-0 w-80 bg-slate-950 border-l border-red-900/30 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-900 bg-slate-950/50">
          <span className="font-black text-xl tracking-wider bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
            FC MOVIES
          </span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2 text-slate-300 font-medium">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/40 hover:bg-red-600/15 border border-transparent hover:border-red-600/30 text-slate-200 hover:text-red-400 transition-all group">
            <div className="p-2 rounded-xl bg-slate-900 text-slate-400 group-hover:text-red-500 group-hover:bg-red-600/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Home</span>
          </Link>

          <Link href="/watchlist" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/40 hover:bg-red-600/15 border border-transparent hover:border-red-600/30 text-slate-200 hover:text-red-400 transition-all group">
            <div className="p-2 rounded-xl bg-slate-900 text-slate-400 group-hover:text-red-500 group-hover:bg-red-600/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Watchlist</span>
          </Link>

          <Link href="/favorites" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/40 hover:bg-red-600/15 border border-transparent hover:border-red-600/30 text-slate-200 hover:text-red-400 transition-all group">
            <div className="p-2 rounded-xl bg-slate-900 text-slate-400 group-hover:text-red-500 group-hover:bg-red-600/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Favorites</span>
          </Link>

          <Link href="/genres" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/40 hover:bg-red-600/15 border border-transparent hover:border-red-600/30 text-slate-200 hover:text-red-400 transition-all group">
            <div className="p-2 rounded-xl bg-slate-900 text-slate-400 group-hover:text-red-500 group-hover:bg-red-600/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Genres</span>
          </Link>
        </div>

        <div className="mt-auto p-6 border-t border-slate-900/80 text-xs text-slate-500 flex items-center justify-between">
          <span>FC MOVIES v1.0</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>
    </>
  );
}