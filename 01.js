const countdownEl = document.getElementById('countdown');
const nextTimeEl = document.getElementById('next-time');
const nextTimeBnEl = document.getElementById('next-time-bn');

const STORAGE_KEY = 'unlockTime';
const now = Date.now();
const savedUnlockTime = localStorage.getItem(STORAGE_KEY);

// Set 5 minutes instead of 12
let unlockTime = savedUnlockTime && parseInt(savedUnlockTime) > now
  ? new Date(parseInt(savedUnlockTime))
  : new Date(now + 5 * 60 * 1000);  // ← updated here

if (!savedUnlockTime || parseInt(savedUnlockTime) <= now) {
  localStorage.setItem(STORAGE_KEY, unlockTime.getTime());
}

function formatTimeLeft(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateCountdown() {
  const msLeft = unlockTime - Date.now();
  countdownEl.textContent = formatTimeLeft(msLeft);

  if (msLeft > 0) {
    requestAnimationFrame(updateCountdown);
  } else {
    countdownEl.textContent = "00:00";
  }
}

const timeOptions = { hour: '2-digit', minute: '2-digit' };
nextTimeEl.textContent = unlockTime.toLocaleTimeString([], timeOptions);
nextTimeBnEl.textContent = unlockTime.toLocaleTimeString('bn-BD', timeOptions);

updateCountdown();
