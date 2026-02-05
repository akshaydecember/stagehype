"use client";

import { useEffect, useState } from "react";

interface Donation {
  id: string;
  amount: number;
  filmId?: string;
  artistId: string;
  createdAt: string;
  film?: { title: string };
  artist?: { displayName: string };
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalDonated, setTotalDonated] = useState(0);
  const [totalSupported, setTotalSupported] = useState(0);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/donations");
      if (!response.ok) throw new Error("Failed to fetch donations");
      const data = await response.json();
      setDonations(data.donations || []);

      // Calculate stats
      const total = data.donations.reduce(
        (sum: number, d: Donation) => sum + d.amount,
        0
      );
      setTotalDonated(total);
      setTotalSupported(
        new Set(
          data.donations.map((d: Donation) => d.artistId)
        ).size
      );
    } catch (err) {
      setError("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <p className="text-dark-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">My Donations</h1>
        <p className="text-dark-400 mb-12">
          Track your support for independent creators
        </p>

        {error && (
          <div className="bg-red-900/20 border border-primary/50 text-primary px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-800 rounded-lg p-6">
            <p className="text-dark-400 text-sm mb-2">Total Donated</p>
            <p className="text-3xl font-bold text-primary">
              ${totalDonated.toFixed(2)}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6">
            <p className="text-dark-400 text-sm mb-2">Creators Supported</p>
            <p className="text-3xl font-bold text-white">{totalSupported}</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6">
            <p className="text-dark-400 text-sm mb-2">Creator Impact</p>
            <p className="text-3xl font-bold text-green-500">
              ${(totalDonated * 0.9).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Donations Table */}
        {donations.length > 0 ? (
          <div className="bg-dark-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">
                      Film / Creator
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">
                      Creator
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-dark-300">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-dark-300">
                      Creator Gets
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700">
                  {donations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="hover:bg-dark-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white">
                        {donation.film?.title || "Direct Support"}
                      </td>
                      <td className="px-6 py-4 text-sm text-dark-300">
                        {donation.artist?.displayName || "Unknown Creator"}
                      </td>
                      <td className="px-6 py-4 text-sm text-white text-right font-semibold">
                        ${donation.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-500 text-right font-semibold">
                        ${(donation.amount * 0.9).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-dark-400">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-dark-800 rounded-lg p-12 text-center">
            <p className="text-dark-400 mb-4">No donations yet</p>
            <p className="text-dark-500 text-sm">
              Start supporting independent creators by watching films and donating
              to your favorites
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
