---
layout: post
title: "Langkah Awal: Database PostgreSQL di Debian 12 Bookworm"
description: Pelajari cara mudah memulai database PostgreSQL di Debian 12 Bookworm. Panduan ini akan memandu Anda melalui langkah-langkah esensial untuk menyiapkan DB PostgreSQL pertama Anda
date: 2025-07-10 10:00:00 +0700
categories: [tutorial, umum]
tags: [jekyll, blog, panduan]
author: Nama Anda
image: /assets/images/membuat-database-postgresql.jpg
---

Memulai dengan database baru bisa terasa menantang, terutama jika Anda baru mengenal PostgreSQL atau Debian. Tapi jangan khawatir! Artikel ini akan memandu Anda langkah demi langkah dalam membuat dan mengonfigurasi database PostgreSQL pertama Anda di Debian 12 Bookworm. Mari kita mulai petualangan data Anda!

**Berikut langkah-langkahnya:**

**Periksa Status PostgreSQL (Opsional):**

Sebelum mencoba memulai, ada baiknya untuk memeriksa apakah PostgreSQL sudah berjalan atau tidak.
{% raw %}
```
sudo systemctl status postgresql
```
{% endraw %}
Outputnya akan menunjukkan status layanan. Jika `Active: active (running)` atau `Active: active (exited)`, itu berarti PostgreSQL sudah berjalan. Jika tidak, Anda mungkin melihat `Active: inactive (dead)`.

**Memulai PostgreSQL:**

Jika PostgreSQL tidak berjalan, Anda bisa memulainya dengan perintah berikut:
{% raw %}
```
sudo systemctl start postgresql
```
{% endraw %}
**Memastikan PostgreSQL Berjalan Saat Boot (Opsional, tapi Direkomendasikan):**

Untuk memastikan PostgreSQL otomatis berjalan setiap kali sistem Anda dinyalakan, gunakan perintah ini:
{% raw %}
```
sudo systemctl enable postgresql
```
{% endraw %}
## Perintah Manajemen Layanan PostgreSQL Lainnya:

**Menghentikan PostgreSQL:**

{% raw %}
```
sudo systemctl stop postgresql
```
{% endraw %}
**Mulai Ulang PostgreSQL (jika Anda membuat perubahan konfigurasi):**

{% raw %}
```
sudo systemctl restart postgresql
```
{% endraw %}
**Setelah PostgreSQL Berjalan, Anda Bisa Mengaksesnya:**

Secara default, PostgreSQL membuat user `postgres` dengan hak akses administratif. Anda bisa beralih ke user ini dan mengakses shell PostgreSQL (`psql`):
{% raw %}
```
sudo -i -u postgres
```
{% endraw %}
Sistem akan mengubah sesi terminal Anda menjadi seolah-olah Anda adalah user `postgres`. Jadi, prompt Anda akan berubah dari user Anda saat ini (misalnya, `user_biasa@debian:~$`) menjadi prompt user `postgres` (seringkali terlihat seperti `postgres@debian:~$` atau hanya `postgres@debian:/home/postgres$` tergantung konfigurasi sistem). Prompt Anda akan berubah, misalnya menjadi `postgres@debian:~$`

Dari prompt user `postgres` inilah Anda perlu menjalankan perintah `psql` untuk masuk ke shell PostgreSQL.
{% raw %}
```
psql
```
{% endraw %}
Setelah menjalankan ini, barulah Anda akan masuk ke shell PostgreSQL, dan prompt akan berubah menjadi `postgres=#` (atau `nama_database=#`).

**Contoh Alur Lengkap:**
{% raw %}
```
# Anda sedang di terminal sebagai user_biasa
user_biasa@debian:~$ sudo -i -u postgres
[sudo] password for user_biasa:
# Setelah memasukkan password, prompt Anda berubah
postgres@debian:~$ psql
# Sekarang Anda berada di shell psql
psql (16.2 (Debian 16.2-1))
Type "help" for help.

postgres=#
```
{% endraw %}
## Membuat Database Baru

Setelah berada di prompt `psql`, Anda bisa membuat database baru menggunakan perintah `CREATE DATABASE`.
{% raw %}
```
CREATE DATABASE nama_database_baru;
```
{% endraw %}
Tekan Enter. Jika berhasil, Anda akan melihat pesan seperti:
{% raw %}
```
CREATE DATABASE
```
{% endraw %}
**Verifikasi Database yang Dibuat (Opsional)**

Untuk memastikan database sudah berhasil dibuat, Anda bisa menampilkan daftar semua database dengan perintah `\l` (huruf kecil L) di prompt `psql`:
{% raw %}
```
\l
```
{% endraw %}
Anda akan melihat daftar database, dan `nama_database_baru` seharusnya ada di sana.

**Keluar dari psql**

Setelah selesai, Anda bisa keluar dari `psql` dengan mengetik `\q` dan Enter:
{% raw %}
```
\q
```
{% endraw %}
Anda akan kembali ke prompt user `postgres`. Untuk kembali ke user awal Anda, ketik `exit`.

## Membuat Tabel Baru

Setelah Anda membuat database, langkah selanjutnya adalah memilih database tersebut untuk bekerja di dalamnya, lalu membuat tabel. Tabel adalah tempat data Anda akan disimpan dalam baris dan kolom.

**Masuk ke Database yang Anda Buat**

Secara default, saat Anda masuk ke `psql`, Anda akan terhubung ke database `postgres`. Untuk membuat tabel di database yang baru Anda buat (misalnya, `nama_database_baru`), Anda perlu beralih ke database tersebut.

Anda bisa beralih database dengan perintah `\c` (connect) diikuti nama database:
{% raw %}
```
# Jika Anda masih di prompt psql
postgres=# \c nama_database_baru
```
{% endraw %}
Jika berhasil, Anda akan melihat pesan seperti:
{% raw %}
```
You are now connected to database "nama_database_baru" as user "postgres".
nama_database_baru=#
```
{% endraw %}
Perhatikan bahwa prompt sekarang menunjukkan nama database yang aktif (`nama_database_baru=#`).
Setelah terhubung ke database yang benar, Anda bisa membuat tabel menggunakan perintah `CREATE TABLE`. Anda perlu menentukan nama tabel dan mendefinisikan kolom-kolomnya, termasuk tipe data untuk setiap kolom.

{% raw %}
```
-- Membuat tipe ENUM kustom untuk periode_pembayaran
CREATE TYPE periode_pembayaran_enum AS ENUM ('harian', 'mingguan', 'bulanan');

-- Membuat tipe ENUM kustom untuk status_pinjaman
CREATE TYPE status_pinjaman_enum AS ENUM ('aktif', 'lunas', 'bermasalah');

-- Membuat tipe ENUM kustom untuk status_pembayaran
CREATE TYPE status_pembayaran_enum AS ENUM ('belum_bayar', 'sudah_bayar', 'terlambat');

-- Tabel Nasabah
CREATE TABLE Nasabah (
    id_nasabah SERIAL PRIMARY KEY, -- Menggunakan SERIAL untuk auto-increment di PostgreSQL
    nama VARCHAR(255) NOT NULL,
    alamat TEXT,
    no_telepon VARCHAR(20),
    email VARCHAR(100),
    nik VARCHAR(16) UNIQUE NOT NULL, -- Nomor Induk Kependudukan
    tanggal_daftar DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Tabel Pinjaman
CREATE TABLE Pinjaman (
    id_pinjaman SERIAL PRIMARY KEY, -- Menggunakan SERIAL untuk auto-increment di PostgreSQL
    id_nasabah INT NOT NULL,
    tanggal_pinjam DATE NOT NULL DEFAULT CURRENT_DATE,
    jumlah_pokok DECIMAL(15, 2) NOT NULL,
    suku_bunga DECIMAL(5, 2) NOT NULL, -- Contoh: 0.05 untuk 5% per periode
    tenor INT NOT NULL, -- Jumlah periode angsuran
    periode_pembayaran periode_pembayaran_enum NOT NULL, -- Menggunakan tipe ENUM kustom PostgreSQL
    status_pinjaman status_pinjaman_enum NOT NULL DEFAULT 'aktif', -- Menggunakan tipe ENUM kustom PostgreSQL
    tanggal_lunas DATE, -- Tanggal pelunasan jika sudah lunas
    FOREIGN KEY (id_nasabah) REFERENCES Nasabah(id_nasabah)
);

-- Tabel Angsuran
CREATE TABLE Angsuran (
    id_angsuran SERIAL PRIMARY KEY, -- Menggunakan SERIAL untuk auto-increment di PostgreSQL
    id_pinjaman INT NOT NULL,
    tanggal_jatuh_tempo DATE NOT NULL,
    jumlah_pokok_angsuran DECIMAL(15, 2) NOT NULL,
    jumlah_bunga_angsuran DECIMAL(15, 2) NOT NULL,
    jumlah_total_angsuran DECIMAL(15, 2) NOT NULL,
    status_pembayaran status_pembayaran_enum NOT NULL DEFAULT 'belum_bayar', -- Menggunakan tipe ENUM kustom PostgreSQL
    tanggal_bayar DATE,
    jumlah_dibayar DECIMAL(15, 2),
    denda DECIMAL(15, 2) DEFAULT 0, -- Opsional: Untuk denda keterlambatan
    FOREIGN KEY (id_pinjaman) REFERENCES Pinjaman(id_pinjaman)
);
```
{% endraw %}
Setelah Anda mengetikkan perintah di atas di prompt untuk setiap table `nama_database_baru=#` dan menekan Enter, Anda akan melihat:
{% raw %}
```
CREATE TABLE
```
{% endraw %}
Ini menunjukkan bahwa tabel berhasil dibuat.

**Verifikasi Tabel yang Dibuat (Opsional)**

Untuk melihat tabel yang ada di database Anda, gunakan perintah `\dt` (describe tables):
{% raw %}
```
\dt
```
{% endraw %}
Anda akan melihat daftar tabel, dan seharusnya terdaftar di sana.

Untuk melihat struktur detail dari tabel (kolom, tipe data, batasan), gunakan perintah `\d` diikuti nama tabel:
{% raw %}
```
\d nama_table
```
{% endraw %}
**Cara Melihat Tipe ENUM di PostgreSQL**

Menggunakan `\dT` di `psql` (Command-Line Client)

Jika kamu menggunakan klien command-line `psql` (ini adalah cara termudah dan paling umum), kamu bisa menggunakan perintah meta `\dT` diikuti dengan nama tipe `ENUM` atau wildcard (`*`).

**Melihat semua tipe data kustom (termasuk ENUM):**
{% raw %}
```
\dT
```
{% endraw %}
**Mengubah Nama Tipe ENUM di PostgreSQL**

Kamu menggunakan perintah `ALTER TYPE RENAME TO`.
{% raw %}
```
ALTER TYPE nama_tipe_enum_lama RENAME TO nama_tipe_enum_baru;
```
{% endraw %}
**Mengubah Nama Table di PostgreSQL**

{% raw %}
```
ALTER TABLE nama_tabel_lama RENAME TO nama_tabel_baru;
```
{% endraw %}

## Logika Bisnis Menggunakan Python

Kita akan menggunakan Python dengan library `sqlite3` untuk contoh sederhana (Anda bisa menggantinya dengan `psycopg2` untuk PostgreSQL atau `mysql-connector-python` untuk MySQL). Untuk perhitungan yang akurat, kita akan fokus pada metode angsuran flat (bunga dihitung dari pokok pinjaman awal).

Struktur Folder (Contoh)
{% raw %}
```
your_project_folder/
├── app.py
├── database.py  (file yang sudah Anda miliki, pastikan sudah diperbaiki)
├── models.py
└── templates/
    ├── base.html
    ├── index.html
    ├── nasabah.html
    ├── add_nasabah.html
    ├── pinjaman.html
    └── add_pinjaman.html
    └── record_pembayaran.html
```
{% endraw %}
`database.py` (Koneksi & Skema)
{% raw %}
```
import sqlite3

DATABASE_NAME = 'loan_app.db'

def connect_db():
    # Menghubungkan ke database SQLite
    return sqlite3.connect(DATABASE_NAME)

def init_db():
    # Inisialisasi database: membuat tabel jika belum ada
    conn = connect_db()
    cursor = conn.cursor()

    # Membuat tabel Nasabah
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Nasabah (
            id_nasabah INTEGER PRIMARY KEY AUTOINCREMENT,
            nama TEXT NOT NULL,
            alamat TEXT,
            no_telepon TEXT,
            email TEXT,
            nik TEXT UNIQUE NOT NULL,
            tanggal_daftar DATE DEFAULT CURRENT_DATE
        )
    ''')

    # Membuat tabel Pinjaman
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Pinjaman (
            id_pinjaman INTEGER PRIMARY KEY AUTOINCREMENT,
            id_nasabah INTEGER NOT NULL,
            tanggal_pinjam DATE DEFAULT CURRENT_DATE,
            jumlah_pokok REAL NOT NULL,
            suku_bunga REAL NOT NULL,
            tenor INTEGER NOT NULL,
            periode_pembayaran TEXT NOT NULL CHECK(periode_pembayaran IN ('harian', 'mingguan', 'bulanan')),
            status_pinjaman TEXT NOT NULL DEFAULT 'aktif' CHECK(status_pinjaman IN ('aktif', 'lunas', 'bermasalah')),
            tanggal_lunas DATE,
            FOREIGN KEY (id_nasabah) REFERENCES Nasabah(id_nasabah)
        )
    ''')

    # Membuat tabel Angsuran
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Angsuran (
            id_angsuran INTEGER PRIMARY KEY AUTOINCREMENT,
            id_pinjaman INTEGER NOT NULL,
            tanggal_jatuh_tempo DATE NOT NULL,
            jumlah_pokok_angsuran REAL NOT NULL,
            jumlah_bunga_angsuran REAL NOT NULL,
            jumlah_total_angsuran REAL NOT NULL,
            status_pembayaran TEXT NOT NULL DEFAULT 'belum_bayar' CHECK(status_pembayaran IN ('belum_bayar', 'sudah_bayar', 'terlambat')),
            tanggal_bayar DATE,
            jumlah_dibayar REAL,
            denda REAL DEFAULT 0.0,
            FOREIGN KEY (id_pinjaman) REFERENCES Pinjaman(id_pinjaman)
        )
    ''')

    # Membuat tabel Users untuk fungsionalitas login
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully!")
```
{% endraw %}
`models.py` (Logika Bisnis)
File ini akan berisi fungsi-fungsi untuk berinteraksi dengan database dan menerapkan logika bisnis.
{% raw %}
```
import sqlite3
from datetime import date, timedelta
import math
from database import connect_db # Mengimpor fungsi connect_db dari database.py
from flask_login import UserMixin # Mengimpor UserMixin dari Flask-Login
from werkzeug.security import generate_password_hash, check_password_hash # Untuk hashing password

class Nasabah:
    """
    Kelas untuk mengelola operasi terkait Nasabah (Pelanggan) di database.
    """
    @staticmethod
    def add_nasabah(nama, alamat, no_telepon, email, nik):
        """
        Menambahkan nasabah baru ke database.
        Mengembalikan id_nasabah jika berhasil, None jika gagal (misal NIK duplikat).
        """
        conn = connect_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO Nasabah (nama, alamat, no_telepon, email, nik) VALUES (?, ?, ?, ?, ?)",
                (nama, alamat, no_telepon, email, nik)
            )
            conn.commit()
            return cursor.lastrowid # Mengembalikan ID dari baris yang baru ditambahkan
        except sqlite3.IntegrityError:
            print(f"Error: NIK {nik} sudah terdaftar.")
            return None
        finally:
            conn.close()

    @staticmethod
    def get_all_nasabah():
        """
        Mengambil semua data nasabah dari database.
        Mengembalikan daftar tuple.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Nasabah")
        nasabah_list = cursor.fetchall()
        conn.close()
        return nasabah_list

    @staticmethod
    def get_nasabah_by_id(nasabah_id):
        """
        Mengambil data nasabah berdasarkan ID.
        Mengembalikan tuple data nasabah atau None jika tidak ditemukan.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Nasabah WHERE id_nasabah = ?", (nasabah_id,))
        nasabah = cursor.fetchone()
        conn.close()
        return nasabah

    @staticmethod
    def update_nasabah(nasabah_id, nama, alamat, no_telepon, email, nik):
        """
        Memperbarui data nasabah berdasarkan ID.
        Mengembalikan True jika berhasil, False jika gagal.
        """
        conn = connect_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "UPDATE Nasabah SET nama = ?, alamat = ?, no_telepon = ?, email = ?, nik = ? WHERE id_nasabah = ?",
                (nama, alamat, no_telepon, email, nik, nasabah_id)
            )
            conn.commit()
            return cursor.rowcount > 0
        except sqlite3.IntegrityError:
            print(f"Error: NIK {nik} sudah terdaftar untuk nasabah lain.")
            return False
        finally:
            conn.close()

    @staticmethod
    def delete_nasabah(nasabah_id):
        """
        Menghapus nasabah berdasarkan ID.
        Mengembalikan True jika berhasil, False jika gagal.
        CATATAN: Ini tidak menangani pinjaman terkait. Dalam aplikasi nyata,
        Anda mungkin ingin mencegah penghapusan jika ada pinjaman aktif.
        """
        conn = connect_db()
        cursor = conn.cursor()
        try:
            cursor.execute("DELETE FROM Nasabah WHERE id_nasabah = ?", (nasabah_id,))
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()

class Pinjaman:
    """
    Kelas untuk mengelola operasi terkait Pinjaman di database.
    """
    @staticmethod
    def add_pinjaman(id_nasabah, jumlah_pokok, suku_bunga, tenor, periode_pembayaran):
        """
        Menambahkan pinjaman baru dan menghasilkan jadwal angsuran.
        suku_bunga adalah tingkat bunga tahunan (misal 0.10 untuk 10%).
        tenor adalah jumlah periode pembayaran (misal 12 untuk 12 bulan).
        periode_pembayaran bisa 'harian', 'mingguan', atau 'bulanan'.
        """
        conn = connect_db()
        cursor = conn.cursor()
        try:
            # Masukkan data pinjaman
            cursor.execute(
                "INSERT INTO Pinjaman (id_nasabah, tanggal_pinjam, jumlah_pokok, suku_bunga, tenor, periode_pembayaran) VALUES (?, ?, ?, ?, ?, ?)",
                (id_nasabah, date.today(), jumlah_pokok, suku_bunga, tenor, periode_pembayaran)
            )
            id_pinjaman = cursor.lastrowid
            conn.commit()

            # Hitung dan buat jadwal angsuran
            Pinjaman._generate_angsuran_jadwal(id_pinjaman, jumlah_pokok, suku_bunga, tenor, periode_pembayaran)

            return id_pinjaman
        except Exception as e:
            conn.rollback()
            print(f"Error adding loan: {e}")
            return None
        finally:
            conn.close()

    @staticmethod
    def _generate_angsuran_jadwal(id_pinjaman, jumlah_pokok, suku_bunga_tahunan, tenor, periode_pembayaran):
        """
        Fungsi internal untuk menghasilkan jadwal angsuran (amortisasi).
        """
        conn = connect_db()
        cursor = conn.cursor()

        if periode_pembayaran == 'bulanan':
            suku_bunga_per_periode = suku_bunga_tahunan / 12
        elif periode_pembayaran == 'harian':
            suku_bunga_per_periode = suku_bunga_tahunan / 365
        elif periode_pembayaran == 'mingguan':
            suku_bunga_per_periode = suku_bunga_tahunan / 52
        else:
            raise ValueError("Periode pembayaran tidak valid. Gunakan 'harian', 'mingguan', atau 'bulanan'.")

        # Hitung angsuran pokok dan bunga per periode (metode anuitas sederhana)
        # Jika suku bunga 0, hindari pembagian dengan nol
        if suku_bunga_per_periode == 0:
            angsuran_pokok_per_periode = jumlah_pokok / tenor
            angsuran_total_per_periode = jumlah_pokok / tenor
        else:
            # Rumus angsuran anuitas: A = P * [ i(1 + i)^n ] / [ (1 + i)^n – 1]
            # A = Angsuran per periode
            # P = Pokok pinjaman
            # i = Suku bunga per periode
            # n = Tenor (jumlah periode)
            angsuran_total_per_periode = jumlah_pokok * (suku_bunga_per_periode * (1 + suku_bunga_per_periode)**tenor) / (((1 + suku_bunga_per_periode)**tenor) - 1)

        sisa_pokok = jumlah_pokok
        tanggal_jatuh_tempo = date.today()

        for i in range(tenor):
            if suku_bunga_per_periode == 0:
                jumlah_bunga_angsuran = 0
                jumlah_pokok_angsuran = angsuran_pokok_per_periode
            else:
                jumlah_bunga_angsuran = sisa_pokok * suku_bunga_per_periode
                jumlah_pokok_angsuran = angsuran_total_per_periode - jumlah_bunga_angsuran

            # Pastikan angsuran terakhir melunasi sisa pokok
            if i == tenor - 1:
                jumlah_pokok_angsuran = sisa_pokok
                jumlah_total_angsuran = jumlah_pokok_angsuran + jumlah_bunga_angsuran
            else:
                jumlah_total_angsuran = angsuran_total_per_periode

            # Pembulatan untuk mencegah floating point inaccuracies
            jumlah_pokok_angsuran = round(jumlah_pokok_angsuran, 2)
            jumlah_bunga_angsuran = round(jumlah_bunga_angsuran, 2)
            jumlah_total_angsuran = round(jumlah_total_angsuran, 2)

            sisa_pokok -= jumlah_pokok_angsuran

            # Menentukan tanggal jatuh tempo berikutnya
            if periode_pembayaran == 'bulanan':
                # Menambahkan bulan secara manual untuk menghindari masalah akhir bulan
                year = tanggal_jatuh_tempo.year
                month = tanggal_jatuh_tempo.month + 1 + i
                day = tanggal_jatuh_tempo.day
                while month > 12:
                    month -= 12
                    year += 1
                # Pastikan hari tidak melebihi hari terakhir bulan
                try:
                    tanggal_jatuh_tempo_next = date(year, month, day)
                except ValueError:
                    # Jika hari melebihi hari terakhir bulan (misal 31 April), set ke hari terakhir bulan
                    tanggal_jatuh_tempo_next = date(year, month + 1, 1) - timedelta(days=1)
            elif periode_pembayaran == 'harian':
                tanggal_jatuh_tempo_next = date.today() + timedelta(days=i + 1)
            elif periode_pembayaran == 'mingguan':
                tanggal_jatuh_tempo_next = date.today() + timedelta(weeks=i + 1)
            else:
                tanggal_jatuh_tempo_next = date.today() # Fallback

            cursor.execute(
                "INSERT INTO Angsuran (id_pinjaman, tanggal_jatuh_tempo, jumlah_pokok_angsuran, jumlah_bunga_angsuran, jumlah_total_angsuran) VALUES (?, ?, ?, ?, ?)",
                (id_pinjaman, tanggal_jatuh_tempo_next, jumlah_pokok_angsuran, jumlah_bunga_angsuran, jumlah_total_angsuran)
            )
        conn.commit()
        conn.close()


    @staticmethod
    def get_all_pinjaman():
        """
        Mengambil semua data pinjaman dari database, termasuk nama nasabah.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT p.*, n.nama
            FROM Pinjaman p
            JOIN Nasabah n ON p.id_nasabah = n.id_nasabah
            ORDER BY p.tanggal_pinjam DESC
        """)
        pinjaman_list = cursor.fetchall()
        conn.close()
        return pinjaman_list

    @staticmethod
    def get_pinjaman_by_id(pinjaman_id):
        """
        Mengambil data pinjaman berdasarkan ID.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT p.*, n.nama
            FROM Pinjaman p
            JOIN Nasabah n ON p.id_nasabah = n.id_nasabah
            WHERE p.id_pinjaman = ?
        """, (pinjaman_id,))
        pinjaman = cursor.fetchone()
        conn.close()
        return pinjaman

    @staticmethod
    def get_pinjaman_by_nasabah_id(nasabah_id):
        """
        Mengambil semua pinjaman untuk nasabah tertentu.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Pinjaman WHERE id_nasabah = ?", (nasabah_id,))
        pinjaman_list = cursor.fetchall()
        conn.close()
        return pinjaman_list

    @staticmethod
    def get_angsuran_by_pinjaman_id(pinjaman_id):
        """
        Mengambil jadwal angsuran untuk pinjaman tertentu.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Angsuran WHERE id_pinjaman = ? ORDER BY tanggal_jatuh_tempo ASC", (pinjaman_id,))
        angsuran_list = cursor.fetchall()
        conn.close()
        return angsuran_list

    @staticmethod
    def update_pinjaman_status(id_pinjaman):
        """
        Memperbarui status pinjaman menjadi 'lunas' jika semua angsuran telah dibayar.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT COUNT(*) FROM Angsuran WHERE id_pinjaman = ? AND status_pembayaran != 'sudah_bayar'",
            (id_pinjaman,)
        )
        remaining_payments = cursor.fetchone()[0]

        if remaining_payments == 0:
            cursor.execute(
                "UPDATE Pinjaman SET status_pinjaman = 'lunas', tanggal_lunas = ? WHERE id_pinjaman = ?",
                (date.today(), id_pinjaman)
            )
            conn.commit()
        conn.close()


class Pembayaran:
    """
    Kelas untuk mengelola operasi terkait Pembayaran Angsuran di database.
    """
    @staticmethod
    def record_pembayaran(id_angsuran, jumlah_bayar):
        """
        Mencatat pembayaran untuk angsuran tertentu.
        Menghitung denda jika terlambat dan memperbarui status angsuran.
        """
        conn = connect_db()
        cursor = conn.cursor()

        # Ambil detail angsuran
        cursor.execute("SELECT * FROM Angsuran WHERE id_angsuran = ?", (id_angsuran,))
        angsuran = cursor.fetchone()

        if not angsuran:
            print("Angsuran tidak ditemukan.")
            conn.close()
            return False

        # Kolom angsuran:
        # 0: id_angsuran
        # 1: id_pinjaman
        # 2: tanggal_jatuh_tempo
        # 3: jumlah_pokok_angsuran
        # 4: jumlah_bunga_angsuran
        # 5: jumlah_total_angsuran
        # 6: status_pembayaran
        # 7: tanggal_bayar
        # 8: jumlah_dibayar
        # 9: denda

        id_pinjaman = angsuran[1]
        tanggal_jatuh_tempo = date.fromisoformat(angsuran[2])
        jumlah_total_angsuran_expected = angsuran[5]
        jumlah_dibayar_current = angsuran[8] if angsuran[8] is not None else 0.0
        denda_current = angsuran[9] if angsuran[9] is not None else 0.0
        sisa_angsuran_belum_dibayar = (jumlah_total_angsuran_expected + denda_current) - jumlah_dibayar_current

        if status_pembayaran_current == 'sudah_bayar':
            print("Angsuran ini sudah lunas dibayar.")
            conn.close()
            return False

        tanggal_bayar = date.today()
        denda = denda_current # Mulai dengan denda yang sudah ada

        # Hitung denda jika terlambat (misal 0.1% per hari dari jumlah total angsuran)
        if tanggal_bayar > tanggal_jatuh_tempo:
            keterlambatan_hari = (tanggal_bayar - tanggal_jatuh_tempo).days
            # Denda hanya dihitung dari sisa yang belum dibayar dari jumlah total angsuran
            denda_baru = sisa_angsuran_belum_dibayar * 0.001 * keterlambatan_hari
            denda += denda_baru # Tambahkan denda baru ke denda yang sudah ada

        jumlah_dibayar_new = jumlah_dibayar_current + jumlah_bayar
        status_pembayaran_new = status_pembayaran_current

        if jumlah_dibayar_new >= jumlah_total_angsuran_expected + denda:
            status_pembayaran_new = 'sudah_bayar'
            jumlah_dibayar_new = jumlah_total_angsuran_expected + denda # Pastikan tidak lebih dari yang seharusnya
        elif jumlah_dibayar_new > 0:
            status_pembayaran_new = 'belum_bayar' # Tetap belum bayar jika belum lunas
            if tanggal_bayar > tanggal_jatuh_tempo:
                status_pembayaran_new = 'terlambat' # Jika sudah lewat jatuh tempo dan belum lunas

        try:
            cursor.execute(
                """
                UPDATE Angsuran
                SET status_pembayaran = ?, tanggal_bayar = ?, jumlah_dibayar = ?, denda = ?
                WHERE id_angsuran = ?
                """,
                (status_pembayaran_new, tanggal_bayar, jumlah_dibayar_new, denda, id_angsuran)
            )
            conn.commit()

            # Periksa dan perbarui status pinjaman jika semua angsuran lunas
            Pinjaman.update_pinjaman_status(id_pinjaman)
            return True
        except Exception as e:
            conn.rollback()
            print(f"Error recording payment: {e}")
            return False
        finally:
            conn.close()

class User(UserMixin):
    """
    Kelas untuk mengelola operasi terkait User di database,
    mengintegrasikan dengan Flask-Login.
    """
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password # Ini adalah hash password, bukan plain text

    def get_id(self):
        """
        Mengembalikan ID pengguna sebagai string, diperlukan oleh Flask-Login.
        """
        return str(self.id)

    @staticmethod
    def create_user(username, plain_password):
        """
        Membuat pengguna baru dengan password yang di-hash.
        Mengembalikan objek User jika berhasil, None jika username sudah ada.
        """
        conn = connect_db()
        cursor = conn.cursor()
        hashed_password = generate_password_hash(plain_password)
        try:
            cursor.execute(
                "INSERT INTO Users (username, password) VALUES (?, ?)",
                (username, hashed_password)
            )
            conn.commit()
            user_id = cursor.lastrowid
            return User(user_id, username, hashed_password)
        except sqlite3.IntegrityError:
            print(f"Error: Username '{username}' sudah ada.")
            return None
        finally:
            conn.close()

    @staticmethod
    def find_by_username(username):
        """
        Mencari pengguna berdasarkan username.
        Mengembalikan objek User jika ditemukan, None jika tidak.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id, username, password FROM Users WHERE username = ?", (username,))
        user_data = cursor.fetchone()
        conn.close()
        if user_data:
            return User(user_data[0], user_data[1], user_data[2])
        return None

    @staticmethod
    def get(user_id):
        """
        Mencari pengguna berdasarkan ID. Diperlukan oleh Flask-Login.
        Mengembalikan objek User jika ditemukan, None jika tidak.
        """
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id, username, password FROM Users WHERE id = ?", (user_id,))
        user_data = cursor.fetchone()
        conn.close()
        if user_data:
            return User(user_data[0], user_data[1], user_data[2])
        return None

    def check_password(self, plain_password):
        """
        Memeriksa apakah password yang diberikan cocok dengan hash password yang tersimpan.
        """
        return check_password_hash(self.password, plain_password)

```
{% endraw %}
**Penjelasan Logika Bisnis (`models.py`):**

`Nasabah` Class: Mengelola operasi CRUD (Create, Read, Update, Delete - meskipun di sini baru Create dan Read) untuk data nasabah.

`Pinjaman` Class:

`calculate_schedule_flat`: Ini adalah inti dari perhitungan jadwal angsuran. Dengan metode flat, bunga dihitung dari pokok awal dan dibagi rata ke setiap angsuran.

**Penting:** Perhitungan tanggal jatuh tempo untuk bulanan atau mingguan di atas adalah penyederhanaan. Untuk aplikasi produksi, sangat disarankan menggunakan library yang lebih robust seperti `python-dateutil` untuk menangani perbedaan hari dalam bulan, tahun kabisat, dll.

`add_pinjaman`: Menambahkan pinjaman baru ke database dan secara otomatis memanggil `calculate_schedule_flat` untuk menghasilkan dan menyimpan semua jadwal angsuran terkait. Ini memastikan setiap pinjaman memiliki riwayat pembayaran yang terstruktur dari awal.

`Pembayaran Class`:

`record_pembayaran`: Mencatat pembayaran angsuran.

Mengecek apakah angsuran sudah lunas.

Memperbarui `status_pembayaran`, `tanggal_bayar`, dan `jumlah_dibayar`.

Termasuk logika sederhana untuk denda keterlambatan (ini bisa dikembangkan lebih lanjut).

Secara otomatis mengecek jika semua angsuran untuk suatu pinjaman sudah lunas, lalu memperbarui `status_pinjaman` menjadi `'lunas'` di tabel `Pinjaman`.

untuk menambahkan kelas `User` yang akan berinteraksi dengan tabel `Users` di database Anda. Untuk keamanan, kita akan menggunakan `werkzeug.security` untuk hashing password.

Anda perlu menginstal `Flask-Login` dan `Werkzeug` jika belum:

`pip install Flask-Login Werkzeug`

`main.py` (Contoh Penggunaan)
{% raw %}
```
from flask import Flask, render_template, request, redirect, url_for, flash
from database import init_db, connect_db
from models import Nasabah, Pinjaman, Pembayaran, User # Impor kelas User
from datetime import date
from flask_login import LoginManager, login_user, logout_user, login_required, current_user # Impor Flask-Login

app = Flask(__name__)
app.secret_key = 'supersecretkey' # Ganti dengan kunci rahasia yang kuat untuk produksi

# Konfigurasi Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login' # Rute ke halaman login jika pengguna tidak terautentikasi

@login_manager.user_loader
def load_user(user_id):
    """
    Fungsi ini diperlukan oleh Flask-Login untuk memuat pengguna dari ID sesi.
    """
    return User.get(user_id)

# Inisialisasi database saat aplikasi dimulai
with app.app_context():
    init_db()

@app.route('/')
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def index():
    """
    Halaman utama/dashboard. Menampilkan ringkasan data.
    """
    conn = connect_db()
    cursor = conn.cursor()

    # Contoh: Hitung jumlah nasabah
    cursor.execute("SELECT COUNT(*) FROM Nasabah")
    total_nasabah = cursor.fetchone()[0]

    # Contoh: Hitung jumlah pinjaman aktif
    cursor.execute("SELECT COUNT(*) FROM Pinjaman WHERE status_pinjaman = 'aktif'")
    total_pinjaman_aktif = cursor.fetchone()[0]

    # Contoh: Total pokok pinjaman aktif
    cursor.execute("SELECT SUM(jumlah_pokok) FROM Pinjaman WHERE status_pinjaman = 'aktif'")
    total_pokok_pinjaman_aktif = cursor.fetchone()[0] or 0.0

    conn.close()

    return render_template(
        'index.html',
        total_nasabah=total_nasabah,
        total_pinjaman_aktif=total_pinjaman_aktif,
        total_pokok_pinjaman_aktif=total_pokok_pinjaman_aktif
    )

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    Halaman login pengguna.
    """
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.find_by_username(username)

        if user and user.check_password(password):
            login_user(user)
            flash('Berhasil login!', 'success')
            next_page = request.args.get('next')
            return redirect(next_page or url_for('index'))
        else:
            flash('Username atau password salah.', 'danger')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """
    Halaman registrasi pengguna baru.
    """
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not username or not password:
            flash('Username dan password tidak boleh kosong.', 'danger')
            return render_template('register.html')

        user = User.create_user(username, password)
        if user:
            flash('Akun berhasil dibuat! Silakan login.', 'success')
            return redirect(url_for('login'))
        else:
            flash('Gagal membuat akun. Username mungkin sudah terdaftar.', 'danger')
    return render_template('register.html')

@app.route('/logout')
@login_required
def logout():
    """
    Mengakhiri sesi pengguna.
    """
    logout_user()
    flash('Anda telah logout.', 'info')
    return redirect(url_for('login'))


@app.route('/nasabah')
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def nasabah_list():
    """
    Menampilkan daftar semua nasabah.
    """
    nasabah = Nasabah.get_all_nasabah()
    return render_template('nasabah.html', nasabah=nasabah)

@app.route('/nasabah/add', methods=['GET', 'POST'])
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def add_nasabah():
    """
    Menambah nasabah baru.
    GET: Menampilkan formulir.
    POST: Memproses data formulir.
    """
    if request.method == 'POST':
        nama = request.form['nama']
        alamat = request.form['alamat']
        no_telepon = request.form['no_telepon']
        email = request.form['email']
        nik = request.form['nik']

        id_nasabah = Nasabah.add_nasabah(nama, alamat, no_telepon, email, nik)
        if id_nasabah:
            flash('Nasabah berhasil ditambahkan!', 'success')
            return redirect(url_for('nasabah_list'))
        else:
            flash('Gagal menambahkan nasabah. NIK mungkin sudah terdaftar.', 'danger')
    return render_template('add_nasabah.html', nasabah=None) # Untuk mode tambah

@app.route('/nasabah/edit/<int:nasabah_id>', methods=['GET', 'POST'])
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def edit_nasabah(nasabah_id):
    """
    Mengedit data nasabah yang sudah ada.
    GET: Menampilkan formulir dengan data nasabah yang ada.
    POST: Memproses data formulir yang diperbarui.
    """
    nasabah = Nasabah.get_nasabah_by_id(nasabah_id)
    if not nasabah:
        flash('Nasabah tidak ditemukan.', 'danger')
        return redirect(url_for('nasabah_list'))

    if request.method == 'POST':
        nama = request.form['nama']
        alamat = request.form['alamat']
        no_telepon = request.form['no_telepon']
        email = request.form['email']
        nik = request.form['nik']

        if Nasabah.update_nasabah(nasabah_id, nama, alamat, no_telepon, email, nik):
            flash('Data nasabah berhasil diperbarui!', 'success')
            return redirect(url_for('nasabah_list'))
        else:
            flash('Gagal memperbarui nasabah. NIK mungkin sudah terdaftar untuk nasabah lain.', 'danger')
    return render_template('add_nasabah.html', nasabah=nasabah) # Menggunakan template yang sama untuk edit

@app.route('/nasabah/delete/<int:nasabah_id>', methods=['POST'])
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def delete_nasabah(nasabah_id):
    """
    Menghapus nasabah.
    CATATAN: Dalam aplikasi nyata, Anda harus menambahkan konfirmasi
    dan penanganan kasus jika nasabah memiliki pinjaman aktif.
    """
    if Nasabah.delete_nasabah(nasabah_id):
        flash('Nasabah berhasil dihapus.', 'success')
    else:
        flash('Gagal menghapus nasabah.', 'danger')
    return redirect(url_for('nasabah_list'))

@app.route('/pinjaman')
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def pinjaman_list():
    """
    Menampilkan daftar semua pinjaman.
    """
    pinjaman = Pinjaman.get_all_pinjaman()
    return render_template('pinjaman.html', pinjaman=pinjaman)

@app.route('/pinjaman/add/<int:nasabah_id>', methods=['GET', 'POST'])
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def add_pinjaman(nasabah_id):
    """
    Menambah pinjaman baru untuk nasabah tertentu.
    GET: Menampilkan formulir.
    POST: Memproses data formulir.
    """
    nasabah = Nasabah.get_nasabah_by_id(nasabah_id)
    if not nasabah:
        flash('Nasabah tidak ditemukan.', 'danger')
        return redirect(url_for('nasabah_list'))

    if request.method == 'POST':
        try:
            jumlah_pokok = float(request.form['jumlah_pokok'])
            suku_bunga = float(request.form['suku_bunga'])
            tenor = int(request.form['tenor'])
            periode_pembayaran = request.form['periode_pembayaran']

            id_pinjaman = Pinjaman.add_pinjaman(nasabah_id, jumlah_pokok, suku_bunga, tenor, periode_pembayaran)
            if id_pinjaman:
                flash('Pinjaman berhasil ditambahkan dan jadwal angsuran dibuat!', 'success')
                return redirect(url_for('view_pinjaman_detail', pinjaman_id=id_pinjaman))
            else:
                flash('Gagal menambahkan pinjaman.', 'danger')
        except ValueError:
            flash('Input tidak valid. Pastikan jumlah, bunga, dan tenor adalah angka.', 'danger')
    return render_template('add_pinjaman.html', nasabah=nasabah)

@app.route('/pinjaman/<int:pinjaman_id>')
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def view_pinjaman_detail(pinjaman_id):
    """
    Menampilkan detail pinjaman dan jadwal angsurannya.
    """
    pinjaman = Pinjaman.get_pinjaman_by_id(pinjaman_id)
    if not pinjaman:
        flash('Pinjaman tidak ditemukan.', 'danger')
        return redirect(url_for('pinjaman_list'))

    angsuran_list = Pinjaman.get_angsuran_by_pinjaman_id(pinjaman_id)
    return render_template('pinjaman_detail.html', pinjaman=pinjaman, angsuran_list=angsuran_list)

@app.route('/pembayaran/record/<int:angsuran_id>', methods=['GET', 'POST'])
@login_required # Hanya pengguna yang login yang bisa mengakses halaman ini
def record_pembayaran(angsuran_id):
    """
    Mencatat pembayaran untuk angsuran tertentu.
    GET: Menampilkan formulir pembayaran.
    POST: Memproses pembayaran.
    """
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Angsuran WHERE id_angsuran = ?", (angsuran_id,))
    angsuran = cursor.fetchone()
    conn.close()

    if not angsuran:
        flash('Angsuran tidak ditemukan.', 'danger')
        return redirect(url_for('index')) # Atau ke daftar pinjaman

    # Kolom angsuran:
    # 0: id_angsuran
    # 1: id_pinjaman
    # 2: tanggal_jatuh_tempo
    # 3: jumlah_pokok_angsuran
    # 4: jumlah_bunga_angsuran
    # 5: jumlah_total_angsuran
    # 6: status_pembayaran
    # 7: tanggal_bayar
    # 8: jumlah_dibayar
    # 9: denda

    id_pinjaman = angsuran[1]
    jumlah_total_angsuran_expected = angsuran[5]
    jumlah_dibayar_current = angsuran[8] if angsuran[8] is not None else 0.0
    denda_current = angsuran[9] if angsuran[9] is not None else 0.0
    sisa_bayar = (jumlah_total_angsuran_expected + denda_current) - jumlah_dibayar_current

    if request.method == 'POST':
        try:
            jumlah_bayar = float(request.form['jumlah_bayar'])
            if jumlah_bayar <= 0:
                flash('Jumlah pembayaran harus lebih dari nol.', 'danger')
            elif Pembayaran.record_pembayaran(angsuran_id, jumlah_bayar):
                flash('Pembayaran berhasil dicatat!', 'success')
                return redirect(url_for('view_pinjaman_detail', pinjaman_id=id_pinjaman))
            else:
                flash('Gagal mencatat pembayaran.', 'danger')
        except ValueError:
            flash('Jumlah pembayaran tidak valid.', 'danger')

    return render_template('record_pembayaran.html', angsuran=angsuran, sisa_bayar=sisa_bayar)


if __name__ == '__main__':
    app.run(debug=True) # debug=True untuk pengembangan, matikan untuk produksi
```
{% endraw %}
**Penjelasan:**

* **Import:** Menambahkan `LoginManager`, `login_user`, `logout_user`, `login_required`, `current_user` dari `flask_login` dan `User` dari `models`.

* **Inisialisasi Flask-Login:**

    * `login_manager = LoginManager()`

    * `login_manager.init_app(app)`

    * `login_manager.login_view = 'login'` (mengatur rute default jika pengguna tidak login)

* `load_user` **callback:** Fungsi `load_user` ditambahkan untuk memberi tahu Flask-Login bagaimana memuat objek pengguna dari ID sesi.

* Rute Login (`/login`):

    * Menangani permintaan GET (menampilkan formulir) dan POST (memproses login).

    * Menggunakan `User.find_by_username` dan `user.check_password`.

    * Jika login berhasil, `login_user(user)` dipanggil untuk membuat sesi.

    * Menggunakan `request.args.get('next')` untuk mengarahkan kembali pengguna ke halaman yang mereka coba akses sebelum login.

* Rute Registrasi (`/register`):

    * Menangani pembuatan pengguna baru menggunakan `User.create_user`.

    * Meng-hash password sebelum menyimpannya ke database.

* Rute Logout (`/logout`):

    * Memanggil `logout_user()` untuk mengakhiri sesi.

* `@login_required` Decorator:

    * Hampir semua rute aplikasi sekarang dilindungi dengan `@login_required`. Ini berarti pengguna harus login untuk mengakses halaman-halaman tersebut. Jika tidak, mereka akan diarahkan ke halaman login.

**Langkah Selanjutnya untuk Pengembangan Aplikasi Web**

Untuk mengubah ini menjadi aplikasi web yang sesungguhnya, Anda perlu menambahkan:

**Framework Web Python:**

**Flask** (ringan dan fleksibel) atau **Django** (lebih lengkap dan cocok untuk proyek besar).

Anda akan membuat route (URL) yang memanggil fungsi-fungsi dari `models.py`.

Berikut adalah kode `base.html`:
{% raw %}
```
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikasi Pinjaman Sederhana</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Reset dan Gaya Dasar */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f7f6;
            color: #333;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Container Umum */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
            width: 100%; /* Pastikan container mengisi lebar yang tersedia */
            box-sizing: border-box; /* Sertakan padding dalam lebar total */
        }

        /* Navigasi */
        .navbar {
            background-color: #2563eb; /* bg-blue-600 */
            padding: 1rem; /* p-4 */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        }

        .navbar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap; /* Agar responsif pada layar kecil */
        }

        .navbar-brand {
            color: white;
            font-size: 2rem; /* text-2xl */
            font-weight: bold;
            border-radius: 0.375rem; /* rounded-md */
            padding: 0.5rem; /* p-2 */
            transition: background-color 0.2s ease-in-out; /* transition-colors duration-200 */
            text-decoration: none;
        }

        .navbar-brand:hover {
            background-color: #1d4ed8; /* hover:bg-blue-700 */
        }

        .navbar-links {
            display: flex;
            gap: 1rem; /* space-x-4 */
            align-items: center; /* Untuk menyelaraskan username dan tautan */
            flex-wrap: wrap; /* Agar responsif pada layar kecil */
        }

        .navbar-link {
            color: white;
            padding: 0.5rem 0.75rem; /* px-3 py-2 */
            border-radius: 0.375rem; /* rounded-md */
            font-size: 1.125rem; /* text-lg */
            font-weight: 500;
            transition: background-color 0.2s ease-in-out; /* transition-colors duration-200 */
            text-decoration: none;
        }

        .navbar-link:hover {
            background-color: #1d4ed8; /* hover:bg-blue-700 */
        }

        .navbar-username {
            color: white;
            font-size: 1rem; /* text-base */
            font-weight: 500;
            margin-right: 0.5rem; /* space between username and logout */
        }

        /* Area Konten Utama */
        .main-content {
            margin-top: 1.5rem; /* mt-6 */
            flex-grow: 1; /* flex-grow */
        }

        /* Pesan Flash */
        .flash-messages-container {
            margin-bottom: 1rem; /* mb-4 */
        }

        .flash-message {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
        }

        .flash-message.success {
            background-color: #d4edda; /* bg-green-100 */
            color: #155724; /* text-green-800 */
            border: 1px solid #c3e6cb;
        }

        .flash-message.danger {
            background-color: #f8d7da; /* bg-red-100 */
            color: #721c24; /* text-red-800 */
            border: 1px solid #f5c6cb;
        }

        .flash-message.info {
            background-color: #cce5ff; /* bg-blue-100 */
            color: #004085; /* text-blue-800 */
            border: 1px solid #b8daff;
        }

        /* Footer */
        .footer {
            background-color: #1f2937; /* bg-gray-800 */
            color: white;
            padding: 1rem; /* p-4 */
            margin-top: 2rem; /* mt-8 */
            text-align: center;
        }

        /* Media Queries untuk Responsif (Opsional, tergantung kebutuhan) */
        @media (max-width: 768px) {
            .navbar-content {
                flex-direction: column;
                align-items: flex-start;
            }
            .navbar-links {
                margin-top: 1rem;
                flex-direction: column;
                width: 100%;
                gap: 0.5rem;
            }
            .navbar-link {
                width: 100%;
                text-align: center;
            }
            .navbar-username {
                margin-top: 0.5rem;
                margin-right: 0;
                width: 100%;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container navbar-content">
            <a href="{{ url_for('index') }}" class="navbar-brand">Pinjaman App</a>
            <div class="navbar-links">
                {% if current_user.is_authenticated %}
                    <a href="{{ url_for('nasabah_list') }}" class="navbar-link">Nasabah</a>
                    <a href="{{ url_for('pinjaman_list') }}" class="navbar-link">Pinjaman</a>
                    <span class="navbar-username">Halo, {{ current_user.username }}!</span>
                    <a href="{{ url_for('logout') }}" class="navbar-link">Logout</a>
                {% else %}
                    <a href="{{ url_for('login') }}" class="navbar-link">Login</a>
                    <a href="{{ url_for('register') }}" class="navbar-link">Register</a>
                {% endif %}
            </div>
        </div>
    </nav>

    <div class="container main-content">
        {% with messages = get_flashed_messages(with_categories=true) %}
            {% if messages %}
                <div class="flash-messages-container">
                    {% for category, message in messages %}
                        <div class="flash-message {{ category }}">{{ message }}</div>
                    {% endfor %}
                </div>
            {% endif %}
        {% endwith %}

        {% block content %}{% endblock %}
    </div>

    <footer class="footer">
        <div class="container">
            <p>&copy; {{ '2025' if '2025' > '2024' else '2024' }} Aplikasi Pinjaman Sederhana. Hak Cipta Dilindungi.</p>
        </div>
    </footer>
</body>
</html>

```
{% endraw %}
Berikut adalah kode untuk `templates/login.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya khusus untuk halaman login */
    .auth-card {
        background-color: white;
        padding: 2.5rem; /* p-10 */
        border-radius: 0.75rem; /* rounded-xl */
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        max-width: 28rem; /* max-w-md */
        margin-left: auto;
        margin-right: auto;
        margin-top: 3rem; /* mt-12 */
    }

    .auth-title {
        font-size: 2.25rem; /* text-4xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
        margin-bottom: 1.5rem; /* mb-6 */
        text-align: center;
    }

    .form-group {
        margin-bottom: 1rem; /* mb-4 */
    }

    .form-label {
        display: block;
        color: #374151; /* text-gray-700 */
        font-size: 0.875rem; /* text-sm */
        font-weight: bold;
        margin-bottom: 0.5rem; /* mb-2 */
    }

    .form-input {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
        appearance: none;
        border: 1px solid #d1d5db; /* border */
        border-radius: 0.5rem; /* rounded-lg */
        width: 100%;
        padding: 0.75rem 1rem; /* py-3 px-4 */
        color: #374151; /* text-gray-700 */
        line-height: 1.25; /* leading-tight */
        outline: none;
        transition: all 0.2s ease-in-out;
    }

    .form-input:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
        border-color: transparent; /* focus:border-transparent */
    }

    .submit-button {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        font-weight: bold;
        padding: 0.75rem 1.5rem; /* py-3 px-6 */
        border-radius: 0.5rem; /* rounded-lg */
        outline: none;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* focus:shadow-outline */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        cursor: pointer;
        width: 100%; /* w-full */
    }

    .submit-button:hover {
        background-color: #2563eb; /* hover:bg-blue-700 */
    }

    .register-link-container {
        text-align: center;
        margin-top: 1.5rem; /* mt-6 */
    }

    .register-link {
        font-size: 0.875rem; /* text-sm */
        color: #3b82f6; /* text-blue-500 */
        text-decoration: none;
        font-weight: bold;
    }

    .register-link:hover {
        color: #2563eb; /* hover:text-blue-800 */
    }
</style>

<div class="auth-card">
    <h1 class="auth-title">Login</h1>

    <form method="POST">
        <div class="form-group">
            <label for="username" class="form-label">Username:</label>
            <input type="text" id="username" name="username" class="form-input" required autofocus>
        </div>
        <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" name="password" class="form-input" required>
        </div>
        <div class="form-group" style="margin-top: 1.5rem;"> {# mt-6 #}
            <button type="submit" class="submit-button">Login</button>
        </div>
    </form>

    <div class="register-link-container">
        Belum punya akun? <a href="{{ url_for('register') }}" class="register-link">Daftar di sini</a>.
    </div>
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode untuk `templates/register.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya khusus untuk halaman registrasi */
    .auth-card {
        background-color: white;
        padding: 2.5rem; /* p-10 */
        border-radius: 0.75rem; /* rounded-xl */
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        max-width: 28rem; /* max-w-md */
        margin-left: auto;
        margin-right: auto;
        margin-top: 3rem; /* mt-12 */
    }

    .auth-title {
        font-size: 2.25rem; /* text-4xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
        margin-bottom: 1.5rem; /* mb-6 */
        text-align: center;
    }

    .form-group {
        margin-bottom: 1rem; /* mb-4 */
    }

    .form-label {
        display: block;
        color: #374151; /* text-gray-700 */
        font-size: 0.875rem; /* text-sm */
        font-weight: bold;
        margin-bottom: 0.5rem; /* mb-2 */
    }

    .form-input {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
        appearance: none;
        border: 1px solid #d1d5db; /* border */
        border-radius: 0.5rem; /* rounded-lg */
        width: 100%;
        padding: 0.75rem 1rem; /* py-3 px-4 */
        color: #374151; /* text-gray-700 */
        line-height: 1.25; /* leading-tight */
        outline: none;
        transition: all 0.2s ease-in-out;
    }

    .form-input:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
        border-color: transparent; /* focus:border-transparent */
    }

    .submit-button {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        font-weight: bold;
        padding: 0.75rem 1.5rem; /* py-3 px-6 */
        border-radius: 0.5rem; /* rounded-lg */
        outline: none;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* focus:shadow-outline */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        cursor: pointer;
        width: 100%; /* w-full */
    }

    .submit-button:hover {
        background-color: #2563eb; /* hover:bg-blue-700 */
    }

    .login-link-container {
        text-align: center;
        margin-top: 1.5rem; /* mt-6 */
    }

    .login-link {
        font-size: 0.875rem; /* text-sm */
        color: #3b82f6; /* text-blue-500 */
        text-decoration: none;
        font-weight: bold;
    }

    .login-link:hover {
        color: #2563eb; /* hover:text-blue-800 */
    }
</style>

<div class="auth-card">
    <h1 class="auth-title">Daftar Akun Baru</h1>

    <form method="POST">
        <div class="form-group">
            <label for="username" class="form-label">Username:</label>
            <input type="text" id="username" name="username" class="form-input" required autofocus>
        </div>
        <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" name="password" class="form-input" required>
        </div>
        <div class="form-group">
            <label for="confirm_password" class="form-label">Konfirmasi Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" class="form-input" required>
        </div>
        <div class="form-group" style="margin-top: 1.5rem;"> {# mt-6 #}
            <button type="submit" class="submit-button">Daftar</button>
        </div>
    </form>

    <div class="login-link-container">
        Sudah punya akun? <a href="{{ url_for('login') }}" class="login-link">Login di sini</a>.
    </div>
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode `index.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya untuk halaman index */
    .index-title {
        font-size: 2.25rem; /* text-4xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
        margin-bottom: 2rem; /* mb-8 */
        text-align: center;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: 1fr; /* grid-cols-1 */
        gap: 1.5rem; /* gap-6 */
    }

    @media (min-width: 768px) { /* md:grid-cols-3 */
        .stats-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .stat-card {
        background-color: white;
        padding: 1.5rem; /* p-6 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
    }

    .stat-card-title {
        font-size: 1.25rem; /* text-xl */
        font-weight: 600; /* font-semibold */
        color: #374151; /* text-gray-700 */
        margin-bottom: 1rem; /* mb-4 */
    }

    .stat-card-value {
        font-size: 3rem; /* text-5xl */
        font-weight: bold;
    }

    .stat-card-value.blue {
        color: #2563eb; /* text-blue-600 */
    }

    .stat-card-value.green {
        color: #16a34a; /* text-green-600 */
    }

    .stat-card-value.purple {
        color: #8b5cf6; /* text-purple-600 */
    }

    .stat-card-link {
        margin-top: 1rem; /* mt-4 */
        display: inline-block;
        color: #2563eb; /* text-blue-600 */
        font-weight: 500;
        text-decoration: none;
    }

    .stat-card-link:hover {
        color: #1d4ed8; /* hover:text-blue-800 */
    }

    .action-section {
        margin-top: 3rem; /* mt-12 */
        text-align: center;
    }

    .action-section-title {
        font-size: 1.5rem; /* text-2xl */
        font-weight: 600; /* font-semibold */
        color: #374151; /* text-gray-700 */
        margin-bottom: 1.5rem; /* mb-6 */
    }

    .action-buttons {
        display: flex;
        flex-direction: column; /* flex-col */
        justify-content: center;
        gap: 1rem; /* space-y-4 */
    }

    @media (min-width: 768px) { /* md:flex-row md:space-y-0 md:space-x-6 */
        .action-buttons {
            flex-direction: row;
            gap: 0;
            margin-left: -0.75rem; /* Negative margin to counteract gap */
            margin-right: -0.75rem;
        }
        .action-buttons > * {
            margin-left: 0.75rem;
            margin-right: 0.75rem;
        }
    }

    .action-button {
        font-weight: bold;
        padding: 0.75rem 1.5rem; /* py-3 px-6 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
        transition: all 0.3s ease-in-out; /* transition duration-300 ease-in-out */
        text-decoration: none;
        color: white;
        transform: scale(1);
    }

    .action-button:hover {
        transform: scale(1.05); /* transform hover:scale-105 */
    }

    .action-button.blue {
        background-color: #3b82f6; /* bg-blue-500 */
    }

    .action-button.blue:hover {
        background-color: #2563eb; /* hover:bg-blue-600 */
    }

    .action-button.green {
        background-color: #22c55e; /* bg-green-500 */
    }

    .action-button.green:hover {
        background-color: #16a34a; /* hover:bg-green-600 */
    }
</style>

<h1 class="index-title">Selamat Datang di Aplikasi Pinjaman</h1>

<div class="stats-grid">
    <div class="stat-card">
        <h2 class="stat-card-title">Total Nasabah</h2>
        <p class="stat-card-value blue">{{ total_nasabah }}</p>
        <a href="{{ url_for('nasabah_list') }}" class="stat-card-link">Lihat Detail &rarr;</a>
    </div>

    <div class="stat-card">
        <h2 class="stat-card-title">Pinjaman Aktif</h2>
        <p class="stat-card-value green">{{ total_pinjaman_aktif }}</p>
        <a href="{{ url_for('pinjaman_list') }}" class="stat-card-link">Lihat Detail &rarr;</a>
    </div>

    <div class="stat-card">
        <h2 class="stat-card-title">Total Pokok Pinjaman Aktif</h2>
        <p class="stat-card-value purple">Rp {{ "{:,.2f}".format(total_pokok_pinjaman_aktif) }}</p>
        <a href="{{ url_for('pinjaman_list') }}" class="stat-card-link">Lihat Detail &rarr;</a>
    </div>
</div>

<div class="action-section">
    <h2 class="action-section-title">Mulai Sekarang</h2>
    <div class="action-buttons">
        <a href="{{ url_for('nasabah_list') }}" class="action-button blue">
            Kelola Nasabah
        </a>
        <a href="{{ url_for('pinjaman_list') }}" class="action-button green">
            Kelola Pinjaman
        </a>
    </div>
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode `nasabah.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya untuk halaman daftar nasabah */
    .page-card {
        background-color: white;
        padding: 2rem; /* p-8 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
    }

    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem; /* mb-6 */
    }

    .header-title {
        font-size: 1.875rem; /* text-3xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
    }

    .add-button {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        font-weight: bold;
        padding: 0.5rem 1rem; /* py-2 px-4 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        text-decoration: none;
    }

    .add-button:hover {
        background-color: #2563eb; /* hover:bg-blue-600 */
    }

    .table-container {
        overflow-x: auto;
    }

    .data-table {
        min-width: 100%;
        background-color: white;
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        border-radius: 0.5rem; /* rounded-lg */
        border-collapse: collapse; /* Ensure rounded corners apply */
    }

    .data-table thead {
        background-color: #f3f4f6; /* bg-gray-100 */
    }

    .data-table th {
        padding: 0.75rem 1rem; /* py-3 px-4 */
        text-align: left;
        font-size: 0.875rem; /* text-sm */
        font-weight: 600; /* font-semibold */
        color: #4b5563; /* text-gray-600 */
        text-transform: uppercase;
        letter-spacing: 0.05em; /* tracking-wider */
    }

    .data-table th:first-child {
        border-top-left-radius: 0.5rem; /* rounded-tl-lg */
    }

    .data-table th:last-child {
        border-top-right-radius: 0.5rem; /* rounded-tr-lg */
    }

    .data-table td {
        padding: 0.75rem 1rem; /* py-3 px-4 */
        font-size: 0.875rem; /* text-sm */
        color: #374151; /* text-gray-700 */
        border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
    }

    .data-table tbody tr:hover {
        background-color: #f9fafb; /* hover:bg-gray-50 */
        transition: background-color 0.15s ease-in-out; /* transition-colors duration-150 */
    }

    .action-buttons-group {
        display: flex;
        gap: 0.5rem; /* space-x-2 */
    }

    .action-button-small {
        color: white;
        font-size: 0.75rem; /* text-xs */
        font-weight: 600; /* font-semibold */
        padding: 0.25rem 0.75rem; /* py-1 px-3 */
        border-radius: 0.375rem; /* rounded-md */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        text-decoration: none;
        display: inline-block; /* For proper padding and hover */
    }

    .action-button-small.green {
        background-color: #22c55e; /* bg-green-500 */
    }

    .action-button-small.green:hover {
        background-color: #16a34a; /* hover:bg-green-600 */
    }

    .action-button-small.yellow {
        background-color: #eab308; /* bg-yellow-500 */
    }

    .action-button-small.yellow:hover {
        background-color: #ca8a04; /* hover:bg-yellow-600 */
    }

    .action-button-small.red {
        background-color: #ef4444; /* bg-red-500 */
    }

    .action-button-small.red:hover {
        background-color: #dc2626; /* hover:bg-red-600 */
    }

    .no-data-message {
        color: #4b5563; /* text-gray-600 */
        text-align: center;
        padding: 2rem; /* py-8 */
    }
</style>

<div class="page-card">
    <div class="header-section">
        <h1 class="header-title">Daftar Nasabah</h1>
        <a href="{{ url_for('add_nasabah') }}" class="add-button">
            + Tambah Nasabah Baru
        </a>
    </div>

    {% if nasabah %}
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>NIK</th>
                    <th>Telepon</th>
                    <th>Email</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {% for n in nasabah %}
                <tr>
                    <td>{{ n[0] }}</td> {# id_nasabah #}
                    <td>{{ n[1] }}</td> {# nama #}
                    <td>{{ n[5] }}</td> {# nik #}
                    <td>{{ n[3] }}</td> {# no_telepon #}
                    <td>{{ n[4] }}</td> {# email #}
                    <td>{{ n[2] }}</td> {# alamat #}
                    <td>
                        <div class="action-buttons-group">
                            <a href="{{ url_for('add_pinjaman', nasabah_id=n[0]) }}" class="action-button-small green">
                                Tambah Pinjaman
                            </a>
                            <a href="{{ url_for('edit_nasabah', nasabah_id=n[0]) }}" class="action-button-small yellow">
                                Edit
                            </a>
                            <form action="{{ url_for('delete_nasabah', nasabah_id=n[0]) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus nasabah ini? Tindakan ini tidak dapat dibatalkan.');" style="display: inline;">
                                <button type="submit" class="action-button-small red">
                                    Hapus
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
    {% else %}
    <p class="no-data-message">Belum ada nasabah terdaftar.</p>
    {% endif %}
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode `add_nasabah.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya untuk formulir tambah/edit nasabah */
    .form-card {
        background-color: white;
        padding: 2rem; /* p-8 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        max-width: 32rem; /* max-w-lg */
        margin-left: auto;
        margin-right: auto;
    }

    .form-title {
        font-size: 1.875rem; /* text-3xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
        margin-bottom: 1.5rem; /* mb-6 */
        text-align: center;
    }

    .form-group {
        margin-bottom: 1rem; /* mb-4 */
    }

    .form-label {
        display: block;
        color: #374151; /* text-gray-700 */
        font-size: 0.875rem; /* text-sm */
        font-weight: bold;
        margin-bottom: 0.5rem; /* mb-2 */
    }

    .form-input,
    .form-textarea {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
        appearance: none;
        border: 1px solid #d1d5db; /* border */
        border-radius: 0.5rem; /* rounded-lg */
        width: 100%;
        padding: 0.5rem 0.75rem; /* py-2 px-3 */
        color: #374151; /* text-gray-700 */
        line-height: 1.25; /* leading-tight */
        outline: none;
        transition: all 0.2s ease-in-out;
    }

    .form-input:focus,
    .form-textarea:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
        border-color: transparent; /* focus:border-transparent */
    }

    .form-textarea {
        resize: vertical;
    }

    .form-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem; /* mb-6 (for last group) */
    }

    .submit-button {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        font-weight: bold;
        padding: 0.5rem 1rem; /* py-2 px-4 */
        border-radius: 0.5rem; /* rounded-lg */
        outline: none;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* focus:shadow-outline */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        cursor: pointer;
    }

    .submit-button:hover {
        background-color: #2563eb; /* hover:bg-blue-700 */
    }

    .cancel-link {
        display: inline-block;
        vertical-align: baseline;
        font-weight: bold;
        font-size: 0.875rem; /* text-sm */
        color: #3b82f6; /* text-blue-500 */
        text-decoration: none;
    }

    .cancel-link:hover {
        color: #2563eb; /* hover:text-blue-800 */
    }
</style>

<div class="form-card">
    <h1 class="form-title">
        {% if nasabah %}Edit Nasabah{% else %}Tambah Nasabah Baru{% endif %}
    </h1>

    <form method="POST">
        <div class="form-group">
            <label for="nama" class="form-label">Nama Lengkap:</label>
            <input type="text" id="nama" name="nama" value="{{ nasabah[1] if nasabah else '' }}"
                   class="form-input" required>
        </div>
        <div class="form-group">
            <label for="nik" class="form-label">NIK (Nomor Induk Kependudukan):</label>
            <input type="text" id="nik" name="nik" value="{{ nasabah[5] if nasabah else '' }}"
                   class="form-input" required>
        </div>
        <div class="form-group">
            <label for="alamat" class="form-label">Alamat:</label>
            <textarea id="alamat" name="alamat" rows="3"
                      class="form-textarea" required>{{ nasabah[2] if nasabah else '' }}</textarea>
        </div>
        <div class="form-group">
            <label for="no_telepon" class="form-label">Nomor Telepon:</label>
            <input type="tel" id="no_telepon" name="no_telepon" value="{{ nasabah[3] if nasabah else '' }}"
                   class="form-input">
        </div>
        <div class="form-group" style="margin-bottom: 1.5rem;"> {# mb-6 #}
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" name="email" value="{{ nasabah[4] if nasabah else '' }}"
                   class="form-input">
        </div>
        <div class="form-actions">
            <button type="submit" class="submit-button">
                {% if nasabah %}Perbarui Nasabah{% else %}Tambah Nasabah{% endif %}
            </button>
            <a href="{{ url_for('nasabah_list') }}" class="cancel-link">
                Batal
            </a>
        </div>
    </form>
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode `pinjaman.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya untuk halaman daftar pinjaman */
    .page-card {
        background-color: white;
        padding: 2rem; /* p-8 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
    }

    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem; /* mb-6 */
    }

    .header-title {
        font-size: 1.875rem; /* text-3xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
    }

    .add-button {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        font-weight: bold;
        padding: 0.5rem 1rem; /* py-2 px-4 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        text-decoration: none;
    }

    .add-button:hover {
        background-color: #2563eb; /* hover:bg-blue-600 */
    }

    .table-container {
        overflow-x: auto;
    }

    .data-table {
        min-width: 100%;
        background-color: white;
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        border-radius: 0.5rem; /* rounded-lg */
        border-collapse: collapse; /* Ensure rounded corners apply */
    }

    .data-table thead {
        background-color: #f3f4f6; /* bg-gray-100 */
    }

    .data-table th {
        padding: 0.75rem 1rem; /* py-3 px-4 */
        text-align: left;
        font-size: 0.875rem; /* text-sm */
        font-weight: 600; /* font-semibold */
        color: #4b5563; /* text-gray-600 */
        text-transform: uppercase;
        letter-spacing: 0.05em; /* tracking-wider */
    }

    .data-table th:first-child {
        border-top-left-radius: 0.5rem; /* rounded-tl-lg */
    }

    .data-table th:last-child {
        border-top-right-radius: 0.5rem; /* rounded-tr-lg */
    }

    .data-table td {
        padding: 0.75rem 1rem; /* py-3 px-4 */
        font-size: 0.875rem; /* text-sm */
        color: #374151; /* text-gray-700 */
        border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
    }

    .data-table tbody tr:hover {
        background-color: #f9fafb; /* hover:bg-gray-50 */
        transition: background-color 0.15s ease-in-out; /* transition-colors duration-150 */
    }

    .status-badge {
        padding: 0.25rem 0.5rem; /* px-2 py-1 */
        border-radius: 9999px; /* rounded-full */
        font-size: 0.75rem; /* text-xs */
        font-weight: 600; /* font-semibold */
        display: inline-block;
    }

    .status-badge.active {
        background-color: #dbeafe; /* bg-blue-100 */
        color: #1e40af; /* text-blue-800 */
    }

    .status-badge.lunas {
        background-color: #d1fae5; /* bg-green-100 */
        color: #065f46; /* text-green-800 */
    }

    .status-badge.bermasalah {
        background-color: #fee2e2; /* bg-red-100 */
        color: #991b1b; /* text-red-800 */
    }

    .detail-button {
        background-color: #6366f1; /* bg-indigo-500 */
        color: white;
        font-size: 0.75rem; /* text-xs */
        font-weight: 600; /* font-semibold */
        padding: 0.25rem 0.75rem; /* py-1 px-3 */
        border-radius: 0.375rem; /* rounded-md */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        text-decoration: none;
        display: inline-block;
    }

    .detail-button:hover {
        background-color: #4f46e5; /* hover:bg-indigo-600 */
    }

    .no-data-message {
        color: #4b5563; /* text-gray-600 */
        text-align: center;
        padding: 2rem; /* py-8 */
    }
</style>

<div class="page-card">
    <div class="header-section">
        <h1 class="header-title">Daftar Pinjaman</h1>
        {# Tombol "Tambah Pinjaman" di sini mengarah ke halaman daftar nasabah untuk memilih nasabah #}
        <a href="{{ url_for('nasabah_list') }}" class="add-button">
            + Tambah Pinjaman Baru
        </a>
    </div>

    {% if pinjaman %}
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID Pinjaman</th>
                    <th>Nasabah</th>
                    <th>Tanggal Pinjam</th>
                    <th>Pokok</th>
                    <th>Bunga Tahunan</th>
                    <th>Tenor</th>
                    <th>Periode</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {% for p in pinjaman %}
                <tr>
                    <td>{{ p[0] }}</td> {# id_pinjaman #}
                    <td>{{ p[9] }}</td> {# nama nasabah (dari JOIN) #}
                    <td>{{ p[2] }}</td> {# tanggal_pinjam #}
                    <td>Rp {{ "{:,.2f}".format(p[3]) }}</td> {# jumlah_pokok #}
                    <td>{{ "{:.2%}".format(p[4]) }}</td> {# suku_bunga #}
                    <td>{{ p[5] }}</td> {# tenor #}
                    <td>{{ p[6]|capitalize }}</td> {# periode_pembayaran #}
                    <td>
                        <span class="status-badge {% if p[7] == 'aktif' %}active{% elif p[7] == 'lunas' %}lunas{% else %}bermasalah{% endif %}">
                            {{ p[7]|capitalize }}
                        </span>
                    </td> {# status_pinjaman #}
                    <td>
                        <a href="{{ url_for('view_pinjaman_detail', pinjaman_id=p[0]) }}" class="detail-button">
                            Detail Angsuran
                        </a>
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
    {% else %}
    <p class="no-data-message">Belum ada pinjaman terdaftar.</p>
    {% endif %}
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode `pinjaman_detail.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya untuk halaman detail pinjaman */
    .page-card {
        background-color: white;
        padding: 2rem; /* p-8 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
    }

    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem; /* mb-6 */
    }

    .header-title {
        font-size: 1.875rem; /* text-3xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
    }

    .back-button {
        background-color: #d1d5db; /* bg-gray-300 */
        color: #1f2937; /* text-gray-800 */
        font-weight: bold;
        padding: 0.5rem 1rem; /* py-2 px-4 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        text-decoration: none;
    }

    .back-button:hover {
        background-color: #9ca3af; /* hover:bg-gray-400 */
    }

    .info-grid {
        display: grid;
        grid-template-columns: 1fr; /* grid-cols-1 */
        gap: 1.5rem; /* gap-6 */
        margin-bottom: 2rem; /* mb-8 */
    }

    @media (min-width: 768px) { /* md:grid-cols-2 */
        .info-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .info-section-title {
        font-size: 1.25rem; /* text-xl */
        font-weight: 600; /* font-semibold */
        color: #374151; /* text-gray-700 */
        margin-bottom: 0.75rem; /* mb-3 */
    }

    .info-item {
        color: #4b5563; /* text-gray-600 */
        margin-bottom: 0.5rem; /* mb-2 */
    }

    .info-item strong {
        font-weight: bold;
    }

    .status-badge {
        padding: 0.25rem 0.5rem; /* px-2 py-1 */
        border-radius: 9999px; /* rounded-full */
        font-size: 0.75rem; /* text-xs */
        font-weight: 600; /* font-semibold */
        display: inline-block;
    }

    .status-badge.active {
        background-color: #dbeafe; /* bg-blue-100 */
        color: #1e40af; /* text-blue-800 */
    }

    .status-badge.lunas {
        background-color: #d1fae5; /* bg-green-100 */
        color: #065f46; /* text-green-800 */
    }

    .status-badge.bermasalah {
        background-color: #fee2e2; /* bg-red-100 */
        color: #991b1b; /* text-red-800 */
    }

    .angsuran-section-title {
        font-size: 1.25rem; /* text-xl */
        font-weight: 600; /* font-semibold */
        color: #374151; /* text-gray-700 */
        margin-bottom: 1rem; /* mb-4 */
    }

    .table-container {
        overflow-x: auto;
    }

    .data-table {
        min-width: 100%;
        background-color: white;
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        border-radius: 0.5rem; /* rounded-lg */
        border-collapse: collapse; /* Ensure rounded corners apply */
    }

    .data-table thead {
        background-color: #f3f4f6; /* bg-gray-100 */
    }

    .data-table th {
        padding: 0.75rem 1rem; /* py-3 px-4 */
        text-align: left;
        font-size: 0.875rem; /* text-sm */
        font-weight: 600; /* font-semibold */
        color: #4b5563; /* text-gray-600 */
        text-transform: uppercase;
        letter-spacing: 0.05em; /* tracking-wider */
    }

    .data-table th:first-child {
        border-top-left-radius: 0.5rem; /* rounded-tl-lg */
    }

    .data-table th:last-child {
        border-top-right-radius: 0.5rem; /* rounded-tr-lg */
    }

    .data-table td {
        padding: 0.75rem 1rem; /* py-3 px-4 */
        font-size: 0.875rem; /* text-sm */
        color: #374151; /* text-gray-700 */
        border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
    }

    .data-table tbody tr:hover {
        background-color: #f9fafb; /* hover:bg-gray-50 */
        transition: background-color 0.15s ease-in-out; /* transition-colors duration-150 */
    }

    .angsuran-status-badge {
        padding: 0.25rem 0.5rem; /* px-2 py-1 */
        border-radius: 9999px; /* rounded-full */
        font-size: 0.75rem; /* text-xs */
        font-weight: 600; /* font-semibold */
        display: inline-block;
    }

    .angsuran-status-badge.sudah-bayar {
        background-color: #d1fae5; /* bg-green-100 */
        color: #065f46; /* text-green-800 */
    }

    .angsuran-status-badge.terlambat {
        background-color: #fee2e2; /* bg-red-100 */
        color: #991b1b; /* text-red-800 */
    }

    .angsuran-status-badge.belum-bayar {
        background-color: #fffbeb; /* bg-yellow-100 */
        color: #92400e; /* text-yellow-800 */
    }

    .pay-button {
        background-color: #9333ea; /* bg-purple-500 */
        color: white;
        font-size: 0.75rem; /* text-xs */
        font-weight: 600; /* font-semibold */
        padding: 0.25rem 0.75rem; /* py-1 px-3 */
        border-radius: 0.375rem; /* rounded-md */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        text-decoration: none;
        display: inline-block;
    }

    .pay-button:hover {
        background-color: #7e22ce; /* hover:bg-purple-600 */
    }

    .lunas-text {
        color: #6b7280; /* text-gray-500 */
        font-size: 0.75rem; /* text-xs */
    }

    .no-data-message {
        color: #4b5563; /* text-gray-600 */
        text-align: center;
        padding: 2rem; /* py-8 */
    }
</style>

<div class="page-card">
    <div class="header-section">
        <h1 class="header-title">Detail Pinjaman</h1>
        <a href="{{ url_for('pinjaman_list') }}" class="back-button">
            &larr; Kembali ke Daftar Pinjaman
        </a>
    </div>

    <div class="info-grid">
        <div>
            <h2 class="info-section-title">Informasi Pinjaman</h2>
            <p class="info-item"><strong>ID Pinjaman:</strong> {{ pinjaman[0] }}</p>
            <p class="info-item"><strong>Nasabah:</strong> {{ pinjaman[9] }} (ID: {{ pinjaman[1] }})</p>
            <p class="info-item"><strong>Tanggal Pinjam:</strong> {{ pinjaman[2] }}</p>
            <p class="info-item"><strong>Jumlah Pokok:</strong> Rp {{ "{:,.2f}".format(pinjaman[3]) }}</p>
            <p class="info-item"><strong>Suku Bunga Tahunan:</strong> {{ "{:.2%}".format(pinjaman[4]) }}</p>
            <p class="info-item"><strong>Tenor:</strong> {{ pinjaman[5] }} {{ pinjaman[6]|capitalize }}</p>
            <p class="info-item"><strong>Periode Pembayaran:</strong> {{ pinjaman[6]|capitalize }}</p>
            <p class="info-item">
                <strong>Status Pinjaman:</strong>
                <span class="status-badge
                    {% if pinjaman[7] == 'aktif' %}active
                    {% elif pinjaman[7] == 'lunas' %}lunas
                    {% else %}bermasalah{% endif %}">
                    {{ pinjaman[7]|capitalize }}
                </span>
            </p>
            {% if pinjaman[8] %}
            <p class="info-item"><strong>Tanggal Lunas:</strong> {{ pinjaman[8] }}</p>
            {% endif %}
        </div>
    </div>

    <h2 class="angsuran-section-title">Jadwal Angsuran</h2>
    {% if angsuran_list %}
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Angsuran Ke-</th>
                    <th>Jatuh Tempo</th>
                    <th>Pokok</th>
                    <th>Bunga</th>
                    <th>Total Angsuran</th>
                    <th>Dibayar</th>
                    <th>Denda</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {% for angsuran in angsuran_list %}
                <tr>
                    <td>{{ loop.index }}</td> {# Angsuran Ke-#}
                    <td>{{ angsuran[2] }}</td> {# tanggal_jatuh_tempo #}
                    <td>Rp {{ "{:,.2f}".format(angsuran[3]) }}</td> {# jumlah_pokok_angsuran #}
                    <td>Rp {{ "{:,.2f}".format(angsuran[4]) }}</td> {# jumlah_bunga_angsuran #}
                    <td>Rp {{ "{:,.2f}".format(angsuran[5]) }}</td> {# jumlah_total_angsuran #}
                    <td>Rp {{ "{:,.2f}".format(angsuran[8] if angsuran[8] is not none else 0.0) }}</td> {# jumlah_dibayar #}
                    <td>Rp {{ "{:,.2f}".format(angsuran[9] if angsuran[9] is not none else 0.0) }}</td> {# denda #}
                    <td>
                        <span class="angsuran-status-badge
                            {% if angsuran[6] == 'sudah_bayar' %}sudah-bayar
                            {% elif angsuran[6] == 'terlambat' %}terlambat
                            {% else %}belum-bayar{% endif %}">
                            {{ angsuran[6]|replace('_', ' ')|capitalize }}
                        </span>
                    </td> {# status_pembayaran #}
                    <td>
                        {% if angsuran[6] != 'sudah_bayar' %}
                        <a href="{{ url_for('record_pembayaran', angsuran_id=angsuran[0]) }}" class="pay-button">
                            Bayar
                        </a>
                        {% else %}
                        <span class="lunas-text">Lunas</span>
                        {% endif %}
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
    {% else %}
    <p class="no-data-message">Tidak ada jadwal angsuran untuk pinjaman ini.</p>
    {% endif %}
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode `add_pinjaman.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya untuk formulir tambah pinjaman */
    .form-card {
        background-color: white;
        padding: 2rem; /* p-8 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        max-width: 32rem; /* max-w-lg */
        margin-left: auto;
        margin-right: auto;
    }

    .form-title {
        font-size: 1.875rem; /* text-3xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
        margin-bottom: 1.5rem; /* mb-6 */
        text-align: center;
    }

    .form-group {
        margin-bottom: 1rem; /* mb-4 */
    }

    .form-label {
        display: block;
        color: #374151; /* text-gray-700 */
        font-size: 0.875rem; /* text-sm */
        font-weight: bold;
        margin-bottom: 0.5rem; /* mb-2 */
    }

    .form-input,
    .form-select {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
        appearance: none;
        border: 1px solid #d1d5db; /* border */
        border-radius: 0.5rem; /* rounded-lg */
        width: 100%;
        padding: 0.5rem 0.75rem; /* py-2 px-3 */
        color: #374151; /* text-gray-700 */
        line-height: 1.25; /* leading-tight */
        outline: none;
        transition: all 0.2s ease-in-out;
    }

    .form-input:focus,
    .form-select:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
        border-color: transparent; /* focus:border-transparent */
    }

    .form-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem; /* mb-6 (for last group) */
    }

    .submit-button {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        font-weight: bold;
        padding: 0.5rem 1rem; /* py-2 px-4 */
        border-radius: 0.5rem; /* rounded-lg */
        outline: none;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* focus:shadow-outline */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        cursor: pointer;
    }

    .submit-button:hover {
        background-color: #2563eb; /* hover:bg-blue-700 */
    }

    .cancel-link {
        display: inline-block;
        vertical-align: baseline;
        font-weight: bold;
        font-size: 0.875rem; /* text-sm */
        color: #3b82f6; /* text-blue-500 */
        text-decoration: none;
    }

    .cancel-link:hover {
        color: #2563eb; /* hover:text-blue-800 */
    }
</style>

<div class="form-card">
    <h1 class="form-title">
        Tambah Pinjaman untuk {{ nasabah[1] }}
    </h1>

    <form method="POST">
        <div class="form-group">
            <label for="jumlah_pokok" class="form-label">Jumlah Pokok Pinjaman (Rp):</label>
            <input type="number" id="jumlah_pokok" name="jumlah_pokok" step="0.01" min="1"
                   class="form-input" required>
        </div>
        <div class="form-group">
            <label for="suku_bunga" class="form-label">Suku Bunga Tahunan (desimal, misal 0.10 untuk 10%):</label>
            <input type="number" id="suku_bunga" name="suku_bunga" step="0.0001" min="0" max="1"
                   class="form-input" required>
        </div>
        <div class="form-group">
            <label for="tenor" class="form-label">Tenor (jumlah periode pembayaran):</label>
            <input type="number" id="tenor" name="tenor" min="1"
                   class="form-input" required>
        </div>
        <div class="form-group" style="margin-bottom: 1.5rem;"> {# mb-6 #}
            <label for="periode_pembayaran" class="form-label">Periode Pembayaran:</label>
            <select id="periode_pembayaran" name="periode_pembayaran"
                    class="form-select" required>
                <option value="bulanan">Bulanan</option>
                <option value="mingguan">Mingguan</option>
                <option value="harian">Harian</option>
            </select>
        </div>
        <div class="form-actions">
            <button type="submit" class="submit-button">
                Buat Pinjaman
            </button>
            <a href="{{ url_for('nasabah_list') }}" class="cancel-link">
                Batal
            </a>
        </div>
    </form>
</div>
{% endblock %}

```
{% endraw %}
Berikut adalah kode `record_pembayaran.html`:
{% raw %}
```
{% extends "base.html" %}

{% block content %}
<style>
    /* Gaya untuk formulir catatan pembayaran */
    .form-card {
        background-color: white;
        padding: 2rem; /* p-8 */
        border-radius: 0.5rem; /* rounded-lg */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        max-width: 32rem; /* max-w-lg */
        margin-left: auto;
        margin-right: auto;
    }

    .form-title {
        font-size: 1.875rem; /* text-3xl */
        font-weight: bold;
        color: #1f2937; /* text-gray-800 */
        margin-bottom: 1.5rem; /* mb-6 */
        text-align: center;
    }

    .payment-summary {
        margin-bottom: 1.5rem; /* mb-6 */
        padding: 1rem; /* p-4 */
        background-color: #f9fafb; /* bg-gray-50 */
        border-radius: 0.5rem; /* rounded-lg */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
    }

    .payment-summary p {
        color: #374151; /* text-gray-700 */
        margin-bottom: 0.5rem; /* mb-2 */
    }

    .payment-summary strong {
        font-weight: bold;
    }

    .sisa-bayar {
        font-size: 1.25rem; /* text-xl */
        font-weight: bold;
        color: #2563eb; /* text-blue-600 */
        margin-top: 1rem; /* mt-4 */
    }

    .form-group {
        margin-bottom: 1rem; /* mb-4 */
    }

    .form-label {
        display: block;
        color: #374151; /* text-gray-700 */
        font-size: 0.875rem; /* text-sm */
        font-weight: bold;
        margin-bottom: 0.5rem; /* mb-2 */
    }

    .form-input {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow */
        appearance: none;
        border: 1px solid #d1d5db; /* border */
        border-radius: 0.5rem; /* rounded-lg */
        width: 100%;
        padding: 0.5rem 0.75rem; /* py-2 px-3 */
        color: #374151; /* text-gray-700 */
        line-height: 1.25; /* leading-tight */
        outline: none;
        transition: all 0.2s ease-in-out;
    }

    .form-input:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
        border-color: transparent; /* focus:border-transparent */
    }

    .form-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .submit-button {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        font-weight: bold;
        padding: 0.5rem 1rem; /* py-2 px-4 */
        border-radius: 0.5rem; /* rounded-lg */
        outline: none;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* focus:shadow-outline */
        transition: background-color 0.2s ease-in-out; /* transition duration-200 */
        cursor: pointer;
    }

    .submit-button:hover {
        background-color: #2563eb; /* hover:bg-blue-700 */
    }

    .cancel-link {
        display: inline-block;
        vertical-align: baseline;
        font-weight: bold;
        font-size: 0.875rem; /* text-sm */
        color: #3b82f6; /* text-blue-500 */
        text-decoration: none;
    }

    .cancel-link:hover {
        color: #2563eb; /* hover:text-blue-800 */
    }
</style>

<div class="form-card">
    <h1 class="form-title">Catat Pembayaran Angsuran</h1>

    <div class="payment-summary">
        <p><strong>ID Angsuran:</strong> {{ angsuran[0] }}</p>
        <p><strong>Jatuh Tempo:</strong> {{ angsuran[2] }}</p>
        <p><strong>Total Angsuran (Pokok + Bunga):</strong> Rp {{ "{:,.2f}".format(angsuran[5]) }}</p>
        <p><strong>Sudah Dibayar:</strong> Rp {{ "{:,.2f}".format(angsuran[8] if angsuran[8] is not none else 0.0) }}</p>
        <p><strong>Denda Saat Ini:</strong> Rp {{ "{:,.2f}".format(angsuran[9] if angsuran[9] is not none else 0.0) }}</p>
        <p class="sisa-bayar">Sisa yang Harus Dibayar: Rp {{ "{:,.2f}".format(sisa_bayar) }}</p>
    </div>

    <form method="POST">
        <div class="form-group">
            <label for="jumlah_bayar" class="form-label">Jumlah Pembayaran (Rp):</label>
            <input type="number" id="jumlah_bayar" name="jumlah_bayar" step="0.01" min="0.01" value="{{ '%.2f'|format(sisa_bayar) }}"
                   class="form-input" required>
        </div>
        <div class="form-actions">
            <button type="submit" class="submit-button">
                Catat Pembayaran
            </button>
            <a href="{{ url_for('view_pinjaman_detail', pinjaman_id=angsuran[1]) }}"
               class="cancel-link">
                Batal
            </a>
        </div>
    </form>
</div>
{% endblock %}

```
{% endraw %}

**Antarmuka Pengguna (Front-end):**

Gunakan HTML, CSS, JavaScript untuk membuat formulir input data nasabah dan pinjaman, serta tabel untuk menampilkan laporan.

Anda bisa menggunakan Jinja2 (untuk Flask/Django) sebagai template engine untuk menampilkan data dari back-end ke HTML.

Untuk pengalaman pengguna yang lebih dinamis, Anda bisa menggunakan framework JavaScript seperti React, Vue, atau Angular, dan back-end Python akan bertindak sebagai API.

Autentikasi & Otorisasi: Implementasikan sistem login untuk kasir atau admin.

Validasi Input: Pastikan data yang dimasukkan pengguna valid dan aman.

Penanganan Error yang Lebih Baik: Tangani error database dan logika bisnis dengan lebih elegan.
