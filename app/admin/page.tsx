"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    mood: "",
    year: new Date().getFullYear(),
    durationMin: 0,
    language: "English",
  });
  const [filmFile, setFilmFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "durationMin" ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilmFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/films", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to upload film");
        return;
      }

      setMessage("Film uploaded successfully! Awaiting approval.");
      setFormData({
        title: "",
        description: "",
        genre: "",
        mood: "",
        year: new Date().getFullYear(),
        durationMin: 0,
        language: "English",
      });
      setFilmFile(null);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Form */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Upload Content</h1>
            <p className="text-dark-400 mb-8">
              Share your original film or series with our audience
            </p>

            {message && (
              <div className="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 rounded mb-6">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-primary/50 text-primary px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your film title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors h-24"
                  placeholder="What is your film about?"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Drama, Sci-Fi, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Mood
                  </label>
                  <input
                    type="text"
                    name="mood"
                    value={formData.mood}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Emotional, Thrilling, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors"
                    min="2000"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    name="durationMin"
                    value={formData.durationMin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:outline-none focus:border-primary transition-colors"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Hindi</option>
                    <option>Mandarin</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Film File (Preview)
                </label>
                <div className="border-2 border-dashed border-dark-700 rounded p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="film-file"
                    accept="video/*"
                  />
                  <label htmlFor="film-file" className="cursor-pointer">
                    <p className="text-dark-400 mb-2">
                      {filmFile
                        ? filmFile.name
                        : "Click to select video file"}
                    </p>
                    <p className="text-xs text-dark-500">
                      (File upload integrated in production version)
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-primary text-white font-semibold rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Uploading..." : "Upload Content"}
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div>
            <div className="bg-dark-800 rounded-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-4">
                Content Guidelines
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    ✓ We Welcome
                  </h3>
                  <ul className="text-dark-300 space-y-2 text-sm">
                    <li>• Feature films (30+ minutes)</li>
                    <li>• Documentaries</li>
                    <li>• Web series</li>
                    <li>• Independent productions</li>
                    <li>• International content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    ✗ Not Allowed
                  </h3>
                  <ul className="text-dark-300 space-y-2 text-sm">
                    <li>• Explicit violence</li>
                    <li>• Adult content</li>
                    <li>• Copyright violations</li>
                    <li>• Hate speech</li>
                    <li>• Misleading content</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-dark-700">
                  <p className="text-dark-400 text-sm">
                    All content goes through our moderation team. We aim to approve
                    submissions within 48 hours.
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded p-4">
                  <p className="text-primary font-semibold text-sm">
                    💡 Pro Tip: Add detailed credits to maximize donations. The more
                    information about cast & crew, the more supporters will connect!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
