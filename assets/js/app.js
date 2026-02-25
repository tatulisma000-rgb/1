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

  // Active Link State
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');

  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

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
