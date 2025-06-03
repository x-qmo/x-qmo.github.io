---
layout: post
title: Cara Menampilkan Data Spreadsheet di Blog Jekyll
description: Mudah! Tampilkan data langsung dari spreadsheet ke blog Jekyll-mu. Panduan lengkap untuk integrasi data dinamis di website-mu
date: 2025-06-03 07:08:09 +0700
category: jekyll
tag: jekyll
author: Nama Anda
image: /assets/images/menampilkan-data-di-jekyll.jpg
---

Mengambil data barang dari spreadsheet dan menampilkannya di blog Jekyll adalah kasus penggunaan yang sangat umum dan efektif untuk situs statis! Kuncinya adalah mengubah data spreadsheet menjadi format yang dapat dibaca oleh Jekyll (`.csv`, `.yml`, atau `.json`) dan menempatkannya di direktori `_data`.

Jekyll kemudian dapat mengakses data ini saat build time dan menampilkannya menggunakan Liquid.

Berikut langkah-langkah detailnya:

### Langkah 1: Persiapkan Data di Spreadsheet Anda

1. Struktur Kolom yang Jelas: Pastikan baris pertama spreadsheet Anda adalah header kolom yang jelas dan singkat (misalnya: `nama_barang`, `harga`, `deskripsi`, `gambar_url`, `stok`). Ini akan menjadi nama key saat Anda mengakses data di Jekyll.
2. Data Bersih: Pastikan data Anda bersih dari spasi ekstra, karakter aneh, atau format yang tidak konsisten.
3. Contoh Spreadsheet (Google Sheets/Excel):

**nama_barang**: Laptop X
**harga**: 12000000
**deskripsi**: Laptop gaming dengan RTX 3060 dan RAM 16GB.
**gambar_url**: /assets/images/laptop-x.jpg
**stok**: 5

**nama_barang**: Monitor Y
**harga**: 3500000
**deskripsi**: Monitor 27 inci 144Hz.
**gambar_url**: /assets/images/monitor-y.jpg
**stok**: 12

**nama_barang**: Mouse Z
**harga**: 500000
**deskripsi**: Mouse ergonomis wireless.
**gambar_url**: /assets/images/mouse-z.jpg
**stok**: 20

### Langkah 2: Ekspor Data ke Format yang Dapat Dibaca Jekyll

Jekyll paling baik bekerja dengan file data di direktori `_data`. Pilihan format terbaik adalah `CSV`, `YAML`, atau `JSON`.

**Opsi 1: CSV (Comma Separated Values) - Paling Sederhana untuk Data Tabular**

1. Di Google Sheets/Excel: Pilih File -> Download (atau Save As) -> Comma Separated Values (`.csv`).
2. Beri nama file tersebut (misalnya: barang.csv).

**Opsi 2: YAML (YAML Ain't Markup Language) - Lebih Terstruktur**

YAML bagus jika Anda memiliki struktur data yang lebih kompleks atau ingin lebih eksplisit.

1. Konversi Manual: Jika Anda tidak memiliki fitur ekspor YAML, Anda bisa menggunakan konverter CSV ke YAML online (cari "CSV to YAML converter").
2. Struktur YAML yang Diharapkan:

    {% raw %}
    ```
    # _data/barang.yml
    - Nama Barang: Laptop Asus
    Jumlah: 2
    Harga Satuan: Rp 10.000.000
    Keterangan: Core i7
    - Nama Barang: Mouse Wireless
    Jumlah: 5
    Harga Satuan: Rp 150.000
    Keterangan: USB Receiver
    - Nama Barang: Keyboard Mekanik
    Jumlah: 1
    Harga Satuan: Rp 750.000
    Keterangan: RGB Backlight
    ```
    {% endraw %}

### Langkah 3: Tempatkan File Data di Direktori `_data` Jekyll

Buat folder bernama `_data` di root proyek Jekyll Anda jika belum ada. Kemudian, salin file `barang.csv` (atau `barang.yml`) ke dalam folder ini.

Struktur proyek Anda akan terlihat seperti ini:

{% raw %}
```
my-jekyll-blog/
├── _config.yml
├── _data/
│   └── barang.csv  <-- ATAU barang.yml ATAU barang.json
├── _layouts/
├── _posts/
├── assets/
│   └── images/
|
└── index.md
```
{% endraw %}

### Langkah 4: Tampilkan Data Barang di Halaman Jekyll Anda

Sekarang Anda bisa membuat halaman baru di Jekyll (misalnya `daftar-barang.md`) dan menggunakan Liquid untuk menampilkan data.
Buat Halaman Baru (`daftar-barang.md`)

{% raw %}
```
---
layout: default # Atau layout lain yang Anda gunakan
title: Daftar Produk Kami
permalink: /produk/
---

# Daftar Produk

<p>Berikut adalah daftar produk terbaru kami:</p>

<div class="product-grid">
  {% for item in site.data.barang %}
    <div class="product-card">
      {% if item.gambar_url %}
        <img src="{{ item.gambar_url | relative_url }}" alt="{{ item.nama_barang }}" class="product-image">
      {% endif %}
      <h2>{{ item.nama_barang }}</h2>
      <p class="price">Harga: Rp {{ item.harga | number_with_delimiter }}</p>
      <p class="description">{{ item.deskripsi }}</p>
      <p class="stock">Stok: {{ item.stok }}</p>
      {% if item.stok > 0 %}
        <button class="buy-button">Beli Sekarang</button>
      {% else %}
        <button class="out-of-stock-button" disabled>Stok Habis</button>
      {% endif %}
    </div>
  {% endfor %}
</div>

<style>
  /* Contoh CSS sederhana untuk tampilan */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .product-image {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
    margin-bottom: 10px;
  }
  .product-card h2 {
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
  }
  .product-card .price {
    font-size: 1.2em;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
  }
  .product-card .description {
    font-size: 0.9em;
    color: #555;
    margin-bottom: 15px;
  }
  .product-card .stock {
    font-size: 0.85em;
    color: #777;
    margin-bottom: 15px;
  }
  .buy-button, .out-of-stock-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
  .out-of-stock-button {
    background-color: #dc3545;
    cursor: not-allowed;
  }
</style>
```
{% endraw %}

Penjelasan Kode Liquid:

* {% raw %}`{% for item in site.data.barang %}`{% endraw %}: Ini adalah loop Liquid yang akan mengulang setiap baris/objek dalam file `barang.csv` (atau `barang.yml/barang.json`). `site.data` adalah objek global yang berisi semua data dari direktori `_data`. Nama file (tanpa ekstensi) menjadi properti dari `site.data`.
* {% raw %}`{{ item.nama_barang }}`{% endraw %}: Mengakses nilai dari kolom nama_barang untuk setiap item (baris data).
* {% raw %}`{{ item.gambar_url | relative_url }}`{% endraw %}: Jika `gambar_url` adalah jalur relatif ke aset (misalnya `/assets/images/laptop-x.jpg`), filter `relative_url` akan memastikan URL benar di hasil akhir.
* {% raw %}`{{ item.harga | number_with_delimiter }}`{% endraw %}: Filter `number_with_delimiter` (bawaan Jekyll) akan memformat angka besar dengan pemisah ribuan (misal: 12.000.000).
* {% raw %}`{% if item.stok > 0 %}`{% endraw %}: Contoh penggunaan kondisi untuk menampilkan tombol "Beli Sekarang" hanya jika stok tersedia.

### Langkah 5: Jalankan atau Bangun Ulang Blog Jekyll Anda

Simpan semua perubahan, lalu jalankan Jekyll di terminal Anda:

{% raw %}
```
bundle exec jekyll serve
```
{% endraw %}

Buka browser Anda dan navigasikan ke `http://localhost:4000/produk/` (atau URL yang Anda tentukan di permalink). Anda seharusnya melihat data barang dari spreadsheet Anda ditampilkan di sana.
Pertimbangan Penting:

* Pembaruan Data: Setiap kali Anda mengubah data di spreadsheet, Anda harus mengekspor ulang ke CSV/YAML/JSON, mengganti file di `_data`, dan kemudian membangun ulang situs Jekyll Anda (`jekyll build` atau `jekyll serve`). Ini adalah kelemahan utama situs statis dibandingkan CMS dinamis.
* Gambar: Pastikan gambar_url merujuk ke lokasi gambar yang benar. Jika gambar Anda ada di `assets/images/`, pastikan jalur di spreadsheet sesuai.
* Data Deskripsi dengan Markdown: Jika kolom deskripsi Anda berisi teks Markdown (misalnya, **Tebal** dan *miring*), Anda bisa merendernya sebagai HTML di Liquid menggunakan filter markdownify:

{% raw %}
```
<p class="description">{{ item.deskripsi | markdownify }}</p>
```
{% endraw %}

* Jumlah Data Besar: Untuk dataset yang sangat besar (ribuan baris), kinerja build Jekyll mungkin sedikit melambat. Namun, untuk ratusan atau bahkan beberapa ribu item, ini umumnya bukan masalah.

Dengan cara ini, Anda bisa dengan mudah mengelola daftar barang Anda di spreadsheet yang familiar, dan secara otomatis menampilkannya di blog Jekyll Anda!











