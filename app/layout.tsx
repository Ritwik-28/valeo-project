'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { AppRedirectBar } from '@/components/AppRedirectBar';
import { BottomNav } from '@/components/BottomNav';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavigation = !['/admin'].includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>Valeo Health - At-Home Wellness & Testing</title>
        <meta name="description" content="At-home testing, supplements & wellness programs — made simple." />
        <link rel="icon" href="https://d25uasl7utydze.cloudfront.net/assets/favicon/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AppRedirectBar />
        <main className="min-h-screen pb-20">
          {children}
          <Analytics />
        </main>
        {showNavigation && <BottomNav />}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
