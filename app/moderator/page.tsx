"use client";

import { useState } from "react";
import Link from "next/link";

interface PendingFilm {
  id: string;
  title: string;
  description: string;
  genre: string;
  submittedBy: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
}

export default function ModeratorDashboard() {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [selectedFilm, setSelectedFilm] = useState<PendingFilm | null>(null);
  const [filterGenre, setFilterGenre] = useState("All");

  // Mock pending films data
  const pendingFilms: PendingFilm[] = [
    {
      id: "1",
      title: "The Digital Frontier",
      description:
        "A compelling exploration of technology's impact on human relationships in the modern age.",
      genre: "Drama",
      submittedBy: "Alex Chen",
      submittedDate: "2025-02-04",
      status: "pending",
      uploadedAt: "2025-02-04T10:30:00Z",
    },
    {
      id: "2",
      title: "Voices Unheard",
      description:
        "Documentary about marginalized communities and their untold stories.",
      genre: "Documentary",
      submittedBy: "Maria Garcia",
      submittedDate: "2025-02-03",
      status: "pending",
      uploadedAt: "2025-02-03T14:15:00Z",
    },
    {
      id: "3",
      title: "Quantum Dreams",
      description: "A sci-fi thriller exploring the nature of consciousness.",
      genre: "Sci-Fi",
      submittedBy: "James Wilson",
      submittedDate: "2025-02-02",
      status: "pending",
      uploadedAt: "2025-02-02T09:45:00Z",
    },
  ];

  const approvedFilms = pendingFilms.filter((f) => f.status === "approved");
  const rejectedFilms = pendingFilms.filter((f) => f.status === "rejected");

  const getFilmsList = () => {
    if (activeTab === "pending") return pendingFilms;
    if (activeTab === "approved") return approvedFilms;
    return rejectedFilms;
  };

  const filteredFilms = getFilmsList().filter((film) =>
    filterGenre === "All" ? true : film.genre === filterGenre
  );

  const handleApprove = async (filmId: string) => {
    console.log("Approving film:", filmId);
    // API call would go here
  };

  const handleReject = async (filmId: string, reason: string) => {
    console.log("Rejecting film:", filmId, "Reason:", reason);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Content Moderation
          </h1>
          <p className="text-dark-400">
            Review and approve user-submitted films
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-dark-800 rounded-lg p-6">
            <p className="text-dark-400 text-sm mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-500">
              {pendingFilms.length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6">
            <p className="text-dark-400 text-sm mb-2">Approved</p>
            <p className="text-3xl font-bold text-green-500">
              {approvedFilms.length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6">
            <p className="text-dark-400 text-sm mb-2">Rejected</p>
            <p className="text-3xl font-bold text-red-500">
              {rejectedFilms.length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6">
            <p className="text-dark-400 text-sm mb-2">Avg Review Time</p>
            <p className="text-3xl font-bold text-primary">24 hrs</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 mb-8">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab as "pending" | "approved" | "rejected")
                }
                className={`px-6 py-3 font-semibold rounded transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Filter */}
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white focus:outline-none focus:border-primary transition-colors"
          >
            {["All", "Drama", "Sci-Fi", "Documentary", "Thriller", "Comedy"].map(
              (genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              )
            )}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Films List */}
          <div className="lg:col-span-2">
            {filteredFilms.length > 0 ? (
              <div className="space-y-4">
                {filteredFilms.map((film) => (
                  <div
                    key={film.id}
                    onClick={() => setSelectedFilm(film)}
                    className={`p-6 rounded-lg cursor-pointer transition-all ${
                      selectedFilm?.id === film.id
                        ? "bg-dark-700 ring-2 ring-primary"
                        : "bg-dark-800 hover:bg-dark-700"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {film.title}
                      </h3>
                      <span className="text-xs px-3 py-1 bg-dark-900 text-dark-300 rounded-full">
                        {film.genre}
                      </span>
                    </div>
                    <p className="text-dark-400 text-sm mb-3 line-clamp-2">
                      {film.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-dark-500">
                      <span>By {film.submittedBy}</span>
                      <span>{new Date(film.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-dark-800 rounded-lg p-12 text-center">
                <p className="text-dark-400">No films to review</p>
              </div>
            )}
          </div>

          {/* Film Details Panel */}
          <div className="lg:col-span-1">
            {selectedFilm ? (
              <div className="bg-dark-800 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {selectedFilm.title}
                </h2>

                {/* Preview */}
                <div className="w-full h-40 bg-gradient-to-br from-dark-700 to-dark-900 rounded mb-6 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-dark-600"
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

                {/* Film Info */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-dark-400 text-sm">Submitted By</p>
                    <p className="text-white font-semibold">
                      {selectedFilm.submittedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">Genre</p>
                    <p className="text-white">{selectedFilm.genre}</p>
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">Submitted</p>
                    <p className="text-white">
                      {new Date(
                        selectedFilm.uploadedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-dark-400 text-sm mb-2">Description</p>
                  <p className="text-white text-sm leading-relaxed">
                    {selectedFilm.description}
                  </p>
                </div>

                {/* Content Checklist */}
                <div className="mb-6">
                  <p className="text-dark-400 text-sm mb-3 font-semibold">
                    Content Review
                  </p>
                  <div className="space-y-2 text-sm">
                    {[
                      "No explicit violence",
                      "No adult content",
                      "No hate speech",
                      "Original content",
                      "Proper credits listed",
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded bg-dark-700 border-dark-600"
                        />
                        <span className="text-dark-300">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleApprove(selectedFilm.id)}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedFilm.id, "Violates guidelines")}
                    className="w-full py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
                  >
                    ✕ Reject
                  </button>
                </div>

                {/* Notes */}
                <div className="mt-6">
                  <textarea
                    placeholder="Add review notes..."
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors text-sm"
                    rows={4}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-dark-800 rounded-lg p-6 text-center text-dark-400">
                Select a film to review
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
