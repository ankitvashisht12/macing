import Image from 'next/image';
import { Github, Volume2 } from 'lucide-react';
import ThemeToggle from './theme-toggle';
import Demo from './demo';
import Download from './download';

export default function Home() {
  return <div className="shell" id="top">
    <header>
      <a className="brand" href="#top" aria-label="Macing home">
        <Image src="/macing-logo.png" alt="" width={36} height={36} />
        Macing
      </a>
      <nav aria-label="Main navigation">
        <a href="#sounds"><Volume2 size={18} aria-hidden="true" /><span className="nav-label">Sounds</span></a>
        <a className="github-link" href="https://github.com/ankitvashisht12/macing"><Github size={18} aria-hidden="true" /><span className="nav-label">GitHub</span></a>
        <ThemeToggle />
      </nav>
    </header>
    <main>
      <section className="hero">
        <h1>
          <span className="hero-line">
            Mechanical{' '}
            <span className="hero-icon-pair">
              keyboard
              <Image className="hero-art hero-keyboard" src="/hero-keyboard.webp" alt="" width={360} height={151} unoptimized />
            </span>
          </span>{' '}
          <span className="hero-line">
            sounds for your{' '}
            <span className="hero-icon-pair">
              Mac.
              <Image className="hero-art hero-mac" src="/hero-mac-face.webp" alt="" width={240} height={244} unoptimized />
            </span>
          </span>
        </h1>
        <p>Give every key a satisfying click. Pick a keyboard pack, customize Space and Shift, and switch it all from your menu bar.</p>
        <Download />
      </section>
      <section className="story" aria-labelledby="why-macing">
        <h2 id="why-macing">Why I built it</h2>
        <div>
          <p>I’m a big fan of mechanical keyboards. These days I do a lot of my work on my MacBook from the couch, and I missed hearing those clicks as I typed.</p>
          <p>Then I came across <a href="https://buttons.joshwcomeau.com/">Josh Comeau’s Button Sounds</a>, a fantastic library of recorded clicks. I wondered what it would sound like to give my MacBook those same clicks, so I built Macing.</p>
        </div>
      </section>
      <Demo />
      <section className="issue-help" aria-labelledby="facing-an-issue">
        <div>
          <h2 id="facing-an-issue">Facing an issue?</h2>
          <p>When you open an app downloaded outside the Mac App Store, macOS checks its Developer ID signature and whether Apple has scanned the build for known malware. This scan is called notarization. Both steps require an Apple Developer Program membership. I don’t have one yet, so macOS may show <strong>“Macing” Not Opened</strong> the first time you launch it. If you choose <strong>Open Anyway</strong>, macOS remembers your choice for that copy.</p>
          <p>I built Macing to play a sound when you press a key. It uses Input Monitoring to detect key presses and does not save what you type. The <a href="https://github.com/ankitvashisht12/macing">source code is public</a>. You can read it yourself, ask a tool to help explain or review it, or build the app yourself using the steps below.</p>
        </div>
        <div className="issue-options">
          <div>
            <h3>Open the downloaded app</h3>
            <ol>
              <li>Open Macing from <strong>Applications</strong>. If you see the warning, click <strong>Done</strong>.</li>
              <li>In <strong>System Settings → Privacy &amp; Security</strong>, scroll to <strong>Security</strong>, click <strong>Open Anyway</strong> for Macing, and confirm.</li>
            </ol>
            <a className="settings-link" href="x-apple.systempreferences:com.apple.settings.PrivacySecurity.extension">
              Open Privacy &amp; Security
            </a>
          </div>
          <div>
            <h3>Build Macing from source</h3>
            <p>I’m sharing the source so you can read it and build Macing on your Mac. <a href="/Macing-source.zip" download>Download the source ZIP</a> and unzip it. With Apple’s Command Line Tools installed, open the extracted folder in Terminal and run these commands.</p>
            <pre><code>{'./build.sh\nopen Macing.app'}</code></pre>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <span>Developed by <a href="https://ankitvashisht.in/">Ankit Vashisht</a></span>
      <a href="/sounds/LICENSE.txt">Recording license</a>
    </footer>
  </div>;
}
