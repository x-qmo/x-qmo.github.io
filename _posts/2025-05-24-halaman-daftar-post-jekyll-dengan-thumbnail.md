---
layout: post
title: Halaman Daftar Post Jekyll Dengan Thumbnail
description: Buat daftar postingan menarik di Jekyll! Pelajari cara menampilkan halaman daftar post dengan thumbnail agar blogmu lebih visual dan mudah dijelajahi pembaca
date: 2025-05-24 10:00:00 +0700
categories: [tutorial, umum]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/post-thumbnail-di-jekyll.jpg
---

Membuat halaman postingan di Jekyll dengan thumbnail melibatkan beberapa langkah: Anda perlu menambahkan variabel untuk gambar thumbnail di front matter postingan Anda, kemudian menampilkan gambar tersebut di daftar postingan (misalnya di halaman depan atau halaman arsip) dan juga di halaman postingan itu sendiri.

Berikut adalah cara melakukannya secara detail:
## Langkah 1: Siapkan Direktori Gambar Thumbnail

Sebaiknya Anda memiliki direktori khusus untuk menyimpan gambar thumbnail. Umumnya, ini ada di dalam folder `assets/images/`.

{% raw %}
```
your-jekyll-blog/
├── assets/
│   └── images/
│       ├── post-thumbnail-1.jpg  <-- Gambar thumbnail Anda
│       ├── post-thumbnail-2.png
│       └── default-thumbnail.jpg <-- Opsional: thumbnail default
├── _posts/
│   └── 2024-05-25-contoh-postingan.md
├── index.html
├── _layouts/
├── _includes/
├── _config.yml
└── css/
```
{% endraw %}

Pastikan Anda menempatkan gambar thumbnail di sana.

## Langkah 2: Tambahkan Variabel image atau thumbnail di Front Matter Postingan

Buka setiap file postingan Anda di direktori `_posts/` dan tambahkan variabel baru di bagian front matter. Variabel ini akan menyimpan path ke gambar thumbnail untuk postingan tersebut.

Pilih nama variabel yang konsisten, misalnya `image` atau `thumbnail`. Saya akan menggunakan image karena sering juga digunakan untuk `Open Graph/Twitter Cards`.

{% raw %}
```
---
layout: post # Atau layout lain yang Anda gunakan untuk postingan
title: Judul Postingan Anda di Sini
date: 2024-05-25 10:00:00 +0700
categories: [kategori-anda]
tags: [tag1, tag2]
author: Nama Anda
# --- Tambahkan ini ---
image: /assets/images/post-thumbnail-1.jpg # Path relatif ke gambar thumbnail
# ---------------------
---

Konten postingan Anda di sini...
```
{% endraw %}

**Penting:**

* **Path Relatif** : Gunakan path relatif dari root situs Anda (misalnya `/assets/images/post-thumbnail-1.jpg`). Jekyll akan menanganinya dengan baik.
* **Gambar Default (Opsional)** : Jika beberapa postingan tidak memiliki gambar khusus, Anda bisa mengatur gambar default di `_config.yml` atau langsung di logika Liquid Anda.

## Langkah 3: Tampilkan Thumbnail di Halaman Daftar Postingan

Sekarang, Anda ingin thumbnail muncul di halaman depan (misalnya `index.html`) atau halaman arsip yang menampilkan daftar semua postingan.

Buka `index.html` Anda (atau file yang menampilkan daftar postingan, misalnya `archive.html`). Temukan loop yang menampilkan postingan

{% raw %}
```
({% for post in site.posts %})
```
{% endraw %}

dan tambahkan tag `<img>`.

{% raw %}
```
<h2>Postingan Terbaru</h2>
<div class="post-list">
    {% for post in site.posts %}
    <div class="post-item">
        {% if post.image %} {# Cek apakah postingan punya gambar thumbnail #}
            <a href="{{ post.url | relative_url }}">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" class="post-thumbnail">
            </a>
        {% else %}
            {# Opsional: Tampilkan gambar placeholder jika tidak ada thumbnail #}
            <a href="{{ post.url | relative_url }}">
                <img src="{{ '/assets/images/default-thumbnail.jpg' | relative_url }}" alt="No thumbnail available" class="post-thumbnail default">
            </a>
        {% endif %}

        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
        <p>{{ post.description | default: post.excerpt | strip_html | truncate: 150 }}</p> {# Tampilkan deskripsi atau kutipan #}
        <a href="{{ post.url | relative_url }}" class="read-more">Baca Selengkapnya &raquo;</a>
    </div>
    {% endfor %}
</div>
```
{% endraw %}

**Penjelasan:**

* {% raw %}`{% if post.image %}`{% endraw %}: Memeriksa apakah variabel image ada di front matter postingan.
* {% raw %}`{{ post.image | relative_url }}`{% endraw %}: Mengambil path gambar dan memastikan URL-nya benar dengan `relative_url` * filter.
* {% raw %}`alt="{{ post.title }}"`{% endraw %}: Penting untuk SEO dan aksesibilitas, memberikan teks alternatif untuk gambar.
* {% raw %}`class="post-thumbnail"`{% endraw %}: Kelas CSS untuk mengatur gaya thumbnail.
* {% raw %}`post.description | default: post.excerpt | strip_html | truncate: 150`{% endraw %}: Ini adalah contoh bagaimana Anda bisa menampilkan deskripsi postingan (jika ada di front matter) atau kutipan otomatis dari postingan.


## Langkah 4: Tambahkan CSS untuk Thumbnail

Agar thumbnail terlihat rapi, tambahkan beberapa gaya ke file CSS Anda (misalnya `css/style.css`).

{% raw %}
```
/* css/style.css */

.post-list {
    display: grid; /* Menggunakan CSS Grid untuk layout daftar postingan */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Kolom responsif */
    gap: 30px; /* Jarak antar postingan */
}

.post-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden; /* Penting untuk gambar yang melimpah */
    transition: transform 0.3s ease;
    text-align: center;
}

.post-item:hover {
    transform: translateY(-5px); /* Efek hover ringan */
}

.post-thumbnail {
    width: 100%; /* Gambar mengisi lebar container */
    height: 200px; /* Tinggi tetap untuk thumbnail */
    object-fit: cover; /* Memastikan gambar mengisi area tanpa terdistorsi */
    display: block; /* Menghilangkan spasi di bawah gambar */
    margin-bottom: 15px; /* Jarak antara gambar dan teks */
}

.post-item h3 {
    margin: 15px 0 10px;
    padding: 0 15px;
    font-size: 1.3em;
}

.post-item h3 a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
}

.post-item h3 a:hover {
    color: #007bff;
}

.post-item .post-meta {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 15px;
}

.post-item p {
    padding: 0 15px;
    font-size: 0.95em;
    color: #555;
}

.post-item .read-more {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    margin-top: 15px;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;
}

.post-item .read-more:hover {
    background-color: #0056b3;
}
```
{% endraw %}

## Langkah 5: Tampilkan Gambar Postingan Utama di Halaman Detail Postingan

Untuk halaman detail postingan itu sendiri (`_layouts/post.html`), Anda juga dapat menampilkan gambar utama di bagian atas konten.

{% raw %}
```
---
layout: default # Ini akan menggunakan layout default sebagai induknya
---

<article>
    <header class="post-header">
        {% if page.image %} {# Tampilkan gambar utama di halaman detail postingan #}
            <img src="{{ page.image | relative_url }}" alt="{{ page.title }}" class="main-post-image">
        {% endif %}
        <h2>{{ page.title }}</h2>
        <p class="post-meta">
            Diposting pada: {{ page.date | date: "%B %d, %Y" }}
            {% if page.author %} oleh {{ page.author }}{% endif %}
            {% if page.categories %} | Kategori: {% for category in page.categories %}<a href="{{ '/categories/' | relative_url }}{{ category | slugify }}/">{{ category }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}
        </p>
    </header>

    <div class="post-content">
        {{ content }}
    </div>

    <hr>
    </article>
```
{% endraw %}

Dan tambahkan CSS untuk `main-post-image`:

{% raw %}
```
/* css/style.css */

.main-post-image {
    width: 100%;
    max-height: 400px; /* Batasi tinggi gambar utama */
    object-fit: cover;
    margin-bottom: 25px;
    border-radius: 8px;
}
```
{% endraw %}

## Langkah 6: Uji dan Sesuaikan

* Jalankan Jekyll: `bundle exec jekyll serve`
* Buka Browser: Kunjungi halaman depan atau arsip blog Anda untuk melihat daftar postingan dengan thumbnail.
* Klik Postingan: Buka halaman detail postingan untuk melihat gambar utama di sana.
* Sesuaikan CSS: Mainkan dengan nilai-nilai CSS (width, height, object-fit, margin, padding, dll.) hingga Anda mendapatkan tampilan yang diinginkan.

## Metode Umum Menampilkan Thumbnail

1. **Menggunakan Front Matter untuk Setiap Postingan**

    Ini adalah cara yang paling fleksibel karena Anda bisa menentukan thumbnail yang berbeda untuk setiap postingan.

    Langkah-langkah:

    * Tambahkan thumbnail ke Front Matter postingan Anda:
    * Buka file Markdown (.md atau .markdown) dari setiap postingan dan tambahkan baris thumbnail: di bagian Front Matter (bagian atas file yang diapit oleh ---).

    {% raw %}
    ```
    ---
    layout: post
    title: Judul Postingan Anda
    date: 2023-10-26 10:00:00 +0700
    categories: [web, tutorial]
    thumbnail: /assets/img/thumbnails/gambar-thumbnail-postingan-ini.jpg
    ---
    ```
    {% endraw %}
    Catatan: Pastikan path gambar (`/assets/img/thumbnails/gambar-thumbnail-postingan-ini.jpg`) sesuai dengan lokasi gambar thumbnail Anda di proyek Jekyll.
    * Edit halaman daftar postingan Anda:
    Buka file layout yang menampilkan daftar postingan Anda (misalnya, `index.html` jika itu halaman beranda, atau file layout kategori/tag Anda). Kemudian, tambahkan kode HTML untuk menampilkan gambar thumbnail di dalam loop yang menampilkan postingan.

        {% raw %}
        ```
        {% for post in site.posts %}
        <div class="post-item">
            {% if post.thumbnail %}
            <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}" class="post-thumbnail">
            {% endif %}
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            <a href="{{ post.url | relative_url }}" class="read-more">Baca Selengkapnya</a>
        </div>
        {% endfor %}
        ```
        {% endraw %}

        Penjelasan :


        * Kode {% raw %}`{% if post.thumbnail %}`{% endraw %} memastikan bahwa gambar hanya ditampilkan jika properti thumbnail ada di Front Matter postingan.
        * {% raw %}`{{ post.thumbnail | relative_url }}`{% endraw %} akan mengonversi path menjadi URL relatif yang benar.


2. **Menggunakan Default Front Matter**

    Jika Anda ingin semua postingan memiliki struktur thumbnail yang serupa, atau Anda ingin mengatur direktori default untuk thumbnail, Anda bisa menggunakan `_config.yml`.

    Langkah-langkah:

    * Tambahkan aturan defaults di `_config.yml`:
    Buka file `_config.yml` Anda dan tambahkan bagian defaults.

        {% raw %}
        ```
        # _config.yml
        defaults:
        - scope:
            path: "" # Berlaku untuk semua file
            type: "posts" # Hanya untuk postingan
            values:
            thumbnail_dir: "/assets/img/post-thumbnails/" # Direktori default untuk thumbnail
        ```
        {% endraw %}

        Dengan pengaturan ini, Anda bisa menentukan hanya nama file gambar di Front Matter postingan:

        {% raw %}
        ```
        ---
        layout: post
        title: Judul Postingan Anda
        date: 2023-10-26 10:00:00 +0700
        categories: [web, tutorial]
        thumbnail: gambar-unik-postingan-ini.jpg # Hanya nama file
        ---
        ```
        {% endraw %}

    * Edit halaman daftar postingan Anda:
    Di file layout daftar postingan, Anda perlu menggabungkan `thumbnail_dir` dan `thumbnail`.

        {% raw %}
        ```
        {% for post in site.posts %}
        <div class="post-item">
            {% if post.thumbnail %}
            <img src="{{ post.thumbnail_dir | append: post.thumbnail | relative_url }}" alt="{{ post.title }}" class="post-thumbnail">
            {% endif %}
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            <a href="{{ post.url | relative_url }}" class="read-more">Baca Selengkapnya</a>
        </div>
        {% endfor %}
        ```
        {% endraw %}

Dengan langkah-langkah ini, blog Jekyll Anda akan menampilkan thumbnail yang menarik, meningkatkan daya tarik visual dan navigasi bagi pengunjung Anda!

