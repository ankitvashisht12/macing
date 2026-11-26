'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const installCommand = 'brew install --formula ankitvashisht12/tap/macing && macing';

export function HomebrewCommand() {
  const [copyStatus, setCopyStatus] = useState('');
  const copyReset = useRef(null);

  useEffect(() => () => clearTimeout(copyReset.current), []);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      clearTimeout(copyReset.current);
      setCopyStatus('Copied');
      copyReset.current = setTimeout(() => setCopyStatus(''), 2500);
    } catch {
      clearTimeout(copyReset.current);
      setCopyStatus('Select the command and copy it manually.');
    }
  }

  return (
    <div className="brew-install">
      <div className="brew-command">
        <code>{installCommand}</code>
        <button type="button" onClick={copyCommand} aria-label="Copy Homebrew command" title="Copy Homebrew command">
          {copyStatus === 'Copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        </button>
      </div>
      <span className={copyStatus ? 'copy-status' : 'visually-hidden'} role="status">{copyStatus}</span>
    </div>
  );
}

export default function Download() {
  return (
    <>
      <HomebrewCommand />
      <p className="download-note">macOS 13 or later · Apple silicon and Intel</p>
      <div className="installation-links">
        <a href="#installation">Installation steps</a>
        <span aria-hidden="true"> · </span>
        <a href="#configure-sounds">Configure</a>
      </div>
    </>
  );
}
