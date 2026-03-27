/* ============================================================
   SHARED NAVBAR JS — Sakhashri Seals Corporation
   ============================================================ */

(function () {

    /* ===== DROPDOWN ===== */
    const dropdownParent = document.querySelector('.nav-has-dropdown');
    const trigger = document.querySelector('.nav-dropdown-trigger');

    if (trigger && dropdownParent) {
        trigger.addEventListener('click', (e) => {
            // Toggle dropdown on mobile only
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                dropdownParent.classList.toggle('open');
            }
        });

        document.addEventListener('click', () => {
            dropdownParent.classList.remove('open');
        });

        // Stop propagation inside dropdown but allow links to work
        document.querySelector('.dropdown-menu')?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /* ===== HAMBURGER (MOBILE) ===== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    /* ===== DARK MODE ===== */
    const themeBtn = document.getElementById('themeToggleNav');
    const saved = localStorage.getItem('ss-theme');

    if (saved === 'dark') {
        document.body.classList.add('dark');
        if (themeBtn) themeBtn.textContent = '☀️';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            themeBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('ss-theme', isDark ? 'dark' : 'light');
        });
    }

    /* ===== ACTIVE LINK HIGHLIGHT ===== */
    const page = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === page || a.getAttribute('href')?.endsWith(page)) {
            a.closest('li')?.classList.add('active');
        }
    });

})();
