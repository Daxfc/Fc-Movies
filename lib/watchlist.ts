export function getWatchlist(): any[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('fc_watchlist') || '[]');
    } catch {
      return [];
    }
  }
  
  export function toggleWatchlist(movie: any) {
    if (typeof window === 'undefined') return false;
    const watchlist = getWatchlist();
    const exists = watchlist.some((m: any) => m.id === movie.id);
    let updated;
    if (exists) {
      updated = watchlist.filter((m: any) => m.id !== movie.id);
    } else {
      updated = [...watchlist, movie];
    }
    localStorage.setItem('fc_watchlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('watchlist_updated'));
    return !exists;
  }
  
  export function isInWatchlist(id: number): boolean {
    const watchlist = getWatchlist();
    return watchlist.some((m: any) => m.id === id);
  }