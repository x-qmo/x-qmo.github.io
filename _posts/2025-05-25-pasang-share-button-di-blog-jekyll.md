---
layout: post
title: Pasang Share Button Di Blog Jekyll
description: Cara cepat dan mudah mengintegrasikan tombol share ke setiap postingan, mendorong pembaca untuk menyebarkan konten Anda di media sosial.
date: 2025-05-25 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/post-thumbnail-2.jpg
---

Memasang tombol berbagi (social share buttons) di Jekyll memungkinkan pengunjung situs kamu dengan mudah membagikan kontenmu ke berbagai platform media sosial. Ada beberapa cara untuk melakukannya, mulai dari yang sederhana dengan tautan manual hingga menggunakan JavaScript untuk fungsionalitas yang lebih canggih.

## Opsi 1: Tombol Berbagi Sederhana (Tautan Manual)

Ini adalah metode paling dasar dan paling efisien karena tidak memerlukan JavaScript eksternal atau memuat script tambahan.

 Ini sangat cocok jika kamu mengutamakan kecepatan situs.

Bagaimana Caranya:

1. **Buat File Include untuk Tombol Berbagi:**

    Buat file baru di direktori _includes kamu (misalnya, _includes/share-buttons.html).

    {% raw %}
    ```
    <div class="share-buttons">
        <a href="https://twitter.com/intent/tweet?text={{ page.title | url_encode }}&url={{ site.url }}{{ page.url | url_encode }}" target="_blank" rel="noopener noreferrer" class="share-button twitter">
            Twitter
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u={{ site.url }}{{ page.url | url_encode }}" target="_blank" rel="noopener noreferrer" class="share-button facebook">
            Facebook
        </a>
        <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ site.url }}{{ page.url | url_encode }}&title={{ page.title | url_encode }}" target="_blank" rel="noopener noreferrer" class="share-button linkedin">
            LinkedIn
        </a>
        <a href="mailto:?subject={{ page.title | url_encode }}&body={{ site.url }}{{ page.url | url_encode }}" class="share-button email">
            Email
        </a>
        </div>
    ```
    {% endraw %}

    **Penjelasan:**
    {% raw %}
    ```
    {{ page.title | url_encode }}: Mengambil judul halaman saat ini dan meng-encode-nya untuk URL.
    {{ site.url }}{{ page.url | url_encode }}: Menggabungkan URL dasar situs dengan URL relatif halaman saat ini dan meng-encode-nya. Ini penting untuk memastikan tautan berfungsi dengan benar.
    target="_blank" rel="noopener noreferrer": Memastikan tautan terbuka di tab baru dan aman.
    ```
    {% endraw %}

2. **Sertakan di Layout Post/Halaman:**

    Buka layout yang kamu gunakan untuk postingan blog atau halaman (biasanya _layouts/post.html atau _layouts/page.html) dan tambahkan baris berikut di tempat kamu ingin tombol berbagi muncul:

    {% raw %}
    ```
    {% include share-buttons.html %}
    ```
    {% endraw %}

    Biasanya, ini ditempatkan di akhir konten postingan atau di sidebar.

3. **Styling (Opsional):**

    Tambahkan CSS ke file stylesheet kamu (misalnya, assets/css/style.scss) untuk membuat tombol terlihat lebih baik.

    {% raw %}
    ```
    /* Contoh CSS untuk tombol berbagi */
    .share-buttons {
        margin-top: 30px;
        text-align: center;
    }

    .share-button {
        display: inline-block;
        padding: 8px 15px;
        margin: 5px;
        border-radius: 5px;
        text-decoration: none;
        color: white;
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .share-button.twitter {
        background-color: #1DA1F2;
    }
    .share-button.twitter:hover {
        background-color: #0c85d0;
    }

    .share-button.facebook {
        background-color: #1877F2;
    }
    .share-button.facebook:hover {
        background-color: #145dbb;
    }

    .share-button.linkedin {
        background-color: #0A66C2;
    }
    .share-button.linkedin:hover {
        background-color: #074b8e;
    }

    .share-button.email {
        background-color: #777; /* Warna abu-abu generik */
    }
    .share-button.email:hover {
        background-color: #555;
    }
    ```
    {% endraw %}


    Kelebihan: Cepat, ringan, tidak ada ketergantungan eksternal, baik untuk SEO.
    Kekurangan: Tampilan mungkin kurang interaktif (tidak ada icon kecuali kamu menambahkannya secara manual), tidak ada jumlah share.

## Opsi 2: Menggunakan Layanan Pihak Ketiga (JavaScript)

Ini adalah opsi yang lebih mudah jika kamu menginginkan tombol dengan icon, jumlah share, dan konfigurasi yang cepat. Layanan ini biasanya menyediakan snippet JavaScript yang perlu kamu sematkan.

Layanan Populer:

* AddThis
* ShareThis
* AddToAny
* Social Share Kit (beberapa mungkin memerlukan biaya)

Bagaimana Caranya (Contoh dengan AddThis):

1. **Daftar dan Konfigurasi:**
    * Kunjungi situs AddThis (atau layanan serupa), daftar, dan buat profil situs kamu.
    * Pilih jenis tombol berbagi yang kamu inginkan (misalnya, floating sidebar, inline buttons).
    * Layanan akan menghasilkan snippet kode JavaScript untuk kamu.

2. **Tambahkan Kode JavaScript ke Jekyll:**

    * **Metode 1 (Disarankan):** Tambahkan kode ke layout dasar kamu (_layouts/default.html atau _includes/head.html / _includes/footer.html). Biasanya, kode ini ditempatkan tepat sebelum tag </body> penutup untuk performa yang lebih baik.



        {% raw %}
        ```
        ...
        <body>
        {{ content }}
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-YOUR_PROFILE_ID" async="async"></script>
        ...
        </body>
        </html>
        ```
        {% endraw %}

        Ganti YOUR_PROFILE_ID dengan ID yang diberikan oleh AddThis.

    * **Metode 2:** Jika kamu hanya ingin tombol muncul di postingan, kamu bisa menambahkannya langsung ke _layouts/post.html di bagian yang relevan.

3. **Tempatkan Elemen HTML untuk Tombol:**

    Layanan akan memberikanmu elemen HTML (biasanya div dengan class tertentu) di mana tombol akan dirender. Tambahkan elemen ini ke _layouts/post.html atau file include lainnya.

    {% raw %}
    ```
    ...
    <div class="post-content">
        {{ content }}
    </div>

    <div class="addthis_inline_share_toolbox"></div>
    ```
    {% endraw %}

    **Kelebihan:** Tampilan profesional dengan icon dan jumlah share, mudah dikonfigurasi tanpa coding mendalam, berbagai opsi kustomisasi.
    **Kekurangan:** Menambahkan script eksternal yang dapat memengaruhi kecepatan loading situs, masalah privasi (beberapa layanan mungkin mengumpulkan data pengguna), tidak ada kontrol penuh atas styling tanpa berlangganan.

## Opsi 3: Menggunakan Plugin Jekyll (Kurang Umum, Tergantung Tema)

Beberapa tema Jekyll mungkin sudah menyertakan fungsionalitas berbagi bawaan atau menyediakan plugin yang bisa kamu aktifkan. Ini kurang umum untuk tema Jekyll murni yang biasanya minimalis, tetapi patut diperiksa jika kamu menggunakan tema tertentu.

**Kapan Menggunakan Ini:** Jika tema kamu secara eksplisit mendukungnya.

**Saran dan Pertimbangan:**

* **Performa:** Jika kecepatan adalah prioritas utama, Opsi 1 (tautan manual) adalah yang terbaik. Tombol berbagi JavaScript dari pihak ketiga dapat memperlambat situs kamu karena memuat script eksternal.
* **Privasi:** Pertimbangkan kebijakan privasi layanan pihak ketiga jika kamu menggunakan Opsi 2. Beberapa layanan mengumpulkan data pengguna.
* **Desain:** Pastikan tombol berbagi kamu menyatu dengan desain situs kamu. Kamu bisa menyesuaikan CSS pada Opsi 1 atau mengkustomisasi tampilan melalui dashboard layanan pada Opsi 2.
* **Posisi Tombol:** Pikirkan di mana tombol berbagi akan paling efektif. Umumnya di akhir postingan blog atau di sidebar yang sticky.
* **Mobile-Friendly:** Pastikan tombol berfungsi dan terlihat baik di perangkat seluler.

Pilih metode yang paling sesuai dengan kebutuhan proyekmu. Untuk kebanyakan blog pribadi atau situs portofolio di Jekyll, Opsi 1 (tautan manual dengan sedikit CSS) biasanya sudah cukup dan memberikan performa terbaik.







