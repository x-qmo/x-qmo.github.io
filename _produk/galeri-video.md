---
layout: produk_ytb
title: "Galeri Video"
date: 2023-10-27 10:00:00 +0700
categories: [video, tutorial]
# Definisikan daftar video di front matter
videos:
  - type: youtube
    id: "nIdP7QYM_gs" # Ganti dengan ID video YouTube Anda
    title: "Contoh Video YouTube 1"
    description: "Ini adalah deskripsi singkat untuk video YouTube pertama."
  - type: youtube
    id: "nIdP7QYM_gs" # Ganti dengan ID video YouTube lainnya
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
