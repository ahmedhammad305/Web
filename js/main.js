
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const closeMenuBtn = document.querySelector('.close-menu');
const body = document.body;
const mobileLinks = document.querySelectorAll('.mobile-menu .nav-links a');

function openMenu() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    body.classList.add('menu-open');
}

function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
}

hamburger.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Projects Slider
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slider-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
let slidesToShow = 3;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Responsive slides to show
function updateSlidesToShow() {
    if (window.innerWidth <= 768) {
        slidesToShow = 1;
    } else if (window.innerWidth <= 1024) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3;
    }
    updateSlider();
    createDots();
}

// Create dots
function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(slides.length - slidesToShow + 1);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 32;
    const maxIndex = Math.max(0, slides.length - slidesToShow);
    currentIndex = Math.min(currentIndex, maxIndex);
    
    sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function nextSlide() {
    const maxIndex = slides.length - slidesToShow;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

// Touch/Mouse drag functionality
sliderWrapper.addEventListener('mousedown', dragStart);
sliderWrapper.addEventListener('touchstart', dragStart);
sliderWrapper.addEventListener('mouseup', dragEnd);
sliderWrapper.addEventListener('touchend', dragEnd);
sliderWrapper.addEventListener('mousemove', drag);
sliderWrapper.addEventListener('touchmove', drag);
sliderWrapper.addEventListener('mouseleave', dragEnd);

function dragStart(e) {
    isDragging = true;
    startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    sliderWrapper.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentPosition - startPos;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
        isDragging = false;
    }
}

function dragEnd() {
    isDragging = false;
    sliderWrapper.style.cursor = 'grab';
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Initialize slider
updateSlidesToShow();
window.addEventListener('resize', updateSlidesToShow);

// Reveal sections on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero') && !section.classList.contains('projects-section')) {
        observer.observe(section);
    }
});

const projectsSection = document.querySelector('.projects-section');
if (projectsSection) {
    observer.observe(projectsSection);
}

// Header background on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(250, 250, 250, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.background = 'rgba(250, 250, 250, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Active navigation state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-heading)';
        }
    });
});

// Testimonials
const testimonialData = [
   {
        text: '"We worked with this amazing design team to refresh our corporate headquarters. Their expertise in spatial planning and luxury aesthetics shone through in every detail of the final result."',
        author: "Sarah Mitchell",
        role: "CEO, Apex Corporation",
        initials: "SM"
    },
    {
        text: '"Exceptional attention to detail and professional project management. They transformed our residential space into a modern masterpiece that perfectly balances comfort with high-end luxury."',
        author: "James Anderson",
        role: "Owner, Riverside Residence",
        initials: "JA"
    },
    {
        text: '"A truly seamless experience from concept to completion. The team delivered innovative lighting and material solutions that exceeded our expectations for our boutique hotel renovation."',
        author: "Elena Rodriguez",
        role: "Director, Boutique Stays",
        initials: "ER"
    }
];

const contentBox = document.querySelector('.testimonial-content');
const textElem = contentBox.querySelector('.testimonial-text');
const authorElem = contentBox.querySelector('.testimonial-author');
const roleElem = contentBox.querySelector('.testimonial-role');
const avatarElem = contentBox.querySelector('.author-avatar');
const tDots = document.querySelectorAll('.testimonial-dot');

function changeTestimonial(index) {
    contentBox.style.opacity = '0';
    contentBox.style.transform = 'translateY(10px)';
    contentBox.style.transition = 'all 0.4s ease';

    setTimeout(() => {
        const data = testimonialData[index];
        
        textElem.textContent = data.text;
        authorElem.textContent = data.author;
        roleElem.textContent = data.role;
        avatarElem.textContent = data.initials;

        tDots.forEach(dot => dot.classList.remove('active'));
        tDots[index].classList.add('active');

        contentBox.style.opacity = '1';
        contentBox.style.transform = 'translateY(0)';
    }, 400);
}

tDots.forEach((dot, index) => {
    dot.addEventListener('click', () => changeTestimonial(index));
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});