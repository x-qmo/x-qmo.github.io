document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const backButton = document.getElementById('back-button');
    const overlay = document.getElementById('overlay');
    const submenuTriggers = document.querySelectorAll('.has-submenu > a');

    // Buka/tutup sidebar
    hamburgerMenu.addEventListener('click', function() {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
    });

    backButton.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    // Buka/tutup submenu di sidebar
    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.parentElement;
            const submenu = parentLi.querySelector('.submenu');

            if (submenu) {
                submenu.classList.toggle('open');
                const icon = this.querySelector('i');
                if (submenu.classList.contains('open')) {
                    icon.classList.remove('fa-chevron-right');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-right');
                }
            }
        });
    });
});
