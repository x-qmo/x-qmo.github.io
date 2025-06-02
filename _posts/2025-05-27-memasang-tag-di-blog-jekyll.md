---
layout: post
title: Memasang Tag Di Blog Jekyll
description: Pelajari cara memasang tag di blog Jekyll tanpa plugin. Panduan lengkap ini membantu Anda mengorganisir konten dan meningkatkan navigasi blog dengan mudah dan efisien.
date: 2025-05-27 08:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/memasang-tag-jekyll.jpg
---

Memasang tag di blog Jekyll tanpa menggunakan plugin adalah cara yang efisien untuk mengorganisir konten Anda dan meningkatkan navigasi bagi pembaca. Metode ini memanfaatkan fitur bawaan Jekyll seperti front matter dan layout. Berikut adalah panduan langkah demi langkah untuk melakukannya:

1. **Struktur Folder dan File Tag**

    Langkah pertama adalah membuat struktur folder dan file yang diperlukan untuk tag Anda.

    * Buat Folder `_tabs` (atau nama lain yang Anda suka): Di root direktori Jekyll Anda, buat folder baru bernama `_tabs`. Folder ini akan berisi halaman-halaman individual untuk setiap tag yang Anda miliki.

        {% raw %}
        ```
        .
        ├── _posts
        ├── _tabs
        │   ├── tag-name-1.md
        │   ├── tag-name-2.md
        │   └── ...
        ├── _layouts
        ├── index.html
        └── _config.yml
        ```
        {% endraw %}

    * Buat File Markdown untuk Setiap Tag: Di dalam folder `_tabs`, buat file Markdown (.md) untuk setiap tag yang ingin Anda gunakan. Nama file harus sesuai dengan nama tag (misalnya, `javascript.md`, `web-development.md`).

        Contoh `_tabs/javascript.md`:

        {% raw %}
        ```
        ---
        layout: tag_page
        title: JavaScript
        permalink: /tag/javascript/
        ---
        ```
        {% endraw %}

    * `layout: tag_page`: Ini akan menunjuk ke layout khusus yang akan kita buat nanti untuk menampilkan postingan yang terkait dengan tag ini.
    * `title: JavaScript`: Ini adalah nama tag yang akan ditampilkan di halaman.
    * `permalink: /tag/javascript/`: Ini adalah URL permanen untuk halaman tag ini. Sesuaikan dengan struktur URL yang Anda inginkan.

2. **Buat Layout Khusus untuk Halaman Tag**

    Selanjutnya, Anda perlu membuat layout yang akan digunakan oleh semua halaman tag Anda.

    * Buat File `_layouts/tag_page.html`: Di dalam folder `_layouts`, buat file baru bernama `tag_page.html`.

        Contoh `_layouts/tag_page.html`:

        {% raw %}
        ```
        ---
        layout: default
        ---

        <div class="container mt-5">
            <h1>Postingan dengan Tag: {{ page.title }}</h1>
            <hr>
            <ul>
                {% assign tag_name = page.title | downcase %}
                {% for post in site.posts %}
                    {% if post.tags contains tag_name %}
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


        * `layout: default`: Layout ini akan mewarisi layout default blog Anda (misalnya, header, footer, sidebar, dll.). Anda bisa menggantinya dengan layout lain jika Anda punya.
        * {% raw %}`<h1>Postingan dengan Tag: {{ page.title }}</h1>:`{% endraw %} Menampilkan judul tag dari front matter halaman tag (misalnya, "Postingan dengan `Tag: JavaScript`").
        * {% raw %}`{% assign tag_name = page.title | downcase %}`{% endraw %}: Mengambil judul tag dari front matter halaman tag, mengubahnya menjadi huruf kecil, dan menyimpannya dalam variabel `tag_name`. Ini penting untuk pencocokan dengan tag di postingan.
        * {% raw %}`{% for post in site.posts %}`{% endraw %}: Mengulang semua postingan di blog Anda.
        * {% raw %}`{% if post.tags contains tag_name %}`{% endraw %}: Memeriksa apakah array `tags` dalam front matter postingan mengandung `tag_name` saat ini.
        * {% raw %}`<li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> ...</li>`{% endraw %}: Menampilkan judul postingan sebagai tautan ke postingan tersebut.


3. **Menambahkan Tag ke Postingan Anda**

    Sekarang Anda bisa menambahkan tag ke postingan blog Anda menggunakan front matter.

    * Edit `_posts/your-post-title.md`: Buka file Markdown postingan Anda dan tambahkan tags di bagian front matter. Anda bisa menambahkan satu tag atau beberapa tag dalam bentuk array.

        Contoh:

        {% raw %}
        ```
        ---
        layout: post
        title: Contoh Postingan dengan Tag
        date: 2023-10-26 10:00:00 +0700
        categories: [tutorial]
        tags: [javascript, web-development, front-end] # Tambahkan tag di sini
        ---

        Ini adalah konten dari postingan Anda...
        ```
        {% endraw %}

    * `tags: [javascript, web-development, front-end]`: Pastikan nama tag di sini sesuai dengan nama file Markdown yang Anda buat di folder `_tabs` (setelah di-lowercase). Misalnya, jika Anda punya `_tabs/javascript.md`, maka tag-nya adalah javascript.

4. **Menampilkan Daftar Tag di Blog Anda (Opsional tapi Direkomendasikan)**

    Untuk memudahkan pembaca menemukan tag, Anda bisa membuat halaman atau bagian di sidebar yang menampilkan daftar semua tag yang tersedia.

    * Buat Halaman `tags.html` (atau tambahkan di sidebar/footer):

        Contoh `tags.html`:

        {% raw %}
        ```
        ---
        layout: default
        title: Semua Tag
        permalink: /tags/
        ---

        <div class="container mt-5">
            <h1>Semua Tag</h1>
            <hr>
            <ul>
                {% assign all_tags = site.tags | sort %}
                {% for tag in all_tags %}
                    {% if tag[1].size > 0 %} {# Hanya tampilkan tag yang memiliki postingan #}
                        <li><a href="/tag/{{ tag[0] | slugify }}/">{{ tag[0] }}</a> ({{ tag[1].size }})</li>
                    {% endif %}
                {% endfor %}
            </ul>
        </div>
        ```
        {% endraw %}

        Penjelasan :


        * {% raw %}`{% assign all_tags = site.tags | sort %}`{% endraw %}: Jekyll secara otomatis mengumpulkan semua tag dari postingan Anda dalam variabel `site.tags`. sort akan mengurutkan tag secara alfabetis.
        * {% raw %}`{% for tag in all_tags %}`{% endraw %}: Mengulang setiap `tag`. `tag[0]` adalah nama tag dan `tag[1]` adalah array postingan yang terkait dengan tag tersebut.
        * {% raw %}`{% if tag[1].size > 0 %}`{% endraw %}: Memastikan hanya tag yang memiliki setidaknya satu postingan yang ditampilkan.
        * {% raw %}`<a href="/tag/{{ tag[0] | slugify }}/">{{ tag[0] }}</a>`{% endraw %}: Membuat tautan ke halaman tag yang sesuai. `slugify` mengubah nama tag menjadi format URL yang aman (misalnya, "Web Development" menjadi "web-development"). Pastikan permalink di `_tabs/*.md` Anda juga menggunakan format `slugify` ini.


5. **Menguji dan Deploy**

    Setelah Anda menyelesaikan langkah-langkah di atas:

    1. **Jalankan Jekyll:** Buka terminal di root direktori blog Anda dan jalankan `bundle exec jekyll serve` untuk melihat perubahan secara lokal.
    2. **Periksa Tautan Tag:** Pastikan semua tautan tag berfungsi dengan benar dan mengarahkan ke halaman tag yang sesuai.
    3. **Deploy:** Setelah puas dengan hasilnya, deploy blog Jekyll Anda ke platform hosting pilihan Anda (GitHub Pages, Netlify, dll.).

    Dengan mengikuti panduan ini, Anda dapat menambahkan fungsionalitas tag yang kuat ke blog Jekyll Anda tanpa perlu mengandalkan plugin, menjaga blog Anda tetap ringan dan mudah dikelola.
