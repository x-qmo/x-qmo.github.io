---
layout: post
title: Konten Kustom Di Jekyll Dengan Collection
description: Konten unik di Jekyll itu mudah! Manfaatkan Collection untuk struktur data kustom dan tampilkan sesuai keinginanmu. Tingkatkan fleksibilitas situsmu!
date: 2025-05-28 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/collection-di-jekyll.jpg
---

Memasang Collections di Jekyll adalah cara yang sangat ampuh untuk mengorganisir konten selain postingan blog (_posts) dan halaman (_pages). Collections memungkinkan Anda membuat jenis konten kustom sendiri, seperti portofolio, produk, testimoni, atau bahkan daftar tim.

Berikut adalah panduan langkah demi langkah untuk memasang dan menggunakan Collections di Jekyll:

1. **Pahami Konsep Collections**

    Secara default, Jekyll hanya memperlakukan file Markdown di folder _posts sebagai postingan blog. Jika Anda memiliki konten lain yang terstruktur dan ingin dikelola oleh Jekyll, seperti:

    * Daftar anggota tim
    * Portofolio proyek
    * Daftar buku yang direkomendasikan
    * Produk dalam katalog sederhana

    ...maka Collections adalah solusinya. Setiap "item" dalam Collection adalah file Markdown (atau format lain yang didukung) dengan front matter sendiri.
2. **Konfigurasi Collections di _config.yml**

    Langkah pertama adalah memberi tahu Jekyll tentang Collections baru yang ingin Anda buat. Buka file _config.yml Anda (di root direktori proyek Jekyll Anda) dan tambahkan bagian collections seperti ini:

    {% raw %}
    ```
    # _config.yml

    collections:
    # Contoh 1: Collection "team"
    team:
        output: true       # Wajib: Ini akan membuat halaman individual untuk setiap anggota tim
        permalink: /team/:name/ # Opsional: Menentukan struktur URL (misalnya /team/john-doe/)

    # Contoh 2: Collection "projects"
    projects:
        output: true
        permalink: /projects/:path/ # ":path" akan menggunakan struktur folder dan nama file
    ```
    {% endraw %}

    Penjelasan:

    * team dan projects: Ini adalah nama Collections Anda. Anda bisa menggantinya sesuai kebutuhan. Nama folder untuk Collection ini (misalnya _team dan _projects) harus sesuai dengan nama yang Anda definisikan di _config.yml.
    * output: true: Ini adalah pengaturan yang paling penting. Jika Anda ingin setiap item dalam Collection memiliki URL-nya sendiri (misalnya /team/john-doe/), Anda harus mengatur output: true. Jika output: false (default), item-item tersebut hanya akan tersedia untuk diulang dalam Liquid (misalnya di halaman daftar), tetapi tidak akan memiliki halaman terpisah yang dihasilkan.
    * permalink: Mirip dengan permalink untuk _posts, Anda bisa menentukan struktur URL untuk item-item dalam Collection ini.
        * :name: Menggunakan nama file (tanpa ekstensi) sebagai bagian dari URL.
        * :path: Menggunakan seluruh jalur file (termasuk subfolder) sebagai bagian dari URL.

3. **Buat Folder untuk Collections**

    Setelah Anda mendefinisikan Collections di _config.yml, buat folder-folder yang sesuai di root direktori proyek Jekyll Anda. Nama folder harus diawali dengan garis bawah (_) dan sesuai dengan nama Collection yang Anda definisikan.

    {% raw %}
    ```
    .
    ├── _posts/
    ├── _layouts/
    ├── _includes/
    ├── _team/            <-- Folder untuk Collection "team"
    │   ├── john-doe.md
    │   └── jane-smith.md
    ├── _projects/        <-- Folder untuk Collection "projects"
    │   ├── web-app-x.md
    │   └── mobile-app-y.md
    ├── _config.yml
    └── index.html
    ```
    {% endraw %}

4. **Buat Item (File Konten) dalam Collections**

    Di dalam setiap folder Collection, buat file Markdown (atau format lain yang didukung Jekyll, seperti HTML) untuk setiap item. Setiap file harus memiliki front matter seperti postingan blog.

    Contoh _team/john-doe.md:

    {% raw %}
    ```
    ---
    name: John Doe # Opsional, bisa digunakan di template
    title: John Doe
    role: Lead Developer
    image: /assets/images/team/john-doe.jpg
    social:
    twitter: johndoe_dev
    linkedin: john-doe-developer
    ---

    John adalah seorang pengembang berpengalaman dengan keahlian dalam pengembangan web backend. Ia bergabung dengan tim kami pada tahun 2020 dan telah memimpin banyak proyek sukses.
    ```
    {% endraw %}

    Contoh _projects/web-app-x.md:

    {% raw %}
    ```
    ---
    title: Aplikasi Web E-Commerce X
    subtitle: Solusi E-Commerce Modern
    date: 2023-01-15
    image: /assets/images/projects/web-app-x.jpg
    technologies: [React, Node.js, MongoDB, Stripe]
    ---

    Proyek ini adalah platform e-commerce yang komprehensif, dirancang untuk toko online skala menengah. Kami fokus pada pengalaman pengguna yang mulus dan performa tinggi.
    ```
    {% endraw %}

5. **Buat Layout Khusus untuk Item Collections (Opsional tapi Direkomendasikan)**

    Jika Anda ingin setiap item Collection memiliki tampilan halamannya sendiri (karena Anda mengatur output: true), Anda perlu membuat layout khusus untuk mereka.

    Contoh _layouts/team_member.html:

    {% raw %}
    ```
    ---
    layout: default # Inherit from your main layout
    ---

    <div class="container">
        <h1>{{ page.title }}</h1>
        {% if page.image %}
            <img src="{{ page.image | relative_url }}" alt="{{ page.title }}" style="max-width: 200px; border-radius: 50%;">
        {% endif %}
        <p><strong>Peran:</strong> {{ page.role }}</p>
        <p>{{ content }}</p>

        {% if page.social.twitter %}
            <p><a href="https://twitter.com/{{ page.social.twitter }}">Twitter</a></p>
        {% endif %}
        {# Tambahkan lebih banyak detail atau section di sini #}
    </div>
    ```
    {% endraw %}

    Kemudian, di front matter file item Collection Anda, tentukan layout ini:

    {% raw %}
    ```
    ---
    layout: team_member # Tambahkan baris ini
    title: John Doe
    # ... properti lainnya ...
    ---
    ```
    {% endraw %}

6. **Menampilkan Daftar Collections (Halaman Indeks)**

    Anda akan sering ingin menampilkan daftar semua item dari sebuah Collection di satu halaman (misalnya halaman "Tim Kami" atau "Portofolio"). Anda bisa melakukannya di halaman Markdown atau HTML mana pun menggunakan Liquid.

    Contoh team.md (di root direktori):

    {% raw %}
    ```
    ---
    layout: default
    title: Tim Kami
    permalink: /team/
    ---

    <div class="container">
        <h1>Tim Kami</h1>
        <p>Kenali para individu di balik kesuksesan kami.</p>

        <div class="team-grid">
            {% for member in site.team %} {# Loop melalui Collection "team" #}
                <div class="team-member-card">
                    {% if member.image %}
                        <img src="{{ member.image | relative_url }}" alt="{{ member.title }}" class="member-photo">
                    {% endif %}
                    <h2><a href="{{ member.url | relative_url }}">{{ member.title }}</a></h2>
                    <p class="role">{{ member.role }}</p>
                    <p>{{ member.content | strip_html | truncatewords: 20 }}</p> {# Tampilkan sebagian konten #}
                </div>
            {% endfor %}
        </div>
    </div>
    ```
    {% endraw %}

    Penjelasan :

    {% raw %}
    ```
    {% for member in site.team %}: site.team akan memberi Anda akses ke semua item dalam Collection team. Mirip dengan site.posts.
    member.url: Ini akan menghasilkan URL untuk item Collection individu jika output: true diatur.
    ```
    {% endraw %}

7. **Jalankan Jekyll**

    Setelah Anda mengatur semua ini:

    1. Jalankan Jekyll: Buka terminal di root direktori blog Anda dan jalankan:

        {% raw %}
        ```
        bundle exec jekyll serve
        ```
        {% endraw %}

    2. Periksa URL: Kunjungi /team/, /projects/, /team/john-doe/, /projects/web-app-x/ (sesuai permalink yang Anda definisikan) di browser Anda untuk memastikan semuanya berfungsi.
    3. Deploy: Setelah puas dengan hasilnya, deploy blog Jekyll Anda seperti biasa.

Collections adalah fitur yang sangat fleksibel dan kuat di Jekyll, memungkinkan Anda untuk membangun situs web yang lebih kompleks dan terorganisir di luar sekadar blog.
