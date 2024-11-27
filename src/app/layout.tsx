import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tout ce qu’il faut savoir sur Git',
  description: 'Apprenez les bases essentielles de Git de manière simple et intuitive.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Tout ce qu’il faut savoir sur Git',
    description: 'Apprenez les bases essentielles de Git de manière simple et intuitive.',
    url: 'https://git-guide.kevinkenfack.com',
    images: [
      {
        url: '/social.png',
        width: 1200,
        height: 630,
        alt: 'Une image descriptive pour le guide Git',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="fr">
      <body className={`${inter.className} bg-black text-gray-100 flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-900 text-center py-4 text-sm text-gray-500">
          &copy; {currentYear} Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
