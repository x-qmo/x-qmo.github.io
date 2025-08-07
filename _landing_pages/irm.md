---
layout: lanpage-yayasan
title: irm
description: Yayasan Insan Robithotul Mukhlasin bergerak di bidang sosial & kemanusiaan, fokus membantu sesama dengan program pendidikan, kesehatan, dan pemberdayaan masyarakat kurang mampu di Bandung.
og_image: /assets/images/thumbnail-yayasan-irm.jpg
---



<section class="irm-slide-show-section" id="s-slideshow-irm">
<div class="slideshow-container">

<div class="mySlides fade">
  <div class="numbertext">1 / 3</div>
  <img src="img_nature_wide.jpg" style="width:100%">
  <div class="text">Caption Text</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">2 / 3</div>
  <img src="img_snow_wide.jpg" style="width:100%">
  <div class="text">Caption Two</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">3 / 3</div>
  <img src="img_mountains_wide.jpg" style="width:100%">
  <div class="text">Caption Three</div>
</div>

<a class="prev" onclick="plusSlides(-1)">❮</a>
<a class="next" onclick="plusSlides(1)">❯</a>

</div>
<br>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
</div>
</section>

<section class="hero-section" id="beranda">
    <div class="container">
        <div class="hero-logo">
                <img class="logo-yayasan-irm" src="https://res.cloudinary.com/db2lct8xv/image/upload/v1754565183/logo-yayasan_nbzplq.png" alt="Logo IRM">
        </div>
        <h1 class="hero-title">SEBAIK-BAIK MANUSIA ADALAH YANG PALING BANYAK
MANFAATNYA BAGI KEHIDUPAN</h1>
        <p class="hero-subtitle">Yayasan Insan Robithotul Mukhlasin adalah lembaga sosial non profit yang menjadi wadah untuk memberikan kebermanfaatan bagi sesama manusia.</p>
    </div>
</section>

<section class="about-section" id="tentang-kami">
    <div class="container">
        <h2 class="section-title">Tentang Kami</h2>
        <p class="section-description">
            {{ site.data.yayasan-irm.nama_yayasan | default: 'Nama Yayasan Anda' }} atau Yayasan Insan Robithotul Mukhlasin adalah sebuah lembaga sosial kemanusiaan nirlaba yang didirikan pada tahun 2024 dengan misi meng-implementasikan nilai-nilai keagamaan terhadap sesama manusia dibawah naungan <b>Yayasan Makhsus Nusantara</b> dan dibawah <b>bimbingan ahli silsilah Gurunda Syaikh Al-'Allamah Masy'ur Kyai Dr. Fahmi Ahmad Fajar Abou Saad, MA Hafidzahullahu Ta'ala</b>.
        </p>
    </div>
</section>

<section class="visi-misi-yayasan">
<div class="container">
    <div class="visi-misi-content">
            <div class="visi-text-yayasan">
                <div class="judul-visi-yayasan">
                <h3 class="section-title-visi-misi">Visi Kami</h3>
                </div>
                <div class="isi-visi-yayasan">
                <p>Mewujudkan lembaga yang konsisten menebar manfaat bagi kesejahteraan umat dalam aspek sosial, keagamaan, kesehatan dan kesejahteraan, sebagai wujud pengabdian terbaik manusia kepada Allah SWT</p>
                </div>
            </div>
            <div class="misi-text-yayasan">
                <div class="judul-misi-yayasan">
                <h3 class="section-title-visi-misi">Misi Kami</h3>
                </div>
                <div class="isi-misi-yayasan">
                <ul class="ul-isi-misi-yayasan">
                    <li>Menyelenggarakan tata kelola Lembaga Yayasan yang selalu cepat tanggap dan memiliki jiwa solidaritas yang tinggi terhadap lingkungan.</li>
                    <li>Memberikan bantuan kepada siapaun yang membutuhkan bantuan sosial, kemanusiaan dan kesehatan dengan tulus dan tanpa pamrih.</li>
                    <li>Melibatkan berbagai elemen masyarakat untuk ikut serta berperan aktif dalam berbagai kegiatan sosial dan kesejahteraan.</li>
                    <li>Meningkatkan kapasitas keilmuan pengurus, anggota Yayasan dan masyarakat dalam bidang keagamaan dan wawasan keislaman.</li>
                </ul>
            </div>
        </div>
</div>
</div>
</section>

<section class="programs-section" id="program">
    <div class="container">
        <h2 class="section-title">Program Unggulan Kami</h2>
        <p class="section-description">
            Kami menjalankan berbagai program yang berfokus pada kebutuhan dasar dan pembangunan berkelanjutan untuk komunitas yang kami layani.
        </p>
        <div class="program-grid">
            {% for program in site.data.program-yayasan-irm %}
            <div class="program-card">
                <h3>{{ program.title }}</h3>
                <p>{{ program.description }}</p>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<div class="video-gallery-container" id="video-kegiatan">
    <h2 class="section-title">Video Kegiatan Yayasan</h2>
    <div class="video-grid">
        {% for video in site.data.video-yayasan-irm %}
        <div class="video-item">
            <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/{{ video.id }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="video-info">
                <h3>{{ video.title }}</h3>
                <p>{{ video.description }}</p>
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<section class="gallery-section" id="galeri">
    <div class="container">
        <h2 class="section-title">Aksi Nyata Kami dalam Gambar</h2>
        <p class="section-description">
            Lihatlah dampak positif yang telah kita ciptakan bersama melalui dokumentasi kegiatan kami.
        </p>
        <div class="program-grid">
            {% for item in site.data.gallery-yayasan-irm %}
            <div class="program-card">
                <img src="{{ item.image_url }}" alt="{{ item.alt_text }}" style="max-width:100%; border-radius:5px; margin-bottom:1rem;">
                <p>{{ item.caption }}</p>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<section class="cta-section" id="donasi">
    <div class="container">
        <h2 class="hero-title">Galeri Photo Dan Video Kegiatan</h2>
        <p class="hero-subtitle">Lihat momen-momen kegiatan kami melalui foto dan video</p>
        <a href="{{ site.baseurl }}/landing-pages/viges/" class="donate-button">Gallery Video</a>
        <a href="{{ site.baseurl }}/landing-pages/poges/" class="donate-button">Gallery Photo</a>
    </div>
</section>

<section class="contact-section" id="kontak">
    <div class="container">
        <h2 class="section-title">Hubungi Kami</h2>
        <p class="section-description">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan, ingin berkolaborasi, atau memerlukan informasi lebih lanjut tentang yayasan kami.
        </p>
        <div class="contact-info">
            <p><strong>Alamat:</strong> {{ site.data.yayasan-irm.address | default: 'Jl. PHH. Mustofa No. 71B, Kota Bandung, Jawa Barat' }}</p>
            <p><strong>Telepon:</strong> <a href="tel:{{ site.data.yayasan-irm.phone | default: '+62881023039034' }}" class="nav-link">{{ site.data.yayasan-irm.phone | default: '+62 881-0230-39034' }}</a></p>
            <p><strong>Email:</strong> <a href="mailto:{{ site.data.yayasan-irm.email | default: 'info@namayayasan.org' }}" class="nav-link">{{ site.data.yayasan-irm.email | default: 'info@namayayasan.org' }}</a></p>
            <p style="margin-top:1.5rem;">
                <a href="{{ site.data.yayasan-irm.Maps_link }}" target="_blank" class="donate-button" style="padding: 0.5rem 1rem; font-size:0.9rem;">Lihat di Google Maps</a>
            </p>
        </div>
    </div>
</section>
