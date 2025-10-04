'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Users, CreditCard, Wallet } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/referrals', label: 'Referrals', icon: Users },
    { href: '/subscriptions', label: 'Plans', icon: CreditCard },
    { href: '/wallet', label: 'Wallet', icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? 'text-valeo-navy'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 ${isActive ? 'stroke-2' : ''}`} />
                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
