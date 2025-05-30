---
layout: post
title: Membuat Paginator Manual Di Jekyll
description: Ingin kontrol penuh atas paginasi blog Jekyll Anda? Pelajari cara membuat paginator manual yang fleksibel dan sesuai keinginan Anda di sini!
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

**Bonus :**

## cara pasang dan menggunakan jekyll paginate di blog jekyll

jekyll-paginate adalah plugin yang membagi daftar postingan blog Anda menjadi beberapa halaman, sehingga tidak semua postingan muncul di satu halaman panjang. Ini sangat penting untuk blog dengan banyak konten.

1. Memasang jekyll-paginate

    Meskipun jekyll-paginate adalah plugin bawaan, Anda tetap perlu menambahkannya ke konfigurasi Anda agar Jekyll tahu untuk menggunakannya.

    a. Tambahkan ke Gemfile (Direkomendasikan)

    Jika Anda menggunakan Bundler (cara standar untuk mengelola dependensi Jekyll), tambahkan jekyll-paginate ke Gemfile Anda:

    {% raw %}
    ```
    gem install jekyll-paginate
    ```
    {% endraw %}

    Setelah menambahkan ini, buka terminal di root folder proyek Jekyll Anda dan jalankan:

    {% raw %}
    ```
    bundle install
    ```
    {% endraw %}

    Ini akan menginstal jekyll-paginate dan dependensi lainnya.

    b. Tambahkan ke _config.yml

    Selanjutnya, beri tahu Jekyll untuk memuat plugin ini dengan menambahkannya ke file _config.yml Anda:

    {% raw %}
    ```
    # _config.yml

    plugins:
    - jekyll-paginate


    # Pagination settings
    paginate: 5 # Jumlah postingan yang akan ditampilkan per halaman
    paginate_path: "./page:num/" # Path untuk halaman paginasi. :num akan diganti dengan nomor halaman.

    # ... (pengaturan lain di sini) ...
    ```
    {% endraw %}

    Penjelasan:

    * paginate: 5: Ini menentukan bahwa setiap halaman paginasi akan menampilkan maksimal 5 postingan. Anda bisa mengubah angka ini sesuai keinginan Anda (misalnya, 10, 3).
    * paginate_path: "/page:num/": Ini adalah pola URL untuk halaman-halaman paginasi Anda.
        * :numadalah placeholder yang akan diganti dengan nomor halaman (misalnya,/page2/,/page3/`).
        * Halaman pertama (halaman 1) tidak akan menggunakan pola ini; ia akan menggunakan URL dari halaman utama yang dipaginasi (misalnya index.html di root).

2. Menggunakan Objek Paginasi di Template HTML

    Anda perlu memodifikasi file HTML tempat Anda ingin menampilkan daftar postingan yang dipaginasi. Biasanya, ini adalah index.html (untuk halaman beranda blog Anda) atau blog/index.html.

    a. Struktur File HTML yang Dipaginasi

    Buat atau modifikasi file index.html Anda (misalnya, di root proyek Jekyll Anda):

    {% raw %}
    ```
    ---
    layout: default # Atau layout lain yang Anda gunakan (misal 'home')
    title: Blog Posts
    ---

    <div class="posts">
    {% for post in paginator.posts %}
        <article class="post">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">
            {{ post.date | date: "%b %d, %Y" }}
            {% if post.author %}by {{ post.author }}{% endif %}
        </p>
        <div class="entry">
            {{ post.excerpt | strip_html | truncatewords: 50 }}
        </div>
        <a href="{{ post.url | relative_url }}" class="read-more">Baca Selengkapnya</a>
        </article>
    {% endfor %}
    </div>

    <div class="pagination">
    {% if paginator.previous_page %}
        <a href="{{ paginator.previous_page_path | relative_url }}" class="pagination-link prev">
        &laquo; Sebelumnya
        </a>
    {% else %}
        <span class="pagination-link prev disabled">&laquo; Sebelumnya</span>
    {% endif %}

    <span class="page-info">Halaman {{ paginator.page }} dari {{ paginator.total_pages }}</span>

    {% if paginator.next_page %}
        <a href="{{ paginator.next_page_path | relative_url }}" class="pagination-link next">
        Selanjutnya &raquo;
        </a>
    {% else %}
        <span class="pagination-link next disabled">Selanjutnya &raquo;</span>
    {% endif %}
    </div>
    ```
    {% endraw %}

4. Uji Secara Lokal

    Sebelum mendorong ke GitHub, selalu uji situs Anda secara lokal untuk memastikan semuanya berfungsi dengan baik.

    1. Buka terminal di root folder proyek Jekyll Anda.
    2. Jalankan perintah:

        {% raw %}
        ```
        bundle exec jekyll serve
        ```
        {% endraw %}

    3. Buka browser Anda dan kunjungi http://localhost:4000 (atau alamat yang ditampilkan di terminal).
    4. Gulir ke bawah halaman blog Anda. Anda seharusnya melihat navigasi paginasi. Klik tautan "Selanjutnya" atau nomor halaman untuk memastikan Anda berpindah antar halaman postingan.

5. Deploy ke GitHub Pages (Jika Menggunakan)

    Jika Anda menghosting blog Jekyll Anda di GitHub Pages, Anda tidak perlu melakukan langkah-langkah khusus tambahan setelah konfigurasi di atas. GitHub Pages secara otomatis mendukung jekyll-paginate.

    1. Pastikan semua perubahan sudah disimpan.
    2. Tambahkan perubahan ke Git:

        {% raw %}
        ```
        git add .
        ```
        {% endraw %}

    3. Commit perubahan:

        {% raw %}
        ```
        git commit -m "Implement Jekyll pagination"
        ```
        {% endraw %}

    4. Dorong perubahan ke repositori GitHub Anda:

        {% raw %}
        ```
        git push origin <nama-cabang-anda> # contoh: git push origin main
        ```
        {% endraw %}

GitHub Pages akan mendeteksi perubahan, membangun ulang situs Anda, dan paginasi seharusnya berfungsi di situs live Anda. Anda bisa memantau status build di tab "Actions" di repositori GitHub Anda.

Batasan jekyll-paginate

Penting untuk diingat bahwa jekyll-paginate memiliki batasan:

* Hanya Memaginasi posts: Secara default, jekyll-paginate hanya dapat memaginasi koleksi posts. Anda tidak dapat menggunakannya langsung untuk memaginasi koleksi kustom (seperti _projects, _events) atau halaman statis berdasarkan kategori/tag.
* Paginasi Global: Ini adalah paginasi untuk semua postingan di situs Anda, bukan paginasi per kategori atau tag.

Jika Anda membutuhkan fitur paginasi yang lebih canggih (seperti paginasi untuk koleksi kustom atau paginasi berdasarkan kategori/tag), Anda mungkin perlu mempertimbangkan:

* Menggunakan plugin jekyll-paginate-v2 (tetapi ini tidak didukung langsung oleh GitHub Pages, jadi Anda harus membangun situs secara lokal dan mendorong output _site ke GitHub Pages, atau menggunakan GitHub Actions).
* Menggunakan generator paginasi kustom dengan filter Liquid (lebih kompleks).
* Menggunakan layanan hosting lain seperti Netlify atau Vercel yang memungkinkan Anda menginstal plugin Jekyll apa pun.

Dengan mengikuti panduan ini, Anda akan dapat berhasil memasang dan menggunakan jekyll-paginate untuk membuat blog Jekyll Anda lebih mudah dinavigasi.
