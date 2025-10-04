'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

export function AppRedirectBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const dismissed = sessionStorage.getItem('appBarDismissed');
      setIsVisible(mobile && !dismissed);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRedirect = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      window.location.href = 'https://apps.apple.com/us/app/valeo-health-at-home-wellness/id1515476066';
    } else if (isAndroid) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.valeoapp';
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('appBarDismissed', 'true');
  };

  if (!isVisible || !isMobile) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-valeo-yellow px-4 py-3 flex items-center justify-between shadow-md">
      <button
        onClick={handleRedirect}
        className="flex items-center gap-2 flex-1 text-sm font-medium text-valeo-navy"
      >
        <Download className="h-4 w-4" />
        <span>Get the Valeo Health App for faster access →</span>
      </button>
      <button
        onClick={handleDismiss}
        className="ml-2 p-1 hover:bg-yellow-600 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4 text-valeo-navy" />
      </button>
    </div>
  );
}
