---
layout: post
title: Membuat Video Galeri Di Jekyll
description: Buat galeri video keren di blog Jekyll-mu! Tingkatkan engagement pembaca dengan tampilan visual yang menawan dan mudah dibuat.
date: 2025-05-29 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/video-galeri-jekyll.jpg
---

Siapa bilang blog Jekyll harus selalu statis dan membosankan? Di era digital yang didominasi visual ini, menghadirkan galeri video interaktif di blog Anda bukan lagi sekadar pilihan, melainkan sebuah keharusan. Mari kita selami mengapa video galeri bisa menjadi kunci untuk menghidupkan blog Jekyll Anda dan membuat pengunjung betah berlama-lama!

Berikut adalah kode yang bisa Anda gunakan:

{% raw %}
```
<style>
  /* CSS untuk galeri video yang responsif */
  .video-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* Jarak antar video */
    justify-content: space-around; /* Pusatkan item dan berikan ruang di sekitarnya */
    padding: 20px; /* Padding di sekitar galeri */
    background-color: #f8f8f8; /* Warna latar belakang galeri */
    border-radius: 10px; /* Sudut membulat */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bayangan lembut */
  }

  .video-item {
    flex: 1 1 calc(33.33% - 20px); /* 3 video per baris dengan jarak */
    max-width: calc(33.33% - 20px); /* Batasi lebar untuk 3 kolom */
    background-color: #ffffff; /* Latar belakang item video */
    border-radius: 8px; /* Sudut membulat untuk setiap item */
    overflow: hidden; /* Pastikan konten tidak meluap */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); /* Bayangan item */
    transition: transform 0.3s ease; /* Efek hover */
  }

  .video-item:hover {
    transform: translateY(-5px); /* Sedikit naik saat di-hover */
  }

  .video-item .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* Rasio aspek 16:9 (tinggi/lebar) */
    height: 0;
    overflow: hidden;
  }

  .video-item .video-wrapper iframe,
  .video-item .video-wrapper video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none; /* Hapus border iframe */
    border-radius: 8px 8px 0 0; /* Sudut membulat di atas */
  }

  .video-item .video-info {
    padding: 15px;
    text-align: center;
  }

  .video-item .video-info h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.2em;
    color: #333;
  }

  .video-item .video-info p {
    font-size: 0.9em;
    color: #666;
  }

  /* Media queries untuk responsivitas */
  @media (max-width: 992px) {
    .video-item {
      flex: 1 1 calc(50% - 20px); /* 2 video per baris di tablet */
      max-width: calc(50% - 20px);
    }
  }

  @media (max-width: 768px) {
    .video-item {
      flex: 1 1 100%; /* 1 video per baris di ponsel */
      max-width: 100%;
    }
  }
</style>

<div class="video-gallery">
  {% for video in include.videos %}
    <div class="video-item">
      <div class="video-wrapper">
        {% if video.type == 'youtube' %}
          <iframe
            src="https://www.youtube.com/embed/{{ video.id }}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        {% elsif video.type == 'local' %}
          <video controls>
            <source src="{{ site.baseurl }}/assets/videos/{{ video.filename }}" type="video/mp4">
            Browser Anda tidak mendukung tag video.
          </video>
        {% endif %}
      </div>
      <div class="video-info">
        <h3>{{ video.title }}</h3>
        <p>{{ video.description }}</p>
      </div>
    </div>
  {% endfor %}
</div>

```
{% endraw %}

Cara Menggunakan Kode Ini di Blog Jekyll Anda:

1. Buat File Include:
    * Di root proyek Jekyll Anda, pastikan ada folder bernama _includes.
    * Buat file baru di dalam _includes dan beri nama video_gallery.html.
    * Salin seluruh kode HTML dan CSS di atas ke dalam file _includes/video_gallery.html.

2. Siapkan Video Lokal (Opsional):
    * Jika Anda ingin menyertakan video lokal, buat folder assets/videos di root proyek Jekyll Anda.
    * Tempatkan file video Anda (misalnya, video1.mp4, video2.mp4) di dalam folder assets/videos ini.

3. Panggil Galeri di Postingan atau Halaman Markdown Anda:
    * Buka file Markdown (.md) untuk postingan atau halaman tempat Anda ingin menampilkan galeri.
    * Di bagian front matter (bagian YAML di bagian atas file Markdown, di antara ---), Anda perlu mendefinisikan data video Anda.

Contoh front matter untuk video YouTube dan lokal:

{% raw %}
```
---
layout: post
title: "Galeri Video Keren Saya"
date: 2023-10-27 10:00:00 +0700
categories: [video, tutorial]
# Definisikan daftar video di front matter
videos:
  - type: youtube
    id: "dQw4w9WgXcQ" # Ganti dengan ID video YouTube Anda
    title: "Contoh Video YouTube 1"
    description: "Ini adalah deskripsi singkat untuk video YouTube pertama."
  - type: youtube
    id: "M7lc1UVf-VE" # Ganti dengan ID video YouTube lainnya
    title: "Contoh Video YouTube 2"
    description: "Video kedua dari YouTube yang menarik."
  - type: local
    filename: "video1.mp4" # Ganti dengan nama file video lokal Anda
    title: "Video Lokal Saya"
    description: "Ini adalah video yang di-host di server saya."
  - type: youtube
    id: "abcdefg1234" # Ganti dengan ID video YouTube lainnya
    title: "Contoh Video YouTube 3"
    description: "Video ketiga dari YouTube."
---

{% include video_gallery.html videos=page.videos %}

Ini adalah galeri video yang menampilkan beberapa konten menarik.
```
{% endraw %}

Penjelasan :

{% raw %}
```
videos:: Ini adalah array tempat Anda mendefinisikan setiap video.
type: youtube atau type: local: Menentukan apakah video berasal dari YouTube atau file lokal.
id:: Untuk video YouTube, ini adalah ID unik dari URL video (misalnya, dQw4w9WgXcQ dari https://www.youtube.com/watch?v=dQw4w9WgXcQ).
filename:: Untuk video lokal, ini adalah nama file video Anda (misalnya, video1.mp4). Pastikan file ini ada di assets/videos/.
title: dan description:: Informasi yang akan ditampilkan di bawah setiap video.
{% include video_gallery.html videos=page.videos %}: Baris ini memanggil file _includes/video_gallery.html dan meneruskan data videos yang telah Anda definisikan di front matter halaman (page.videos) ke dalamnya.
```
{% endraw %}

Setelah Anda menambahkan kode ini dan memperbarui file Markdown Anda, Jekyll akan merender galeri video yang responsif di blog Anda. Anda dapat menyesuaikan CSS untuk mengubah tampilan dan nuansa galeri agar sesuai dengan desain blog Anda.
