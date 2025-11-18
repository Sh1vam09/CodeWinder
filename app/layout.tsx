import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers'; // Import the new Providers component

const inter = Inter({ subsets: ['latin'] });

// This metadata export now works because layout.tsx is a Server Component
export const metadata: Metadata = {
  title: 'CodeWinder',
  description: 'Competitive Programming Hub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Use the Providers component for client-side context */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}