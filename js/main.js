document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    
    const toggleMenu = () => {
        nav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    };
    
    navToggle.addEventListener('click', toggleMenu);

    // Закрытие меню при клике вне области
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Плавная прокрутка
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Раскрытие участников
    document.querySelectorAll('.member-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const member = button.closest('.member');
            const isExpanded = member.classList.toggle('active');
            
            button.setAttribute('aria-expanded', isExpanded);
        });
    });

    // Анимация секций
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
