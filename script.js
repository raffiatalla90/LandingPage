/**
 * GETMASJID DIGITAL BUMPER - RUNTIME CONTROLLER
 * Handles:
 * 1. 3-5 second looping carousel (slot transitions between 3 prototype phones)
 * 2. Feature card highlight synchronization
 * 3. Responsive 1920x1080 stage scaling
 * 4. Fullscreen TV booth mode
 * 5. High-definition 1920x1080 PNG Export
 * 6. Toolbar show / hide controls
 */

document.addEventListener('DOMContentLoaded', () => {
  const bumperStage = document.getElementById('bumperStage');
  const expoToolbar = document.getElementById('expoToolbar');
  const btnToggleToolbar = document.getElementById('btnToggleToolbar');
  const btnUnhideToolbar = document.getElementById('btnUnhideToolbar');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const btnExportPNG = document.getElementById('btnExportPNG');
  const btnTogglePlay = document.getElementById('btnTogglePlay');
  const playIcon = document.getElementById('playIcon');
  const speedDisplay = document.getElementById('speedDisplay');
  const speedButtons = document.querySelectorAll('.btn-speed');
  
  const phone0 = document.getElementById('phone-0');
  const phone1 = document.getElementById('phone-1');
  const phone2 = document.getElementById('phone-2');
  const phones = [phone0, phone1, phone2];

  const pillBtns = document.querySelectorAll('.loop-pill-btn');
  const progressBars = [
    document.getElementById('prog-0'),
    document.getElementById('prog-1'),
    document.getElementById('prog-2')
  ];

  const featCards = document.querySelectorAll('.feature-card');

  const DESIGN_WIDTH = 1920;
  const DESIGN_HEIGHT = 1080;

  let currentHeroIndex = 0;
  let loopDuration = 4000; // default 4 seconds
  let isPlaying = true;
  let progressAnimFrame = null;
  let progressStartTime = null;

  /**
   * Auto scale 1920x1080 stage to fit browser
   */
  function autoScaleStage() {
    if (!bumperStage) return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / DESIGN_WIDTH;
    const scaleY = windowHeight / DESIGN_HEIGHT;
    const scale = Math.min(scaleX, scaleY);
    bumperStage.style.transform = `scale(${scale})`;
  }

  autoScaleStage();
  window.addEventListener('resize', autoScaleStage);

  /**
   * Toolbar Hide & Unhide Controls
   */
  if (btnToggleToolbar) {
    btnToggleToolbar.addEventListener('click', (e) => {
      e.stopPropagation();
      if (expoToolbar) expoToolbar.classList.add('hidden');
      if (btnUnhideToolbar) btnUnhideToolbar.classList.add('visible');
    });
  }

  if (btnUnhideToolbar) {
    btnUnhideToolbar.addEventListener('click', (e) => {
      e.stopPropagation();
      if (expoToolbar) expoToolbar.classList.remove('hidden');
      btnUnhideToolbar.classList.remove('visible');
    });
  }

  /**
   * Phone Carousel State Transition
   * Transitions slots:
   * When hero = 0: Phone 0 Center, Phone 1 Left, Phone 2 Right
   * When hero = 1: Phone 1 Center, Phone 2 Left, Phone 0 Right
   * When hero = 2: Phone 2 Center, Phone 0 Left, Phone 1 Right
   */
  function updateCarousel(heroIndex) {
    currentHeroIndex = heroIndex;

    // Reset phone slot classes
    phones.forEach((phone) => {
      if (phone) {
        phone.classList.remove('phone-slot-center', 'phone-slot-left', 'phone-slot-right');
      }
    });

    if (heroIndex === 0) {
      phone0?.classList.add('phone-slot-center');
      phone1?.classList.add('phone-slot-left');
      phone2?.classList.add('phone-slot-right');
    } else if (heroIndex === 1) {
      phone1?.classList.add('phone-slot-center');
      phone2?.classList.add('phone-slot-left');
      phone0?.classList.add('phone-slot-right');
    } else if (heroIndex === 2) {
      phone2?.classList.add('phone-slot-center');
      phone0?.classList.add('phone-slot-left');
      phone1?.classList.add('phone-slot-right');
    }

    // Update Pill Buttons
    pillBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === heroIndex);
    });

    // Update Feature Highlights to match active screenshot
    featCards.forEach(card => card.classList.remove('active-feat'));
    if (heroIndex === 0) {
      document.getElementById('feat-prayer')?.classList.add('active-feat');
    } else if (heroIndex === 1) {
      document.getElementById('feat-map')?.classList.add('active-feat');
    } else if (heroIndex === 2) {
      document.getElementById('feat-activity')?.classList.add('active-feat');
      document.getElementById('feat-donation')?.classList.add('active-feat');
    }

    // Reset and restart loop progress bar
    startProgress();
  }

  /**
   * Progress Bar Animation
   */
  function startProgress() {
    cancelAnimationFrame(progressAnimFrame);
    progressBars.forEach(bar => { if (bar) bar.style.width = '0%'; });
    
    if (!isPlaying) return;

    progressStartTime = performance.now();

    function step(now) {
      if (!isPlaying) return;
      const elapsed = now - progressStartTime;
      const pct = Math.min(100, (elapsed / loopDuration) * 100);

      if (progressBars[currentHeroIndex]) {
        progressBars[currentHeroIndex].style.width = `${pct}%`;
      }

      if (elapsed < loopDuration) {
        progressAnimFrame = requestAnimationFrame(step);
      } else {
        // Next slide
        const nextIndex = (currentHeroIndex + 1) % 3;
        updateCarousel(nextIndex);
      }
    }

    progressAnimFrame = requestAnimationFrame(step);
  }

  /**
   * Play / Pause Toggle
   */
  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (playIcon) playIcon.className = 'fa-solid fa-pause';
      startProgress();
    } else {
      if (playIcon) playIcon.className = 'fa-solid fa-play';
      cancelAnimationFrame(progressAnimFrame);
    }
  }

  if (btnTogglePlay) {
    btnTogglePlay.addEventListener('click', togglePlayPause);
  }

  /**
   * Speed Control (3s, 4s, 5s)
   */
  speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      speedButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loopDuration = parseInt(btn.dataset.speed, 10);
      if (speedDisplay) speedDisplay.textContent = `${loopDuration / 1000}s`;
      startProgress();
    });
  });

  /**
   * Clickable Pills and Phones
   */
  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const slideIdx = parseInt(btn.dataset.slide, 10);
      updateCarousel(slideIdx);
    });
  });

  phones.forEach((phone, idx) => {
    if (phone) {
      phone.addEventListener('click', () => {
        updateCarousel(idx);
      });
    }
  });

  featCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetIdx = parseInt(card.dataset.target, 10);
      if (!isNaN(targetIdx)) {
        updateCarousel(targetIdx);
      }
    });
  });

  // Start the initial loop
  updateCarousel(0);

  /**
   * Fullscreen TV Booth Mode
   */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        if (btnFullscreen) btnFullscreen.innerHTML = '<i class="fa-solid fa-compress"></i> Keluar Layar Penuh';
      }).catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          if (btnFullscreen) btnFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Layar Penuh (TV)';
        });
      }
    }
  }

  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', toggleFullscreen);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    if (e.key === 'h' || e.key === 'H') {
      if (expoToolbar) expoToolbar.classList.toggle('hidden');
      if (btnUnhideToolbar) btnUnhideToolbar.classList.toggle('visible');
    }
    if (e.key === ' ') {
      e.preventDefault();
      togglePlayPause();
    }
    if (e.key === 'ArrowRight') {
      updateCarousel((currentHeroIndex + 1) % 3);
    }
    if (e.key === 'ArrowLeft') {
      updateCarousel((currentHeroIndex + 2) % 3);
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      if (btnFullscreen) btnFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Layar Penuh (TV)';
    } else {
      if (btnFullscreen) btnFullscreen.innerHTML = '<i class="fa-solid fa-compress"></i> Keluar Layar Penuh';
    }
    autoScaleStage();
  });

  /**
   * Export 1920x1080 PNG Image
   */
  if (btnExportPNG) {
    btnExportPNG.addEventListener('click', async () => {
      const originalText = btnExportPNG.innerHTML;
      btnExportPNG.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Merender...';
      btnExportPNG.disabled = true;

      try {
        const currentTransform = bumperStage.style.transform;
        bumperStage.style.transform = 'none';
        document.body.classList.add('clean-export-mode');

        const canvas = await html2canvas(bumperStage, {
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#F5FAF7',
          logging: false
        });

        bumperStage.style.transform = currentTransform;
        document.body.classList.remove('clean-export-mode');

        const link = document.createElement('a');
        link.download = `Bumper_Expo_GetMasjid_1920x1080_Slide${currentHeroIndex + 1}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();

        btnExportPNG.innerHTML = '<i class="fa-solid fa-check"></i> Tersimpan!';
        setTimeout(() => {
          btnExportPNG.innerHTML = originalText;
          btnExportPNG.disabled = false;
        }, 2500);

      } catch (error) {
        console.error('Export PNG failed:', error);
        alert('Gagal mengekspor gambar.');
        btnExportPNG.innerHTML = originalText;
        btnExportPNG.disabled = false;
        autoScaleStage();
      }
    });
  }

});
