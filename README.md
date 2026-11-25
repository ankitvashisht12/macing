# Macing

Mechanical keyboard sounds for your Mac. Macing runs in the menu bar, starts
with the Halo keyboard pack, and lets you set separate sounds for typing,
Space, and Shift.

## Build the app

Install Apple's Command Line Tools with `xcode-select --install`. Then run
these commands from the repository root:

```sh
./build.sh
open Macing.app
```

Allow **Input Monitoring** in **System Settings → Privacy & Security** so
Macing can play sounds while you type in other apps.

## Run the website

```sh
cd website
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To deploy to Vercel, set the
project's root directory to `website`.

## License

Macing's source is available under the [MIT License](LICENSE). The keyboard
recordings are from Josh Comeau's [Button Sounds](https://buttons.joshwcomeau.com/)
and retain their [original MIT license](Resources/Button-Sounds-LICENSE.txt).
