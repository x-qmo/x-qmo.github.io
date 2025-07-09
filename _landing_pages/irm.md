---
layout: lanpage-yayasan
title: irm
description: Yayasan Insan Robithotul Mukhlasin bergerak di bidang sosial & kemanusiaan, fokus membantu sesama dengan program pendidikan, kesehatan, dan pemberdayaan masyarakat kurang mampu di Bandung.
og_image: /assets/images/thumbnail-yayasan-irm.jpg
---

<section class="hero-section" id="beranda">
    <div class="container">
        <h1 class="hero-title">Insan Robithotul Mukhlasin</h1>
        <p class="hero-subtitle">yayasan ini hadir sebagai jembatan kebaikan, menghubungkan uluran tangan para dermawan dengan kebutuhan mendesak di lapangan</p>
        <a href="#video-kegiatan" class="donate-button">Video Kegiatan</a>
    </div>
</section>

<section class="about-section" id="tentang-kami">
    <div class="container">
        <h2 class="section-title">Tentang Kami</h2>
        <p class="section-description">
            {{ site.data.yayasan-irm.nama_yayasan | default: 'Nama Yayasan Anda' }} adalah sebuah lembaga sosial kemanusiaan nirlaba yang didirikan pada tahun 2024 dengan misi meng-implementasikan nilai-nilai keagamaan terhadap sesama manusia dibawah naungan <b>Yayasan Makhsus Nusantara</b> dan dibawah <b>bimbingan ahli silsilah Gurunda Syaikh Al-'Allamah Masy'ur Kyai Dr. Fahmi Ahmad Fajar Abou Saad, MA Hafidzahullahu Ta'ala</b>.
        </p>
        <div class="about-content">
            <div class="about-image">
                <img src="{{ '/assets/images/background-yayasan-irm-3.jpg' | relative_url }}" alt="Tim Yayasan Beraksi">
            </div>
            <div class="about-text">
                <h3>Visi Kami</h3>
                <p>Mewujudkan masyarakat yang berdaya, mandiri, dan berkeadilan sosial, dengan menjunjung tinggi nilai-nilai kemanusiaan dan kepedulian terhadap sesama.</p>
                <h3>Misi Kami</h3>
                <ul class="ulmisi">
                    <li>Menyelenggarakan program-program sosial yang berdampak positif dan berkelanjutan.</li>
                    <li>Menggalang dana dan sumber daya secara transparan dan akuntabel.</li>
                    <li>Membangun kemitraan strategis dengan berbagai pihak untuk memperluas jangkauan kebaikan.</li>
                    <li>Menyalurkan bantuan kemanusiaan secara cepat dan tepat kepada korban bencana alam atau krisis lainnya, serta berpartisipasi aktif dalam upaya pemulihan pascabencana.</li>
                    <li>Meningkatkan kesadaran masyarakat akan pentingnya kepedulian sosial dan kemanusiaan.</li>
                </ul>
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
