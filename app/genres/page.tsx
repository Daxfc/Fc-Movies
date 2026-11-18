import SideBar from '@/components/SideBar';
import MovieCard from '@/components/MovieCard';
import { fetchTMDB } from '@/lib/tmdb';
import Link from 'next/link';

export const instant = false;

export default async function GenresHubPage() {
  const categories = [
    { id: '28', name: 'Action' },
    { id: '18', name: 'Drama' },
    { id: '10749', name: 'Romance' },
    { id: '16', name: 'Anime & Animation' },
    { id: '27', name: 'Horror' },
    { id: '35', name: 'Comedy' },
    { id: '878', name: 'Science Fiction' },
    { id: '53', name: 'Thriller' }
  ];

  const categoryData = await Promise.all(
    categories.map(async (cat) => {
      try {
        const data = await fetchTMDB('/discover/movie', {
          with_genres: cat.id,
          sort_by: 'popularity.desc',
        });
        return { ...cat, movies: data?.results || [] };
      } catch (error) {
        console.error(`Failed to fetch movies for category ${cat.name}:`, error);
        return { ...cat, movies: [] };
      }
    })
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <SideBar />
        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight border-l-4 border-red-600 pl-3">
              Movie Categories
            </h1>
            <p className="text-slate-400 text-sm pl-4">
              Explore trending movies grouped by your favorite genres.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {categoryData.map((category) => (
              <div key={category.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    {category.name}
                  </h2>
                  <Link 
                    href={`/genres/${category.id}`} 
                    className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors"
                  >
                    View All &rarr;
                  </Link>
                </div>

                {category.movies.length === 0 ? (
                  <p className="text-xs text-slate-500 italic pl-1">No movies available.</p>
                ) : (
                  <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    {category.movies.map((movie: any) => (
                      <div key={movie.id} className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-shrink-0">
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
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