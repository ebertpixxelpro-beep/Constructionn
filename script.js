// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    disable: 'mobile' // Disable animations on mobile to prevent layout issues
});

// Scroll to Top Button Logic
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Navbar Scroll Effect (Add shadow on scroll)
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
        navbar.classList.add('bg-white');
    } else {
        navbar.classList.remove('shadow');
        // keep bg-white or make transparent if transparent header desired
    }
});

// Automatic TOC Generation for Blog Details
document.addEventListener('DOMContentLoaded', function () {
    const tocBody = document.getElementById('toc-body');
    const contentContainer = document.querySelector('.blog-content');

    if (tocBody && contentContainer) {
        const headings = contentContainer.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            const ul = document.createElement('ul');
            ul.className = 'list-unstyled mb-0';

            headings.forEach((heading, index) => {
                // Generate ID if not present
                if (!heading.id) {
                    heading.id = 'heading-' + index;
                }

                const li = document.createElement('li');
                li.className = 'mb-2';

                // Indentation for H3
                if (heading.tagName.toLowerCase() === 'h3') {
                    li.classList.add('ms-3');
                }

                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.textContent = heading.textContent;
                a.className = 'text-decoration-none text-muted hover-primary';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById(heading.id).scrollIntoView({
                        behavior: 'smooth'
                    });
                });

                li.appendChild(a);
                ul.appendChild(li);
            });

            tocBody.appendChild(ul);
        } else {
            // Hide TOC if no headings
            const tocContainer = document.getElementById('toc-container');
            if (tocContainer) tocContainer.style.display = 'none';
        }
    }
});
