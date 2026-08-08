# GetMasjid - Digital Bumper Booth Expo (1920 × 1080 px)

Desain **Bumper Digital Booth Expo** untuk platform **GetMasjid**, dirancang khusus untuk monitor/TV booth pameran dengan format **Landscape 16:9 (1920 × 1080 px)**.

## 🌟 Fitur Utama
1. **Looping Bumper Otomatis (3 - 5 Detik)**:
   - Rotasi 3 prototype smartphone (Beranda Jadwal Sholat, Peta & Pencarian Masjid, Detail Masjid & Presensi GPS).
   - Sinkronisasi highlight fitur (Jadwal Sholat, Informasi Masjid, Aktivitas Jamaah, Donasi & Zakat).
   - Progress bar indikator perputaran loop.
2. **Identitas Brand Resmi GetMasjid**:
   - Logo resmi horizontal lockup (Icon + Typography GetMasjid berdampingan).
   - Tagline: *"Menghubungkan Masjid, Memberdayakan Umat"*.
   - Value Proposition: *"Digitalisasi Ekosistem Masjid dalam Satu Platform"*.
   - Aset asli screenshot aplikasi mobile tanpa modifikasi UI.
3. **Fasilitas Operator Booth**:
   - **Mode Layar Penuh (TV/Monitor)**: Tombol & shortcut keyboard `F` untuk tampilan penuh monitor expo tanpa toolbar browser.
   - **Pengatur Kecepatan Loop**: Pilihan rotasi 3s, 4s, 5s atau Pause (Spasi).
   - **Ekspor Gambar 1920 × 1080 px**: Tombol download instan format PNG resolusi tinggi.

## 📁 Struktur File
- `index.html` : Struktur dokumen HTML Bumper Digital.
- `style.css` : Desain sistem, mockup 3D smartphone, glassmorphism, dan animasi.
- `script.js` : Runtime loop controller, auto-scale 16:9, dan export PNG.
- `assets/` :
  - `logo_icon.png` : Logo Icon GetMasjid asli.
  - `logo_text.png` : Typography GetMasjid asli.
  - `screenshot_beranda.png` : Screenshot Beranda & Jadwal Sholat asli.
  - `screenshot_map.png` : Screenshot Peta Interaktif & Pencarian asli.
  - `screenshot_detail.png` : Screenshot Detail Masjid & Presensi asli.

## 🚀 Cara Menjalankan
Buka file `index.html` langsung di browser, atau jalankan local server:
```bash
python3 -m http.server 3000
```
Lalu buka `http://localhost:3000` di browser dan tekan **F** untuk mode Fullscreen Booth TV.
