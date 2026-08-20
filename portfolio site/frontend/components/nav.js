(function () {
  const currentPage = document.body.dataset.page || 'home';

  // ---- Inject nav ----
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="topIdentity">
      <span class="ti-name">AARYAN CHATURVEDI</span>
      <span class="ti-loc">PARIS, FRANCE</span>
    </div>
    <nav id="mainNav">
      <a class="logo" href="/">AARYAN CHATURVEDI</a>
      <div class="navlinks" id="navLinks">
        <a href="/"           data-page="home">Overview</a>
        <a href="/approach"   data-page="approach">Approach</a>
        <a href="/experience" data-page="experience">Experience</a>
        <a href="/awards"     data-page="awards">Awards</a>
        <a href="/skills"     data-page="skills">Skills</a>
        <a href="/contact"    data-page="contact">Contact</a>
      </div>
      <button class="navtoggle" id="navToggle">&#9776;</button>
    </nav>
  `);

  // ---- Inject footer ----
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <span>© 2026 Aaryan Chaturvedi — Paris, France</span>
      <span>Marketing Portfolio</span>
    </footer>
  `);

  const nav = document.getElementById('mainNav');
  const topIdentity = document.getElementById('topIdentity');
  const navLinksEl = document.getElementById('navLinks');
  const toggle = document.getElementById('navToggle');

  // ---- Mark active nav link ----
  navLinksEl.querySelectorAll('a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === currentPage);
  });

  // ---- Nav style: transparent on home, cream on all other pages ----
  if (currentPage !== 'home') {
    nav.classList.add('scrolled');
    topIdentity.classList.add('hidden');
  } else {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      const hero = document.querySelector('.hero');
      const heroBottom = hero ? hero.offsetHeight * 0.75 : window.innerHeight * 0.75;
      topIdentity.classList.toggle('hidden', window.scrollY > heroBottom);
    });
  }

  // ---- Mobile toggle ----
  toggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
  navLinksEl.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinksEl.classList.remove('open'))
  );
})();
