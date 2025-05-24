---
layout: post
title: Postingan Pertama Saya
date: 2025-05-24 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
---

Selamat datang di blog baru saya yang dibangun dengan Jekyll! Ini adalah postingan pertama.

Jekyll adalah generator situs statis yang sederhana dan berorientasi blog. Dengan Jekyll, Anda dapat menulis konten dalam Markdown, dan Jekyll akan mengubahnya menjadi situs web statis yang siap digunakan.

### Mengapa Menggunakan Jekyll?

* **Gratis dan Open Source:** Anda memiliki kendali penuh.
* **Kecepatan:** Karena situs statis, ia sangat cepat dimuat.
* **Keamanan:** Tidak ada database atau sisi server, meminimalkan potensi serangan.
* **Sederhana:** Menulis konten dalam Markdown sangat mudah.

### Contoh Membangun Blog Jekyll

1. **Persiapan Awal**

    Pastikan Anda sudah menginstal Ruby dan Bundler. Jika belum, instal Jekyll:
```
gem install jekyll bundler
```
    Kemudian, buat proyek Jekyll baru:
```
jekyll new my-awesome-blog
cd my-awesome-blog
```

    Kita akan membersihkan struktur default untuk memulai dari nol. Hapus semua file dan folder kecuali _config.yml dan Gemfile.

2. **Struktur File Dasar**

    Buat folder-folder berikut di root proyek Anda:
```
my-awesome-blog/
├── _config.yml
├── Gemfile
├── _data/
├── _includes/
├── _layouts/
├── _posts/
├── _sass/
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
├── index.html
```

3. **Konfigurasi Dasar (_config.yml)**

    Tambahkan konfigurasi dasar untuk blog Anda.
    {% raw %}
    ```
    title: Blog Keren Saya
    description: Ini adalah blog pribadi yang dibangun dengan Jekyll.
    baseurl: "" # Biarkan kosong jika blog Anda di root domain (misal: namadomain.com)
    url: "http://localhost:4000" # Ganti dengan URL domain Anda saat deploy
    permalink: /:title/

    # Fitur Tambahan
    header_background: /assets/images/header-bg.jpg # Path gambar background header

    # Kumpulan koleksi (opsional, untuk halaman statis seperti about, contact)
    collections:
    pages:
        output: true
        permalink: /:name/

    # Plugins
    plugins:
    - jekyll-feed
    - jekyll-seo-tag # Opsional, jika ingin SEO otomatis
    ```
    {% endraw %}

4. **Layout Utama** ***(_layouts/default.html)***

    Ini adalah kerangka HTML utama untuk semua halaman blog Anda.
    {% raw %}
    ```
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ page.title | default: site.title }}</title>
        <link rel="stylesheet" href="{{ "/assets/css/main.css" | relative_url }}">
        {% seo %} {# Ini memerlukan plugin jekyll-seo-tag di Gemfile #}
    </head>
    <body>

        {% include header.html %}

        <main class="content-wrapper">
            <div class="main-content">
                {{ content }}
            </div>
            {% include sidebar.html %}
        </main>

        {% include footer.html %}

        <script src="{{ "/assets/js/main.js" | relative_url }}"></script>
    </body>
    </html>
    ```
    {% endraw %}

5. **Header dengan Background dan Navigasi Responsif**

    ***Gambar Background Header***

    Siapkan gambar dan letakkan di assets/images/header-bg.jpg.

    File ***_includes/header.html***
    {% raw %}
    ```
    <header class="site-header" style="background-image: url('{{ site.header_background | relative_url }}');">
        <div class="header-overlay"></div> {# Untuk overlay gelap agar teks lebih jelas #}
        <div class="header-content">
            <a href="{{ "/" | relative_url }}" class="site-title">{{ site.title }}</a>
            <nav class="main-nav">
                <button class="menu-toggle" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links">
                    {% for item in site.data.navigation %}
                        <li><a href="{{ item.link | relative_url }}">{{ item.name }}</a></li>
                    {% endfor %}
                </ul>
            </nav>
        </div>
    </header>
    ```
    {% endraw %}

    Data Navigasi (_data/navigation.yml)

    Buat file ini di folder ***_data/.***

6. **Sidebar untuk Iklan**

    File ***_includes/sidebar.html***
    {% raw %}
    ```
    <aside class="sidebar">
        <h3>Sponsor Kami</h3>
        <div class="ad-unit">
            <a href="https://example.com/iklan-produk-a" target="_blank" rel="noopener">
                <img src="{{ "/assets/images/ad-banner-1.jpg" | relative_url }}" alt="Iklan Produk A">
            </a>
            <p>Promosikan bisnis Anda di sini!</p>
        </div>

        <div class="ad-unit">
            <a href="https://example.com/iklan-produk-b" target="_blank" rel="noopener">
                <img src="{{ "/assets/images/ad-banner-2.jpg" | relative_url }}" alt="Iklan Produk B">
            </a>
            <p>Hubungi kami untuk kerja sama.</p>
        </div>
    </aside>
    ```
    {% endraw %}
    Siapkan gambar iklan Anda, misalnya ad-banner-1.jpg dan ad-banner-2.jpg, dan letakkan di ***assets/images/.***

7. **Footer Credit**

    File ***_includes/footer.html***

    {% raw %}
    ```
    <footer class="site-footer">
        <div class="footer-content">
            <p>&copy; {{ site.time | date: "%Y" }} {{ site.title }}. Hak Cipta Dilindungi Undang-Undang.</p>
            <p>Dibuat dengan ❤️ dan <a href="https://jekyllrb.com/" target="_blank" rel="noopener">Jekyll</a> oleh <a href="https://github.com/nama-github-anda" target="_blank" rel="noopener">Nama Anda</a>.</p>
            </div>
    </footer>
    ```
    {% endraw %}

8. **Styling dengan SCSS** ***(_sass/ dan assets/css/main.scss)***

    Buat folder _sass/ dengan sub-folder base/, components/, dan layouts/.
    _sass/base/_variables.scss

    {% raw %}
    ```
    // Warna
    $primary-color: #007bff; // Biru
    $secondary-color: #6c757d; // Abu-abu
    $text-color: #343a40; // Hitam gelap
    $light-text-color: #f8f9fa; // Hampir putih
    $background-color: #f8f9fa; // Abu-abu muda
    $border-color: #dee2e6; // Abu-abu terang

    // Font
    $font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    $font-size-base: 1rem; // 16px

    // Spacing
    $spacing-unit: 1rem; // 16px
    $header-height: 60px;
    ```
    {% endraw %}

    ***_sass/base/_base.scss***

    {% raw %}
    ```
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: $font-size-base;
    }

    body {
        font-family: $font-family-base;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: $background-color;
        color: $text-color;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: $primary-color;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        margin-bottom: $spacing-unit;
        line-height: 1.2;
        color: $text-color;
    }

    p {
        margin-top: 0;
        margin-bottom: $spacing-unit;
    }
    ```
    {% endraw %}

    ***_sass/components/_header.scss***

    {% raw %}
    ```
    .site-header {
        position: relative;
        width: 100%;
        height: 250px; /* Tinggi header */
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $light-text-color;
        text-align: center;
        overflow: hidden; /* Penting untuk overlay */

        .header-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4); /* Overlay gelap */
            z-index: 1;
        }

        .header-content {
            position: relative;
            z-index: 2;
            padding: $spacing-unit;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            @media (min-width: 768px) {
                flex-direction: row;
                justify-content: space-between;
                max-width: 1200px;
                margin: 0 auto;
            }
        }

        .site-title {
            font-size: 2.5rem;
            font-weight: bold;
            color: $light-text-color;
            text-decoration: none;
            margin-bottom: $spacing-unit; /* Untuk mobile */

            @media (min-width: 768px) {
                margin-bottom: 0;
            }
        }
    }
    ```
    {% endraw %}

    ***_sass/components/_navigation.scss***

    {% raw %}
    ```
    .main-nav {
        .menu-toggle {
            display: block; /* Tampilkan di mobile */
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            margin-left: auto; /* Dorong ke kanan di mobile */
            z-index: 100; /* Pastikan di atas nav-links saat toggle */

            span {
                display: block;
                width: 28px;
                height: 3px;
                background-color: $light-text-color;
                margin: 5px 0;
                transition: all 0.3s ease;
            }

            &.open span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            &.open span:nth-child(2) {
                opacity: 0;
            }
            &.open span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }

            @media (min-width: 768px) {
                display: none; /* Sembunyikan di desktop */
            }
        }

        .nav-links {
            list-style: none;
            padding: 0;
            margin: 0;
            display: none; /* Sembunyikan secara default di mobile */
            flex-direction: column;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh; /* Ambil tinggi penuh viewport di mobile */
            justify-content: center;
            align-items: center;
            transform: translateX(100%); /* Sembunyikan di luar layar */
            transition: transform 0.3s ease-out;

            &.active {
                display: flex; /* Tampilkan saat aktif */
                transform: translateX(0);
            }

            li {
                margin: $spacing-unit 0;
                a {
                    color: $light-text-color;
                    font-size: 1.5rem;
                    padding: $spacing-unit;
                    display: block;
                    &:hover {
                        color: $primary-color;
                        text-decoration: none;
                    }
                }
            }

            @media (min-width: 768px) {
                display: flex; /* Tampilkan di desktop */
                flex-direction: row;
                position: static;
                background-color: transparent;
                height: auto;
                transform: translateX(0);

                li {
                    margin: 0 $spacing-unit;
                    a {
                        font-size: $font-size-base;
                        padding: 0;
                    }
                }
            }
        }
    }
    ```
    {% endraw %}

    ***_sass/components/_sidebar.scss***

    {% raw %}
    ```
    .sidebar {
        flex: 1; /* Ambil 1 bagian ruang */
        background-color: #ffffff;
        padding: $spacing-unit;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        margin-top: $spacing-unit * 2; /* Jarak dari konten di mobile */

        h3 {
            color: $primary-color;
            border-bottom: 1px solid $border-color;
            padding-bottom: $spacing-unit / 2;
            margin-bottom: $spacing-unit;
        }

        .ad-unit {
            margin-bottom: $spacing-unit * 1.5;
            text-align: center;
            img {
                max-width: 100%;
                height: auto;
                border-radius: 3px;
                margin-bottom: $spacing-unit / 2;
            }
            p {
                font-size: 0.9rem;
                color: $secondary-color;
            }
        }

        @media (min-width: 768px) {
            margin-top: 0; /* Tanpa margin di desktop */
            min-width: 280px; /* Lebar minimum untuk sidebar */
            max-width: 320px; /* Lebar maksimum untuk sidebar */
        }
    }
    ```
    {% endraw %}

    ***_sass/components/_footer.scss***

    {% raw %}
    ```
    .site-footer {
        background-color: $text-color;
        color: $light-text-color;
        padding: $spacing-unit * 2;
        text-align: center;
        margin-top: $spacing-unit * 3;

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            p {
                margin-bottom: $spacing-unit / 2;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        a {
            color: $primary-color;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    ```
    {% endraw %}

    ***_sass/layouts/_default.scss***

    {% raw %}
    ```
    .content-wrapper {
        max-width: 1200px;
        margin: $spacing-unit * 2 auto; /* Jarak dari header/footer */
        padding: 0 $spacing-unit; /* Padding horizontal */
        display: flex;
        flex-direction: column; /* Tumpuk di mobile */
        gap: $spacing-unit * 2; /* Jarak antara main-content dan sidebar */

        @media (min-width: 768px) {
            flex-direction: row; /* Berdampingan di desktop */
            justify-content: space-between;
            align-items: flex-start; /* Sejajarkan di atas */
        }
    }

    .main-content {
        flex: 3; /* Ambil 3 bagian ruang dari 4 bagian total */
        min-width: 0; /* Penting untuk flexbox dan konten panjang */
    }
    ```
    {% endraw %}

    ***_sass/layouts/_post.scss (Contoh untuk halaman postingan)***

    {% raw %}
    ```
    // Anda bisa membuat layout _post.html sendiri, yang hanya meng-extend default
    // atau langsung membuat gaya khusus untuk postingan di sini.
    .post-header {
        text-align: center;
        margin-bottom: $spacing-unit * 2;

        .post-title {
            font-size: 2.5rem;
            margin-bottom: $spacing-unit / 2;
        }

        .post-meta {
            font-size: 0.9rem;
            color: $secondary-color;
        }
    }

    .post-content {
        h1, h2, h3, h4, h5, h6 {
            margin-top: $spacing-unit * 2;
            margin-bottom: $spacing-unit;
        }

        p {
            margin-bottom: $spacing-unit;
        }

        img {
            margin: $spacing-unit auto;
            display: block;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
    }
    ```
    {% endraw %}

    ***assets/css/main.scss (File utama SCSS)***

    {% raw %}
    ```
    ---
    # Minimal front matter untuk Jekyll agar memprosesnya sebagai SCSS
    ---

    @import "base/variables";
    @import "base/base";

    @import "components/header";
    @import "components/navigation";
    @import "components/sidebar";
    @import "components/footer";

    @import "layouts/default";
    @import "layouts/post";
    ```
    {% endraw %}

9. **Konten Dummy**

    Halaman Utama ***(index.html)***

    {% raw %}
    ```
    ---
    layout: default
    title: Beranda
    ---
    <div class="main-content">
        <h1>Selamat Datang di Blog Keren Saya!</h1>
        <p>Ini adalah halaman utama blog yang dibangun dengan Jekyll dari nol. Jelajahi artikel-artikel menarik di bawah ini.</p>

        <h2>Artikel Terbaru</h2>
        <ul class="post-list">
            {% for post in site.posts limit: 5 %}
            <li>
                <a href="{{ post.url | relative_url }}"><h3>{{ post.title }}</h3></a>
                <p class="post-meta">{{ post.date | date: "%d %b %Y" }}</p>
                <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            </li>
            {% endfor %}
        </ul>
    </div>
    ```
    {% endraw %}

    Contoh Postingan (_posts/2025-05-24-postingan-pertama.md)

    {% raw %}
    ```
    ---
    layout: default # Menggunakan layout default, yang sudah termasuk sidebar
    title: Postingan Pertama Saya di Jekyll
    date: 2025-05-24 10:00:00 +0700
    categories: [Jekyll, WebDev]
    tags: [tutorial, blog, from-scratch]
    ---

    <div class="post-header">
        <h1 class="post-title">{{ page.title }}</h1>
        <p class="post-meta">Dipublikasikan pada {{ page.date | date: "%d %b %Y" }}</p>
    </div>

    <div class="post-content">
        <p>Halo dunia! Ini adalah postingan pertama di blog Jekyll yang saya bangun dari nol. Saya sangat antusias untuk berbagi pengetahuan dan pengalaman melalui platform ini.</p>

        <h2>Kenapa Jekyll?</h2>
        <p>Jekyll adalah generator situs statis yang sangat powerful dan fleksibel. Dengan Jekyll, Anda bisa membuat blog yang cepat, aman, dan mudah di-deploy tanpa perlu database atau server yang kompleks. Semua konten Anda ditulis dalam format Markdown, yang sangat nyaman.</p>

        <img src="{{ "/assets/images/sample-image.jpg" | relative_url }}" alt="Gambar Contoh">

        <p>Proses pengembangan template ini mengajarkan banyak hal tentang HTML, CSS (Sass), dan JavaScript, serta bagaimana Jekyll memproses semuanya menjadi sebuah situs statis yang berfungsi penuh.</p>

        <h3>Fitur Utama Template Ini:</h3>
        <ul>
            <li>**Header dengan Background Image:** Memberikan sentuhan visual yang menarik di bagian atas blog.</li>
            <li>**Menu Navigasi Responsif:** Navigasi yang mudah digunakan baik di desktop maupun perangkat mobile.</li>
            <li>**Sidebar untuk Iklan:** Area khusus di samping konten utama untuk menampilkan iklan atau informasi sponsor.</li>
            <li>**Footer Credit:** Informasi hak cipta dan atribusi yang rapi di bagian bawah halaman.</li>
        </ul>

        <p>Saya harap template ini bisa menjadi dasar yang baik untuk blog Anda. Jangan ragu untuk memodifikasi dan mengembangkannya sesuai kebutuhan Anda!</p>
    </div>
    ```
    {% endraw %}

    Siapkan sample-image.jpg dan letakkan di assets/images/.
    Contoh Halaman Statis (_pages/about.md)

    Untuk mengaktifkan koleksi pages, Anda perlu menambahkan ini di _config.yml (sudah kita lakukan di bagian awal).

    {% raw %}
    ```
    ---
    layout: default
    title: Tentang Saya
    permalink: /about/
    ---
    <div class="main-content">
        <h1>Tentang Blog Ini</h1>
        <p>Blog ini dibuat sebagai contoh panduan membangun template Jekyll dari nol. Tujuan utamanya adalah untuk menunjukkan bagaimana berbagai fitur dasar seperti header responsif, navigasi, sidebar, dan footer dapat diimplementasikan.</p>

        <h2>Siapa Saya?</h2>
        <p>Saya adalah seorang pengembang web yang suka bereksperimen dengan teknologi baru. Blog ini adalah wadah saya untuk berbagi hal-hal yang saya pelajari.</p>
    </div>
    ```
    {% endraw %}

10. **Menguji Blog Anda**

    1. Instal Dependensi: Pastikan semua plugin di Gemfile terinstal. Jika ada plugin baru (jekyll-seo-tag, jekyll-feed), Anda perlu menjalankannya lagi:

        {% raw %}
        ```
        bundle install
        ```
        {% endraw %}

    2. Jalankan Server Jekyll:

        {% raw %}
        ```
        bundle exec jekyll serve --livereload
        ```
        {% endraw %}
        Buka http://localhost:4000 di browser Anda.

Ini adalah kerangka dasar yang kuat. Anda bisa menyesuaikan warna, font, menambahkan animasi, atau fitur lainnya sesuai kreativitas Anda!

Saya harap Anda menikmati konten di blog ini!
