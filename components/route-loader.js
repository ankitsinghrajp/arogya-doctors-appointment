// components/RouteLoader.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function RouteLoader({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleEnd);
    router.events?.on('routeChangeError', handleEnd);

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleEnd);
      router.events?.off('routeChangeError', handleEnd);
    };
  }, []);

  return (
    <>
      {loading && <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 animate-pulse z-50"></div>}
      {children}
    </>
  );
}
