'use client';

import { useRef } from 'react';

export default function Download() {
  const installHelp = useRef(null);

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
