---
layout: post
title: Cara Menambahkan Markup Schema Postingan Jekyll
description: Optimalkan SEO postingan blog Jekyll Anda dengan markup Schema! Tingkatkan visibilitas di hasil pencarian & tarik lebih banyak pembaca. Panduan lengkap dan mudah diikuti!
date: 2025-06-01 10:00:00 +0700
category: jekyll
tag: jekyll
author: Nama Anda
image: /assets/images/tambah-schema-jekyll.jpg
---

Membuat markup Schema.org untuk blog Jekyll Anda sangat penting untuk SEO, karena membantu mesin pencari memahami konten Anda dengan lebih baik dan dapat menghasilkan Rich Snippets di hasil pencarian. Ada beberapa jenis markup Schema yang relevan untuk blog, yang paling umum adalah `BlogPosting` dan `Article`.

Berikut adalah cara membuat markup Schema untuk blog Jekyll Anda, menggunakan pendekatan yang paling umum dan fleksibel:

## Cara Membuat Markup Schema Blog Jekyll

Kita akan menggunakan Liquid (bahasa template Jekyll) untuk menyuntikkan data Schema JSON-LD langsung ke dalam setiap postingan blog. JSON-LD (JavaScript Object Notation for Linked Data) adalah format yang direkomendasikan Google.

### Langkah 1: Buat Include untuk Schema

Buat file baru di direktori `_includes` Anda, misalnya: `_includes/schema_blog_posting.html` (atau `.liquid`).

{% raw %}
```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ page.url | absolute_url }}"
  },
  "headline": "{{ page.title | escape }}",
  "description": "{{ page.description | default: site.description | escape }}",
  "image": [
    {% if page.image %}
    "{{ page.image | absolute_url }}"
    {% else %}
    "{{ site.url }}/assets/img/default-thumbnail.jpg" {# Ganti dengan path gambar default Anda #}
    {% endif %}
  ],
  "datePublished": "{{ page.date | date_to_xmlschema }}",
  "dateModified": "{% if page.last_modified_at %}{{ page.last_modified_at | date_to_xmlschema }}{% else %}{{ page.date | date_to_xmlschema }}{% endif %}",
  "author": {
    "@type": "Person",
    "name": "{{ site.author.name | default: site.title | escape }}" {# Asumsikan site.author.name atau site.title #}
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ site.title | escape }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}/assets/img/logo.png" {# Ganti dengan path logo organisasi/situs Anda #}
    }
  }
  {% if page.tags %}
  ,"keywords": "{{ page.tags | join: ', ' }}"
  {% endif %}
}
</script>
```
{% endraw %}

Penjelasan Kode di atas:

* `@context` dan `@type`: Mendefinisikan jenis data Schema (dalam hal ini `BlogPosting`).
* `mainEntityOfPage`: Menunjuk ke URL halaman postingan.
* `headline`: Judul postingan (mengambil dari `page.title`).
* `description`: Deskripsi postingan (mengambil dari `page.description` atau `site.description` jika tidak ada).
    * Penting: Pastikan Anda memiliki `description` di front matter postingan Anda (misalnya `description: "Ringkasan singkat postingan ini."`). Jika tidak, Jekyll akan menggunakan `site.description` atau menghasilkan nilai kosong.
    * `image`: URL gambar yang relevan dengan postingan.
        * Penting: Sebaiknya tambahkan `image` di front matter postingan Anda (misalnya `image: "/assets/img/nama-gambar.jpg"`). Jika tidak ada, ia akan menggunakan gambar default yang Anda tentukan. Pastikan gambar ini memiliki rasio aspek yang baik (misalnya 16x9, 4x3) dan berukuran setidaknya 1200px lebar.
* `datePublished`: Tanggal publikasi postingan (dari `page.date`).
* `dateModified`: Tanggal terakhir diubah postingan (dari `page.last_modified_at` jika ada, atau `page.date` jika tidak). Untuk `last_modified_at`, Anda bisa mengaturnya secara manual di front matter atau menggunakan plugin seperti `jekyll-last-modified-at`.
* `author`: Nama penulis. Mengambil dari `site.author.name` (Anda perlu mendefinisikan ini di `_config.yml`) atau `site.title`.
    * _config.yml contoh untuk author:

        {% raw %}
        ```
        author:
        name: Nama Penulis Anda
        twitter: "@username_twitter" # Opsional
        url: "https://example.com/about" # Opsional
        ```
        {% endraw %}

* `publisher`: Informasi tentang penerbit (situs web Anda). Mengambil dari `site.title` dan path ke logo situs Anda.
    * Penting: Ganti `/assets/img/logo.png` dengan path logo situs Anda yang sebenarnya.
* `keywords`: Jika Anda menggunakan `tags` di front matter postingan, ini akan mengisi properti `keywords` Schema.

### Langkah 2: Panggil Include di Layout Postingan

Buka layout postingan Anda (biasanya `_layouts/post.html` atau yang serupa) dan tambahkan baris berikut di bagian `<head>`:

{% raw %}
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ page.title }}</title>
  {# Meta tags lainnya #}

  {% if page.layout == "post" %} {# Atau layout spesifik postingan blog Anda #}
    {% include schema_blog_posting.html %}
  {% endif %}

</head>
<body>
  {# Konten postingan Anda #}
</body>
</html>
```
{% endraw %}

Penjelasan:

* {% raw %}`{% if page.layout == "post" %}`{% endraw %}: Ini memastikan bahwa markup Schema hanya dimasukkan untuk halaman yang menggunakan layout `post` (atau layout blog Anda yang relevan). Ini mencegah markup muncul di halaman statis atau halaman lain yang tidak cocok.

### Langkah 3: Konfigurasi `_config.yml` dan Front Matter

1. `_config.yml`:

    Pastikan Anda memiliki konfigurasi dasar di `_config.yml` untuk situs dan penulis:

    {% raw %}
    ```
    title: Nama Situs Blog Anda
    description: Deskripsi Singkat Blog Anda
    url: https://www.namadomainanda.com # Ganti dengan URL situs Anda
    author:
    name: Nama Penulis Default
    # Tambahkan properti penulis lain jika diperlukan
    ```
    {% endraw %}

    Penting: url harus diatur dengan benar dan mencakup `http://` atau `https://`.

2. Front Matter Postingan:

    Untuk setiap postingan blog Anda, pastikan Anda memiliki `description` dan `image` di front matter:

    {% raw %}
    ```
    ---
    layout: post
    title: Judul Postingan Luar Biasa Anda
    date: YYYY-MM-DD HH:MM:SS +ZZZZ
    description: Ini adalah deskripsi singkat dan menarik dari postingan blog Anda.
    image: /assets/img/thumbnail-postingan-anda.jpg # Path relatif dari root situs
    tags: [jekyll, schema, seo] # Opsional, untuk properti keywords
    # last_modified_at: YYYY-MM-DD HH:MM:SS +ZZZZ # Opsional, jika Anda ingin mengatur secara manual
    ---

    Konten postingan Anda di sini...
    ```
    {% endraw %}

### Langkah 4: Uji Markup Schema Anda

Setelah menerapkan perubahan, jalankan Jekyll secara lokal (`bundle exec jekyll serve`) dan kunjungi salah satu postingan blog Anda.

Kemudian, gunakan alat Google untuk menguji markup Anda:

1. Google Rich Result Test: <a href="https://search.google.com/test/rich-results" target="_blank">https://search.google.com/test/rich-results</a>
    Tempelkan URL postingan blog Anda di sini. Alat ini akan menunjukkan apakah markup Schema Anda valid dan apakah Google dapat menggunakannya untuk Rich Snippets.

2. Schema Markup Validator: <a href="https://validator.schema.org/" target="_blank">ttps://validator.schema.org/</a>
    Alat ini akan memberikan detail lebih lanjut tentang struktur Schema Anda dan potensi error.

**Pertimbangan Lanjut dan Tipe Schema Lain**

* `Article` vs `BlogPosting`:
    * `BlogPosting` adalah subtype dari `Article`. Untuk postingan blog biasa, `BlogPosting` sudah cukup.
    * Jika konten Anda lebih mirip artikel berita atau laporan penelitian, Anda bisa mempertimbangkan `Article` atau `NewsArticle`. Untuk mengubahnya, cukup ganti `@type` di file `_includes/schema_blog_posting.html`.

* Beberapa Penulis:
    Jika blog Anda memiliki banyak penulis, Anda mungkin perlu memodifikasi bagian `author` di markup Schema. Anda bisa menambahkan `author` di front matter setiap postingan atau membuat data koleksi untuk penulis.

* Schema untuk Halaman Depan/Home Page:
    Anda juga dapat menambahkan markup Schema untuk halaman depan blog Anda, biasanya menggunakan `@type: Blog` atau `@type: WebSite` dan `@type: Organization` untuk informasi perusahaan Anda.

* Schema untuk Halaman Author:
    Jika Anda memiliki halaman profil penulis, Anda bisa menambahkan markup `@type: Person` di halaman tersebut.

* FAQPage Schema:
    Jika postingan blog Anda memiliki bagian FAQ, Anda bisa menambahkan `FAQPage` Schema untuk Rich Snippets FAQ.

* Performance:
    Markup JSON-LD sangat ringan dan tidak akan memengaruhi kinerja situs Anda secara signifikan.

Dengan mengikuti langkah-langkah ini, Anda dapat menambahkan markup Schema.org yang efektif ke blog Jekyll Anda, membantu meningkatkan visibilitas di mesin pencari dan potensi Rich Snippets.
