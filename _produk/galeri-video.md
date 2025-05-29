---
layout: produk_ytb
title: "Galeri Video"
date: 2023-10-27 10:00:00 +0700
categories: [video, tutorial]
# Definisikan daftar video di front matter
videos:
  - type: youtube
    id: "nIdP7QYM_gs" # Ganti dengan ID video YouTube Anda
    title: "We Don't Need To Fight"
    description: "We Don't Need To Fight by EURODANCE EVOLUTION"
  - type: youtube
    id: "E-iz-jzTrfI" # Ganti dengan ID video YouTube lainnya
    title: "We Are Strong!"
    description: "We Are Strong! by EURODANCE EVOLUTION"
  - type: local
    filename: "video1.mp4" # Ganti dengan nama file video lokal Anda
    title: "Video Lokal Saya"
    description: "Ini adalah video yang di-host di server saya."
  - type: youtube
    id: "xTt_fhr1Ork" # Ganti dengan ID video YouTube lainnya
    title: "Together We Won't Fall"
    description: "Together We Won't Fall by EURODANCE EVOLUTION"
---

{% include video_gallery.html videos=page.videos %}

Ini adalah galeri video yang menampilkan beberapa konten menarik.
