---
layout: post
title: Membuat Halaman Landing Page di Blog Jekyll
description: Ingin landing page powerful di Jekyll? Pelajari cara membuatnya terpisah dari blog agar SEO lebih fokus & konversi makin maksimal!
date: 2025-06-03 09:06:03 +0700
category: jekyll
tag: jekyll
author: Nama Anda
image: /assets/images/membuat-landing-page-di-jekyll.jpg
---

Membuat halaman landing page terpisah di blog Jekyll yang sudah jadi itu cukup mudah! Ada beberapa cara yang bisa kamu lakukan, tergantung pada seberapa terpisah kamu ingin landing page itu dari struktur blog utama.

## Menggunakan Halaman Standar Jekyll

Ini adalah cara paling sederhana dan sering digunakan. Kamu bisa membuat file Markdown atau HTML baru di direktori root blog Jekyll kamu.

Langkah-langkah:

1. Buat file baru di root direktori blog Jekyll kamu, misalnya `landing-page.md` atau `landing-page.html`.

2. Tambahkan front matter di bagian atas file untuk judul dan layout. Contoh untuk `landing-page.md`:

    {% raw %}
    ```
    ---
    layout: default # Atau layout khusus jika kamu punya
    title: Halaman Landing Keren Saya
    permalink: /landing-page/
    ---
    ```
    {% endraw %}

    Jika kamu ingin halaman ini benar-benar terpisah dari navigasi blog, pastikan permalink diatur agar URL-nya mudah diakses dan tidak masuk dalam koleksi post/page utama.

3. Isi konten landing page kamu di bawah front matter.

4. Jekyll akan secara otomatis memproses file ini dan membuatnya tersedia di URL yang kamu tentukan di permalink (misalnya: `yourblog.com/landing-page/`).

Kelebihan: Simpel, tidak perlu konfigurasi tambahan.
Kekurangan: Masih menggunakan layout blog utama, meskipun bisa disesuaikan.

## Menggunakan Layout Khusus untuk Landing Page

Jika kamu ingin tampilan landing page yang berbeda total dari blog utama, kamu bisa membuat layout khusus.

Langkah-langkah:

1. Buat file layout baru di direktori `_layouts/`, misalnya `_layouts/landing.html`.

2. Isi file `landing.html` dengan struktur `HTML` dan `CSS` yang kamu inginkan untuk landing page. Kamu bisa menghilangkan elemen-elemen blog seperti header/footer navigasi jika tidak diperlukan.

    {% raw %}
    ```
    <!DOCTYPE html>
    <html>
    <head>
        <title>{{ page.title }}</title>
        <link rel="stylesheet" href="/assets/css/landing.css"> </head>
    <body>
        <div class="landing-content">
            {{ content }}
        </div>
    </body>
    </html>
    ```
    {% endraw %}

3. Pada file landing page kamu (misalnya `landing-page.md`), atur layout ke layout yang baru kamu buat:

    {% raw %}
    ```
    ---
    layout: landing # Menggunakan layout kustom 'landing.html'
    title: Halaman Landing Keren Saya
    permalink: /landing-page/
    ---
    ```
    {% endraw %}

Kelebihan: Kontrol penuh atas tampilan dan nuansa landing page, bisa sangat berbeda dari blog utama.
Kekurangan: Membutuhkan sedikit lebih banyak pengerjaan desain dan `CSS`.

## Menggunakan Koleksi (Collections) Jekyll (Opsional untuk Organisasi)

Untuk tujuan organisasi yang lebih baik, terutama jika kamu punya banyak landing page, kamu bisa menggunakan Koleksi Jekyll.

Langkah-langkah:

1. Tambahkan konfigurasi koleksi baru di `_config.yml`:

    {% raw %}
    ```
    collections:
    landing_pages:
        output: true
        permalink: /:collection/:name/
    ```
    {% endraw %}

2. Buat direktori baru untuk koleksi ini, misalnya `_landing_pages/`.

3. Buat file landing page kamu di dalam direktori `_landing_pages/`, misalnya `_landing_pages/promo-produk.md`. Jangan lupa front matter di dalamnya.

    {% raw %}
    ```
    ---
    layout: landing # Atau layout lain
    title: Promo Produk Terbaru
    ---
    ```
    {% endraw %}

Kelebihan: Organisasi file lebih rapi, terutama untuk proyek yang lebih besar.
Kekurangan: Sedikit lebih kompleks dalam setup awal.

Tips Tambahan:

* CSS Khusus: Pastikan kamu punya file `CSS` terpisah untuk landing page jika kamu ingin styling yang unik. Kamu bisa menaruhnya di `assets/css/` dan memanggilnya di layout kustom atau langsung di halaman landing page.
* JavaScript: Jika landing page kamu memerlukan JavaScript interaktif, masukkan file JS di direktori `assets/js/` dan tautkan di layout atau halaman kamu.
* Optimasi SEO: Jangan lupa tambahkan meta deskripsi dan keyword yang relevan di front matter atau dalam tag `<head>` layout kamu untuk optimasi SEO.
* Analisis: Integrasikan Google Analytics atau alat analisis lainnya untuk melacak kinerja landing page kamu.
* Call to Action (CTA): Pastikan landing page kamu memiliki CTA yang jelas dan menonjol.

## Langkah demi Langkah Membuat Landing Page di Jekyll

Persiapan Awal

Pastikan kamu sudah memiliki instalasi Jekyll yang berfungsi di komputer kamu. Buka terminal atau command prompt, lalu navigasikan ke direktori utama blog Jekyll kamu.

### Langkah 1: Buat Layout Kustom untuk Landing Page

Kita akan membuat layout yang sederhana dan bersih, tanpa elemen navigasi blog utama.

1. Di direktori blog Jekyll kamu, masuk ke folder `_layouts/`.

2. Buat file baru di dalam folder `_layouts/` dengan nama `landing-page.html`.

3. Buka file `_layouts/landing-page.html` ini dengan editor teks favorit kamu (misalnya VS Code, Sublime Text, Atom, dll.).

4. Salin dan tempel kode HTML berikut ke dalam file `landing-page.html`:

    {% raw %}
    ```
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ page.title }}</title>
        <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
        <link rel="stylesheet" href="{{ '/assets/css/landing.css' | relative_url }}">
        <meta name="description" content="{{ page.description }}">
        <meta name="keywords" content="{{ page.keywords }}">
    </head>
    <body>
        <main class="landing-wrapper">
            {{ content }}
        </main>
    </body>
    </html>
    ```
    {% endraw %}

    Penjelasan Kode:

    * {% raw %}`<!DOCTYPE html>...`{% endraw %}: Struktur HTML dasar.
    * {% raw %}`<html lang="id">`{% endraw %}: Menentukan bahasa halaman (Indonesia).
    * {% raw %}`<meta charset="UTF-8">`{% endraw %}: Mengatur encoding karakter.
    * {% raw %}`<meta name="viewport"...>`{% endraw %}: Penting untuk responsivitas di perangkat mobile.
    * {% raw %}`<title>{{ page.title }}</title>`{% endraw %}: Judul halaman akan diambil dari front matter di file landing page nanti.
    * {% raw %}`<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">`{% endraw %}: Ini akan memuat `CSS` utama blog kamu. Hapus baris ini jika kamu ingin landing page benar-benar tanpa styling blog utama.
    * {% raw %}`<link rel="stylesheet" href="{{ '/assets/css/landing.css' | relative_url }}">`{% endraw %}: Ini adalah `CSS` khusus untuk landing page kamu. Kita akan buat file ini di langkah berikutnya.
    * {% raw %}`<meta name="description"...> dan <meta name="keywords"...>`{% endraw %}: Penting untuk SEO. Nilainya akan diambil dari front matter.
    * {% raw %}`<main class="landing-wrapper">`{% endraw %}: Ini adalah wrapper utama untuk konten landing page kamu.
    * {% raw %}`{{ content }}`{% endraw %}: Di sinilah semua konten yang kamu tulis di file landing page nanti akan dimasukkan.

### Langkah 2: Buat File CSS Khusus untuk Landing Page

Untuk memberikan tampilan unik pada landing page, kita akan buat file CSS terpisah.

1. Di direktori blog Jekyll kamu, masuk ke folder `assets/css/`. Jika folder css belum ada, buatlah.

2. Buat file baru di dalam folder `assets/css/` dengan nama `landing.css`.

3. Buka file `assets/css/landing.css` ini.

4. Tambahkan beberapa styling dasar (kamu bisa menyesuaikannya nanti):

    {% raw %}
    ```
    /* assets/css/landing.css */

    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4; /* Warna latar belakang umum */
        color: #333;
    }

    .landing-wrapper {
        max-width: 960px;
        margin: 50px auto;
        padding: 30px;
        background-color: #fff;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 8px;
        text-align: center; /* Contoh, bisa disesuaikan */
    }

    .landing-wrapper h1 {
        color: #0056b3;
        margin-bottom: 20px;
    }

    .landing-wrapper p {
        line-height: 1.6;
        margin-bottom: 15px;
    }

    .cta-button {
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 12px 25px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 20px;
        transition: background-color 0.3s ease;
    }

    .cta-button:hover {
        background-color: #0056b3;
    }

    /* Tambahkan lebih banyak styling sesuai kebutuhanmu */
    ```
    {% endraw %}

### Langkah 3: Buat File Halaman Landing Page

Sekarang saatnya membuat halaman landing page itu sendiri.

1. Di direktori utama blog Jekyll kamu, buat file baru dengan nama `promo-spesial.md` (atau nama lain yang kamu inginkan, misalnya `daftar-sekarang.html`).

2. Buka file `promo-spesial.md` ini.

3. Salin dan tempel kode berikut:

    {% raw %}
    ```
    ---
    layout: landing-page # Menggunakan layout kustom yang kita buat
    title: Penawaran Spesial! Jangan Sampai Ketinggalan
    permalink: /promo-spesial/
    description: Dapatkan diskon luar biasa untuk produk/layanan kami. Penawaran terbatas!
    keywords: promo, diskon, penawaran, spesial, produk, layanan
    ---

    # Dapatkan Diskon 50% untuk Layanan Premium Kami!

    Ini adalah kesempatan emas untuk merasakan kualitas terbaik dari layanan kami dengan harga yang tak tertandingi. Penawaran ini hanya berlaku untuk waktu terbatas!

    ## Fitur Unggulan Layanan Premium:
    * Akses Penuh ke Semua Fitur
    * Dukungan Pelanggan Prioritas 24/7
    * Pembaruan Gratis Seumur Hidup
    * Garansi Kepuasan 100%

    Jangan lewatkan kesempatan ini untuk meningkatkan pengalaman Anda!

    <p>
        <a href="https://link-ke-halaman-pembelian-kamu.com" class="cta-button">Daftar Sekarang & Klaim Diskonnya!</a>
    </p>

    <p>Hubungi kami jika ada pertanyaan: info@emailkamu.com</p>
    ```
    {% endraw %}

    Penjelasan Kode:

    * `---`: Pembatas front matter.
    * `layout: landing-page`: Ini adalah kunci! Ini memberi tahu Jekyll untuk menggunakan layout `landing-page.html` yang kita buat di Langkah 1.
    * `title: ...`: Judul halaman yang akan muncul di browser tab.
    * `permalink: /promo-spesial/`: Ini adalah URL di mana halaman landing page kamu akan tersedia (misalnya `yourblog.com/promo-spesial/`). Penting: Pastikan `permalink` ini unik dan sesuai dengan tujuan landing page.
    * `description`: ... dan `keywords: ...`: Meta tag untuk SEO.
    * Konten di bawah `---`: Ini adalah isi utama landing page kamu. Kamu bisa menggunakan Markdown atau HTML di sini.
    * {% raw %}`<a href="..." class="cta-button">...</a>`{% endraw %}: Ini adalah contoh Call to Action (CTA). Ganti `https://link-ke-halaman-pembelian-kamu.com` dengan URL tujuan sebenarnya, misalnya ke halaman produk, formulir pendaftaran, atau kontak.

### Langkah 4: Jalankan Blog Jekyll Kamu

Setelah semua file dibuat, saatnya melihat hasilnya!

1. Buka terminal atau command prompt.

2. Pastikan kamu berada di direktori utama blog Jekyll kamu.

3. Jalankan perintah berikut untuk membangun dan menjalankan server lokal Jekyll:

    {% raw %}
    ```
    bundle exec jekyll serve
    ```
    {% endraw %}

4. Setelah Jekyll selesai membangun, kamu akan melihat pesan seperti ini di terminal:

    {% raw %}
    ```
    Server address: http://127.0.0.1:4000/
    Server running... press ctrl-c to stop.
    ```
    {% endraw %}

5. Buka browser web kamu dan kunjungi URL landing page kamu. Berdasarkan contoh di atas, itu akan menjadi:
    `http://127.0.0.1:4000/promo-spesial/`

Kamu sekarang akan melihat halaman landing page kustom kamu yang terpisah dari blog utama!

### Langkah 5: Sesuaikan dan Kembangkan

* **Konten**: Ubah teks, gambar, dan elemen di file promo-spesial.md (atau nama file kamu) sesuai dengan tujuan landing page kamu.
* **Desain**: Modifikasi file `assets/css/landing.css` untuk membuat tampilan landing page sesuai dengan branding kamu. Eksperimen dengan warna, font, tata letak, dll.
* **Integrasi**: Tambahkan kode untuk Google Analytics atau pixel pelacakan lainnya di `<head>` layout `landing-page.html` jika diperlukan untuk analisis kinerja.
* **Responsivitas**: Pastikan landing page terlihat bagus di berbagai ukuran layar (desktop, tablet, mobile).

Selamat mencoba! Jika ada langkah yang kurang jelas atau kamu ingin menambahkan fitur spesifik, jangan ragu untuk bertanya.
