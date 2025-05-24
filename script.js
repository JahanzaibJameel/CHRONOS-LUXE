document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        pagination: false,
        breakpoints: {
            1024: {
                perPage: 2
            },
            768: {
                perPage: 1
            }
        }
    }).mount();

    new Splide('#testimonials-slider', {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        gap: '2rem',
        pagination: false,
        breakpoints: {
            768: {
                perPage: 1
            }
        }
    }).mount();
});

const cursor = document.getElementById('custom-cursor');
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

const interactiveElements = document.querySelectorAll('a, button, .hover-scale, .magnetic-effect, input, textarea, .splide__arrow');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
    });
});

document.querySelectorAll('.magnetic-effect').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = (x - rect.width / 2) * 0.2;
        const dy = (y - rect.height / 2) * 0.2;
        btn.style.setProperty('--tx', `${dx}px`);
        btn.style.setProperty('--ty', `${dy}px`);
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--tx', '0');
        btn.style.setProperty('--ty', '0');
    });
});

document.querySelectorAll('.card-3d-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = (x / rect.width - 0.5) * 20;
        const rotateX = (y / rect.height - 0.5) * -20;

        wrapper.querySelector('.card-3d-inner').style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        wrapper.querySelector('.card-3d-inner').style.transform =
            'rotateX(0) rotateY(0)';
    });
});

window.addEventListener('load', function () {
    const logoPath = document.querySelector('.logo-path');
    if (logoPath) {
        logoPath.style.strokeDashoffset = '0';
    }
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('hero-loaded');
                initAnimations();
            }, 500);
        }
    }, 2000);
});

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    gsap.from("#hero-title", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    });

    gsap.from("#hero-subtitle", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: "power3.out"
    });

    gsap.from(".hero-btn-container", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.6,
        ease: "power3.out"
    });

    gsap.to(".hero-video", {
        scrollTrigger: {
            scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.15,
        ease: "none"
    });

    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section.querySelectorAll("h2, h3, h4, p, img"), {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    gsap.utils.toArray(".timeline-item").forEach(item => {
        ScrollTrigger.create({
            trigger: item,
            start: "top center",
            onEnter: () => item.classList.add("active"),
            onLeaveBack: () => item.classList.remove("active")
        });
    });
}

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    this.classList.toggle('text-secondary');

    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('max-h-0', 'opacity-0');
            mobileMenu.classList.add('max-h-screen', 'opacity-100');
        }, 10);
    } else {
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        mobileMenu.classList.remove('max-h-screen', 'opacity-100');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.classList.remove('text-secondary');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        mobileMenu.classList.remove('max-h-screen', 'opacity-100');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    });
});

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md', 'py-2');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('shadow-md', 'py-2');
        navbar.classList.add('py-4');
    }

    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
    } else {
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
    }
});

document.getElementById('back-to-top').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

const craftsmanshipVideo = document.getElementById('craftsmanship-video');
const videoPlayButton = document.getElementById('video-play-button');

if (craftsmanshipVideo && videoPlayButton) {
    videoPlayButton.addEventListener('click', function () {
        craftsmanshipVideo.play();
        videoPlayButton.style.display = 'none';
        craftsmanshipVideo.controls = true;
    });

    craftsmanshipVideo.addEventListener('pause', function () {
        videoPlayButton.style.display = 'flex';
    });

    craftsmanshipVideo.addEventListener('ended', function () {
        videoPlayButton.style.display = 'flex';
        craftsmanshipVideo.controls = false;
    });
}

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function (e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });

        if (!isValid) {
            e.preventDefault();
            const errorMessage = document.createElement('p');
            errorMessage.className = 'text-red-500 mt-4 text-sm';
            errorMessage.textContent = 'Please fill in all required fields.';

            if (!form.querySelector('.text-red-500')) {
                form.appendChild(errorMessage);
            }
        }
    });
});