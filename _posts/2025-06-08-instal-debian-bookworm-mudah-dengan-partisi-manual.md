---
layout: post
title: Instal Debian Bookworm Mudah dengan Partisi Manual
description: Ikuti panduan ini untuk instalasi Debian Bookworm tanpa ribet! Belajar partisi manual agar sistem stabil dan sesuai kebutuhan.
date: 2025-06-08 08:00:00 +0700
categories: [tutorial]
tags: [panduan]
author: Nama Anda
image: /assets/images/install-debian-bookworm.jpg
---

## panduan langkah demi langkah untuk menginstal Debian Bookworm (versi stabil saat ini) dengan partisi manual

Penting: Sebelum memulai, pastikan Anda sudah mem-backup semua data penting Anda. Proses ini akan menghapus data di drive yang Anda pilih untuk instalasi.

**Persiapan Awal:**

1. Unduh ISO Debian Bookworm:
    * Kunjungi situs web resmi Debian: `https://www.debian.org/`
    * Pilih versi `"Stable"` (Bookworm) dan unduh file ISO yang sesuai dengan arsitektur sistem Anda (biasanya amd64 untuk sebagian besar PC modern). Anda bisa memilih antara DVD atau Netinst. Netinst lebih kecil dan mengunduh paket dari internet saat instalasi.

2. Buat Media Bootable:
    * USB Drive: Gunakan Rufus (untuk Windows), balenaEtcher (lintas platform), atau perintah dd (untuk Linux/macOS) untuk membuat USB drive Anda menjadi bootable dari file ISO Debian.
        * Rufus (Windows): Pilih file ISO, pilih USB drive Anda, dan klik Start.
        * balenaEtcher (Lintas Platform): Pilih file ISO, pilih USB drive Anda, dan klik "Flash!".
        * dd (Linux/macOS):
            {% raw %}
            ```
            sudo dd if=/path/to/debian-bookworm.iso of=/dev/sdX bs=4M status=progress
            ```
            {% endraw %}
            Ganti `/path/to/debian-bookworm.iso` dengan lokasi file ISO Anda, dan `/dev/sdX` dengan perangkat USB drive Anda (misalnya `/dev/sdb`, PASTIKAN ANDA MEMILIH YANG BENAR AGAR TIDAK MENGHAPUS DRIVE LAIN).

3. Konfigurasi BIOS/UEFI:
    * Nyalakan ulang komputer Anda dan masuk ke pengaturan BIOS/UEFI (biasanya dengan menekan `F2`, `F10`, `F12`, `Del`, atau `Esc` saat booting).
    * Atur urutan boot agar komputer Anda booting dari USB drive yang Anda buat.
    * Jika Anda memiliki pilihan, pastikan untuk mengaktifkan `"UEFI Boot"` jika sistem Anda mendukungnya, terutama jika Anda ingin instalasi UEFI. Jika Anda menginstal di sistem lama, `"Legacy Boot"` mungkin lebih tepat.

**Langkah-langkah Instalasi Debian Bookworm:**

1. Boot dari Media Instalasi:
    * Setelah mengatur BIOS/UEFI, simpan perubahan dan keluar. Komputer Anda akan boot dari USB drive Debian.
    * Anda akan melihat menu boot Debian. Pilih `"Graphical install"` untuk antarmuka grafis yang lebih mudah, atau `"Install"` untuk antarmuka teks. Panduan ini akan menggunakan `"Graphical install"`.

2. Pilih Bahasa, Lokasi, dan Keyboard:
    * **Bahasa**: Pilih bahasa yang Anda inginkan untuk proses instalasi (misalnya, "Indonesia" atau "English").
    * **Lokasi**: Pilih lokasi Anda (misalnya, "Indonesia"). Ini akan membantu mengonfigurasi zona waktu.
    * **Konfigurasi Keyboard**: Pilih tata letak keyboard Anda.

3. Konfigurasi Jaringan:
    * Installer akan mencoba mendeteksi dan mengkonfigurasi jaringan Anda secara otomatis (melalui `DHCP`).
    * Jika Anda menggunakan Wi-Fi, Anda mungkin diminta untuk memilih jaringan Wi-Fi dan memasukkan kata sandi.
    * Jika Anda memiliki koneksi Ethernet, biasanya akan terkonfigurasi secara otomatis.

4. Konfigurasi Nama Host, Domain, dan Kata Sandi Root:
    * **Nama Host**: Masukkan nama yang unik untuk komputer Anda (misalnya, debian-pc atau serverku).
    * **Nama Domain**: Ini opsional, bisa dibiarkan kosong jika Anda tidak berada di jaringan domain.
    * **Kata Sandi Root**: Masukkan kata sandi yang kuat untuk akun root (administrator sistem). Jangan sampai lupa kata sandi ini! Konfirmasikan kata sandi.

5. Buat Akun Pengguna Biasa:
    * **Nama Lengkap Pengguna Baru**: Masukkan nama lengkap Anda (misalnya, "John Doe").
    * **Nama Akun Pengguna**: Masukkan nama pengguna (login) untuk akun biasa Anda (misalnya, john).
    * **Kata Sandi Pengguna**: Masukkan kata sandi yang kuat untuk akun pengguna biasa Anda. Konfirmasikan kata sandi.

6. Partisi Disk (Manual) - Bagian Paling Penting:

    * Pada langkah `"Partition disks"`, pilih `"Manual"`.

    * Anda akan melihat daftar drive yang tersedia. Pilih drive yang ingin Anda instal Debian (misalnya, `/dev/sda` atau `/dev/nvme0n1`).

    * Membuat Tabel Partisi (Jika drive baru atau ingin menghapus semua):
        * Jika drive Anda masih kosong atau Anda ingin menghapus semua partisi yang ada, Anda akan diminta untuk membuat tabel partisi baru. Pilih `"Yes"`. Pilih jenis tabel partisi yang sesuai:
            * **GPT (GUID Partition Table)**: Direkomendasikan untuk sistem UEFI dan drive berukuran besar (di atas 2TB).
            * **MBR (Master Boot Record)**: Untuk sistem BIOS lama dan drive di bawah 2TB.

    * Membuat Partisi:

        * Pilih ruang kosong (FREE SPACE) pada drive Anda dan pilih `"Create a new partition"`.

        * Direkomendasikan Skema Partisi Minimal:
            * Partisi EFI System (ESP) - Hanya untuk instalasi UEFI:
                * Ukuran: Minimal 256MB, disarankan 512MB.
                * Use as: `"EFI System Partition"`
                * Flag: `"boot"`
            * Partisi Root `(/)`:
                * Ukuran: Minimal 20GB, disarankan 30-50GB atau lebih, tergantung kebutuhan Anda.
                * Use as: `"Ext4 journaling file system"`
                * Mount point: `/`
            * Partisi Swap:
                * Ukuran: Umumnya disarankan sama dengan RAM Anda, atau 2x RAM jika RAM Anda kecil (dibawah 4GB). Maksimal sekitar 8-16GB.
                * Use as: `"swap area"`
            * Partisi Home (`/home`):
                * Ukuran: Sisa ruang yang Anda miliki. Ini adalah tempat semua data pengguna Anda disimpan.
                * Use as: `"Ext4 journaling file system"`
                * Mount point: `/home`

        * Contoh Langkah-langkah untuk Membuat Partisi (secara berurutan):
            1. Pilih FREE SPACE -> "`Create a new partition`".
            2. Masukkan ukuran untuk partisi EFI (misalnya 512MB). Pilih "`Primary`" (jika diminta, biasanya untuk MBR).
            3. Configure partisi `EFI`: "`Use as: EFI System Partition`". "`Done setting up the partition`".
            4. Pilih FREE SPACE lagi -> "Create a new partition".
            5. Masukkan ukuran untuk partisi swap. Pilih "`Primary`".
            6. Configure partisi swap: "`Use as: swap area`". "`Done setting up the partition`".
            7. Pilih FREE SPACE lagi -> "`Create a new partition`".
            8. Masukkan ukuran untuk partisi root (misalnya 30GB). Pilih "`Primary`".
            9. Configure partisi root: "`Use as: Ext4 journaling file system`", "`Mount point: /`". "`Done setting up the partition`".
            10. Pilih FREE SPACE terakhir -> "Create a new partition".
            11. Gunakan semua sisa ruang untuk partisi `/home`. Pilih "`Primary`".
            12. Configure partisi `/home`: "`Use as: Ext4 journaling file system`", "`Mount point: /home`". "`Done setting up the partition`".

        * Setelah selesai membuat semua partisi, pilih "`Finish partitioning and write changes to disk`".

        * Anda akan diminta untuk mengkonfirmasi. Pilih "`Yes`".

7. Instal Sistem Dasar:
    * Installer akan mulai menginstal sistem dasar Debian. Ini mungkin memakan waktu beberapa saat.

8. Konfigurasi APT:
    * Pilih Mirror Arsip: Pilih negara terdekat dengan Anda dan mirror Debian yang Anda inginkan. Ini akan digunakan untuk mengunduh paket perangkat lunak.
    * Gunakan proxy HTTP? Biasanya tidak perlu, lewati saja.

9. Konfigurasi Popularity Contest (Opsional):
    * Anda dapat memilih untuk berpartisipasi dalam kontes popularitas paket. Ini membantu Debian mengumpulkan statistik penggunaan paket. Terserah Anda apakah ingin berpartisipasi atau tidak.

10. Pilih Lingkungan Desktop dan Paket Lainnya:

    * Di langkah "`Software selection`", Anda akan diminta untuk memilih lingkungan desktop (`GNOME`, `KDE Plasma`, `Xfce`, `LXDE`, `MATE`, `Cinnamon`) dan paket lainnya.

    * Pilih setidaknya:
        * "Debian desktop environment"
        * Lingkungan desktop pilihan Anda (misalnya, "`GNOME`")
        * "standard system utilities"
        * Jika Anda menginstal server tanpa GUI, Anda bisa menghapus pilihan lingkungan desktop.

    * Pilih "`Continue`". Installer akan mulai mengunduh dan menginstal paket-paket ini. Ini akan membutuhkan waktu yang lebih lama.

11. Instal Boot Loader `GRUB`:
    * Instal `GRUB` boot loader ke master boot record? Pilih "`Yes`".
    * Pilih drive yang benar untuk menginstal `GRUB` (biasanya `/dev/sda` atau `/dev/nvme0n1`, yaitu drive tempat Anda menginstal Debian). Penting untuk memilih drive yang benar agar sistem Anda dapat booting.

12. Selesaikan Instalasi:
    * Installer akan memberi tahu Anda bahwa instalasi telah selesai.
    * Pilih "`Continue`" untuk `me-reboot` sistem Anda.
    * Lepaskan USB drive instalasi Anda saat diminta, atau setelah komputer mati dan mulai booting kembali.

13. Boot ke Debian Bookworm:
    * Komputer Anda akan boot ke sistem Debian Bookworm yang baru diinstal.
    * Anda akan melihat layar login GDM (untuk GNOME) atau manajer tampilan lainnya.
    * Masukkan nama pengguna dan kata sandi akun pengguna biasa yang Anda buat sebelumnya.

Setelah Instalasi:

* Perbarui Sistem:
    {% raw %}
    ```
    sudo apt update
    sudo apt upgrade
    ```
    {% endraw %}
* Instal Driver (Jika Perlu): Terkadang, driver grafis proprietary atau driver Wi-Fi tertentu mungkin perlu diinstal secara manual jika tidak terdeteksi secara otomatis.
* Jelajahi dan Konfigurasi: Mulai jelajahi lingkungan desktop baru Anda dan sesuaikan pengaturan sesuai preferensi Anda.

jika Anda ingin membuat 4 partisi saat menginstal Debian Bookworm, berikut adalah panduan dan rekomendasi skema partisi. Partisi tambahan biasanya digunakan untuk memisahkan data pengguna, file sistem, dan area swap, yang dapat meningkatkan stabilitas dan kemudahan pengelolaan sistem.

## Skema Partisi 4 Bagian yang Direkomendasikan

Berikut adalah skema partisi 4 bagian yang umum dan direkomendasikan untuk instalasi Linux:

1. Partisi EFI System (ESP):
    * Tujuan: Diperlukan untuk sistem berbasis `UEFI`. Berisi boot loader dan file yang diperlukan oleh firmware `UEFI` untuk memuat sistem operasi.
    * Ukuran: Minimal 256MB, disarankan 512MB.
    * Tipe File Sistem: `FAT32` (secara otomatis diatur saat Anda memilih "`EFI System Partition`").
    * Mount Point: Tidak ada mount point langsung, tetapi secara internal akan di-mount sebagai `/boot/efi`.
    * Flag: `boot`

2. Partisi Root `(/)`:
    * Tujuan: Ini adalah partisi utama tempat semua file sistem operasi Linux (kecuali yang di `/home` atau `/boot/efi`) akan diinstal.
    * Ukuran: Minimal 20GB, direkomendasikan 30-50GB atau lebih, tergantung pada aplikasi yang akan Anda instal.
    * Tipe File Sistem: `Ext4 journaling file system`.
    * Mount Point: `/`

3. Partisi Home (`/home`):
    * Tujuan: Tempat semua data pengguna Anda (dokumen, gambar, video, konfigurasi aplikasi) akan disimpan. Memisahkan `/home` dari `/` sangat disarankan karena memudahkan pembaruan atau instalasi ulang sistem operasi tanpa kehilangan data pribadi Anda.
    * Ukuran: Sisa ruang disk yang tersedia. Semakin besar, semakin baik, tergantung kebutuhan penyimpanan Anda.
    * Tipe File Sistem: `Ext4 journaling file system`.
    * Mount Point: `/home`

4. Partisi Swap:
    * Tujuan: Digunakan sebagai "`memori virtual`" ketika RAM fisik penuh. Sistem akan memindahkan data dari RAM ke partisi swap untuk membebaskan ruang di RAM. Penting untuk hibernasi.
    * Ukuran:
        * Jika RAM Anda kurang dari 4GB: Disarankan 2x ukuran RAM.
        * Jika RAM Anda 4GB-16GB: Disarankan sama dengan ukuran RAM.
        * Jika RAM Anda lebih dari 16GB: Disarankan 4GB-8GB (kecuali Anda sering melakukan tugas berat yang membutuhkan banyak RAM atau ingin menggunakan hibernasi).
    * Tipe File Sistem: `swap area`.
    * Mount Point: Tidak ada mount point langsung.

## Langkah-langkah Pembuatan 4 Partisi Secara Manual

Ikuti langkah-langkah instalasi Debian Bookworm seperti yang dijelaskan sebelumnya, tetapi fokus pada bagian "`Partisi Disk (Manual)`".

1. Pilih `Manual` saat diminta untuk partisi disk.

2. Pilih drive yang ingin Anda instal (misalnya, `/dev/sda` atau `/dev/nvme0n1`).

3. Buat Tabel Partisi Baru (jika drive masih kosong atau Anda ingin menghapus semua partisi yang ada):
    * Pilih Yes dan pilih jenis tabel partisi yang sesuai (`GPT` untuk `UEFI`, `MBR` untuk BIOS lama).

4. Buat Partisi `EFI System` (Hanya untuk `UEFI`):
    * Pilih FREE SPACE -> Create a new partition.
    * Masukkan ukuran (misalnya, 512 MB).
    * Pilih Primary (jika diminta, biasanya untuk `MBR`, tapi untuk `UEFI` tidak ada opsi ini).
    * Pada konfigurasi partisi:
        * Use as: `EFI System Partition`
        * Done setting up the partition

5. Buat Partisi Root `(/)`:
    * Pilih FREE SPACE yang tersisa -> Create a new partition.
    * Masukkan ukuran (misalnya, 30 GB atau 50 GB).
    * Pilih Primary.
    * Pada konfigurasi partisi:
        * Use as: `Ext4 journaling file system`
        * Mount point: `/`
        * Done setting up the partition

6. Buat Partisi Swap:
    * Pilih FREE SPACE yang tersisa -> Create a new partition.
    * Masukkan ukuran sesuai rekomendasi swap.
    * Pilih Primary.
    * Pada konfigurasi partisi:
        * Use as: `swap area`
        * Done setting up the partition

7. Buat Partisi Home (`/home`):
    * Pilih FREE SPACE yang tersisa terakhir -> Create a new partition.
    * Gunakan semua sisa ruang yang tersedia.
    * Pilih Primary.
    * Pada konfigurasi partisi:
        * Use as: `Ext4 journaling file system`
        * Mount point: `/home`
        * Done setting up the partition

8. Selesaikan Partisi:
    * Setelah keempat partisi (atau tiga jika sistem Anda BIOS dan tidak memerlukan EFI) telah dibuat dan dikonfigurasi, pilih Finish partitioning and write changes to disk.
    * Konfirmasi perubahan dengan memilih Yes.

Setelah ini, instalasi akan berlanjut seperti biasa. Memiliki partisi terpisah untuk /home adalah praktik yang sangat baik dan akan menguntungkan Anda di kemudian hari!
