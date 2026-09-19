// Spider intro for the homepage hero: the name zooms in, a web + spider land
// on the "N" in AARYAN, then the spider follows down the page on scroll.
(function () {
  var heroNameRig = document.getElementById('heroNameRig');
  if (!heroNameRig) return; // only the homepage hero has this rig

  var hero = document.getElementById('hero');
  var webIcon = document.getElementById('webIcon');
  var thread = document.getElementById('thread');
  var spiderRig = document.getElementById('spiderRig');
  var spiderDescent = document.getElementById('spiderDescent');
  var spider = document.getElementById('spider');

  var landed = false;
  var pageBaseTop = 0;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function layoutRig() {
    var rect = heroNameRig.getBoundingClientRect();
    // web-icon is sized in CSS to match the hero h1's font-size (clamp), so
    // read its rendered size back rather than hardcoding it here — SVG
    // elements don't reliably support offsetWidth, so use getBoundingClientRect
    var webSize = webIcon.getBoundingClientRect().width;
    var webLeft = rect.right - webSize * 0.12; // slight overlap onto the "N"
    var webTop = rect.top + rect.height * 0.50 - webSize * 0.50; // centered on the name
    webIcon.style.left = webLeft + 'px';
    webIcon.style.top = webTop + 'px';

    var threadLeft = webLeft + webSize * 0.50;
    var threadTop = webTop + webSize * 0.50; // from the center of the web
    thread.style.left = (threadLeft - 1) + 'px';
    thread.style.top = threadTop + 'px';

    // thread starts at the web's center, so its landed length needs to cover
    // the web's own radius before it's visibly hanging past the graphic
    var landedLen = webSize * 0.5 + 40;
    thread.style.setProperty('--landed-len', landedLen + 'px');
    pageBaseTop = threadTop + landedLen;
    spiderRig.style.left = (threadLeft - 22) + 'px';
    spiderRig.style.top = pageBaseTop + 'px';
  }

  function updateScrollLinked() {
    var doc = document.documentElement;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    var scrolled = Math.min(Math.max(window.scrollY, 0), maxScroll);
    var progress = maxScroll > 0 ? scrolled / maxScroll : 0;
    // keep the spider comfortably inside the viewport regardless of where it started
    var maxDescent = Math.max(40, window.innerHeight - pageBaseTop - 50);
    var descent = progress * maxDescent;
    var landedLen = parseFloat(thread.style.getPropertyValue('--landed-len')) || 40;
    thread.style.height = (landedLen + descent) + 'px';
    spiderDescent.style.transform = 'translateY(' + descent + 'px)';
  }

  function onScroll() {
    if (!landed) return;
    updateScrollLinked();
  }

  function playIntro() {
    hero.classList.remove('playing');
    spider.classList.remove('landed');
    void hero.offsetWidth;
    // a short timeout (rather than requestAnimationFrame) to let the reset
    // state paint before re-adding 'playing' retriggers the CSS transition
    setTimeout(function () {
      hero.classList.add('playing');
    }, 20);
  }

  function onThreadTransitionEnd(e) {
    if (e.propertyName !== 'height') return;
    landed = true;
    spider.classList.add('landed');
    thread.classList.add('landed');
    updateScrollLinked();
  }

  thread.addEventListener('transitionend', onThreadTransitionEnd);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    layoutRig();
    if (landed) updateScrollLinked();
  });

  layoutRig();

  if (reduceMotion) {
    hero.classList.add('playing');
    landed = true;
    spider.classList.add('landed');
    thread.classList.add('landed');
    updateScrollLinked();
  } else {
    setTimeout(playIntro, 350);
  }
})();
