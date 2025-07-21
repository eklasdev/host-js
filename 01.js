    // 12-minute countdown timer
    const countdownEl = document.getElementById('countdown');
    const nextTimeEl = document.getElementById('next-time');
    const nextTimeBnEl = document.getElementById('next-time-bn');

    const unlockTime = new Date(Date.now() + 12 * 60 * 1000);

    function formatTimeLeft(ms) {
      const totalSeconds = Math.max(0, Math.floor(ms / 1000));
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    function updateCountdown() {
      const now = new Date();
      const msLeft = unlockTime - now;
      countdownEl.textContent = formatTimeLeft(msLeft);

      if (msLeft > 0) {
        requestAnimationFrame(updateCountdown);
      }
    }

    // Set unlock time displays
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    nextTimeEl.textContent = unlockTime.toLocaleTimeString([], timeOptions);
    nextTimeBnEl.textContent = unlockTime.toLocaleTimeString('bn-BD', timeOptions);

    updateCountdown();
