---
layout: post
title: Pasang Kotak Komentar Di Blog Jekyll
description: Tambahkan interaksi ke blog Jekyll-mu! Pelajari cara memasang kotak komentar dengan mudah. Panduan ini mencakup solusi tanpa plugin untuk meningkatkan keterlibatan pembaca
date: 2025-05-24 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
thumbnail: /assets/images/pasang-komentar-di-jekyll.jpg
---

Memasang kotak komentar di blog Jekyll memerlukan penggunaan layanan pihak ketiga karena Jekyll sendiri adalah generator situs statis dan tidak memiliki database bawaan untuk menyimpan komentar. Ada beberapa layanan komentar populer yang dapat Anda integrasikan dengan mudah.

![My image Name](/assets/images/pasang-komentar-di-jekyll.jpg)

Berikut adalah beberapa opsi pasang kotak komentar populer dan cara mengintegrasikannya:

1. [utterances](https://utteranc.es/) (Menggunakan GitHub Issues)

Mari kita bahas cara integrasi untuk opsi terpopuler dan gratis: utterances.

utterances adalah cara yang privacy-friendly dan modern untuk menambahkan komentar menggunakan sistem GitHub Issues Anda. Ini gratis dan tidak ada iklan.

## Langkah 1: Instal Aplikasi utterances di Repo GitHub Anda

1. Pastikan repositori GitHub blog Jekyll Anda bersifat publik.
2. Kunjungi https://utteranc.es/.
3. Klik "Install Utterances" (atau serupa) dan izinkan aplikasi untuk mengakses repositori blog Anda.
4. Anda akan diarahkan kembali ke halaman utterances.es.

## Langkah 2: Konfigurasi utterances

Di halaman utterances.es:

1. **Repository**: Masukkan nama repositori GitHub Anda (contoh: namausergithub/nama-repo-blog).
2. **Blog Post <-> Issue Mapping**: Pilih bagaimana postingan blog Anda akan dipetakan ke isu GitHub. Pilihan paling umum adalah "Pathname" atau "URL". "Pathname" biasanya lebih cocok.
    * **Pathname**: Akan mencari isu dengan judul yang sama dengan path halaman relatif Anda.
    * **URL**: Akan mencari isu dengan judul yang sama dengan URL penuh halaman.
3. **Theme**: Pilih tema tampilan yang Anda suka.
4. **Add utterances to your blog**: Salin kode JavaScript yang dihasilkan di bagian bawah halaman.

## Langkah 3: Buat Include untuk Komentar utterances

Buat file baru di _includes/ bernama utterances_comments.html:

{% raw %}
```
<script src="https://utteranc.es/client.js"
        repo="namausergithub/nama-repo-blog"    issue-term="pathname"                   theme="github-light"                    crossorigin="anonymous"
        async>
</script>
```
{% endraw %}
Penting: Pastikan untuk mengganti repo, issue-term, dan theme dengan nilai yang Anda dapatkan dari konfigurasi di website utterances.es.

## Langkah 4: Tambahkan Komentar utterances ke Layout Postingan Anda

Seperti halnya Disqus, Anda ingin kotak komentar muncul di setiap postingan blog. Buka file layout yang Anda gunakan untuk postingan blog (_layouts/post.html atau _layouts/default.html dengan kondisi page.layout == "post").

{% raw %}
```
---
layout: default
---

<article>
    <h2>{{ page.title }}</h2>
    <p class="post-meta">
        Diposting pada: {{ page.date | date: "%B %d, %Y" }}
        {% if page.author %} oleh {{ page.author }{% endif %}
    </p>

    {{ content }}

    <hr>
    <h3>Komentar</h3>
    {% include utterances_comments.html %}
</article>
```
{% endraw %}

## Langkah 5: Uji Komentar

Jalankan server Jekyll Anda (bundle exec jekyll serve). Kunjungi salah satu postingan blog Anda, dan Anda akan melihat kotak komentar utterances. Komentar baru akan dibuat sebagai GitHub Issue di repositori Anda.

## Tips Tambahan:

* Kondisional: Anda bisa menambahkan kondisi di layout Anda agar komentar hanya muncul di postingan tertentu. Misalnya, Anda bisa menambahkan variabel comments: true di front matter postingan Anda, lalu di layout:

{% raw %}
```
{% if page.comments %}
    {% include disqus_comments.html %}
{% endif %}
```
{% endraw %}

* Kecepatan Halaman: Layanan komentar pihak ketiga dapat memengaruhi kecepatan muat halaman Anda. Pilih layanan yang ringan jika kecepatan adalah prioritas utama.
* Moderasi: Pikirkan tentang bagaimana Anda akan memoderasi komentar. Disqus memiliki panel moderasi bawaan. utterances menggunakan sistem GitHub Issues Anda.

Pilih layanan komentar yang paling sesuai dengan kebutuhan dan preferensi Anda!

