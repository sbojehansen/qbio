// Returns a new array with the same items in a random order.
// (This is the "Fisher-Yates shuffle", a classic algorithm.)
// We copy the array first so the original list is never changed.
export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    // Pick a random position from 0 up to i...
    const j = Math.floor(Math.random() * (i + 1));
    // ...and swap the two items.
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
