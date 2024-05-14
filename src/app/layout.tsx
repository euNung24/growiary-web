import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import RecoilProvider from '@/components/providers/RecoilProvider';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const font = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '그루어리',
  description: '그루어리',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RecoilProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </RecoilProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
      </body>
    </html>
  );
}
