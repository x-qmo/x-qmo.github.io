
        document.addEventListener('DOMContentLoaded', function() {
            // Get references to the menu toggle button and the main navigation links
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');

            // Add click event listener to the menu toggle button
            menuToggle.addEventListener('click', function() {
                // Toggle the 'active' class on both the toggle button and the navigation menu
                // The 'active' class controls visibility and animation on mobile
                menuToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
            });

            // Optional: Hide the menu when a navigation link is clicked (for mobile user experience)
            mainNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    // Only hide the menu if the screen width is at or below the mobile breakpoint (768px)
                    if (window.innerWidth <= 768) {
                        menuToggle.classList.remove('active');
                        mainNav.classList.remove('active');
                    }
                });
            });
        });
