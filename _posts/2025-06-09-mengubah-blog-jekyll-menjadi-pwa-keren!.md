---
layout: post
title: Mengubah Blog Jekyll Menjadi PWA Keren!
description: Ubah blog Jekyll-mu jadi PWA cepat, offline-friendly, dan engaging. Tingkatkan pengalaman pengguna dengan fitur canggih web modern!
date: 2025-06-09 10:00:00 +0700
categories: [jekyll]
tags: [jekyll]
author: Nama Anda
image: /assets/images/blog-jekyll-jadi-pwa.jpg
---

Membuat blog Jekyll menjadi Progressive Web App (PWA) melibatkan beberapa langkah untuk menambahkan fungsionalitas seperti offline access, installability, dan push notifications (walaupun push notifications lebih kompleks dan jarang langsung terintegrasi dengan Jekyll).

Berikut adalah langkah-langkah utamanya:

1. Pahami Komponen PWA

    Untuk membuat blog Jekyll Anda menjadi PWA, Anda perlu menambahkan setidaknya dua file utama:

    * Manifest File (`manifest.json`): File JSON yang mendeskripsikan PWA Anda kepada browser. Ini memungkinkan pengguna untuk "menginstal" aplikasi Anda ke layar beranda mereka.
    * Service Worker File (`sw.js` atau sejenisnya): Skrip JavaScript yang berjalan di latar belakang browser, terpisah dari halaman web utama. Service worker adalah inti dari fungsionalitas PWA, mengelola caching, offline access, dan notifikasi.

2. Buat `manifest.json`

    File ini harus ditempatkan di root direktori situs Jekyll Anda (misalnya, di folder utama, bukan di `_site` atau `_includes`).

    Contoh `manifest.json`:
    {% raw %}
    ```
    {
    "name": "Nama Blog Anda",
    "short_name": "Nama Singkat",
    "description": "Deskripsi singkat blog Anda.",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [
        {
        "src": "/assets/icons/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
        },
        {
        "src": "/assets/icons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
        },
        {
        "src": "/assets/icons/maskable_icon.png",
        ""sizes": "196x196",
        "type": "image/png",
        "purpose": "any maskable"
        }
    ]
    }
    ```
    {% endraw %}
    Penjelasan Properti:

    * `name`: Nama lengkap aplikasi Anda.
    * `short_name`: Nama singkat yang akan ditampilkan di layar beranda.
    * `description`: Deskripsi aplikasi.
    * `start_url`: URL yang akan dibuka saat aplikasi diluncurkan dari layar beranda. Biasanya `/`untuk homepage.
    * `display`: Mode tampilan.
        * `standalone`: Terlihat seperti aplikasi asli, tanpa UI browser.
        * `fullscreen`: Memenuhi seluruh layar.
        * `minimal-ui`: Menampilkan URL dan kontrol minimal.
        * `browser`: Terlihat seperti tab browser biasa.
    * `background_color`: Warna latar belakang layar pembuka (splash screen) saat aplikasi diluncurkan.
    * `theme_color`: Warna tema aplikasi (misalnya, warna bilah status browser).
    * `icons`: Array objek ikon. Anda harus membuat ikon dengan berbagai ukuran dan menempatkannya di path yang sesuai (misalnya, `/assets/icons/`).
        * Penting: Pastikan Anda membuat ikon-ikon ini! Minimal 192x192px dan 512x512px. Sertakan juga maskable_icon untuk ikon yang dapat beradaptasi dengan berbagai bentuk platform.

3. Buat Service Worker (`sw.js`)

    Ini adalah bagian paling kompleks. Service worker akan bertanggung jawab untuk mencegat permintaan jaringan dan menyediakan aset dari cache saat offline.

    Contoh `sw.js` (Sederhana dengan Workbox)

    Menggunakan library seperti Workbox sangat direkomendasikan karena menyederhanakan pengembangan service worker. Anda bisa mengintegrasikannya ke proses build Jekyll Anda, atau menggunakannya secara langsung.

    **A. Pendekatan Sederhana (tanpa Build Tool)**

    Anda bisa menambahkan Workbox melalui CDN dan menggunakannya langsung di `sw.js` Anda.

    1. Buat `sw.js` di root direktori situs Jekyll Anda.

    2. Isi `sw.js`:
        {% raw %}
        ```
        importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

        if (workbox) {
        console.log(`Yay! Workbox is loaded 🎉`);

        // Mengaktifkan log debug Workbox (opsional)
        // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

        // 1. Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
        workbox.routing.registerRoute(
            /^https:\/\/fonts\.googleapis\.com/,
            new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
            })
        );

        // 2. Cache the underlying font files with a cache-first strategy for 1 year.
        workbox.routing.registerRoute(
            /^https:\/\/fonts\.gstatic\.com/,
            new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
                }),
            ],
            })
        );

        // 3. Cache images with a cache-first strategy.
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
            new workbox.strategies.CacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
            })
        );

        // 4. Cache CSS, JS, and HTML with a stale-while-revalidate strategy.
        workbox.routing.registerRoute(
            /\.(?:css|js|html)$/,
            new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-assets',
            })
        );

        // 5. Cache API calls (if any, e.g., for comments, search)
        // Example: If you fetch data from /api/posts
        // workbox.routing.registerRoute(
        //   /\/api\//,
        //   new workbox.strategies.NetworkFirst({
        //     cacheName: 'api-data',
        //     plugins: [
        //       new workbox.expiration.ExpirationPlugin({
        //         maxEntries: 20,
        //         maxAgeSeconds: 5 * 60, // 5 minutes
        //       }),
        //     ],
        //   })
        // );

        // Precache all pages and assets explicitly (important for Jekyll generated pages)
        // This part is tricky with Jekyll. You might need to generate this list dynamically.
        // For a static list, you'd list out your pages, CSS, JS, etc.
        // Example of explicit precaching (you'll need to generate this for your Jekyll site):
        workbox.precaching.precacheAndRoute([
            { url: '/', revision: '1' },
            { url: '/index.html', revision: '1' }, // Jekyll generates index.html
            { url: '/about/', revision: '1' }, // Example page
            // Add more important pages/posts you want to be offline
            '/assets/css/style.css',
            '/assets/js/main.js',
            // Don't forget your manifest file and icons
            '/manifest.json',
            '/assets/icons/icon-192x192.png',
            '/assets/icons/icon-512x512.png',
            '/assets/icons/maskable_icon.png'
        ]);

        // Mengatur rute fallback untuk offline
        workbox.routing.setCatchHandler(async ({event}) => {
            // The fallback HTML page is the most important part for offline experience
            // Make sure you have an actual offline.html page
            if (event.request.mode === 'navigate') {
            return caches.match('/offline.html'); // Ensure you have an offline.html page
            }
            // For other types of requests, we might return a different fallback
            return Response.error(); // Or a default image, etc.
        });

        } else {
        console.log(`Boo! Workbox didn't load 😬`);
        }
        ```
        {% endraw %}
        Penting untuk `sw.js`:
        * `importScripts`: Memuat library Workbox. Pastikan versi CDN yang digunakan terbaru.
        * Strategi Caching:
            * `StaleWhileRevalidate`: Melayani dari cache segera, kemudian memperbarui cache di latar belakang. Baik untuk CSS/JS/HTML.
            * `CacheFirst`: Melayani dari cache terlebih dahulu, jika tidak ada, baru dari jaringan. Baik untuk gambar dan font yang tidak sering berubah.
            * `NetworkFirst`: Mencoba dari jaringan terlebih dahulu, jika gagal, baru dari cache. Baik untuk API atau konten yang harus selalu terbaru.
        * `precacheAndRoute`: Ini adalah bagian krusial. Anda perlu mendaftar semua file yang Anda ingin tersedia offline saat pertama kali PWA diinstal. Untuk Jekyll, ini bisa jadi sulit karena halaman post baru dibuat secara dinamis.
            * Solusi Jekyll untuk Precache:
                * Manual: Daftar semua halaman dan aset penting secara manual (tidak praktis untuk blog besar).
                * Plugin Jekyll/Script Build: Gunakan plugin Jekyll (misalnya `jekyll-pwa-builder` atau `jekyll-service-worker`) atau script `Node.js` kustom selama proses build untuk menghasilkan daftar file yang akan di-precache. Ini adalah metode yang lebih robust.
                * Workbox Build (Advanced): Jika Anda menggunakan workflow build dengan `Node.js` (misalnya, untuk meminifikasi aset), Anda bisa mengintegrasikan Workbox Build untuk menghasilkan `sw.js` secara otomatis dengan daftar precache yang benar.

4. Daftarkan Service Worker di Jekyll

    Anda perlu mendaftarkan service worker di setiap halaman HTML blog Anda. Cara terbaik adalah menambahkannya ke file `_layouts/default.html` atau file layout utama lainnya.

    Tambahkan kode JavaScript berikut di dalam tag `<script>` tepat sebelum tag penutup `</body>`:
    {% raw %}
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="manifest" href="/manifest.json">
    </head>
    <body>
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        // Registration was successful
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    }, function(err) {
                        // registration failed :(
                        console.log('ServiceWorker registration failed: ', err);
                    });
                });
            }
        </script>
    </body>
    </html>
    ```
    {% endraw %}
    Pastikan:

    * `href="/manifest.json"`: Link ke file manifest Anda di `<head>`.
    * `navigator.serviceWorker.register('/sw.js')`: Path ke file service worker Anda.

5. Buat Halaman Offline (`offline.html`)

    Sangat penting untuk memberikan pengalaman yang baik saat offline. Buat file `offline.html` di root direktori situs Jekyll Anda.

    Contoh `offline.html`:
    {% raw %}
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Anda Sedang Offline</title>
        <style>
            body {
                font-family: sans-serif;
                text-align: center;
                padding: 50px;
            }
        </style>
    </head>
    <body>
        <h1>Oops! Anda Sedang Offline.</h1>
        <p>Sepertinya Anda tidak terhubung ke internet. Silakan coba lagi nanti.</p>
        <p>Beberapa konten mungkin masih dapat diakses karena telah disimpan sebelumnya.</p>
    </body>
    </html>
    ```
    {% endraw %}
    Pastikan Workbox service worker Anda (di bagian `setCatchHandler`) merujuk ke halaman ini.
6. Uji PWA Anda

    1. Build dan Serve Jekyll:
        {% raw %}
        ```
        bundle exec jekyll build
        bundle exec jekyll serve
        ```
        {% endraw %}
    2. Buka di Browser (Chrome adalah yang terbaik untuk pengujian PWA):
        * Buka `localhost:4000` (atau port Anda).
        * Buka Chrome DevTools (`F12`).
        * Pergi ke tab `Application`.
        * Di sidebar kiri, pilih `Manifest`. Anda akan melihat detail manifest Anda dan apakah ada peringatan.
        * Pilih `Service Workers`. Anda harus melihat service worker Anda terdaftar dan berjalan. Anda bisa mengaktifkan "`Offline`" di sini untuk menguji fungsionalitas offline.
        * Pilih `Cache Storage` untuk melihat aset yang disimpan oleh service worker.
    3. Coba Instal:
        * Di Chrome desktop, akan ada ikon "`Install app`" di bilah alamat (biasanya ikon plus atau panah ke bawah). Klik itu untuk menginstal PWA Anda.
        * Di perangkat Android, Anda mungkin akan mendapatkan prompt "`Add to Home screen`" jika semua prasyarat PWA terpenuhi.

Pertimbangan Lanjutan untuk Jekyll
* Generasi `precacheAndRoute` Dinamis: Ini adalah tantangan terbesar. Jika Anda memiliki banyak postingan, Anda tidak bisa mendaftarkannya secara manual.
    * Jekyll Hook/Plugin: Anda bisa menulis plugin Jekyll kustom yang memproses semua postingan dan halaman, lalu menulis output JSON ke file yang kemudian dibaca oleh `sw.js`.
    * Workbox CLI/Webpack (jika digunakan): Jika Anda memiliki build pipeline yang lebih kompleks (misalnya, menggunakan Webpack untuk mengelola aset), Workbox CLI atau `workbox-webpack-plugin` dapat secara otomatis menghasilkan daftar precache.

* Markdown dan HTML yang Berubah: Setiap kali Anda memposting atau mengedit konten, versi cache sebelumnya menjadi stale. Service worker Anda perlu di-update. Strategi StaleWhileRevalidate akan membantu untuk konten yang sering berubah, tetapi untuk konten yang di-precache, Anda harus memastikan service worker di-deploy ulang (misalnya, dengan mengubah revision di precacheAndRoute atau url dari file `sw.js` itu sendiri).
* Lighthouse Audit: Gunakan Google Lighthouse (di Chrome DevTools) untuk mengaudit PWA Anda. Ini akan memberi tahu Anda apa yang kurang dan cara memperbaikinya.
* HTTPS: PWA membutuhkan HTTPS. Jika Anda menghosting di GitHub Pages, ini sudah ditangani. Untuk hosting lain, pastikan Anda menggunakan SSL/TLS.

Membangun PWA untuk Jekyll memberikan pengalaman pengguna yang jauh lebih baik, terutama bagi pembaca yang sering kembali ke blog Anda atau memiliki koneksi internet yang tidak stabil. Selamat mencoba!
