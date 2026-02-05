"use client";

import Link from "next/link";
import { useState } from "react";

interface ArtistProfile {
  id: string;
  displayName: string;
  bio: string;
  skills: string[];
  totalDonations: number;
  filmCount: number;
  createdAt: string;
}

interface FilmCredit {
  filmId: string;
  title: string;
  role: string;
  year: number;
  genre: string;
}

export default function ArtistStudioPage({
  params,
}: {
  params: { artistId: string };
}) {
  const [activeTab, setActiveTab] = useState<
    "filmography" | "credits" | "about"
  >("filmography");

  // Mock artist data
  const artist: ArtistProfile = {
    id: params.artistId,
    displayName: "Emma Wilson",
    bio: "Award-winning director and storyteller passionate about bringing independent voices to the screen. 10+ years of experience in film production and narrative design.",
    skills: [
      "Directing",
      "Screenwriting",
      "Cinematography",
      "Editing",
      "Production",
    ],
    totalDonations: 12450,
    filmCount: 5,
    createdAt: "2023-01-15T10:00:00Z",
  };

  // Mock filmography
  const filmography: FilmCredit[] = [
    {
      filmId: "1",
      title: "Echoes of Tomorrow",
      role: "Director",
      year: 2025,
      genre: "Sci-Fi",
    },
    {
      filmId: "2",
      title: "Moonlit Whispers",
      role: "Writer, Director",
      year: 2024,
      genre: "Drama",
    },
    {
      filmId: "3",
      title: "Silent Revolution",
      role: "Cinematographer",
      year: 2023,
      genre: "Documentary",
    },
    {
      filmId: "4",
      title: "Echoes of the Past",
      role: "Editor",
      year: 2022,
      genre: "Drama",
    },
    {
      filmId: "5",
      title: "The Last Station",
      role: "Producer",
      year: 2021,
      genre: "Historical",
    },
  ];

  // Mock film credits (collaborations)
  const filmCredits = [
    {
      filmId: "10",
      title: "Urban Legends",
      role: "Lead Actor",
      year: 2025,
      genre: "Thriller",
    },
    {
      filmId: "11",
      title: "Harvest Season",
      role: "Supporting Actor",
      year: 2024,
      genre: "Comedy",
    },
    {
      filmId: "12",
      title: "Lost in Translation",
      role: "Consultant",
      year: 2023,
      genre: "Drama",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-dark-800 to-dark-950 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-dark-700 to-dark-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-dark-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {artist.displayName}
              </h1>
              <p className="text-primary font-semibold mb-6">
                ✓ Verified Creator
              </p>

              <p className="text-dark-300 text-lg mb-8 max-w-2xl leading-relaxed">
                {artist.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-dark-400 text-sm">Films</p>
                  <p className="text-2xl font-bold text-white">
                    {artist.filmCount}
                  </p>
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Total Support</p>
                  <p className="text-2xl font-bold text-primary">
                    ${(artist.totalDonations / 1000).toFixed(1)}K
                  </p>
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Supporters</p>
                  <p className="text-2xl font-bold text-white">342</p>
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Member Since</p>
                  <p className="text-sm font-bold text-white">Jan 2023</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-primary text-white font-semibold rounded hover:bg-red-700 transition-colors flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Follow
                </button>
                <button className="px-8 py-3 border border-dark-600 text-white font-semibold rounded hover:border-white transition-colors flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8a1 1 0 011-1h.01A1 1 0 014 8v12a2 2 0 002 2h12a2 2 0 002-2V9a1 1 0 00-1-1h-.01A1 1 0 0018 9v12a1 1 0 001 1H5a1 1 0 001-1V8zm3.293-5.707a1 1 0 011.414 0L12 5.586l4.293-4.293a1 1 0 111.414 1.414L13.414 7l4.293 4.293a1 1 0 01-1.414 1.414L12 8.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 7 6.293 2.707a1 1 0 010-1.414z" />
                  </svg>
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="border-b border-dark-800 mb-8">
          <div className="flex gap-8">
            {["filmography", "credits", "about"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(
                    tab as "filmography" | "credits" | "about"
                  )
                }
                className={`py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-white"
                    : "border-transparent text-dark-400 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Filmography Tab */}
            {activeTab === "filmography" && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">
                  Filmography
                </h2>
                <div className="space-y-6">
                  {filmography.map((film) => (
                    <Link key={film.filmId} href={`/watch/${film.filmId}`}>
                      <div className="flex gap-6 p-6 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer group">
                        <div className="w-24 h-32 bg-gradient-to-br from-dark-700 to-dark-900 rounded flex-shrink-0 flex items-center justify-center group-hover:from-dark-600 group-hover:to-dark-800 transition-colors">
                          <svg
                            className="w-8 h-8 text-dark-600 group-hover:text-primary transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2">
                            {film.title}
                          </h3>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <span className="text-sm bg-dark-700 text-dark-300 px-3 py-1 rounded">
                              {film.role}
                            </span>
                            <span className="text-sm bg-dark-700 text-dark-300 px-3 py-1 rounded">
                              {film.year}
                            </span>
                            <span className="text-sm bg-dark-700 text-dark-300 px-3 py-1 rounded">
                              {film.genre}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <button className="text-primary font-semibold hover:underline">
                              Watch Film
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Credits Tab */}
            {activeTab === "credits" && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">
                  Film Credits
                </h2>
                <div className="space-y-4">
                  {filmCredits.map((film) => (
                    <Link key={film.filmId} href={`/watch/${film.filmId}`}>
                      <div className="p-6 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                            {film.title}
                          </h3>
                          <span className="text-dark-400 text-sm">
                            {film.year}
                          </span>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <span className="text-sm bg-dark-700 text-dark-300 px-3 py-1 rounded">
                            {film.role}
                          </span>
                          <span className="text-sm bg-dark-700 text-dark-300 px-3 py-1 rounded">
                            {film.genre}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    About {artist.displayName}
                  </h2>
                  <p className="text-dark-300 text-lg leading-relaxed mb-6">
                    {artist.bio}
                  </p>
                  <p className="text-dark-400 leading-relaxed">
                    Specializing in narrative-driven storytelling, {artist.displayName} brings
                    a unique perspective to independent filmmaking. With a focus on
                    character development and emotional authenticity, their work has
                    garnered critical acclaim and strong audience support through the
                    StageHype platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {artist.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary/20 border border-primary text-primary rounded-full text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Contact & Social
                  </h3>
                  <div className="space-y-3">
                    <p className="text-dark-300">
                      <span className="text-dark-400 text-sm">Email:</span> contact@emmawilson.com
                    </p>
                    <p className="text-dark-300">
                      <span className="text-dark-400 text-sm">LinkedIn:</span>{" "}
                      <a
                        href="#"
                        className="text-primary hover:underline"
                      >
                        /in/emmawilson
                      </a>
                    </p>
                    <p className="text-dark-300">
                      <span className="text-dark-400 text-sm">Website:</span>{" "}
                      <a
                        href="#"
                        className="text-primary hover:underline"
                      >
                        www.emmawilson.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Support Card */}
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-white mb-4">
                  Support {artist.displayName}
                </h3>
                <p className="text-dark-400 text-sm mb-6">
                  Help {artist.displayName.split(" ")[0]} create more amazing content
                </p>
                <button className="w-full py-3 bg-primary text-white font-semibold rounded hover:bg-red-700 transition-colors mb-2">
                  Donate to Creator
                </button>
                <p className="text-xs text-center text-dark-500">
                  90% goes directly to {artist.displayName.split(" ")[0]}
                </p>
              </div>

              {/* Awards & Recognition */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h4 className="font-bold text-white mb-4">Recognition</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Best Director Award
                      </p>
                      <p className="text-dark-500 text-xs">Film Festival 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Audience Choice
                      </p>
                      <p className="text-dark-500 text-xs">StageHype 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Donations */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h4 className="font-bold text-white mb-4">Recent Support</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-dark-700 rounded-full"></div>
                        <span className="text-dark-300">Anonymous</span>
                      </div>
                      <span className="text-primary font-semibold">
                        ${Math.floor(Math.random() * 100) + 10}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
