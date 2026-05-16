'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import Cookies from 'js-cookie';

export const Navbar: React.FC<{ user?: any }> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('auth_token');
    setIsMenuOpen(false);
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={user ? '/dashboard' : '/'} className="text-2xl font-bold text-primary-600">
            GMS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <span className="text-sm text-neutral-600">{user.fullName}</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-100">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-semibold text-primary-600">
                      {user.fullName.charAt(0)}
                    </div>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 first:rounded-t-lg">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 last:rounded-b-lg border-t border-neutral-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/" className="text-neutral-700 hover:text-primary-600">
                  Home
                </Link>
                <Link href="/auth/login" className="text-neutral-700 hover:text-primary-600">
                  Login
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-neutral-200">
            {user ? (
              <>
                <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  Home
                </Link>
                <Link href="/auth/login" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  Login
                </Link>
                <Link href="/auth/register" className="block px-4 py-2">
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
