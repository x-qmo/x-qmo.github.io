document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-itemku');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah halaman melompat ke id

            // Hapus kelas 'active-tab' dari semua tab
            navItems.forEach(nav => nav.classList.remove('active-tab'));

            // Tambahkan kelas 'active-tab' ke tab yang diklik
            this.classList.add('active-tab');

            // Sembunyikan semua konten tab
            tabContents.forEach(content => content.classList.remove('active-content'));

            // Ambil ID dari href tab yang diklik
            const targetId = this.getAttribute('href');
            const targetContent = document.querySelector(targetId);

            // Tampilkan konten yang sesuai
            if (targetContent) {
                targetContent.classList.add('active-content');
            }
        });
    });
});
