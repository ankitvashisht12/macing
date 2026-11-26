'use client';

import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try {
      localStorage.setItem('macing-theme', theme);
    } catch {
      // The toggle still works when the browser blocks storage.
    }
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}>
      <span className="theme-light" title="Switch to dark mode">
        <Moon size={19} aria-hidden="true" />
        <span className="visually-hidden">Switch to dark mode</span>
      </span>
      <span className="theme-dark" title="Switch to light mode">
        <Sun size={19} aria-hidden="true" />
        <span className="visually-hidden">Switch to light mode</span>
      </span>
    </button>
  );
}
