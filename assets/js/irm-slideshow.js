let slideIndex = 0;
let slideshowInterval;

// Fungsi untuk menampilkan slide
function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Sembunyikan semua slide
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Atur index slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Hapus kelas 'active' dari semua dot
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Tampilkan slide saat ini dan aktifkan dot yang sesuai
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Fungsi untuk memulai slideshow otomatis
function startSlideshow() {
    // Panggil showSlides() setiap 3 detik (3000ms)
    slideshowInterval = setInterval(showSlides, 3000);
}

// Fungsi untuk menghentikan slideshow otomatis
function stopSlideshow() {
    clearInterval(slideshowInterval);
}

// Fungsi untuk navigasi manual
function plusSlides(n) {
    stopSlideshow(); // Hentikan autoplay saat navigasi manual
    slideIndex += n - 1; // Sesuaikan index

    const slides = document.getElementsByClassName("mySlides");
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Kembali ke slide pertama jika di akhir
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1; // Kembali ke slide terakhir jika di awal
    }

    showSlidesAt(slideIndex + 1);
    startSlideshow(); // Mulai lagi autoplay setelah navigasi
}

// Fungsi untuk melompat ke slide tertentu
function currentSlide(n) {
    stopSlideshow();
    showSlidesAt(n);
    startSlideshow();
}

// Fungsi untuk menampilkan slide berdasarkan nomor
function showSlidesAt(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Sembunyikan semua slide
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Hapus kelas 'active' dari semua dot
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Tampilkan slide dan aktifkan dot
    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
    slideIndex = n - 1;
}

// Jalankan slideshow saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Tampilkan slide pertama saat halaman dimuat
    showSlidesAt(1);
    // Mulai slideshow otomatis
    startSlideshow();
});
