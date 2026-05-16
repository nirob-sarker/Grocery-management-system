'use client';

import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.login(email, password);
        setUser(response.user);
        router.push('/dashboard');
        return response;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Login failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await api.register(fullName, email, password);
        router.push('/auth/login');
      } catch (err: any) {
        const message = err.response?.data?.message || 'Registration failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.logout();
      setUser(null);
      Cookies.remove('auth_token');
      router.push('/auth/login');
    } catch (err) {
      setError('Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getProfile();
      setUser(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch profile';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    getProfile,
  };
};
