import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let films = [];
  
  try {
    films = await prisma.film.findMany({
      where: { isApproved: true },
      take: 20,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch films:", error);
    films = [];
  }

  const featuredFilm = films[0];
  const trendingFilms = films.slice(0, 8);
  const newFilms = films.slice(8, 16);
  const dramaFilms = films.filter((f) => f.genre === "Drama").slice(0, 8);
  const docFilms = films.filter((f) => f.genre === "Documentary").slice(0, 8);

  return (
    <main className="min-h-screen bg-dark-950">
      {/* Featured Hero Section */}
      {featuredFilm && (
        <section className="relative h-screen max-h-[900px] min-h-[600px] bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950 flex items-center overflow-hidden group">
          {/* Background Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900/80 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl"></div>

          {/* Content */}
          <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                  ⭐ FEATURED
                </span>
                <span className="px-4 py-2 bg-dark-800 text-dark-300 rounded-full text-xs font-bold uppercase">
                  {featuredFilm.genre}
                </span>
                <span className="px-4 py-2 bg-dark-800 text-dark-300 rounded-full text-xs font-bold uppercase">
                  {featuredFilm.year}
                </span>
                <span className="px-4 py-2 bg-dark-800 text-dark-300 rounded-full text-xs font-bold uppercase">
                  {featuredFilm.durationMin} min
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                {featuredFilm.title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-dark-200 mb-8 leading-relaxed max-w-2xl drop-shadow">
                {featuredFilm.description || "Experience independent cinema at its finest with authentic storytelling and original voices."}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                <div className="bg-dark-900/60 backdrop-blur p-4 rounded-lg border border-dark-800">
                  <p className="text-dark-400 text-xs uppercase font-bold mb-1">Mood</p>
                  <p className="text-white font-bold">{featuredFilm.mood}</p>
                </div>
                <div className="bg-dark-900/60 backdrop-blur p-4 rounded-lg border border-dark-800">
                  <p className="text-dark-400 text-xs uppercase font-bold mb-1">Language</p>
                  <p className="text-white font-bold">{featuredFilm.language}</p>
                </div>
                <div className="bg-dark-900/60 backdrop-blur p-4 rounded-lg border border-dark-800">
                  <p className="text-dark-400 text-xs uppercase font-bold mb-1">Rating</p>
                  <p className="text-white font-bold flex items-center">
                    <span className="text-primary mr-2">★</span> 8.7/10
                  </p>
                </div>
                <div className="bg-dark-900/60 backdrop-blur p-4 rounded-lg border border-dark-800">
                  <p className="text-dark-400 text-xs uppercase font-bold mb-1">Views</p>
                  <p className="text-white font-bold">24.5K</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/watch/${featuredFilm.id}`}>
                  <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 text-lg flex items-center justify-center gap-2 group/btn">
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Now
                  </button>
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-dark-400 text-white font-bold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 text-lg flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  More Info
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
            Trending Now
          </h2>
          <p className="text-dark-400 text-lg">
            Most watched films this week
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingFilms.map((film, idx) => (
            <Link key={film.id} href={`/watch/${film.id}`}>
              <div className="group cursor-pointer h-full">
                {/* Card Container */}
                <div className="relative bg-dark-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  {/* Image Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center overflow-hidden">
                    {/* Rank Badge */}
                    <div className="absolute top-4 left-4 z-20 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-lg">#{idx + 1}</span>
                    </div>

                    {/* Play Button Hover */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-200 transform hover:scale-110">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>

                    {/* Placeholder Content */}
                    <div className="text-center group-hover:hidden">
                      <svg className="w-20 h-20 text-dark-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 bg-dark-900">
                    {/* Genre & Year */}
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs bg-dark-800 text-primary px-2 py-1 rounded font-bold">
                        {film.genre}
                      </span>
                      <span className="text-xs bg-dark-800 text-dark-400 px-2 py-1 rounded font-bold">
                        {film.year}
                      </span>
                      <span className="text-xs bg-dark-800 text-dark-400 px-2 py-1 rounded font-bold">
                        {film.durationMin}m
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {film.title}
                    </h3>

                    {/* Rating & Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-primary font-bold">★</span>
                        <span className="text-sm text-dark-300 font-bold">8.5/10</span>
                      </div>
                      <span className="text-xs text-dark-400">24.5K views</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Releases Section */}
      {newFilms.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-dark-800">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Just Added
            </h2>
            <p className="text-dark-400 text-lg">
              Latest releases from independent creators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newFilms.map((film) => (
              <Link key={film.id} href={`/watch/${film.id}`}>
                <div className="group cursor-pointer h-full">
                  <div className="relative bg-dark-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                    <div className="relative h-64 bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center overflow-hidden">
                      <span className="absolute top-4 right-4 z-20 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase">
                        New
                      </span>

                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-200 transform hover:scale-110">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>

                      <svg className="w-20 h-20 text-dark-600 group-hover:hidden mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>

                    <div className="p-4 bg-dark-900">
                      <div className="flex gap-2 mb-3">
                        <span className="text-xs bg-dark-800 text-primary px-2 py-1 rounded font-bold">
                          {film.genre}
                        </span>
                        <span className="text-xs bg-dark-800 text-dark-400 px-2 py-1 rounded font-bold">
                          {film.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {film.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-primary font-bold">★</span>
                          <span className="text-sm text-dark-300 font-bold">8.5/10</span>
                        </div>
                        <span className="text-xs text-dark-400">12.3K views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-dark-800">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-12 sm:p-16 text-center">
          <div className="mb-8">
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
              Share Your Story
            </h2>
            <p className="text-dark-200 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Upload your original films and reach a global audience. Keep 90% of every donation and build your creative community.
            </p>
          </div>
          <Link href="/register">
            <button className="px-10 py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 text-lg inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
              Launch Your Studio
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-dark-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-dark-900 rounded-xl hover:bg-dark-800 transition-all duration-300">
            <p className="text-5xl sm:text-6xl font-black text-primary mb-3">{films.length}+</p>
            <p className="text-dark-300 text-lg font-bold">Curated Films</p>
            <p className="text-dark-500 text-sm mt-2">From independent creators worldwide</p>
          </div>
          <div className="text-center p-8 bg-dark-900 rounded-xl hover:bg-dark-800 transition-all duration-300">
            <p className="text-5xl sm:text-6xl font-black text-primary mb-3">90%</p>
            <p className="text-dark-300 text-lg font-bold">Creator Revenue</p>
            <p className="text-dark-500 text-sm mt-2">Creators keep 90% of donations</p>
          </div>
          <div className="text-center p-8 bg-dark-900 rounded-xl hover:bg-dark-800 transition-all duration-300">
            <p className="text-5xl sm:text-6xl font-black text-primary mb-3">Direct</p>
            <p className="text-dark-300 text-lg font-bold">Support System</p>
            <p className="text-dark-500 text-sm mt-2">Connect directly with audiences</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-20 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">About StageHype</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Creator FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-white text-sm">
                  SH
                </div>
                <span className="text-dark-300 font-bold">StageHype © 2026</span>
              </div>
              <p className="text-dark-400 text-sm text-center sm:text-right">
                Empowering independent filmmakers and creators worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
