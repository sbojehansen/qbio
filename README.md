# qbio

A biology training app for iPhone (and Android), built with [Expo](https://expo.dev) and React Native in JavaScript.

## Quizzes

- **Amino acid flashcards**: see the chemical structure of one of the 20 standard amino acids and pick its name. Structure images come from [PubChem](https://pubchem.ncbi.nlm.nih.gov/).

## Running the app

1. Install dependencies (only needed once, or after pulling new changes):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npx expo start
   ```
3. Open the **Camera** app on your iPhone and scan the QR code shown in the terminal. It opens the app in **Expo Go**. Your phone and PC must be on the same Wi-Fi network.

Save a file and the app on your phone reloads automatically.

## Project layout

```
App.js                  The root of the app: switches between screens
src/
  data/aminoAcids.js    The list of amino acids (names, codes, groups)
  screens/              One file per screen (Home, Quiz, Results)
  components/           Small reusable pieces, like BigButton
  utils/shuffle.js      Helper that puts a list in random order
  theme.js              The app's colours
```
