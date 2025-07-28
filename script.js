document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        } else {
            htmlElement.classList.remove('dark');
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    };
    
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    themeToggleBtn.addEventListener('click', function() {
        const isDark = htmlElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('color-theme', newTheme);
        applyTheme(newTheme);
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('#mobile-menu a').forEach(anchor => {
        anchor.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    const animatedElements = document.querySelectorAll('[data-animation]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-animation-delay') || '0');
                setTimeout(() => {
                   entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    animatedElements.forEach(el => {
        const animationClass = el.getAttribute('data-animation');
        if(animationClass) el.classList.add(animationClass);
        observer.observe(el);
    });

    const backToTopButton = document.getElementById('back-to-top');
    const heroImage = document.getElementById('hero-image');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (backToTopButton) {
            backToTopButton.classList.toggle('visible', scrollPosition > 300);
        }
        if (heroImage && scrollPosition < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px) scale(1)`;
        }
    });
    
    // Custom Tailwind Colors
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: {
                '700': '#1B263B',
                '800': '#121e2e',
                '900': '#0D1B2A',
            },
            gold: {
                '400': '#D4AF37',
                '500': '#B8860B',
                '600': '#A1720A',
            },
            cream: {
                '50': '#F5F5F5',
                '100': '#F5F5DC',
            }
          }
        }
      }
    }
});
