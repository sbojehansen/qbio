// Turns a number of seconds into "minutes:seconds" text, e.g. 75 → "1:15".
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60; // % gives the remainder after dividing
  // padStart adds a leading zero when needed, so 5 seconds shows as "05".
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
