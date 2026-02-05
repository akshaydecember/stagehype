"use client";

import { useState } from "react";
import Link from "next/link";

interface FilmDetails {
  id: string;
  title: string;
  description: string;
  genre: string;
  mood: string;
  year: number;
  durationMin: number;
  language: string;
  isApproved: boolean;
  createdAt: string;
}

interface CastMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export default function WatchFilmPage({
  params,
}: {
  params: { filmId: string };
}) {
  const [showXRay, setShowXRay] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);

  // Mock film data
  const film: FilmDetails = {
    id: params.filmId,
    title: "Echoes of Tomorrow",
    description:
      "A groundbreaking sci-fi exploration of consciousness, identity, and the future of human connection. Follow Maya as she discovers a way to transfer memories between people, leading her into a world of ethical dilemmas and unexpected consequences.",
    genre: "Sci-Fi",
    mood: "Thought-provoking",
    year: 2025,
    durationMin: 118,
    language: "English",
    isApproved: true,
    createdAt: "2025-01-15T10:00:00Z",
  };

  // Mock cast & crew data
  const castAndCrew: CastMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Director",
    },
    {
      id: "2",
      name: "Emma Wilson",
      role: "Lead Actor (Maya)",
    },
    {
      id: "3",
      name: "James Robinson",
      role: "Cinematographer",
    },
    {
      id: "4",
      name: "David Lee",
      role: "Music Composer",
    },
    {
      id: "5",
      name: "Lisa Anderson",
      role: "Editor",
    },
    {
      id: "6",
      name: "Marcus Johnson",
      role: "Producer",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Video Player Section */}
      <section className="relative w-full bg-black aspect-video flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-dark-800 to-dark-950 flex flex-col items-center justify-center relative group">
          {/* Play Icon */}
          <svg
            className="w-24 h-24 text-primary mb-4 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <p className="text-dark-400 text-lg">Player (Integrated video hosting in production)</p>

          {/* X-Ray Toggle Button */}
          <button
            onClick={() => setShowXRay(!showXRay)}
            className="absolute top-4 right-4 px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            X-Ray
          </button>

          {/* X-Ray Overlay */}
          {showXRay && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-8">
              <div className="bg-dark-900 rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Cast & Crew</h3>
                  <button
                    onClick={() => setShowXRay(false)}
                    className="text-dark-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {castAndCrew.map((member) => (
                    <Link
                      key={member.id}
                      href={`/studio/${member.id}`}
                    >
                      <div className="p-4 bg-dark-800 rounded hover:bg-dark-700 transition-colors cursor-pointer group/member">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-white font-semibold group-hover/member:text-primary transition-colors">
                              {member.name}
                            </h4>
                            <p className="text-dark-400 text-sm mt-1">
                              {member.role}
                            </p>
                          </div>
                          <svg
                            className="w-5 h-5 text-dark-500 group-hover/member:text-primary transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <p className="text-dark-400 text-sm mt-6 text-center">
                  Click on any crew member to view their profile
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Film Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {film.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-dark-400">
                <span className="text-sm font-semibold">{film.genre}</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400">
                <span className="text-sm">{film.year}</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400">
                <span className="text-sm">{film.durationMin} min</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400">
                <span className="text-sm">{film.language}</span>
              </div>
            </div>

            {/* Rating & Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded hover:bg-red-700 transition-colors flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button className="px-8 py-3 border border-dark-600 text-white font-semibold rounded hover:border-white transition-colors flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Add to List
              </button>
              <button className="px-8 py-3 border border-dark-600 text-white font-semibold rounded hover:border-white transition-colors flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C9.589 12.938 10 12.226 10 11.5c0-2.21-1.865-4-4.167-4S1.667 9.29 1.667 11.5s1.865 4 4.167 4c.62 0 1.202-.156 1.709-.464m0 0a6.968 6.968 0 016.106 0m0 0a6.968 6.968 0 015.105.464m-12.331 12.182A13.6 13.6 0 0112 18.5c7.33 0 13.55 4.48 16.384 10.964M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                Share
              </button>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-dark-300 text-lg leading-relaxed">
                {film.description}
              </p>
            </div>

            {/* Cast & Crew Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Cast & Crew</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {castAndCrew.slice(0, 6).map((member) => (
                  <Link key={member.id} href={`/studio/${member.id}`}>
                    <div className="bg-dark-800 rounded-lg p-4 hover:bg-dark-700 transition-colors cursor-pointer group">
                      <div className="w-full h-24 bg-gradient-to-br from-dark-700 to-dark-900 rounded mb-3 flex items-center justify-center group-hover:from-dark-600 group-hover:to-dark-800 transition-colors">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-white font-semibold text-sm truncate group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-dark-400 text-xs truncate">
                        {member.role}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-dark-800 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold">
                          User Review {i}
                        </h4>
                        <p className="text-dark-500 text-sm">2 hours ago</p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-dark-300">
                      Amazing filmmaking! This is the kind of original content that
                      needs support. Just donated $20 to the creator.
                    </p>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <div className="mt-8">
                <textarea
                  placeholder="Share your thoughts on this film..."
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors"
                  rows={4}
                />
                <button className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-red-700 transition-colors">
                  Post Review
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Donation Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Donation Card */}
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Support This Film
                </h3>
                <p className="text-dark-400 mb-6">
                  Your donation directly supports the filmmaker. 90% goes to creators.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Donation Amount
                    </label>
                    <div className="flex gap-2 mb-3">
                      {[5, 10, 20, 50].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setDonationAmount(amount)}
                          className={`flex-1 py-2 rounded font-semibold transition-colors ${
                            donationAmount === amount
                              ? "bg-primary text-white"
                              : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) =>
                        setDonationAmount(Number(e.target.value) || 0)
                      }
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Custom amount"
                      min="1"
                    />
                  </div>

                  <div className="bg-dark-700 rounded p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-dark-400">Subtotal</span>
                      <span className="text-white">${donationAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-dark-600 pt-2">
                      <span className="text-dark-400">Platform Fee (10%)</span>
                      <span className="text-white">
                        ${(donationAmount * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-dark-600 pt-2 mt-2">
                      <span className="text-dark-300">Creator Gets</span>
                      <span className="text-primary">
                        ${(donationAmount * 0.9).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-primary text-white font-semibold rounded hover:bg-red-700 transition-colors">
                    Donate Now
                  </button>

                  <p className="text-xs text-center text-dark-500">
                    Secure payment via Stripe
                  </p>
                </div>
              </div>

              {/* Film Stats */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h4 className="font-bold text-white mb-4">Film Stats</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-dark-400 text-sm">Total Donations</p>
                    <p className="text-2xl font-bold text-primary">$2,450</p>
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">Supporters</p>
                    <p className="text-2xl font-bold text-white">127</p>
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">Views</p>
                    <p className="text-2xl font-bold text-white">3.2K</p>
                  </div>
                </div>
              </div>

              {/* Related Films */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h4 className="font-bold text-white mb-4">More Sci-Fi Films</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Link key={i} href={`/watch/${i}`}>
                      <div className="flex gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                        <div className="w-12 h-16 bg-dark-700 rounded flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold truncate">
                            Related Film {i}
                          </p>
                          <p className="text-dark-500 text-xs">2025</p>
                        </div>
                      </div>
                    </Link>
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
