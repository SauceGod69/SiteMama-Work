document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Menu Toggle =====
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      mainNav.classList.toggle('active');
      this.innerHTML = expanded ? 
        '<i class="fas fa-bars" aria-hidden="true"></i>' : 
        '<i class="fas fa-times" aria-hidden="true"></i>';
    });
    
    document.addEventListener('click', function(event) {
      const isClickInside = mainNav.contains(event.target) || mobileMenuBtn.contains(event.target);
      if (!isClickInside && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
      }
    });
    
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
      }
    });
    
    // Keyboard navigation for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' && index < navLinks.length - 1) {
          navLinks[index + 1].focus();
        } else if (event.key === 'ArrowLeft' && index > 0) {
          navLinks[index - 1].focus();
        }
      });
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // ===== Sticky Header =====
  const header = document.getElementById('header');
  
  // Add debounce utility
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };
  
  // Improve scroll handler
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.scrollY > 100;
    header.classList.toggle('scrolled', scrolled);
  }, 100));

  // ===== Smooth Scrolling for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Enhanced Language Switcher =====
  const languageBtns = document.querySelectorAll('.language-btn');
  
  languageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      languageBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      
      // Get the selected language
      const lang = this.getAttribute('lang');
      
      // Store language preference in localStorage
      localStorage.setItem('preferredLanguage', lang);
      
      // Redirect to the appropriate language version
      if (lang === 'en') {
        // Get current page path and redirect to English version
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace('/index.html', '/en/index.html')
                           .replace('.html', '/en/index.html');
        window.location.href = '/en' + currentPath;
      } else {
        // Redirect to Romanian version (root)
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace('/en/', '/');
        window.location.href = newPath;
      }
    });
  });
  
  // Set initial language button state based on current page or preference
  function setInitialLanguageState() {
    const storedLang = localStorage.getItem('preferredLanguage');
    const isEnglishPage = window.location.pathname.includes('/en/');
    
    languageBtns.forEach(btn => {
      const btnLang = btn.getAttribute('lang');
      if ((storedLang === btnLang) || (!storedLang && isEnglishPage && btnLang === 'en') || (!storedLang && !isEnglishPage && btnLang === 'ro')) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }
  
  setInitialLanguageState();

  // ===== Set Current Year in Footer =====
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // ===== Animation on Scroll =====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-up');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize animations
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Add intersection observer for animations
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
  });

  // ===== Cookie Consent =====
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptCookies = document.getElementById('accept-cookies');
  const declineCookies = document.getElementById('decline-cookies');
  
  if (!localStorage.getItem('cookieConsent') && cookieConsent) {
    cookieConsent.removeAttribute('hidden');
  }
  
  if (acceptCookies) {
    acceptCookies.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieConsent.setAttribute('hidden', true);
    });
  }
  
  if (declineCookies) {
    declineCookies.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'declined');
      cookieConsent.setAttribute('hidden', true);
    });
  }

  // Handle back to top button if it exists
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Add form validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const isValid = validateForm(form);
    if (isValid) {
      submitForm(form);
    }
  });
});

// Add service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service worker registered'))
      .catch(err => console.error('Service worker error:', err));
  });
}

// Add error boundary
window.addEventListener('error', (e) => {
  console.error('Global error:', e);
  // Show user-friendly error message
});

// Add performance monitoring
const reportPerformance = () => {
  const metrics = performance.getEntriesByType('navigation')[0];
  console.log(`Page load time: ${metrics.loadEventEnd}ms`);
};

window.addEventListener('load', reportPerformance);