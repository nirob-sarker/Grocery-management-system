'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { LoadingSpinner } from '@/components/common/index';
import { api } from '@/lib/api';
import { User } from '@/types';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Products', value: '0', icon: '📦' },
          { label: 'Total Orders', value: '0', icon: '📋' },
          { label: 'Total Revenue', value: '$0', icon: '💰' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <div className="text-4xl mb-4">{stat.icon}</div>
            <p className="text-neutral-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Welcome"
          description={`Hello, ${user?.fullName || 'User'}!`}
        />
        <CardBody>
          <p className="text-neutral-600">
            This is your dashboard. More features coming soon!
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
