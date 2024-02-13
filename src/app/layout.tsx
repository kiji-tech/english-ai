import type { Metadata } from 'next';
import './globals.scss';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'kiji-tech-ui-component/src/providers/theme';
import Providers from './providers';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'English AI Correction',
    description: 'This application correct your English diary and output better  English of Native  text.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
