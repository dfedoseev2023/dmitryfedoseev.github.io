document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.querySelector('.icon.sun');
    const moonIcon = document.querySelector('.icon.moon');

    // Check Local Storage or System Preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                enableLightMode();
            } else {
                enableDarkMode();
            }
        });
    }

    function enableDarkMode() {
        body.setAttribute('data-theme', 'dark');
        body.classList.remove('light-mode');
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    }

    function enableLightMode() {
        body.setAttribute('data-theme', 'light');
        body.classList.add('light-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    }

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('open');
            });
        });
    }

    // --- Scroll Animations (Progressive Enhancement) ---
    // 1. We rely on CSS opacity:1 by default.
    // 2. JS adds .hidden class immediately to elements to hide them.
    // 3. Observer removes .hidden class when they scroll into view.
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        // Add hidden class to start animation loop
        el.classList.add('hidden');
        observer.observe(el);
    });
});