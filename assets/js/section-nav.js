(() => {
  const links = Array.from(document.querySelectorAll('.section-nav li a'));
  const sections = links.map(link => ({
    link,
    heading: document.getElementById(decodeURIComponent(link.hash.slice(1)))
  })).filter(section => section.heading);
  if (!sections.length) return;

  function updateCurrentSection() {
    let current = sections[0];
    for (const section of sections) {
      if (section.heading.getBoundingClientRect().top <= 100) current = section;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    for (const section of sections) {
      if (section === current) section.link.setAttribute('aria-current', 'location');
      else section.link.removeAttribute('aria-current');
    }
  }

  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      updateCurrentSection();
      scheduled = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateCurrentSection);
  window.addEventListener('load', updateCurrentSection);
  updateCurrentSection();
})();
