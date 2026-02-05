"use client";

import { useState } from "react";

interface DonationStats {
  totalDonations: number;
  totalDonors: number;
  averageDonation: number;
  recentDonations: Array<{
    id: string;
    amount: number;
    donorName: string;
    filmTitle?: string;
    date: string;
  }>;
}

export default function CreatorDashboard() {
  const [stats] = useState<DonationStats>({
    totalDonations: 12450,
    totalDonors: 342,
    averageDonation: 36.4,
    recentDonations: [
      {
        id: "1",
        amount: 50,
        donorName: "Anonymous",
        filmTitle: "Echoes of Tomorrow",
        date: "2025-02-04",
      },
      {
        id: "2",
        amount: 25,
        donorName: "Anonymous",
        filmTitle: "Moonlit Whispers",
        date: "2025-02-03",
      },
      {
        id: "3",
        amount: 100,
        donorName: "Anonymous",
        date: "2025-02-03",
      },
      {
        id: "4",
        amount: 15,
        donorName: "Anonymous",
        filmTitle: "Echoes of Tomorrow",
        date: "2025-02-02",
      },
    ],
  });

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Creator Dashboard</h1>
        <p className="text-dark-400 mb-12">
          Track your earnings and supporter engagement
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Earnings */}
          <div className="bg-dark-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-dark-400 text-sm font-semibold">
                Total Earnings (90%)
              </h3>
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-4xl font-bold text-primary mb-2">
              ${(stats.totalDonations * 0.9).toFixed(2)}
            </p>
            <p className="text-dark-500 text-sm">
              From ${stats.totalDonations.toFixed(2)} donations
            </p>
          </div>

          {/* Total Supporters */}
          <div className="bg-dark-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-dark-400 text-sm font-semibold">
                Total Supporters
              </h3>
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white mb-2">
              {stats.totalDonors}
            </p>
            <p className="text-dark-500 text-sm">
              Supporting your work
            </p>
          </div>

          {/* Average Donation */}
          <div className="bg-dark-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-dark-400 text-sm font-semibold">
                Average Donation
              </h3>
              <svg
                className="w-8 h-8 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white mb-2">
              ${stats.averageDonation.toFixed(2)}
            </p>
            <p className="text-dark-500 text-sm">
              Per transaction
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Earnings Chart Placeholder */}
          <div className="bg-dark-800 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-6">
              Monthly Earnings
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 90].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`${height * 20}% of max`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-dark-500">
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
            </div>
          </div>

          {/* Film Performance */}
          <div className="bg-dark-800 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-6">
              Top Performing Films
            </h3>
            <div className="space-y-4">
              {["Echoes of Tomorrow", "Moonlit Whispers", "Silent Revolution"].map(
                (film, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <p className="text-white text-sm font-semibold">{film}</p>
                      <p className="text-primary text-sm">
                        ${Math.floor(Math.random() * 5000) + 1000}
                      </p>
                    </div>
                    <div className="w-full bg-dark-700 rounded h-2">
                      <div
                        className="bg-primary rounded h-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-dark-800 rounded-lg overflow-hidden">
          <div className="p-8 border-b border-dark-700">
            <h3 className="text-2xl font-bold text-white">Recent Donations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-900">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-dark-300">
                    Supporter
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-dark-300">
                    Film
                  </th>
                  <th className="px-8 py-4 text-right text-sm font-semibold text-dark-300">
                    Amount
                  </th>
                  <th className="px-8 py-4 text-right text-sm font-semibold text-dark-300">
                    You Receive
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-dark-300">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {stats.recentDonations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="hover:bg-dark-700 transition-colors"
                  >
                    <td className="px-8 py-4 text-sm text-white">
                      {donation.donorName}
                    </td>
                    <td className="px-8 py-4 text-sm text-dark-300">
                      {donation.filmTitle || "Direct Support"}
                    </td>
                    <td className="px-8 py-4 text-sm text-white text-right font-semibold">
                      ${donation.amount.toFixed(2)}
                    </td>
                    <td className="px-8 py-4 text-sm text-green-500 text-right font-semibold">
                      ${(donation.amount * 0.9).toFixed(2)}
                    </td>
                    <td className="px-8 py-4 text-sm text-dark-400">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Settings */}
        <div className="mt-12 bg-dark-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Payout Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Bank Account
              </label>
              <p className="text-white">**** **** **** 4321 (Verified)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Payout Schedule
              </label>
              <p className="text-white">Monthly (1st of each month)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Next Payout
              </label>
              <p className="text-primary font-semibold">March 1, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
