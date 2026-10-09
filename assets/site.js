const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// The cards remain explicit placeholders until the matching MP4 files arrive.
document.querySelectorAll('[data-slot]').forEach((slot) => {
  slot.setAttribute('aria-label', `Video slot: ${slot.dataset.slot}`);
  const videoPath = `assets/videos/${slot.dataset.slot}`;
  fetch(videoPath, { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) return;
      const video = document.createElement('video');
      video.className = 'video-player';
      video.controls = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = videoPath;
      slot.replaceChildren(video);
      slot.classList.add('video-ready');
    })
    .catch(() => {
      // A missing local video is expected while the slot is being prepared.
    });
});
