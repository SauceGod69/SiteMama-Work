document.getElementById('actionButton').addEventListener('click', () => {
    alert('Button clicked!');
});

// Lazy loading and animations
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

lazyImages.forEach((img) => observer.observe(img));

// Loading screen
const loadingOverlay = document.createElement('div');
loadingOverlay.className = 'loading-overlay';
loadingOverlay.innerHTML = '<div class="loader"></div>';
document.body.appendChild(loadingOverlay);

window.addEventListener('load', () => {
  loadingOverlay.classList.add('hidden');
  setTimeout(() => loadingOverlay.remove(), 500);
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
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

// Initialize DOM references
const nav = document.querySelector('.nav');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// Enhanced mobile menu
const mobileLinks = document.querySelectorAll('.nav-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768 && nav && mobileMenuBtn) {
      nav.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
  try {
    animationObserver.observe(el);
  } catch (error) {
    console.warn('Failed to observe element:', error);
  }
});

// Performance optimizations
document.querySelectorAll('img').forEach(img => {
  img.loading = 'lazy';
  img.decoding = 'async';
});

// Add smooth scrolling with offset for header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      try {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } catch (error) {
        console.warn('Smooth scroll failed:', error);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');

  mobileMenuBtn.addEventListener('click', function () {
    mainNav.classList.toggle('nav-open');
  });
});

