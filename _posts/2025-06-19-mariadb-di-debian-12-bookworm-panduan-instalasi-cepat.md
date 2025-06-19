---
layout: post
title: "MariaDB di Debian 12 Bookworm: Panduan Instalasi Cepat"
description: Instal MariaDB di Debian 12 Bookworm dengan mudah! Panduan singkat ini bantu Anda set up database dalam sekejap. Cepat, tepat, tanpa ribet!
date: 2025-06-19 10:00:00 +0700
categories: [tutorial]
tags: [tutorial]
author: Nama Anda
image: /assets/images/belajar-mysql.jpg
---

Halo para developer dan sysadmin! Anda sedang mencari cara cepat dan mudah untuk menginstal **MariaDB di Debian 12 Bookworm?** Anda datang ke tempat yang tepat! Panduan ini akan memandu Anda langkah demi langkah untuk mendapatkan database MariaDB yang berfungsi penuh dalam waktu singkat.

## Langkah-Langkah Menginstal MariaDB di Debian 12 Bookworm

Ikuti langkah-langkah di bawah ini untuk menginstal dan mengamankan MariaDB di sistem Debian 12 Bookworm kamu.

### A. Perbarui Indeks Paket

Sebelum memulai instalasi, sebaiknya perbarui indeks paket sistem kamu. Ini memastikan kamu mendapatkan informasi terbaru tentang paket-paket yang tersedia di repository. Buka terminal dan jalankan perintah berikut:

{% raw %}
```
sudo apt update
```
{% endraw %}

### B. Instal Server MariaDB

Setelah indeks paket diperbarui, kamu bisa langsung menginstal paket server MariaDB. Perintah ini akan menginstal semua komponen yang diperlukan untuk menjalankan database server.

{% raw %}
```
sudo apt install mariadb-server
```
{% endraw %}

Selama proses instalasi, sistem mungkin akan meminta konfirmasi. Cukup ketik `Y` lalu tekan Enter untuk melanjutkan.

### C. Verifikasi Status Layanan MariaDB

Setelah instalasi selesai, layanan MariaDB secara otomatis akan berjalan. Kamu bisa memverifikasi statusnya dengan perintah ini:

{% raw %}
```
systemctl status mariadb
```
{% endraw %}

Jika semuanya berjalan lancar, kamu akan melihat status `active (running)`. Tekan `Q` untuk keluar dari tampilan status ini.

### D. Amankan Instalasi MariaDB

Ini adalah langkah terpenting untuk mengamankan database kamu dari akses tidak sah. Jalankan skrip keamanan bawaan MariaDB:

{% raw %}
```
sudo mysql_secure_installation
```
{% endraw %}

Skrip ini akan memandu kamu dengan beberapa pertanyaan. Berikut penjelasannya:

* `Enter current password for root (enter for none):` Untuk instalasi pertama kali, biasanya tidak ada password untuk root MySQL. Cukup tekan Enter.
* `Switch to unix_socket authentication [Y/n]?` Di Debian, `unix_socket` adalah metode otentikasi yang disarankan. Ini memungkinkan pengguna sistem root untuk terhubung ke database sebagai root tanpa memerlukan password MySQL, sehingga lebih aman. Ketik `Y` lalu **Enter**.
* `Change the root password? [Y/n]` **Sangat disarankan** untuk mengatur password yang kuat untuk pengguna root di dalam database MariaDB. Ketik `Y` lalu **Enter**, kemudian masukkan password baru dua kali.
* `Remove anonymous users? [Y/n]` Ketik `Y` lalu **Enter**. Pengguna anonim hanya untuk pengujian dan sebaiknya dihapus di lingkungan produksi.
* `Disallow root login remotely? [Y/n]` Ketik `Y` lalu **Enter**. Ini mencegah pengguna root MySQL untuk terhubung dari luar `localhost`, yang merupakan praktik keamanan yang baik. Jika kamu butuh akses root dari jarak jauh, sebaiknya buat pengguna khusus dengan hak istimewa yang terbatas.
* `Remove test database and access to it? [Y/n]` Ketik `Y` lalu **Enter**. Hapus database test yang tidak diperlukan.
* `Reload privilege tables now? [Y/n]` Ketik `Y` lalu **Enter**. Ini akan menerapkan semua perubahan keamanan yang baru saja kamu lakukan.

### E. Uji Coba Login ke MariaDB

Untuk memastikan instalasi dan pengaturan keamanan berhasil, coba login ke shell MariaDB sebagai pengguna root:

{% raw %}
```
sudo mysql -u root -p
```
{% endraw %}

Kamu akan diminta untuk memasukkan password yang sudah kamu atur di langkah sebelumnya. Jika berhasil, kamu akan melihat prompt MariaDB:

{% raw %}
```
Welcome to the MariaDB monitor.  Commands end with ; or \g.

MariaDB [(none)]>
```
{% endraw %}

Untuk keluar dari shell MariaDB, cukup ketik `exit`; lalu tekan **Enter**.

Selamat! Kamu sudah berhasil menginstal dan mengamankan MariaDB di Debian 12 Bookworm. Sekarang kamu bisa mulai membuat database dan menggunakannya untuk aplikasi atau kebutuhan lainnya.
