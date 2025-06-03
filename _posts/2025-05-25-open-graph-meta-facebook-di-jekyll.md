---
layout: post
title: Open Graph Meta Facebook Di Jekyll
description: Mudah pasang Open Graph Meta Facebook di Jekyll! Tingkatkan tampilan postingan saat dibagikan di media sosial. Panduan ini simpel, tanpa plugin, dan efektif.
date: 2025-05-25 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/open-graph-meta-jekyll.jpg
---

Memasang Open Graph Meta Tags untuk Facebook di Jekyll adalah praktik SEO dan social media marketing yang sangat penting. Open Graph (OG) tags memberikan kontrol atas bagaimana konten situs kamu muncul ketika dibagikan di Facebook (dan platform media sosial lainnya seperti LinkedIn, Twitter - jika kamu menggunakan og:image dan og:description untuk Twitter Card fallback).

Ini akan memastikan tampilan yang konsisten dan menarik dengan judul, deskripsi, dan gambar yang tepat.

## Mengapa Open Graph Penting?

* **Kontrol Tampilan:** Kamu bisa menentukan judul, deskripsi, dan gambar yang akan digunakan Facebook saat tautanmu dibagikan, bukan mengandalkan Facebook untuk "menebak" atau mengambil informasi dari konten.
* **Visibilitas:** Gambar yang menarik dan deskripsi yang relevan meningkatkan kemungkinan klik pada tautan yang dibagikan.
* **Data Akurat:** Memastikan informasi yang dibagikan akurat dan sesuai dengan maksud kontenmu.

### Langkah-langkah Memasang Open Graph Facebook di Jekyll:

Kita akan membuat include terpisah untuk Open Graph tags dan menyertakannya di bagian `<head>` dari layout kamu.

#### Langkah 1: Buat File Include untuk Open Graph Tags

Buat file baru di direktori `_includes kamu`, misalnya `_includes/open-graph.html`.

{% raw %}
```
<meta property="og:site_name" content="{{ site.title | escape }}">
<meta property="og:type" content="website"> {# Default type, bisa diubah untuk post/artikel #}
<meta property="og:title" content="{% if page.title %}{{ page.title | escape }}{% else %}{{ site.title | escape }}{% endif %}">
<meta property="og:description" content="{% if page.description %}{{ page.description | escape }}{% else %}{{ site.description | escape }}{% endif %}">
<meta property="og:url" content="{{ page.url | absolute_url }}">

{% if page.image %}
  <meta property="og:image" content="{{ site.url }}{{ page.image | relative_url }}">
{% else %}
  <meta property="og:image" content="{{ site.url }}/assets/img/default-share-image.jpg">
{% endif %}

{% if page.layout == 'post' %}
  <meta property="og:type" content="article">
  {% if page.date %}
    <meta property="article:published_time" content="{{ page.date | date_to_xmlschema }}">
  {% endif %}
  {% if page.last_modified_at %}
    <meta property="article:modified_time" content="{{ page.last_modified_at | date_to_xmlschema }}">
  {% endif %}
  {% for author in site.data.authors %}
    {% if author.username == page.author %}
      {% if author.facebook %}
        <meta property="article:author" content="https://www.facebook.com/{{ author.facebook }}">
      {% endif %}
    {% endif %}
  {% endfor %}
  {% for tag in page.tags %}
    <meta property="article:tag" content="{{ tag | escape }}">
  {% endfor %}
  {% for category in page.categories %}
    <meta property="article:section" content="{{ category | escape }}">
  {% endfor %}
{% endif %}

{% if site.facebook_app_id %}
  <meta property="fb:app_id" content="{{ site.facebook_app_id }}">
{% endif %}

{% if site.facebook_page_id %}
  <meta property="fb:admins" content="{{ site.facebook_page_id }}">
{% endif %}
```
{% endraw %}

**Penjelasan Kode:**

* `og:site_name`: Nama situs Anda (diambil dari `_config.yml`).
* `og:type`: Tipe objek yang dibagikan. Default website. Untuk postingan blog, kita ubah menjadi article.
* `og:title`: Judul konten. Jika `page.title` ada, gunakan itu; jika tidak, gunakan `site.title`.
* `og:description`: Deskripsi konten. Jika `page.description` ada (bisa didefinisikan di front matter), gunakan itu; jika tidak, gunakan `site.description`.
* `og:url`: URL kanonis dari halaman yang dibagikan. `page.url | absolute_url` penting untuk mendapatkan URL lengkap.
* `og:image`: Ini sangat penting! URL gambar yang akan ditampilkan.
* Prioritas: Jika `page.image` didefinisikan di front matter postingan/halaman (misalnya, `image: /assets/img/my-post-image.jpg`), gambar itu akan digunakan.
* Fallback: Jika `page.image` tidak ada, ini akan menggunakan gambar default yang kamu tentukan (`/assets/img/default-share-image.jpg`). Pastikan gambar ini ada di lokasi tersebut.
* `og:type: article`: Diatur khusus untuk `page.layout == 'post'` untuk menunjukkan bahwa ini adalah artikel.
* `article:published_time / article:modified_time`: Tanggal publikasi dan modifikasi (penting untuk SEO dan histori artikel).
* `article:author`: Tautan ke halaman Facebook penulis (opsional, memerlukan data penulis di `_data/authors.yml` atau sejenisnya).
* `article:tag / article:section`: Tag dan kategori postingan.
* `fb:app_id / fb:admins`: Opsional, untuk terhubung ke Facebook App atau Facebook Page Insights (memerlukan pengaturan di `_config.yml`).


#### Langkah 2: Tambahkan Gambar Default

Pastikan kamu memiliki gambar default yang akan digunakan jika tidak ada gambar spesifik yang ditentukan untuk sebuah postingan/halaman.

* Buat direktori `assets/img/` di root proyek Jekyll kamu (jika belum ada).
* Tempatkan gambar default kamu di sana, beri nama `default-share-image.jpg` (atau nama lain yang sesuai, pastikan sama dengan yang di `open-graph.html`).
* Ukuran Rekomendasi: Untuk gambar Open Graph, Facebook merekomendasikan gambar minimal 1200x630 piksel untuk tampilan terbaik.

#### Langkah 3: Sertakan Open Graph Tags di Layout Dasar Jekyll

Buka layout dasar kamu (biasanya `_layouts/default.html` atau file yang menyertakan bagian `<head>`), dan tambahkan baris berikut di dalam tag `<head>`:

{% raw %}
```
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ page.title | default: site.title }}</title>

  {% include head.html %} {# Jika tema Anda menggunakan _includes/head.html #}

  {% include open-graph.html %}

  <link rel="stylesheet" href="{{ "/assets/main.css" | relative_url }}">
  <link rel="canonical" href="{{ page.url | absolute_url }}">
</head>
```
{% endraw %}

#### Langkah 4: Tentukan Informasi di _config.yml

Pastikan `_config.yml` kamu memiliki informasi dasar situs:

{% raw %}
```
# _config.yml
title: Nama Situs Hebat Anda
description: Deskripsi singkat dan menarik tentang situs Anda.
url: "https://www.namasitusanda.com" # Ganti dengan URL domain Anda
lang: id # Bahasa situs
# author: Anda (opsional, jika Anda ingin menggunakan default)

# Opsional: Facebook App ID dan Page ID (jika ada)
# facebook_app_id: YOUR_FACEBOOK_APP_ID
# facebook_page_id: YOUR_FACEBOOK_PAGE_ID
```
{% endraw %}

Penting: Atur url di `_config.yml` ke URL domain lengkap situs kamu, termasuk `https://`.

#### Langkah 5: Tambahkan Data ke Front Matter Postingan/Halaman (Opsional tapi Direkomendasikan)

Untuk setiap postingan atau halaman yang ingin kamu kontrol secara spesifik:

{% raw %}
```
---
layout: post
title: Judul Postingan yang Keren
author: nama_penulis # Jika Anda punya data authors
date: 2023-10-26 10:00:00 +0700
categories: [Jekyll, Tutorial]
tags: [opengraph, facebook, seo]
description: Ini adalah deskripsi kustom yang akan muncul di Facebook ketika postingan ini dibagikan. Pastikan menarik dan relevan.
image: /assets/img/gambar-spesifik-postingan-ini.jpg # Path ke gambar spesifik untuk postingan ini
---

Konten postingan Anda di sini...
```
{% endraw %}

Dengan cara ini, `page.title`, `page.description`, dan `page.image` akan digunakan secara spesifik untuk postingan tersebut. Jika tidak ada, fallback ke `site.title`, `site.description`, dan `default-share-image`.jpg akan digunakan.

## Menguji Open Graph Tags Anda:

Setelah kamu mengimplementasikan dan deploy perubahan ke situs Jekyll kamu (setelah jekyll build atau push ke GitHub Pages), sangat penting untuk menguji apakah meta tag sudah terpasang dengan benar.

Gunakan Facebook Sharing Debugger:

* Buka Facebook Sharing Debugger.
* Masukkan URL dari halaman atau postingan yang ingin kamu uji.
* Klik "Debug".

Debugger akan menunjukkan kepada kamu bagaimana Facebook "melihat" halaman kamu dan apakah ada peringatan atau kesalahan. Klik "Scrape Again" jika kamu baru saja membuat perubahan pada halamanmu.

Dengan mengikuti langkah-langkah ini, situs Jekyll kamu akan memiliki Open Graph tags yang kuat, memastikan kontenmu terlihat profesional dan menarik saat dibagikan di Facebook.




