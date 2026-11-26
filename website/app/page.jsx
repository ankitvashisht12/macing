import Image from 'next/image';
import { Github, Volume2 } from 'lucide-react';
import ThemeToggle from './theme-toggle';
import Demo from './demo';
import Download, { HomebrewCommand } from './download';

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
        <a className="hero-badge" href="https://github.com/ankitvashisht12/macing">Free · Open Source</a>
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
      <section className="installation" aria-labelledby="installation">
        <h2 id="installation">Installation steps</h2>
        <div className="install-method">
          <h3>Install with Homebrew</h3>
          <p>With Homebrew installed, paste this command into Terminal to build and open Macing.</p>
          <HomebrewCommand />
          <h4 id="input-monitoring">Set up Input Monitoring</h4>
          <p>Both install methods need this permission. Macing uses it to play sounds when you press a key and does not save what you type.</p>
          <ol className="setup-steps">
            <li>
              <p>Choose <strong>Open System Settings</strong> when macOS asks.</p>
              <Image src="/setup/keystroke-prompt.png" alt="Macing’s Keystroke Receiving prompt" width={942} height={378} />
            </li>
            <li>
              <p>Turn on <strong>Macing</strong> in Input Monitoring.</p>
              <Image src="/setup/input-monitoring.png" alt="Input Monitoring with Macing turned on" width={990} height={470} />
            </li>
            <li>
              <p>If prompted, choose <strong>Quit &amp; Reopen</strong>. Then <a href="#configure-sounds">configure your sounds</a>.</p>
              <Image src="/setup/quit-and-reopen.png" alt="The macOS prompt with the Quit & Reopen button" width={540} height={460} />
            </li>
          </ol>
        </div>
        <div className="install-method">
          <h3>Build from source</h3>
          <p><a href="/Macing-source.zip" download>Download the source ZIP</a> and unzip it. With Apple’s Command Line Tools installed, open the extracted folder in Terminal and run:</p>
          <pre><code>{'./build.sh\nopen Macing.app'}</code></pre>
          <p>Then follow the <a href="#input-monitoring">Input Monitoring steps</a> above.</p>
        </div>
      </section>
      <section className="configure-sounds" aria-labelledby="configure-sounds">
        <h2 id="configure-sounds">Configure your sounds</h2>
        <div className="sound-settings">
          <figure>
            <figcaption>
              <h3>Choose a keyboard pack</h3>
              <p>Click the keyboard icon in your Mac’s menu bar. Open <strong>Keyboard Pack</strong> to choose a pack, or use <strong>Typing Sounds</strong> to turn playback on or off.</p>
            </figcaption>
            <Image src="/setup/macing-menu.png" alt="Macing menu showing Typing Sounds and the Halo keyboard pack" width={526} height={436} />
          </figure>
          <figure>
            <figcaption>
              <h3>Customize individual sounds</h3>
              <p>Open <strong>Typing Sound</strong>, <strong>Space Sound</strong>, or <strong>Shift Sound</strong> to pick a recording. Choose <strong>Pack Default</strong> to restore the pack’s sound.</p>
            </figcaption>
            <Image src="/setup/space-sound-menu.png" alt="Space Sound submenu with Pack Default and individual recordings" width={818} height={1098} />
          </figure>
        </div>
      </section>
    </main>
    <footer>
      <span>Developed by <a href="https://ankitvashisht.in/">Ankit Vashisht</a></span>
      <a href="/sounds/LICENSE.txt">Recording license</a>
    </footer>
  </div>;
}
