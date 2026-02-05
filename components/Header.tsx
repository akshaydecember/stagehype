"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark-900 border-b border-dark-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center font-bold text-white">
              SH
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline">
              StageHype
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
            >
              Discover
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
              >
                Upload Films
              </Link>
            )}
            {(session?.user?.role === "MODERATOR" || session?.user?.role === "ADMIN") && (
              <Link
                href="/moderator"
                className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
              >
                Moderate
              </Link>
            )}
            {session?.user?.role === "ARTIST" && (
              <Link
                href="/studio/dashboard"
                className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
              >
                My Studio
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {session.user?.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm hidden md:block">
                    <p className="text-white font-medium truncate">{session.user?.email}</p>
                    <p className="text-dark-400 text-xs">{session.user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                  className="px-4 py-2 text-dark-300 hover:text-white border border-dark-600 hover:border-dark-400 rounded text-sm font-medium transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-dark-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-primary text-white rounded font-medium hover:bg-red-700 transition-all text-sm"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-dark-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-dark-800 border-t border-dark-700 px-4 py-4 space-y-3">
            <Link href="/" className="block text-dark-300 hover:text-white transition-colors text-sm font-medium py-2">
              Discover
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" className="block text-dark-300 hover:text-white transition-colors text-sm font-medium py-2">
                Upload Films
              </Link>
            )}
            {(session?.user?.role === "MODERATOR" || session?.user?.role === "ADMIN") && (
              <Link href="/moderator" className="block text-dark-300 hover:text-white transition-colors text-sm font-medium py-2">
                Moderate
              </Link>
            )}
            {session?.user?.role === "ARTIST" && (
              <Link href="/studio/dashboard" className="block text-dark-300 hover:text-white transition-colors text-sm font-medium py-2">
                My Studio
              </Link>
            )}
            {!session && (
              <>
                <Link href="/login" className="block text-dark-300 hover:text-white transition-colors text-sm font-medium py-2">
                  Sign In
                </Link>
                <Link href="/register" className="block w-full text-center px-4 py-2 bg-primary text-white rounded font-medium text-sm">
                  Join Now
                </Link>
              </>
            )}
            {session && (
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                className="block w-full text-center px-4 py-2 border border-dark-600 text-dark-300 hover:text-white rounded font-medium text-sm"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
