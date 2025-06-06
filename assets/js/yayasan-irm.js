document.addEventListener('DOMContentLoaded', function() {
    // Fungsionalitas Hamburger Menu
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active'); // Toggle class 'active' untuk menampilkan/menyembunyikan menu
        });
    }

    // Fungsionalitas Smooth Scroll untuk Navigasi
    document.querySelectorAll('.nav-link, .donate-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Cegah perilaku default anchor link

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Tutup menu hamburger jika terbuka (untuk mobile UX)
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }

                // Scroll ke elemen target
                // Tambahan offset untuk fixed header agar konten tidak tertutup
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20, // 20px padding tambahan
                    behavior: 'smooth' // Animasi smooth scroll
                });
            }
        });
    });

    console.log("Yayasan Landing Page Script Loaded!");
});
