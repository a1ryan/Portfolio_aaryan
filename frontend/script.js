// ---------- Nav scroll + mobile toggle ----------
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ---------- Contact form ----------
// Change this if your backend runs on a different host/port than the frontend.
// During local dev with the included backend, this defaults to the same origin.
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : '';

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
