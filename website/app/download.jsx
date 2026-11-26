'use client';

import { Check, Copy } from 'lucide-react';
import { useRef, useState } from 'react';

const installCommand = 'brew install --cask ankitvashisht12/tap/macing';

export default function Download() {
  const installHelp = useRef(null);
  const [copyStatus, setCopyStatus] = useState('');

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('Select the command and copy it manually.');
    }
  }

  function showInstallHelp() {
    installHelp.current.open = true;
  }

  return (
    <>
      <div className="hero-actions">
        <a className="download-link" href="/Macing.dmg" download onClick={showInstallHelp}>
          Download for Mac
        </a>
        <a className="sounds-link" href="#sounds">Try the sounds</a>
      </div>
      <div className="brew-install">
        <div className="brew-command">
          <code>{installCommand}</code>
          <button type="button" onClick={copyCommand} aria-label="Copy Homebrew command" title="Copy Homebrew command">
            {copyStatus === 'Copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          </button>
        </div>
        <span className={copyStatus ? 'copy-status' : 'visually-hidden'} role="status">{copyStatus}</span>
      </div>
      <p className="download-note">macOS 13 or later · Apple silicon and Intel</p>
      <a className="issue-link" href="#facing-an-issue">Facing an issue?</a>
      <details className="install-help" ref={installHelp}>
        <summary>Install and open Macing</summary>
        <ol>
          <li>Open the DMG and drag Macing into <strong>Applications</strong>.</li>
          <li>Open Macing from Applications. If macOS blocks it, <a href="#facing-an-issue">see the first-launch steps</a>.</li>
        </ol>
      </details>
    </>
  );
}
