# qbio: notes for Claude

Biology training app, iPhone first, built with Expo + React Native in **plain JavaScript**. See `AGENTS.md` for general Expo guidance and `README.md` for how to run the app.

## Working with the owner

- The owner (GitHub: sbojehansen) is a **programming beginner** who is learning by building this app. Explain new concepts in plain language and keep code well commented, matching the existing files.
- Keep JavaScript (no TypeScript) and simple patterns unless the owner asks otherwise.
- Workflow: build one feature at a time → test it in the browser preview → the owner tries it on their iPhone in Expo Go → **commit and push to GitHub only when the owner says "save"**.
- The owner works on more than one computer. Pull the latest changes before starting, and push before finishing.

## Current state

- **Name quiz:** shows a structure image from PubChem (by CID, see `src/data/aminoAcids.js`) and four name choices in a 2x2 grid. It has a timer, and the results screen shows score and time.
- **Settings:** the owner chooses which amino acids to train on, saved with AsyncStorage (`src/storage/selection.js`).
- **Rule:** cards come only from the selected amino acids, but **answer choices always come from all 20**.
- **Navigation:** screens are switched with `useState` in `App.js` (no Expo Router yet). This is deliberate to keep it simple for now, despite what `AGENTS.md` says. Consider moving to Expo Router when the number of screens makes it worthwhile, and discuss it with the owner first.

## Roadmap (agreed order, one at a time)

1. **Learn mode**: browse the selected amino acids with structure, name, codes and group. **Next up.**
2. **Flip-card mode**: show the structure, tap to reveal the name, and the owner marks whether they knew it.
3. **Practise mistakes**: repeat the amino acids answered wrongly at the end of a round.
4. **Code quiz**: answer with the three-letter or one-letter code instead of the name.

All modes use only the selected amino acids.

## Windows setup tips

- PowerShell blocks `npx` (`npx.ps1`), so use **`npx.cmd`**, e.g. `npx.cmd expo start`.
- Expo Go on iOS only opens the app if the computer and the phone are signed in to the **same Expo account**. The owner signs in to Expo with GitHub, so there's no Expo password.
- `npx.cmd expo login --browser` crashes on Windows when it tries to open the browser. Workaround: run it with `$env:NODE_OPTIONS = '--unhandled-rejections=warn'` set first, then open the printed login URL yourself (for example with `Start-Process '<url>'`). Check the result with `npx.cmd expo whoami`.
