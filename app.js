document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const evidenceBlocks = document.querySelectorAll('[data-project]');
  if (filterButtons.length && evidenceBlocks.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.filter;
        filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        evidenceBlocks.forEach((block) => {
          const show = value === 'all' || block.dataset.project === value;
          block.classList.toggle('hide', !show);
        });
      });
    });
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = Number(el.dataset.counter || 0);
    const duration = 1200;
    const start = performance.now();
    const step = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        animateCounter(entry.target);
        entry.target.dataset.done = '1';
      }
    });
  }, { threshold: 0.6 });
  counterEls.forEach((el) => counterObserver.observe(el));

  const sectionLinks = document.querySelectorAll('[data-section-link]');
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  if (sectionLinks.length && sections.length) {
    const highlight = () => {
      const scrollY = window.scrollY + 130;
      let currentId = sections[0].id;
      sections.forEach((section) => {
        if (section.offsetTop <= scrollY) currentId = section.id;
      });
      sectionLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    };
    highlight();
    window.addEventListener('scroll', highlight, { passive: true });
  }
});
