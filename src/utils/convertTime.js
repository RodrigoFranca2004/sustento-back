// Receive time in format "hh:mm:ss" and returns datetime with 1970-01-01 fixed

export function convertTime(timeStr) {
  const [hours, minutes, seconds = 0] = timeStr.split(":").map(Number);
  return new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));
}