/**
 * GETMASJID DIGITAL BUMPER - RUNTIME CONTROLLER
 * Handles auto-scaling to screen size, Fullscreen TV Mode, and 1920x1080 PNG Export.
 */

document.addEventListener('DOMContentLoaded', () => {
  const bumperStage = document.getElementById('bumperStage');
  const stageContainer = document.getElementById('stageContainer');
  const expoToolbar = document.getElementById('expoToolbar');
  const btnToggleToolbar = document.getElementById('btnToggleToolbar');
  const btnUnhideToolbar = document.getElementById('btnUnчнойToolbar');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const btnExportPNG = document.getElementById('btnExportPNG');

  const DESIGN_WIDTH = 1920;
  const DESIGN_HEIGHT = 1080;

  /**
   * Automatically scale the 1920x1080 bumper stage to fit the viewport
   * while keeping the 16:9 aspect ratio and ultra-crisp rendering.
   */
  function autoScaleStage() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scaleX = windowWidth / DESIGN_WIDTH;
    const scaleY = windowHeight / DESIGN_HEIGHT;

    // Use contain fit
    const scale = Math.min(scaleX, scaleY);

    bumperStage.style.transform = `scale(${scale})`;
  }

  // Initial scaling and on window resize
  autoScaleStage();
  window.addEventListener('resize', autoScaleStage);

  /**
   * Toolbar visibility toggles
   */
  btnToggleToolbar.addEventListener('click', () => {
    expoToolbar.classList.add('hidden');
    btnUnhideToolbar.classList.add('visible');
    });

  btnUnhideToolbar.addEventListener('click', () => {
    expoToolbar.classList.remove('hidden');
    btnUnhideToolbar.classList.remove('visible');
  });

  /**
   * Fullscreen Toggle for Expo Booth Display (Shortcut: 'F' key)
   */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        btnFullscreen.innerHTML = '<i class="fa-solid fa-compress"></i> Keluar Layar Penuh';
      }).catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          btnFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Layar Penuh (TV)';
        });
      }
    }
  }

  btnFullscreen.addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
    if (e.key === 'h' || e.key === 'H') {
      expoToolbar.classList.toggle('hidden');
      btnUnhideToolbar.classList.toggle('visible');
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      btnFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i> Layar Penuh (TV)';
    } else {
      btnFullscreen.innerHTML = '<i class="fa-solid fa-compress"></i> Keluar Layar Penuh';
    }
    autoScaleStage();
  });

  /**
   * Export 1920x1080 High-Resolution PNG Image
   */
  btnExportPNG.addEventListener('click', async () => {
    const originalText = btnExportPNG.innerHTML;
    btnExportPNG.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Merender 1920x1080...';
    btnExportPNG.disabled = true;

    try {
      // Temporarily reset transform for 1:1 pixel rendering
      const currentTransform = bumperStage.style.transform;
      bumperStage.style.transform = 'none';
      document.body.classList.add('clean-export-mode');

      // Use html2canvas with scale 1 to produce exactly 1920x1080
      const canvas = await html2canvas(bumperStage, {
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#F5FAF7',
        logging: false
      });

      // Restore stage scaling
      bumperStage.style.transform = currentTransform;
      document.body.classList.remove('clean-export-mode');

      // Trigger instant PNG download
      const link = document.createElement('a');
      link.download = 'Bumper_Expo_GetMasjid_1920x1080.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      btnExportPNG.innerHTML = '<i class="fa-solid fa-check"></i> Berhasil Diunduh!';
      setTimeout(() => {
        btnExportPNG.innerHTML = originalText;
        btnExportPNG.disabled = false;
      }, 2500);

    } catch (error) {
      console.error('Export PNG failed:', error);
      alert('Gagal mengekspor gambar. Pastikan gambar dimuat secara lokal.');
      btnExportPNG.innerHTML = originalText;
      btnExportPNG.disabled = false;
      autoScaleStage();
    }
  });

});
