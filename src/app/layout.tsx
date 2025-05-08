import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import RecoilProvider from '@/components/providers/RecoilProvider';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { APP_INFO } from '@/shared/utils/appInfo';
import { Viewport } from 'next';
import HotjarSnippet from '@/shared/views/common/HotJarSnippet';

const font = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: APP_INFO.URL,
  applicationName: APP_INFO.NAME,
  title: {
    default: APP_INFO.DEFAULT_TITLE,
    template: APP_INFO.TITLE_TEMPLATE,
  },
  description: APP_INFO.DESCRIPTION,
  icons: {
    icon: '/favicon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: APP_INFO.NAME,
    // startUpImage: [],
  },
  keywords: ['그루어리', '성장', '다이어리', '노트', '리포트'],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_INFO.NAME,
    title: {
      default: APP_INFO.DEFAULT_TITLE,
      template: APP_INFO.TITLE_TEMPLATE,
    },
    description: APP_INFO.DESCRIPTION,
    images: {
      url: '/assets/images/thumb.png',
    },
  },
  verification: {
    google: '-SpawxeuLdcJ5iD2LjzD2BV-Arb960Rg2HQ8c8wqxy8',
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_INFO.DEFAULT_TITLE,
      template: APP_INFO.TITLE_TEMPLATE,
    },
    description: APP_INFO.DESCRIPTION,
    images: {
      url: '/assets/images/thumb.png',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className="overflow-hidden">
      <body className={font.className}>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE} />
        <RecoilProvider>
          <ReactQueryProvider>
            <div
              id="scroll"
              className="h-dvh overflow-auto pt-safeTop"
              style={{
                scrollbarGutter: 'stable',
              }}
            >
              {children}
            </div>
          </ReactQueryProvider>
        </RecoilProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID2 || ''} />
        <HotjarSnippet />
      </body>
    </html>
  );
}
