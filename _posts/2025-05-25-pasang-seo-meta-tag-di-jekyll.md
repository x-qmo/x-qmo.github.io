---
layout: post
title: Pasang Seo Meta Tag Di Jekyll
description: Optimalkan blog Jekyll-mu! Panduan ini mengajarkan cara memasang SEO meta tag untuk meningkatkan visibilitas di mesin pencari. Mudah, tanpa plugin, dan efektif
date: 2025-05-25 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
thumbnail: /assets/images/pasang-seo-tag-jekyll.jpg
---

Memasang SEO meta tag di Jekyll adalah langkah krusial untuk memastikan situs Anda terindeks dengan baik oleh mesin pencari. Jekyll sendiri sangat ramah SEO karena menghasilkan HTML murni.

![My image Name](/assets/images/pasang-seo-tag-jekyll.jpg)

Ada beberapa cara untuk memasang SEO meta tag di Jekyll, mulai dari cara manual hingga menggunakan plugin. Berikut adalah penjelasannya:

## Menggunakan Jekyll SEO Tag Plugin (Sangat Direkomendasikan!)

Ini adalah cara paling mudah dan paling efektif untuk mengelola meta tag SEO di Jekyll. Plugin ini dibuat dan dikelola oleh tim Jekyll sendiri, sehingga sangat terintegrasi.

**Fitur utama:**

* Menghasilkan meta tag standar untuk mesin pencari (Title, Description, Canonical URL).
* Menghasilkan Open Graph tags untuk berbagi di media sosial (Facebook, Twitter).
* Menghasilkan Twitter Card tags.
* Mendukung schema.org JSON-LD untuk data terstruktur.

**Langkah-langkah:**

1. Tambahkan Plugin ke _config.yml:
    Buka file _config.yml di root proyek Jekyll Anda dan tambahkan plugin di bagian plugins:

    {% raw %}
    ```
    # _config.yml

    plugins:
    - jekyll-seo-tag
    ```
    {% endraw %}

    Jika Anda sudah memiliki plugin lain, pastikan jekyll-seo-tag ada di daftar tersebut.

2. Tambahkan Gem ke Gemfile:

    Buka file Gemfile di root proyek Anda dan tambahkan baris berikut:

    {% raw %}
    ```
    # Gemfile

    gem "jekyll-seo-tag"
    ```
    {% endraw %}

    Jika Anda tidak memiliki Gemfile, buatlah. Setelah menambahkan baris ini, jalankan bundle install di terminal Anda.

3. Sertakan Tag di _layouts/head.html atau _includes/head.html:

    Plugin ini bekerja dengan menyuntikkan meta tag ke bagian <head> dari HTML Anda. Cara terbaik untuk melakukannya adalah dengan menambahkannya ke layout atau include yang digunakan di bagian <head> situs Anda.

    Cari file seperti _layouts/default.html, _layouts/page.html, atau _includes/head.html (tergantung tema Anda). Di dalam tag <head>, tambahkan baris Liquid berikut:

    {% raw %}
    ```
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ page.title | default: site.title }}</title>

    {% seo %}

    <link rel="stylesheet" href="{{ "/assets/css/style.css" | relative_url }}">
    </head>
    ```
    {% endraw %}

4. Konfigurasi di Front Matter atau _config.yml:

    Jekyll SEO Tag secara otomatis akan mengambil informasi dari front matter setiap halaman/postingan dan dari _config.yml.

    * Di _config.yml:
    Ini adalah tempat Anda mengatur informasi SEO global untuk situs Anda.

        {% raw %}
        ```
        # _config.yml

        title: Nama Situs Anda
        description: Deskripsi singkat situs Anda untuk SEO.
        url: "https://www.situsanda.com" # URL lengkap situs Anda (penting!)
        baseurl: "" # Jika situs Anda di-host di subdomain atau subdirektori

        # Informasi tambahan untuk Open Graph dan Twitter Cards
        author: "Nama Anda"
        logo: "/assets/images/logo.png" # Path ke logo situs Anda
        social:
        name: Nama Anda
        links:
            - https://twitter.com/username_anda
            - https://facebook.com/namafanpage
        twitter:
        username: username_twitter_anda # Hanya username, tanpa '@'
        ```
        {% endraw %}

    * Di Front Matter Postingan/Halaman:
    Untuk setiap postingan atau halaman, Anda dapat menimpa nilai global dengan menambahkan front matter spesifik.

        {% raw %}
        ```
        ---
        layout: post
        title: Judul Unik Postingan Anda
        description: Deskripsi meta khusus untuk postingan ini. Harus relevan dan menarik.
        image: /assets/images/featured-image.jpg # Gambar khusus untuk Open Graph/Twitter Card
        ---

        Isi postingan Anda di sini.
        ```
        {% endraw %}

        Jika description tidak disediakan di front matter, plugin akan mencoba mengambil bagian pertama dari konten postingan. title akan diambil dari title di front matter.

5. Build dan Lihat Hasilnya:
    Jalankan bundle exec jekyll serve dan buka situs Anda di browser. Lihat kode sumber halaman (Ctrl+U atau Cmd+Option+U). Anda akan melihat meta tag SEO yang dihasilkan secara otomatis:

    {% raw %}
    ```
    <title>Judul Unik Postingan Anda | Nama Situs Anda</title>
    <meta name="description" content="Deskripsi meta khusus untuk postingan ini. Harus relevan dan menarik.">
    <link rel="canonical" href="https://www.situsanda.com/path-to-postingan/">
    <meta property="og:title" content="Judul Unik Postingan Anda">
    <meta property="og:description" content="Deskripsi meta khusus untuk postingan ini. Harus relevan dan menarik.">
    <meta property="og:url" content="https://www.situsanda.com/path-to-postingan/">
    <meta property="og:site_name" content="Nama Situs Anda">
    <meta property="og:image" content="https://www.situsanda.com/assets/images/featured-image.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@username_twitter_anda">
    <meta name="twitter:title" content="Judul Unik Postingan Anda">
    <meta name="twitter:description" content="Deskripsi meta khusus untuk postingan ini. Harus relevan dan menarik.">
    <meta name="twitter:image" content="https://www.situsanda.com/assets/images/featured-image.jpg">
    <script type="application/ld+json">...</script>
    ```
    {% endraw %}

## Menggunakan Meta Tag Manual (Kurang Efisien tapi Memungkinkan)

Jika Anda tidak ingin menggunakan plugin, Anda bisa mengatur meta tag secara manual menggunakan Liquid. Ini kurang efisien dan lebih rentan terhadap kesalahan, tetapi bisa dilakukan.

Langkah-langkah:

1. Di _layouts/head.html atau _includes/head.html:
Sertakan kode berikut di dalam tag <head> Anda:

    {% raw %}
    ```
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ page.title | default: site.title }} {% if page.title %} | {{ site.title }}{% endif %}</title>
    <meta name="description" content="{{ page.description | default: site.description | strip_html | strip_newlines | truncate: 160 }}">
    <link rel="canonical" href="{{ page.url | absolute_url }}">

    <meta property="og:title" content="{{ page.title | default: site.title }}">
    <meta property="og:description" content="{{ page.description | default: site.description | strip_html | strip_newlines | truncate: 160 }}">
    <meta property="og:url" content="{{ page.url | absolute_url }}">
    <meta property="og:site_name" content="{{ site.title }}">
    <meta property="og:type" content="{% if page.layout == 'post' %}article{% else %}website{% endif %}">
    {% if page.image %}
        <meta property="og:image" content="{{ page.image | absolute_url }}">
    {% elsif site.logo %}
        <meta property="og:image" content="{{ site.logo | absolute_url }}">
    {% endif %}

    <meta name="twitter:card" content="{% if page.image or site.logo %}summary_large_image{% else %}summary{% endif %}">
    <meta name="twitter:title" content="{{ page.title | default: site.title }}">
    <meta name="twitter:description" content="{{ page.description | default: site.description | strip_html | strip_newlines | truncate: 160 }}">
    {% if site.twitter_username %}
        <meta name="twitter:site" content="@{{ site.twitter_username }}">
    {% endif %}
    {% if page.image %}
        <meta name="twitter:image" content="{{ page.image | absolute_url }}">
    {% elsif site.logo %}
        <meta name="twitter:image" content="{{ site.logo | absolute_url }}">
    {% endif %}

    <link rel="icon" type="image/png" href="{{ '/assets/favicon.png' | relative_url }}">

    <link rel="stylesheet" href="{{ "/assets/css/style.css" | relative_url }}">
    </head>
    ```
    {% endraw %}

2. Konfigurasi di Front Matter atau _config.yml:
    Sama seperti dengan plugin, Anda akan mengisi nilai-nilai ini di _config.yml untuk pengaturan global dan di front matter setiap halaman/postingan untuk pengaturan spesifik.

    {% raw %}
    ```
    # _config.yml

    title: Nama Situs Anda
    description: Deskripsi singkat situs Anda untuk SEO.
    url: "https://www.situsanda.com" # URL lengkap situs Anda (penting!)
    baseurl: ""
    logo: "/assets/images/logo.png" # Path ke logo situs Anda
    twitter_username: username_twitter_anda # Hanya username, tanpa '@'
    ```
    {% endraw %}

    {% raw %}
    ```
    ---
    layout: post
    title: Judul Unik Postingan Anda
    description: Deskripsi meta khusus untuk postingan ini. Harus relevan dan menarik.
    image: /assets/images/featured-image.jpg # Gambar khusus untuk Open Graph/Twitter Card
    ---

    Isi postingan Anda di sini.
    ```
    {% endraw %}

**Tips SEO Penting untuk Jekyll:**

1. **URL Kanonis (Canonical URL):** Pastikan setiap halaman memiliki URL kanonis yang benar untuk menghindari masalah konten duplikat. jekyll-seo-tag menanganinya secara otomatis.
2. **Sitemap.xml:** Gunakan plugin jekyll-sitemap untuk menghasilkan sitemap.xml. Ini membantu mesin pencari menemukan semua halaman di situs Anda.
Tambahkan gem "jekyll-sitemap" ke Gemfile dan jekyll-sitemap ke plugins di _config.yml.
3. **Robots.txt:** Buat file robots.txt di root proyek Anda untuk menginstruksikan mesin pencari halaman mana yang boleh atau tidak boleh di-crawl.
    * Contoh dasar:

        {% raw %}
        ```
        User-agent: *
        Allow: /
        Sitemap: {{ site.url }}/sitemap.xml
        ```
        {% endraw %}

4. **Optimalisasi Gambar:** Kompres gambar dan gunakan atribut alt yang deskriptif.
5. **Kecepatan Situs:** Jekyll secara default sangat cepat. Pastikan CSS dan JavaScript Anda dioptimalkan.
6. **Struktur Heading (H1, H2, H3):** Gunakan heading secara hierarkis dan logis di dalam konten Anda.
7. **Konten Berkualitas:** Yang paling penting, buatlah konten yang relevan, informatif, dan menarik bagi audiens Anda.
8. **Pastikan site.url Diatur dengan Benar:** Ini sangat penting untuk jekyll-seo-tag dan jekyll-sitemap agar URL yang dihasilkan benar (termasuk http:// atau https://).

Dengan mengikuti langkah-langkah ini, terutama menggunakan jekyll-seo-tag plugin, situs Jekyll Anda akan memiliki fondasi SEO yang kuat!











