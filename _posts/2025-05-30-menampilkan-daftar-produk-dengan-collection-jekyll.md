---
layout: post
title: Menampilkan Daftar Produk Dengan Collection Jekyll
description: Tampilkan produk Anda memukau! Pelajari cara efektif menyusun dan menampilkan daftar produk menggunakan Collection Jekyll untuk blog Anda. Mudah, cepat, dan profesional.
date: 2025-05-30 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/daftar-produk-collection-jekyll.jpg
---

membuat collection produk di Jekyll adalah cara yang bagus untuk mengatur dan menampilkan daftar produk secara terstruktur, terpisah dari postingan blog biasa Anda. Jekyll collections memungkinkan Anda untuk mengelola konten serupa dengan front matter dan tata letak khusus.

### Langkah 1: Mendefinisikan Collection di _config.yml

Pertama, Anda perlu memberi tahu Jekyll tentang collection baru Anda. Buka file _config.yml di root proyek Jekyll Anda dan tambahkan baris berikut:

{% raw %}
```
collections:
  products:
    output: true
    permalink: /produk/:path/
```
{% endraw %}

Penjelasan:

* products: Ini adalah nama koleksi Anda. Anda bisa menggantinya dengan nama lain (misalnya _items, _services, dll.). Jekyll akan mencari folder dengan nama ini yang diawali dengan underscore (contoh: _products).
* output: true: Ini memberitahu Jekyll untuk menghasilkan halaman HTML untuk setiap item dalam collection ini. Jika Anda hanya ingin menggunakannya untuk data internal tanpa halaman terpisah, Anda bisa mengaturnya ke false.
* permalink: /produk/:path/: Ini mendefinisikan struktur URL untuk setiap item produk.
    * /produk/: Akan menjadi prefiks URL utama Anda (misalnya situsanda.com/produk/).
    * :path/: Ini adalah placeholder Jekyll yang akan diganti dengan jalur file Markdown produk Anda (misalnya nama-produk-1 jika file Anda nama-produk-1.md).

## Langkah 2: Membuat Folder Collection

Setelah mendefinisikannya di _config.yml, buat folder untuk collection Anda di root proyek Jekyll Anda. Nama folder harus sama persis dengan yang Anda definisikan di _config.yml, tetapi diawali dengan underscore.

{% raw %}
```
.
├── _products/               # <-- Buat folder ini
├── _posts/
├── _layouts/
├── _includes/
├── _sass/
├── assets/
├── _config.yml
├── index.html
└── Gemfile
```
{% endraw %}

## Langkah 3: Membuat Item Produk (File Markdown)

Di dalam folder _products/, buat file Markdown untuk setiap produk Anda. Setiap file harus memiliki front matter YAML di bagian atas, sama seperti postingan blog.

Contoh file: _products/nama-produk-1.md

{% raw %}
```
---
title: "Produk Unggulan A"
harga: 250000
deskripsi_singkat: "Headphone nirkabel dengan kualitas suara jernih."
gambar: "/assets/images/produk-a.jpg"
stok: true
---

Ini adalah deskripsi lengkap untuk Produk Unggulan A.
Dibuat dengan bahan premium, menawarkan pengalaman mendengarkan yang imersif dan nyaman.
Tersedia dalam beberapa pilihan warna.
```
{% endraw %}

Penjelasan:

* Anda bisa menambahkan variabel kustom apa pun di bagian front matter (contoh: harga, deskripsi_singkat, gambar, stok). Variabel-variabel ini akan dapat diakses di tata letak dan halaman Anda.

## Langkah 4: Membuat Layout untuk Produk

Buat tata letak khusus untuk menampilkan detail produk Anda. Ini mirip dengan tata letak untuk postingan blog. Buat file baru di _layouts/ misalnya _layouts/product.html.

{% raw %}
```
---
layout: default
---
<div class="product-detail">
  <img src="{{ page.gambar }}" alt="{{ page.title }}">
  <h1>{{ page.title }}</h1>
  <p class="price">Harga: Rp{{ page.harga | number_with_delimiter }}</p>
  <p>{{ page.deskripsi_singkat }}</p>

  <div class="product-content">
    {{ content }} {# Ini akan merender konten Markdown dari file produk #}
  </div>

  {% if page.stok %}
    <p class="availability">Status: Tersedia</p>
  {% else %}
    <p class="availability out-of-stock">Status: Habis</p>
  {% endif %}

  <a href="/produk" class="back-link">Kembali ke Daftar Produk</a>
</div>
```
{% endraw %}

Penjelasan :

{% raw %}
```
layout: default: Ini berarti tata letak product.html akan menggunakan tata letak default.html sebagai "induknya".
{{ page.title }}, {{ page.gambar }}, {{ page.harga }}: Ini adalah cara Anda mengakses variabel yang Anda definisikan di front matter file produk (_products/nama-produk-1.md).
{{ content }}: Ini akan merender konten Markdown yang Anda tulis di bawah front matter file produk.
| number_with_delimiter: Ini adalah filter Liquid (bahasa template Jekyll) untuk memformat angka dengan pemisah ribuan (misalnya 250000 menjadi 250.000).
```
{% endraw %}

## Langkah 5: Menampilkan Daftar Produk

Untuk menampilkan daftar semua produk Anda, Anda bisa membuat halaman baru (misalnya products.html atau index.html jika itu halaman beranda produk) di root proyek Anda, atau di mana pun Anda ingin menampilkan daftar tersebut.

Contoh file: products.html

{% raw %}
```
---
layout: default
title: "Daftar Produk Kami"
---

<h1>Daftar Produk Kami</h1>

<div class="product-list">
  {% assign sorted_products = site.products | sort: "title" %}
  {% for product in sorted_products %}
  <div class="product-item">
    <a href="{{ product.url }}">
      <img src="{{ product.gambar }}" alt="{{ product.title }}">
      <h2>{{ product.title }}</h2>
      <p class="price">Rp{{ product.harga | number_with_delimiter }}</p>
    </a>
    <p>{{ product.deskripsi_singkat }}</p>
  </div>
  {% endfor %}
</div>
```
{% endraw %}

Penjelasan :

{% raw %}
```
{% assign sorted_products = site.products | sort: "title" %}: Ini mengakses semua item dari collection products (yang tersedia melalui site.products) dan mengurutkannya berdasarkan judul.
{% for product in sorted_products %}: Ini adalah loop Liquid yang akan mengulang setiap item produk.
{{ product.url }}: Ini akan menghasilkan URL unik untuk setiap produk (berdasarkan permalink yang Anda atur di _config.yml).
Anda bisa mengakses semua variabel front matter (product.title, product.gambar, product.harga, product.deskripsi_singkat) di dalam loop.
```
{% endraw %}

Ringkasan Alur Kerja:

* Konfigurasi: Definisikan collection di _config.yml.
* Struktur: Buat folder _products/.
* Konten: Tulis file Markdown individual untuk setiap produk di _products/ dengan front matter yang relevan.
* Tampilan Detail: Buat tata letak (_layouts/product.html) untuk halaman detail setiap produk.
* Daftar Tampilan: Buat halaman untuk menampilkan semua produk (misalnya products.html) menggunakan loop Liquid untuk mengulang site.products.

Setelah mengikuti langkah-langkah ini, jalankan bundle exec jekyll serve di terminal Anda, dan Anda akan dapat melihat collection produk Anda berfungsi!

