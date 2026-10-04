import type {Metadata} from 'next';
import {Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BTC6 Terminal - 1H Bitcoin Candle Prediction & NFT Ticket Platform',
  description: 'High-precision provably fair 1-hour Bitcoin candle prediction platform and digital ticket ledger.',
  openGraph: {
    title: 'BTC6 Terminal - 1H Bitcoin Candle Prediction',
    description: 'High-precision provably fair 1-hour Bitcoin candle prediction platform and digital ticket ledger.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTC6 Terminal',
    description: 'High-precision provably fair 1-hour Bitcoin candle prediction platform and digital ticket ledger.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`dark ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#10131a] text-[#e1e2eb] antialiased selection:bg-[#00f2fe] selection:text-[#002022]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
