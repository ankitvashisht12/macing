import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './style.css';

export const metadata = {
  title: 'Macing — Mechanical keyboard sounds for Mac',
  description: 'Give your Mac keyboard a mechanical sound with Macing, a native menu bar app.',
  icons: { icon: '/macing-logo.png' },
};

const initializeTheme = `
  (() => {
    let theme;
    try { theme = localStorage.getItem('macing-theme'); } catch {}
    if (theme !== 'light' && theme !== 'dark') {
      theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
  })();
`;

export default function Layout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable + ' ' + GeistMono.variable} suppressHydrationWarning>
      <body>
        <Script id="macing-theme" strategy="beforeInteractive">{initializeTheme}</Script>
        {children}
      </body>
    </html>
  );
}
