import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './style.css';

export const metadata = {
  title: 'Macing — Mechanical keyboard sounds for Mac',
  description: 'Give your Mac keyboard a mechanical sound with Macing, a native menu bar app.',
  icons: { icon: '/macing-logo.png' },
};

export default function Layout({ children }) {
  return <html lang="en" className={GeistSans.variable + ' ' + GeistMono.variable}><body>{children}</body></html>;
}
