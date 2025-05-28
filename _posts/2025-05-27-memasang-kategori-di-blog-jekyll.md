---
layout: post
title: Memasang Kategori Di Blog Jekyll
date: 2025-05-27 08:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
---

Mengatur postingan blog Anda dengan kategori di Jekyll tanpa menggunakan plugin itu cukup mudah. Prosesnya mirip dengan penanganan tag. Anda akan menggunakan front matter di postingan Anda dan membuat halaman khusus untuk setiap kategori. Ini menjaga blog Anda tetap ramping dan cepat.

1. **Struktur Folder dan File Kategori**

    Pertama, mari siapkan struktur yang kita butuhkan.

    * Buat Folder _categories (atau nama lain yang Anda suka): Di root direktori Jekyll Anda, buat folder baru bernama _categories. Folder ini akan menampung halaman-halaman individual untuk setiap kategori.

        {% raw %}
        ```
        .
        ├── _posts
        ├── _categories
        │   ├── programming.md
        │   ├── design.md
        │   └── ...
        ├── _layouts
        ├── index.html
        └── _config.yml
        ```
        {% endraw %}

    * Buat File Markdown untuk Setiap Kategori: Di dalam folder _categories, buat file Markdown (.md) untuk setiap kategori yang ingin Anda gunakan. Nama file harus sesuai dengan nama kategori yang akan Anda gunakan di postingan (misalnya, programming.md, design.md).

        Contoh _categories/programming.md:

        {% raw %}
        ```
        ---
        layout: category_page
        title: Programming
        permalink: /category/programming/
        ---
        ```
        {% endraw %}

    * layout: category_page: Ini akan mengarahkan ke layout khusus yang akan kita buat sebentar lagi untuk menampilkan postingan yang terkait dengan kategori ini.
    * title: Programming: Ini adalah nama kategori yang akan ditampilkan di halaman.
    * permalink: /category/programming/: Ini adalah URL permanen untuk halaman kategori ini. Sesuaikan dengan struktur URL yang Anda inginkan.

2. **Buat Layout Khusus untuk Halaman Kategori**

    Selanjutnya, Anda perlu membuat layout yang akan digunakan oleh semua halaman kategori Anda.

    * Buat File _layouts/category_page.html: Di dalam folder _layouts, buat file baru bernama category_page.html.

        Contoh _layouts/category_page.html:

        {% raw %}
        ```
        ---
        layout: default
        ---

        <div class="container mt-5">
            <h1>Postingan dalam Kategori: {{ page.title }}</h1>
            <hr>
            <ul>
                {% assign category_name = page.title %} {# Ambil nama kategori dari front matter #}
                {% for post in site.posts %}
                    {% if post.categories contains category_name %}
                        <li>
                            <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - <small>{{ post.date | date: "%d %b %Y" }}</small>
                        </li>
                    {% endif %}
                {% endfor %}
            </ul>
        </div>
        ```
        {% endraw %}

        Penjelasan :

        {% raw %}
        ```
        layout: default: Layout ini akan mewarisi layout default blog Anda (misalnya, header, footer, sidebar, dll.).
        <h1>Postingan dalam Kategori: {{ page.title }}</h1>: Menampilkan judul kategori dari front matter halaman kategori (misalnya, "Postingan dalam Kategori: Programming").
        {% assign category_name = page.title %}: Mengambil judul kategori dari front matter halaman kategori.
        {% for post in site.posts %}: Mengulang semua postingan di blog Anda.
        {% if post.categories contains category_name %}: Memeriksa apakah array categories dalam front matter postingan mengandung category_name saat ini.
        <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> ...</li>: Menampilkan judul postingan sebagai tautan ke postingan tersebut.
        ```
        {% endraw %}

3. Menambahkan Kategori ke Postingan Anda

    Sekarang Anda bisa menambahkan kategori ke postingan blog Anda menggunakan front matter.

    * Edit _posts/nama-postingan-anda.md: Buka file Markdown postingan Anda dan tambahkan categories di bagian front matter. Anda bisa menambahkan satu kategori atau beberapa kategori dalam bentuk array.

        Contoh:

        {% raw %}
        ```
        ---
        layout: post
        title: Mengenal JavaScript ES6
        date: 2023-10-26 10:00:00 +0700
        categories: [Programming, Web Development] # Tambahkan kategori di sini
        tags: [javascript, es6]
        ---

        Ini adalah konten dari postingan Anda...
        ```
        {% endraw %}

    * categories: [Programming, Web Development]: Pastikan nama kategori di sini sesuai dengan nama file Markdown yang Anda buat di folder _categories dan juga sesuai dengan title di front matter file kategori tersebut. Perhatikan huruf besar/kecilnya juga.

4. Menampilkan Daftar Kategori di Blog Anda (Opsional tapi Direkomendasikan)

    Untuk memudahkan pembaca menemukan kategori, Anda bisa membuat halaman atau bagian di sidebar yang menampilkan daftar semua kategori yang tersedia.

    * Buat Halaman categories.html (atau tambahkan di sidebar/footer):

        Contoh categories.html:

        {% raw %}
        ```
        ---
        layout: default
        title: Semua Kategori
        permalink: /categories/
        ---

        <div class="container mt-5">
            <h1>Semua Kategori</h1>
            <hr>
            <ul>
                {% assign all_categories = site.categories | sort %}
                {% for category in all_categories %}
                    {% if category[1].size > 0 %} {# Hanya tampilkan kategori yang memiliki postingan #}
                        <li><a href="/category/{{ category[0] | slugify }}/">{{ category[0] }}</a> ({{ category[1].size }})</li>
                    {% endif %}
                {% endfor %}
            </ul>
        </div>
        ```
        {% endraw %}

        Penjelasan :

        {% raw %}
        ```
        {% assign all_categories = site.categories | sort %}: Jekyll secara otomatis mengumpulkan semua kategori dari postingan Anda dalam variabel site.categories. sort akan mengurutkan kategori secara alfabetis.
        {% for category in all_categories %}: Mengulang setiap kategori. category[0] adalah nama kategori dan category[1] adalah array postingan yang terkait dengan kategori tersebut.
        {% if category[1].size > 0 %}: Memastikan hanya kategori yang memiliki setidaknya satu postingan yang ditampilkan.
        <a href="/category/{{ category[0] | slugify }}/">{{ category[0] }}</a>: Membuat tautan ke halaman kategori yang sesuai. slugify mengubah nama kategori menjadi format URL yang aman (misalnya, "Web Development" menjadi "web-development"). Pastikan permalink di _categories/*.md Anda juga menggunakan format slugify ini.
        ```
        {% endraw %}

5. Uji Coba dan Deploy

    Setelah Anda menyelesaikan langkah-langkah di atas:

    1. **Jalankan Jekyll:** Buka terminal di root direktori blog Anda dan jalankan bundle exec jekyll serve untuk melihat perubahan secara lokal.
    2. **Periksa Tautan Kategori:** Pastikan semua tautan kategori berfungsi dengan benar dan mengarahkan ke halaman kategori yang sesuai.
    3. **Deploy:** Setelah puas dengan hasilnya, deploy blog Jekyll Anda ke platform hosting pilihan Anda (GitHub Pages, Netlify, dll.).

    Dengan menerapkan langkah-langkah ini, Anda akan memiliki sistem kategori yang berfungsi penuh di blog Jekyll Anda tanpa perlu mengandalkan plugin eksternal. Ini adalah cara yang sederhana dan efektif untuk menjaga blog Anda tetap terorganisir dan mudah dijelajahi.
