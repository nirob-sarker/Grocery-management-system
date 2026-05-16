import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function Home() {
  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
            Goods Management System
          </h1>
          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
            Streamline your inventory, orders, and supplier management with our modern, easy-to-use platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📦',
                title: 'Product Management',
                description: 'Manage your product catalog with categories, pricing, and stock tracking.'
              },
              {
                icon: '📊',
                title: 'Inventory Control',
                description: 'Real-time inventory tracking with low-stock alerts and automated restocking.'
              },
              {
                icon: '🛒',
                title: 'Order Management',
                description: 'Process orders efficiently with status tracking and customer notifications.'
              },
              {
                icon: '👥',
                title: 'User Management',
                description: 'Role-based access control for customers, staff, and administrators.'
              },
              {
                icon: '🤝',
                title: 'Supplier Management',
                description: 'Track suppliers and manage your supply chain effectively.'
              },
              {
                icon: '📧',
                title: 'Notifications',
                description: 'Automated email alerts for orders, status updates, and inventory alerts.'
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">Sign up now and start managing your goods efficiently.</p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-neutral-100">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-400">&copy; 2026 GMS - Goods Management System. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
