// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Guide mockup — gradient follows cursor
const mockup = document.querySelector('.guide-mockup__cover');
if (mockup) {
  document.addEventListener('mousemove', (e) => {
    const rect = mockup.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    mockup.style.background = `linear-gradient(${angle}deg, #F72717 0%, #FF007D 100%)`;
  });
}

// Smooth active state on nav CTA
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Number counter animation — only for purely numeric values
const counters = document.querySelectorAll('.number-item__value');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // Get the text from the direct text node only (skip child <span>)
      const spanEl = el.querySelector('span');
      const spanText = spanEl ? spanEl.textContent : '';
      const fullText = el.textContent.replace(spanText, '').trim();
      const match = fullText.match(/^(\d+)$/);
      if (!match) { counterObserver.unobserve(el); return; }

      const target = parseInt(match[1]);
      const duration = 1600;
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.firstChild.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));
