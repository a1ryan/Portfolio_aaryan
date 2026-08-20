// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll(
  '.eyebrow, .sec-title, .hero-label, .hero-sub, .hero-cta, ' +
  '.about-text, .fact-list, .approach-col, ' +
  '.tl-item, .award-card, .skill-block, ' +
  '.contact-row, .contact-form'
);

revealTargets.forEach(el => el.classList.add('reveal'));

document.querySelectorAll('.award-grid, .skill-grid, .approach-grid, .timeline').forEach(grid => {
  grid.querySelectorAll(':scope > .reveal').forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ---------- Contact form ----------
const API_BASE = '';
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    status.className = '';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        status.textContent = data.message || "Thanks! I'll get back to you soon.";
        status.className = 'success';
        form.reset();
      } else {
        status.textContent = data.message || 'Something went wrong. Please try again.';
        status.className = 'error';
      }
    } catch (err) {
      status.textContent = 'Could not reach the server. Is the backend running?';
      status.className = 'error';
    }
  });
}
