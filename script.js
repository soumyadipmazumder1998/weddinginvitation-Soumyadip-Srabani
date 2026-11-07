/* ===================================================
   TRADITIONAL & REGAL WEDDING E-CARD SCRIPTS
   Soumyadip & Srabani's Wedding Reception
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. COUNTDOWN TIMER
  // Target: Reception on January 31, 2027 at 18:30:00 IST
  const targetDate = new Date('2027-01-31T18:30:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
      const heading = document.querySelector('.countdown-heading');
      if (heading) heading.innerText = 'The Auspicious Day is Here!';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = pad(days);
    if (hoursEl) hoursEl.innerText = pad(hours);
    if (minutesEl) minutesEl.innerText = pad(minutes);
    if (secondsEl) secondsEl.innerText = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 2. FALLING GOLDEN PETALS & SPARKLES CANVAS
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28;

    // Petal colors: Royal Rose, Marigold, Shimmering Gold
    const colors = [
      'rgba(212, 175, 55, 0.75)',  // Gold
      'rgba(255, 140, 0, 0.65)',   // Marigold orange
      'rgba(220, 20, 60, 0.65)',   // Crimson rose
      'rgba(255, 215, 0, 0.7)'     // Pure gold sparkle
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 5,
        speedX: Math.random() * 1.2 - 0.6,
        speedY: Math.random() * 1.5 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.4,
        isSparkle: Math.random() > 0.6
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.isSparkle) {
          // Draw sparkling 4-point star
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw graceful petal shape
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(p.size, -p.size * 0.5, p.size * 1.5, 0);
          ctx.quadraticCurveTo(p.size, p.size * 0.5, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // 3. AUTHENTIC BENGALI SHEHNAI AUDIO PLAYER (USTAD BISMILLAH KHAN)
  const audioEl = document.getElementById('weddingAudio');
  const musicToggleBtn = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const openInvitationBtn = document.getElementById('openInvitationBtn');

  let isPlaying = false;
  let userExplicitlyPaused = false;

  function updateMusicUI(playing) {
    isPlaying = playing;
    if (musicIcon) {
      musicIcon.innerText = playing ? '🔊' : '🎵';
    }
    if (musicToggleBtn) {
      const textEl = musicToggleBtn.querySelector('.music-text');
      if (playing) {
        musicToggleBtn.classList.add('playing');
        if (textEl) textEl.innerText = 'Playing Shehnai';
      } else {
        musicToggleBtn.classList.remove('playing');
        if (textEl) textEl.innerText = 'Play Shehnai';
      }
    }
  }

  function dismissEnvelope() {
    if (envelopeOverlay && !envelopeOverlay.classList.contains('opened')) {
      envelopeOverlay.classList.add('opened');
      setTimeout(() => {
        envelopeOverlay.style.display = 'none';
      }, 700);
      try {
        sessionStorage.setItem('invitation_opened', 'true');
      } catch (e) {}
    }
  }

  function playBengaliShehnai() {
    if (!audioEl) return;
    audioEl.volume = 0.85;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateMusicUI(true);
        userExplicitlyPaused = false;
        dismissEnvelope();
      }).catch(err => {
        console.log('Autoplay deferred by browser policy (awaiting user gesture):', err);
        // Show envelope overlay so any tap immediately plays the Shehnai
        if (envelopeOverlay) {
          envelopeOverlay.classList.remove('opened');
          envelopeOverlay.style.display = 'flex';
        }
      });
    }
  }

  function pauseBengaliShehnai() {
    if (audioEl) {
      audioEl.pause();
      userExplicitlyPaused = true;
      updateMusicUI(false);
    }
  }

  // A. Immediate playback attempts on script execution and window load
  playBengaliShehnai();

  window.addEventListener('load', () => {
    if (!isPlaying && !userExplicitlyPaused) {
      playBengaliShehnai();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !isPlaying && !userExplicitlyPaused) {
      playBengaliShehnai();
    }
  });

  // B. Ceremonial Envelope triggers (Clicking button or anywhere on overlay)
  if (envelopeOverlay) {
    envelopeOverlay.addEventListener('click', () => {
      dismissEnvelope();
      if (!isPlaying) {
        playBengaliShehnai();
      }
    });
  }

  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissEnvelope();
      if (!isPlaying) {
        playBengaliShehnai();
      }
    });
  }

  // C. Instant full-screen gesture triggers (Chrome guarantees unmuted playback on pointerdown/touchstart/click/keydown)
  const activationEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];
  function onFirstUserGesture() {
    if (!isPlaying && !userExplicitlyPaused) {
      playBengaliShehnai();
      dismissEnvelope();
    }
  }
  activationEvents.forEach(evt => {
    window.addEventListener(evt, onFirstUserGesture, { passive: true });
  });

  // D. Floating Music Toggle (Pause / Resume on the playing Shehnai button itself)
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        pauseBengaliShehnai();
      } else {
        userExplicitlyPaused = false;
        playBengaliShehnai();
      }
    });
  }

  // 4. ADD TO CALENDAR BUTTON
  const calendarBtn = document.getElementById('addToCalendarBtn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      const title = encodeURIComponent("Wedding Reception of Soumyadip and Srabani");
      const details = encodeURIComponent("Wedding Ceremony: Friday, 29th January 2027 | Wedding Reception: Sunday, 31st January 2027. Celebrating Soumyadip and Srabani. Venue: Saha Complex, 7CQ4+C6C, Sasanka Shekhar Manna Rd, Multi, West Bengal 743610. With best compliments from Mr. Pradip Mazumder and Mrs. Sunita Mazumder.");
      const location = encodeURIComponent("Saha Complex, 7CQ4+C6C, Sasanka Shekhar Manna Rd, Multi, West Bengal 743610");
      // ISO strings for Jan 31, 2027 18:30:00 to 23:30:00 IST (+05:30)
      // UTC: 2027-01-31 13:00:00Z to 18:00:00Z
      const startTime = "20270131T130000Z";
      const endTime = "20270131T180000Z";

      // Offer choice / default to Google Calendar or iCal file
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;

      // Open Google Calendar in new tab
      window.open(googleCalUrl, '_blank');
    });
  }

  // 5. DIRECT HIGH-RES CARD DOWNLOAD (Instant PNG Download without Opening UI)
  const downloadCardBtn = document.getElementById('downloadCardBtn');
  const directCanvas = document.getElementById('directExportCanvas');

  if (downloadCardBtn && directCanvas) {
    const directCtx = directCanvas.getContext('2d');

    function drawDirectCard() {
      const W = 1080;
      const H = 1920;

      // Background
      const bgGrad = directCtx.createRadialGradient(W/2, H*0.35, 100, W/2, H/2, 900);
      bgGrad.addColorStop(0, '#4e0d19');
      bgGrad.addColorStop(0.6, '#2a050b');
      bgGrad.addColorStop(1, '#170206');
      directCtx.fillStyle = bgGrad;
      directCtx.fillRect(0, 0, W, H);

      // Gold Gradient Generator
      function getGoldGradient(x1, y1, x2, y2) {
        const g = directCtx.createLinearGradient(x1, y1, x2, y2);
        g.addColorStop(0, '#c59b27');
        g.addColorStop(0.25, '#f7e692');
        g.addColorStop(0.5, '#d4af37');
        g.addColorStop(0.75, '#fff4c2');
        g.addColorStop(1, '#a8791c');
        return g;
      }

      // Outer Double Frame
      directCtx.lineWidth = 10;
      directCtx.strokeStyle = getGoldGradient(0, 0, W, H);
      directCtx.strokeRect(40, 40, W - 80, H - 80);

      directCtx.lineWidth = 3;
      directCtx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      directCtx.strokeRect(60, 60, W - 120, H - 120);

      // Corner Flourishes
      const cornerSize = 70;
      const corners = [
        { x: 50, y: 50, dx: 1, dy: 1 },
        { x: W - 50, y: 50, dx: -1, dy: 1 },
        { x: 50, y: H - 50, dx: 1, dy: -1 },
        { x: W - 50, y: H - 50, dx: -1, dy: -1 }
      ];
      corners.forEach(c => {
        directCtx.beginPath();
        directCtx.lineWidth = 6;
        directCtx.strokeStyle = getGoldGradient(c.x, c.y, c.x + c.dx * cornerSize, c.y + c.dy * cornerSize);
        directCtx.moveTo(c.x, c.y + c.dy * cornerSize);
        directCtx.lineTo(c.x, c.y);
        directCtx.lineTo(c.x + c.dx * cornerSize, c.y);
        directCtx.stroke();

        directCtx.fillStyle = '#f7e692';
        directCtx.beginPath();
        directCtx.arc(c.x + c.dx * 16, c.y + c.dy * 16, 5, 0, Math.PI * 2);
        directCtx.fill();
      });

      // 1. Sacred Om Motif
      const oX = W / 2, oY = 220;
      directCtx.save();
      directCtx.beginPath();
      directCtx.lineWidth = 4;
      directCtx.strokeStyle = getGoldGradient(oX - 75, oY - 75, oX + 75, oY + 75);
      directCtx.setLineDash([10, 6]);
      directCtx.arc(oX, oY, 72, 0, Math.PI * 2);
      directCtx.stroke();
      directCtx.setLineDash([]);

      directCtx.beginPath();
      directCtx.lineWidth = 2.5;
      directCtx.strokeStyle = 'rgba(212, 175, 55, 0.75)';
      directCtx.arc(oX, oY, 64, 0, Math.PI * 2);
      directCtx.stroke();

      directCtx.beginPath();
      directCtx.fillStyle = 'rgba(60, 10, 18, 0.45)';
      directCtx.arc(oX, oY, 56, 0, Math.PI * 2);
      directCtx.fill();

      directCtx.textAlign = 'center';
      directCtx.font = '900 86px "Cinzel Decorative", "Georgia", serif';
      directCtx.fillStyle = getGoldGradient(oX - 45, oY - 45, oX + 45, oY + 45);
      directCtx.fillText('ॐ', oX, oY + 30);
      directCtx.restore();

      // 2. Sanskrit Shloka
      directCtx.textAlign = 'center';
      directCtx.font = '700 36px "Cinzel", "Georgia", serif';
      directCtx.fillStyle = '#fef1b8';
      directCtx.fillText('॥ ॐ प्रजापतये नमः ॥', W/2, 340);

      function drawGoldDivider(cx, cy, length) {
        directCtx.beginPath();
        directCtx.lineWidth = 2;
        directCtx.strokeStyle = getGoldGradient(cx - length/2, cy, cx + length/2, cy);
        directCtx.moveTo(cx - length/2, cy);
        directCtx.lineTo(cx + length/2, cy);
        directCtx.stroke();

        directCtx.fillStyle = '#d4af37';
        directCtx.beginPath();
        directCtx.moveTo(cx, cy - 8);
        directCtx.lineTo(cx + 8, cy);
        directCtx.lineTo(cx, cy + 8);
        directCtx.lineTo(cx - 8, cy);
        directCtx.closePath();
        directCtx.fill();
      }

      drawGoldDivider(W/2, 380, 240);

      // 3. Invitation Lead
      directCtx.font = '400 28px "Montserrat", sans-serif';
      directCtx.fillStyle = '#e2cbb2';
      directCtx.fillText('With the divine blessings of Almighty,', W/2, 440);
      directCtx.fillText('we cordially invite you to celebrate the', W/2, 480);

      // 4. Wedding Reception Title
      directCtx.font = '900 62px "Cinzel Decorative", "Georgia", serif';
      directCtx.fillStyle = getGoldGradient(200, 560, 880, 560);
      directCtx.fillText('WEDDING RECEPTION', W/2, 570);

      // "of"
      directCtx.font = 'italic 58px "Great Vibes", cursive';
      directCtx.fillStyle = '#fef1b8';
      directCtx.fillText('of', W/2, 650);

      // 5. Couple Names: SOUMYADIP & SRABANI
      directCtx.font = '900 84px "Cinzel Decorative", "Georgia", serif';
      directCtx.fillStyle = getGoldGradient(150, 770, 930, 770);
      directCtx.fillText('SOUMYADIP', W/2, 760);

      directCtx.font = 'italic 92px "Great Vibes", cursive';
      directCtx.fillStyle = '#fef1b8';
      directCtx.fillText('&', W/2, 850);

      directCtx.font = '900 84px "Cinzel Decorative", "Georgia", serif';
      directCtx.fillStyle = getGoldGradient(150, 960, 930, 960);
      directCtx.fillText('SRABANI', W/2, 950);

      drawGoldDivider(W/2, 1020, 320);

      // 6. Auspicious Reception Date Box
      const bX = 140, bY = 1070, bW = 800, bH = 220;
      directCtx.fillStyle = 'rgba(20, 2, 6, 0.75)';
      directCtx.fillRect(bX, bY, bW, bH);
      directCtx.lineWidth = 2;
      directCtx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      directCtx.strokeRect(bX, bY, bW, bH);

      directCtx.font = '700 48px "Cinzel", "Georgia", serif';
      directCtx.fillStyle = '#fef1b8';
      directCtx.fillText('SUNDAY, 31 JANUARY 2027', W/2, bY + 80);

      directCtx.font = '600 32px "Montserrat", sans-serif';
      directCtx.fillStyle = '#d4af37';
      directCtx.fillText('EVENING 6:30 PM ONWARDS', W/2, bY + 145);

      // 7. Venue Details
      directCtx.font = '600 24px "Montserrat", sans-serif';
      directCtx.fillStyle = '#d4af37';
      directCtx.letterSpacing = '3px';
      directCtx.fillText('VENUE', W/2, 1345);

      directCtx.font = '700 48px "Cinzel", "Georgia", serif';
      directCtx.fillStyle = '#ffffff';
      directCtx.fillText('SAHA COMPLEX', W/2, 1395);

      directCtx.font = '400 26px "Montserrat", sans-serif';
      directCtx.fillStyle = '#e2cbb2';
      directCtx.fillText('Sasanka Shekhar Manna Rd, Multi, West Bengal 743610', W/2, 1438);

      directCtx.font = 'italic 20px "Montserrat", sans-serif';
      directCtx.fillStyle = '#f7e692';
      directCtx.fillText('Note: Take public transport from front of Dhamua SBI branch', W/2, 1472);

      // 8. Sacred Wedding Ceremony Highlight Box
      const wBoxY = 1505, wBoxW = 760, wBoxX = (W - wBoxW) / 2;
      directCtx.fillStyle = 'rgba(75, 10, 20, 0.85)';
      directCtx.fillRect(wBoxX, wBoxY, wBoxW, 105);
      directCtx.lineWidth = 2;
      directCtx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      directCtx.strokeRect(wBoxX, wBoxY, wBoxW, 105);

      directCtx.font = '600 20px "Montserrat", sans-serif';
      directCtx.fillStyle = '#f7e692';
      directCtx.fillText('💍 SACRED WEDDING CEREMONY', W/2, wBoxY + 38);

      directCtx.font = '700 34px "Cinzel", "Georgia", serif';
      directCtx.fillStyle = '#ffffff';
      directCtx.fillText('FRIDAY, 29 JANUARY 2027', W/2, wBoxY + 80);

      drawGoldDivider(W/2, 1650, 280);

      // 9. With Best Compliments
      directCtx.font = '600 22px "Montserrat", sans-serif';
      directCtx.fillStyle = '#d4af37';
      directCtx.fillText('WITH BEST COMPLIMENTS FROM', W/2, 1700);

      directCtx.font = '700 34px "Cinzel", "Georgia", serif';
      directCtx.fillStyle = '#fef1b8';
      directCtx.fillText('Mr. Pradip Mazumder & Mrs. Sunita Mazumder', W/2, 1765);
    }

    downloadCardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const btnText = document.getElementById('downloadCardBtnText');
      if (btnText) btnText.innerText = 'Downloading Card... ⏳';

      document.fonts.ready.then(() => {
        drawDirectCard();
        const image = directCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'Soumyadip_and_Srabani_Wedding_Reception_Card.png';
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (btnText) btnText.innerText = 'Card Downloaded! ✓';
        setTimeout(() => {
          if (btnText) btnText.innerText = 'Get the Card';
        }, 2500);
      });
    });
  }

});
