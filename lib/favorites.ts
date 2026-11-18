export function getFavorites(): any[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('fc_favorites') || '[]');
    } catch {
      return [];
    }
  }
  
  export function toggleFavorite(movie: any) {
    if (typeof window === 'undefined') return false;
    const favorites = getFavorites();
    const exists = favorites.some((m: any) => m.id === movie.id);
    let updated;
    if (exists) {
      updated = favorites.filter((m: any) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    localStorage.setItem('fc_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites_updated'));
    return !exists;
  }
  
  export function isFavorite(id: number): boolean {
    const favorites = getFavorites();
    return favorites.some((m: any) => m.id === id);
  }