document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Active Link State & Sliding Indicator
  const currentPath = window.location.pathname;
  const navLinksContainer = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  // Create indicator
  const indicator = document.createElement('div');
  indicator.className = 'nav-indicator';
  if (navLinksContainer) navLinksContainer.appendChild(indicator);

  function moveIndicator(element) {
    if (!element || !indicator) return;
    const rect = element.getBoundingClientRect();
    const containerRect = navLinksContainer.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - containerRect.left}px`;
    indicator.style.opacity = '1';
  }

  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html') || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      setTimeout(() => moveIndicator(link), 100);
    }

    link.addEventListener('mouseenter', () => moveIndicator(link));
  });

  if (navLinksContainer) {
    navLinksContainer.addEventListener('mouseleave', () => {
      const activeLink = document.querySelector('.nav-links a.active');
      if (activeLink) {
        moveIndicator(activeLink);
      } else {
        indicator.style.opacity = '0';
      }
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('header');
  const spotlight = document.querySelector('.spotlight');
  const previewCard = document.querySelector('.preview-card');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hero Scroll Parallax
    if (spotlight) {
      const scrollValue = window.scrollY;
      spotlight.style.transform = `translateY(${scrollValue * 0.3}px)`;
    }
  });

  // Mouse Parallax & Spotlight Effect
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    // Spotlight movement
    if (spotlight) {
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 112, 243, 0.15) 0%, transparent 50%)`;
    }

    // Dashboard Tilt
    if (previewCard) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 100;
      const moveY = (clientY - centerY) / 100;

      previewCard.style.transform = `perspective(2000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) translateY(${window.scrollY * 0.05}px)`;
    }

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn-primary, .brand');
    magneticBtns.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const dist = Math.hypot(clientX - btnX, clientY - btnY);

      if (dist < 100) {
        const x = (clientX - btnX) * 0.2;
        const y = (clientY - btnY) * 0.2;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        btn.style.transform = `translate(0, 0)`;
      }
    });
  });

  // Reveal on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to observe anymore
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Pricing Toggle Logic
  const pricingToggle = document.getElementById('pricing-toggle');
  const priceValues = document.querySelectorAll('.price-value');
  const pricePeriods = document.querySelectorAll('.price-period');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isYearly = pricingToggle.checked;
      priceValues.forEach(price => {
        const monthlyPrice = parseInt(price.dataset.monthly);
        const yearlyPrice = parseInt(price.dataset.yearly);
        price.textContent = isYearly ? yearlyPrice : monthlyPrice;
      });
      pricePeriods.forEach(period => {
        period.textContent = isYearly ? '/yr' : '/mo';
      });
    });
  }

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Resource Filtering Logic
  const searchInput = document.getElementById('search-input');
  const tagChips = document.querySelectorAll('.tag-chip');
  const resourceCards = document.querySelectorAll('.resource-card');

  function filterResources() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const activeTag = document.querySelector('.tag-chip.active')?.dataset.tag || 'all';

    resourceCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const tag = card.dataset.tag;
      const matchesSearch = title.includes(searchTerm);
      const matchesTag = activeTag === 'all' || tag === activeTag;

      if (matchesSearch && matchesTag) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterResources);
  }

  tagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      tagChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterResources();
    });
  });

  // Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form Logic
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        // Show success toast
        if (toast) {
          toast.textContent = 'Message sent successfully!';
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
        contactForm.reset();
      }
    });
  }
});
