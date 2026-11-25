'use client';

import { useState } from 'react';

const packs = {
  Halo: ['halo-soft', 'halo-space', 'halo-shift'],
  Hi75: ['hi75-soft', 'hi75-space', 'hi75-soft'],
  ASUS: ['asus-kbd-soft', 'asus-kbd-space', 'asus-kbd-soft'],
  UHK: ['uhk-soft', 'uhk-space', 'uhk-soft'],
};

export default function Demo() {
  const [pack, setPack] = useState('Halo');
  const [error, setError] = useState('');
  function play(keyIndex) {
    setError('');
    const audio = new Audio('/sounds/' + packs[pack][keyIndex] + '.wav');
    audio.play().catch(() => setError('Sound could not play. Try pressing a key again.'));
  }

  return <section id="sounds" className="demo" aria-labelledby="demo-title">
    <div className="demo-copy">
      <h2 id="demo-title">Hear the difference.</h2>
      <p>Pick a keyboard pack and tap a key.</p>
    </div>
    <div className="controls">
      <label htmlFor="pack">Keyboard pack</label>
      <select id="pack" value={pack} onChange={event => setPack(event.target.value)}>
        {Object.keys(packs).map(name => <option key={name}>{name}</option>)}
      </select>
      <div className="keys">
        {['A', 'Space', 'Shift'].map((key, keyIndex) => <button type="button" key={key} onClick={() => play(keyIndex)}>{key}</button>)}
      </div>
      {error && <p role="status">{error}</p>}
    </div>
  </section>;
}
