import Header from '@/components/Header/Header';
import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clean Recipes',
  description:
    'Uma aplicação moderna de gestão de receitas criada com Next.js 15, Clean Architecture e TypeScript',
  keywords: ['recipes', 'cooking', 'food', 'nextjs', 'clean architecture'],
  authors: [{ name: 'Lincon Pietrochinski Fernandes' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Providers>
            <>
              <Header />
              {children}
            </>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
