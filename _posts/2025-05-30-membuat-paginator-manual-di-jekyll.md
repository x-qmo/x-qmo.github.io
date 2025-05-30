---
layout: post
title: Membuat Paginator Manual Di Jekyll
description: Buat daftar postingan menarik di Jekyll! Pelajari cara menampilkan halaman daftar post dengan thumbnail agar blogmu lebih visual dan mudah dijelajahi pembaca
date: 2025-05-30 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/membuat-paginator-jekyll.jpg
---

Membuat paginasi untuk blog Jekyll tanpa menggunakan plugin sangat mungkin dilakukan, tetapi memerlukan pendekatan yang berbeda dan sedikit lebih banyak pekerjaan manual. Karena GitHub Pages memiliki batasan pada plugin yang didukung, ini adalah solusi yang bagus jika Anda ingin kontrol penuh atau jika Anda memiliki alasan khusus untuk tidak menggunakan jekyll-paginate atau jekyll-paginate-v2.

Konsep dasarnya adalah Anda akan membuat halaman HTML statis untuk setiap halaman paginasi, alih-alih mengandalkan plugin untuk membuatnya secara dinamis.

Berikut adalah cara melakukannya:

1. **Persiapan Struktur Data (Posts)**

    Pastikan semua postingan blog Anda berada di folder _posts dengan format penamaan yang benar (YYYY-MM-DD-judul-postingan.md). Paginasi akan berdasarkan ini.

2. **Buat Skrip Pembantu (Opsional, tapi Direkomendasikan)**

    Karena Anda tidak menggunakan plugin, Anda perlu cara untuk menentukan postingan mana yang akan muncul di setiap halaman, dan juga berapa banyak halaman yang akan ada. Anda bisa melakukan ini secara manual, tapi akan lebih efisien jika Anda memiliki skrip kecil (misalnya, Python atau Ruby) yang membantu Anda menghitung dan menentukan ini.

    Namun, untuk tujuan Jekyll murni tanpa plugin, kita akan memanfaatkan kemampuan Liquid dan data koleksi.

3. **Konfigurasi _config.yml**

    Anda tidak perlu mengaktifkan plugin paginasi. Hanya pastikan Jekyll tahu cara mengurutkan postingan Anda.

    {% raw %}
    ```
    # _config.yml
    collections:
    posts:
        output: true # Pastikan postingan dirender
        permalink: /:categories/:year/:month/:day/:title/ # Contoh permalink untuk postingan
    ```
    {% endraw %}

4. **Buat Template Halaman Paginasi Kustom**

    Ini adalah bagian inti dari solusi tanpa plugin. Anda perlu membuat halaman untuk setiap nomor halaman.

    Misalkan Anda ingin 5 postingan per halaman dan path-nya adalah /blog/pageX/.

    **Langkah A: Buat File index.html (atau index.md) di Folder Blog**

    Ini akan menjadi halaman pertama blog Anda.
    blog/index.html

    {% raw %}
    ```
    ---
    layout: default
    title: Blog Terbaru
    ---

    {% assign posts_per_page = 5 %}
    {% assign total_posts = site.posts | size %}
    {% assign total_pages = total_posts | divided_by: posts_per_page %}
    {% comment %} Tambahkan 1 jika ada sisa postingan {% endcomment %}
    {% if total_posts | modulo: posts_per_page > 0 %}
    {% assign total_pages = total_pages | plus: 1 %}
    {% endif %}

    {% assign current_page = 1 %}
    {% assign offset = 0 %}
    {% assign paginated_posts = site.posts | slice: offset, posts_per_page %}

    <div class="posts">
    {% for post in paginated_posts %}
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</p>
        <div>
        {{ post.excerpt }}
        <a href="{{ post.url | relative_url }}">Baca Selengkapnya</a>
        </div>
    {% endfor %}
    </div>

    <div class="pagination">
    {% comment %} Tautan Halaman Sebelumnya (tidak ada di halaman 1) {% endcomment %}
    <span class="previous disabled">Sebelumnya</span>

    {% comment %} Tautan Halaman Saat Ini {% endcomment %}
    <span class="page_number">Halaman: {{ current_page }} dari {{ total_pages }}</span>

    {% comment %} Tautan Halaman Berikutnya {% endcomment %}
    {% if total_pages > 1 %}
        <a href="{{ '/blog/page2/' | relative_url }}" class="next">Berikutnya</a>
    {% else %}
        <span class="next disabled">Berikutnya</span>
    {% endif %}
    </div>
    ```
    {% endraw %}

    **Langkah B: Buat Folder dan File untuk Setiap Halaman Paginasi**

    Ini adalah bagian manualnya. Anda harus membuat folder pageX di dalam blog untuk setiap halaman.

    blog/page2/index.html

    {% raw %}
    ```
    ---
    layout: default
    title: Blog Terbaru - Halaman 2
    ---

    {% assign posts_per_page = 5 %}
    {% assign total_posts = site.posts | size %}
    {% assign total_pages = total_posts | divided_by: posts_per_page %}
    {% if total_posts | modulo: posts_per_page > 0 %}
    {% assign total_pages = total_pages | plus: 1 %}
    {% endif %}

    {% assign current_page = 2 %}
    {% assign offset = posts_per_page | times: current_page | minus: posts_per_page %}
    {% assign paginated_posts = site.posts | slice: offset, posts_per_page %}

    <div class="posts">
    {% for post in paginated_posts %}
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</p>
        <div>
        {{ post.excerpt }}
        <a href="{{ post.url | relative_url }}">Baca Selengkapnya</a>
        </div>
    {% endfor %}
    </div>

    <div class="pagination">
    {% comment %} Tautan Halaman Sebelumnya {% endcomment %}
    <a href="{{ '/blog/' | relative_url }}" class="previous">Sebelumnya</a>

    {% comment %} Tautan Halaman Saat Ini {% endcomment %}
    <span class="page_number">Halaman: {{ current_page }} dari {{ total_pages }}</span>

    {% comment %} Tautan Halaman Berikutnya {% endcomment %}
    {% if current_page < total_pages %}
        <a href="{{ '/blog/page' | append: current_page | plus: 1 | append: '/' | relative_url }}" class="next">Berikutnya</a>
    {% else %}
        <span class="next disabled">Berikutnya</span>
    {% endif %}
    </div>
    ```
    {% endraw %}

    Ulangi ini untuk blog/page3/index.html, blog/page4/index.html, dan seterusnya, dengan mengubah current_page dan sesuaikan tautan previous dan next sesuai nomor halaman.

    Penjelasan:

    {% raw %}
    ```
    * posts_per_page: Jumlah postingan yang ingin Anda tampilkan di setiap halaman.
    * total_posts: Mengambil jumlah total postingan dari site.posts.
    * total_pages: Menghitung total halaman yang diperlukan.
    * current_page: Ini adalah variabel yang harus Anda ubah secara manual untuk setiap file index.html yang Anda buat.
    * offset: Menghitung indeks awal postingan untuk halaman saat ini. Ini adalah kuncinya: (nomor_halaman - 1) * posts_per_page.
    * paginated_posts = site.posts | slice: offset, posts_per_page: Ini adalah filter Liquid yang mengambil irisan (slice) dari semua postingan berdasarkan offset dan posts_per_page.
    * Tautan Paginasi: Anda harus secara manual menyesuaikan href untuk tautan "Sebelumnya" dan "Berikutnya" untuk setiap halaman. Gunakan relative_url untuk memastikan URL bekerja dengan benar di GitHub Pages, terutama jika situs Anda berada di subdirektori (misalnya, username.github.io/repo-name/).
    ```
    {% endraw %}

    Kekurangan Pendekatan Tanpa Plugin:

    * Manual dan Memakan Waktu: Anda harus membuat file index.html terpisah untuk setiap halaman paginasi. Jika Anda memiliki ratusan postingan, ini akan menjadi pekerjaan yang sangat melelahkan.
    * Sulit untuk Memelihara: Setiap kali Anda menambah atau menghapus postingan, atau mengubah posts_per_page, Anda harus menghitung ulang dan mungkin membuat ulang semua file paginasi secara manual.
    * Tidak Dinamis: Ini adalah solusi statis.

    Kapan Menggunakan Pendekatan Ini?

    * Jika Anda memiliki jumlah postingan yang sangat sedikit dan tidak sering memperbarui blog.
    * Jika Anda benar-benar tidak ingin menggunakan plugin karena batasan lingkungan (seperti GitHub Pages yang tidak mendukung jekyll-paginate-v2) dan Anda tidak ingin menggunakan GitHub Actions untuk build.
    * Untuk tujuan pembelajaran tentang bagaimana paginasi bekerja di balik layar.

Rekomendasi: Gunakan GitHub Actions untuk Paginasi Plugin

Jika Anda ingin paginasi bekerja secara otomatis di GitHub Pages dan tetap menggunakan plugin jekyll-paginate-v2 (yang jauh lebih fleksibel daripada bawaan), solusi terbaik adalah menggunakan GitHub Actions.

Dengan GitHub Actions, Anda dapat mengkonfigurasi alur kerja yang akan:

* Checkout kode repositori Anda.
* Menginstal Jekyll dan semua plugin yang Anda butuhkan (termasuk jekyll-paginate-v2).
* Membangun situs Jekyll Anda secara lokal (di lingkungan GitHub Actions).
* Mendorong folder _site yang dihasilkan ke cabang gh-pages (atau cabang main jika itu sumber GitHub Pages Anda).

Ini memungkinkan Anda menggunakan plugin apa pun yang Anda inginkan, dan situs Anda akan dibangun secara dinamis setiap kali Anda mendorong perubahan, tanpa perlu intervensi manual untuk setiap halaman paginasi. Ini adalah keseimbangan terbaik antara fleksibilitas plugin dan penyebaran otomatis di GitHub Pages.

Apakah Anda tertarik untuk mengetahui lebih lanjut tentang cara menyiapkan GitHub Actions untuk membangun situs Jekyll Anda?
