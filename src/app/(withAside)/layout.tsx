import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import UserProvider from '@/components/providers/UserProvider';
import { Metadata, Viewport } from 'next';
import { APP_INFO } from '@/utils/appInfo';
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
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_INFO.DEFAULT_TITLE,
      template: APP_INFO.TITLE_TEMPLATE,
    },
    description: APP_INFO.DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function asLayout({ modal, children }: LayoutProps) {
  return (
    <div>
      {modal}
      <UserProvider>
        <Sidebar />
        <div className="w-full pl-[200px] lg:pl-[68px]">
          <main className="mx-auto relative w-[960px] md:w-[640px] sm:w-[320px] [&>*]:mx-2.5">
            {children}
          </main>
        </div>
      </UserProvider>
      <Toaster />
    </div>
  );
}
