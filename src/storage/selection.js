import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage saves small pieces of text on the phone, so they're still
// there after the app is closed. Each saved value has a name (a "key").
const STORAGE_KEY = 'selectedAminoAcids';

// Loads the saved list of amino acid names, or null if nothing is saved yet.
//
// "async" functions do work that takes a moment (like reading from storage).
// "await" waits for that work to finish before moving on.
export async function loadSelection() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    // We store the list as JSON text, so turn it back into an array.
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    // If reading fails, just fall back to the default (all selected).
    return null;
  }
}

// Saves the list of selected amino acid names.
export async function saveSelection(names) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  } catch (error) {
    // Not being able to save isn't serious: the app still works,
    // it just won't remember the selection next time.
  }
}
