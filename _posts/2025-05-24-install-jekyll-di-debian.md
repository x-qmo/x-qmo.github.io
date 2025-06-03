---
layout: post
title: Install Jekyll Di Debian
description: Instal Jekyll di Debian dengan mudah! Ikuti panduan langkah demi langkah ini untuk install Jekyll di Debian, mulai dari persiapan hingga siap ngoding. Cepat dan efisien!
date: 2025-05-24 10:00:00 +0700
categories: [umum, tutorial]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/install-jekyll-debian.jpg
---

## Langkah-langkah install jekyll di debian

### Langkah 1: Instal Ruby dan Dependensi

Jekyll membutuhkan Ruby. Debian biasanya memiliki versi Ruby yang tersedia di repositori, tetapi penting untuk menginstal dependensi pengembangan yang diperlukan untuk mengkompilasi gem (paket Ruby) tertentu.

{% raw %}
```
sudo apt -y install ruby ruby-dev
```
{% endraw %}

### Langkah 2: Konfigurasi Lingkungan Ruby (Opsional tapi Disarankan)

Secara default, gem Ruby akan terinstal di sistem sebagai root. Ini bisa menyebabkan masalah izin dan kurang fleksibel. Sangat disarankan untuk menginstal gem ke direktori pengguna Anda. Kita bisa mengonfigurasi `GEM_HOME` dan `PATH` untuk ini.

Tambahkan baris berikut ke file `~/.bashrc` atau `~/.zshrc` (tergantung shell yang Anda gunakan):

{% raw %}
```
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```
{% endraw %}

* `echo '# Install Ruby Gems to ~/gems'` dan seterusnya: Menambahkan baris konfigurasi ke `~/.bashrc`.
* `source ~/.bashrc`: Memuat ulang konfigurasi shell Anda agar perubahan berlaku. Anda juga bisa menutup dan membuka kembali terminal.

Atau bisa juga diketik secara langsung melalui teminal :

{% raw %}
```
export GEM_HOME=$HOME/gems
export PATH=$HOME/gems/bin:$PATH
```
{% endraw %}

### Langkah 3: Instal Jekyll dan Bundler

Setelah Ruby dan lingkungannya siap, Anda bisa menginstal Jekyll. Bundler adalah gem yang sangat direkomendasikan untuk mengelola dependensi proyek Ruby.

{% raw %}
```
gem install jekyll bundler
```
{% endraw %}

* `gem install`: Perintah untuk menginstal gem Ruby.
* `jekyll`: Gem utama Jekyll.
* `bundler`: Gem untuk manajemen dependensi.

### Langkah 4: Verifikasi Instalasi

Setelah instalasi selesai, Anda bisa memverifikasi apakah Jekyll dan Bundler terinstal dengan benar dengan memeriksa versinya:

{% raw %}
```
jekyll -v
bundler -v
```
{% endraw %}

Anda akan melihat nomor versi untuk Jekyll dan Bundler.

### Langkah 5: Membuat Situs Jekyll Baru (Contoh)

Untuk menguji instalasi Anda, mari buat situs Jekyll baru:

{% raw %}
```
jekyll new my-awesome-site
```
{% endraw %}

Ini akan membuat direktori baru bernama my-awesome-site dengan struktur dasar situs Jekyll.
Untuk membuat secara manual, Anda dapat membuat direktori baru proyek blog Anda, contoh :

{% raw %}
```
mkdir my-jekyll-blog
cd my-jekyll-blog
```
{% endraw %}

Inisialisasi proyek Jekyll dengan Bundler. Ini akan membuat struktur file dasar dan menginstal Jekyll:

{% raw %}
```
bundle init
bundle add jekyll
jekyll new . --force
```
{% endraw %}

* **bundle init** : Membuat Gemfile kosong.
* **bundle add jekyll** : Menambahkan Jekyll ke Gemfile dan menginstalnya.
* **jekyll new . --force** : Membuat struktur Jekyll di direktori saat ini. `--force` diperlukan karena direktori sudah ada.

### Langkah 6: Menjalankan Situs Jekyll

Navigasi ke direktori situs yang baru Anda buat dan jalankan server pengembangan Jekyll:

{% raw %}
```
cd my-awesome-site
bundle exec jekyll serve
```
{% endraw %}

* `cd my-awesome-site`: Masuk ke direktori situs Jekyll Anda.
* `bundle exec jekyll serve`: Menjalankan server pengembangan Jekyll. `bundle exec` memastikan bahwa Jekyll dijalankan dengan dependensi yang benar yang dikelola oleh Bundler untuk proyek ini.

Setelah perintah ini dijalankan, Jekyll akan membangun situs Anda dan menyediakannya di alamat lokal (biasanya `http://127.0.0.1:4000/` atau `http://localhost:4000/`). Buka URL ini di browser web Anda untuk melihat situs Jekyll default Anda.

Untuk menghentikan server, tekan Ctrl + C di terminal Anda.

**Pemecahan Masalah Umum:**

* **Izin (Permissions):** Jika Anda mendapatkan kesalahan izin saat menginstal gem, pastikan Anda telah mengonfigurasi `GEM_HOME` seperti di Langkah 2. Hindari menggunakan `sudo gem install` karena ini dapat menyebabkan masalah.
* **Ruby Version Manager (RVM/rbenv):** Untuk pengembangan Ruby yang lebih serius, banyak pengembang memilih untuk menggunakan Ruby Version Manager seperti rbenv atau RVM. Ini memungkinkan Anda menginstal dan beralih di antara beberapa versi Ruby di satu sistem, yang sangat berguna jika Anda memiliki proyek yang memerlukan versi Ruby yang berbeda. Namun, untuk memulai dengan Jekyll, instalasi sistem seperti yang dijelaskan di atas sudah cukup.
* **Error saat `bundle exec jekyll serve`:** Pastikan Anda berada di direktori akar proyek Jekyll Anda (`cd my-awesome-site`) dan semua dependensi terinstal. Jika ada perubahan pada Gemfile proyek, jalankan `bundle install` terlebih dahulu.

Dengan mengikuti langkah-langkah ini, Anda seharusnya berhasil menginstal Jekyll di Debian Anda dan siap untuk mulai membuat situs statis!

