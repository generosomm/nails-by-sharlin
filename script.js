const select = document.querySelector('#service-select');
const textLink = document.querySelector('#text-link');
const preview = document.querySelector('#message-preview');
const visit = document.querySelector('#visit-select');
const color = document.querySelector('#color-select');
// Approximate digital shades based on Camille's supplied bottle photos.
const colorShades = {
  'Banana boat': ['#e2bb06', '#fff16b', '#9e7900'],
  'Lucky red': ['#ad2924', '#e56957', '#661415'],
  'Blue suede': ['#a7b3d4', '#e0e6fa', '#6b769b'],
  'Ashley': ['#9c979b', '#e0dadd', '#62616a'],
  'White satin': ['#f4f1f3', '#ffffff', '#bdbac4'],
  'Touch of tan': ['#b68a5d', '#e9c898', '#785035'],
  'Almond': ['#b8bdb8', '#e5e9df', '#7c847e'],
  'Chic': ['#c34a99', '#f396d0', '#79285e'],
  'Pure black': ['#202023', '#62626b', '#08090c']
};
Object.entries(colorShades).forEach(([name, shades]) => {
  const button = [...document.querySelectorAll('[data-color]')].find(item => item.dataset.color === name);
  button?.style.setProperty('--swatch', shades[0]);
});
function updateColorPreview(name) {
  document.querySelector('#color-preview-name').textContent = `Preview: ${name || 'Chic'}`;
}
updateColorPreview('Chic');

// Sparse timers and opacity crossfades avoid a continuous JavaScript render loop.
const heroColors = document.querySelector('.hero-colors');
const playback = document.querySelector('#color-playback');
const heroColorName = document.querySelector('#hero-color-name');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const shadeNames = Object.keys(colorShades);
let heroShade = 'Chic';
let nextHeroShade = null;
let cycleTimer;
let fadeTimer;
let userPaused = false;
let heroVisible = false;

function setHeroShade(name, prefix = '--') {
  ['shade', 'shade-light', 'shade-dark'].forEach((property, index) => {
    heroColors.style.setProperty(`${prefix}${property}`, colorShades[name][index]);
  });
}
function settleHero() {
  clearTimeout(fadeTimer);
  if (nextHeroShade) heroShade = nextHeroShade;
  nextHeroShade = null;
  setHeroShade(heroShade);
  heroColors.classList.add('settled');
  heroColors.classList.remove('fading');
  heroColorName.textContent = heroShade;
}
function scheduleColors() {
  clearTimeout(cycleTimer);
  if (userPaused || reducedMotion.matches || document.hidden || !heroVisible) {
    settleHero();
    return;
  }
  cycleTimer = setTimeout(() => {
    nextHeroShade = shadeNames[(shadeNames.indexOf(heroShade) + 1) % shadeNames.length];
    setHeroShade(nextHeroShade, '--next-');
    heroColors.classList.remove('settled');
    heroColors.classList.add('fading');
    fadeTimer = setTimeout(() => {
      settleHero();
      scheduleColors();
    }, 1600);
  }, 4900);
}
function updatePlayback() {
  playback.hidden = reducedMotion.matches;
  playback.textContent = userPaused ? 'Play colors' : 'Pause colors';
  playback.setAttribute('aria-label', userPaused ? 'Play automatic color preview' : 'Pause automatic color preview');
}
function chooseHeroColor(name) {
  userPaused = true;
  scheduleColors();
  heroShade = colorShades[name] ? name : 'Chic';
  settleHero();
  updatePlayback();
}
playback.addEventListener('click', () => {
  userPaused = !userPaused;
  updatePlayback();
  scheduleColors();
});
document.addEventListener('visibilitychange', scheduleColors);
reducedMotion.addEventListener('change', () => {
  updatePlayback();
  scheduleColors();
});
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting;
  scheduleColors();
}, { threshold: 0 }).observe(heroColors);
setHeroShade(heroShade);
updatePlayback();


function updateMessage() {
  const location = visit.value === 'home' ? 'for home service within Mt. Claire Village' : 'at Generoso Sari-Sari Store, Phase 2, Mt. Claire Village';
  const message = `Hi Sharline! I'd like to ask about ${select.value.toLowerCase()} ${location}. ${color.value ? `My color preference is ${color.value}. ` : ""}What schedules are available? Please confirm the final quote. Thank you!`;
  preview.textContent = message;
  const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
  textLink.href = `sms:+639635091844${separator}body=${encodeURIComponent(message)}`;
}
select.addEventListener('change', updateMessage);
visit.addEventListener('change', updateMessage);
color.addEventListener('change', updateMessage);
color.addEventListener('change', syncColorButtons);
function syncColorButtons() {
  updateColorPreview(color.value);
  chooseHeroColor(color.value);
  document.querySelectorAll('[data-color]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === color.value)));
}
updateMessage();
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { select.value = link.dataset.service; updateMessage(); });
});
document.querySelectorAll('[data-color]').forEach(button => {
  button.addEventListener('click', () => {
    color.value = button.dataset.color;
    syncColorButtons();
    updateMessage();
  });
});

document.querySelector('#copy-number').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('+63 963 509 1844');
    status.textContent = 'Phone number copied.';
  } catch {
    status.textContent = 'Select and copy this number: +63 963 509 1844';
  }
});

document.querySelector('#copy-inquiry').addEventListener('click', async () => {
  const status = document.querySelector('#inquiry-status');
  try {
    await navigator.clipboard.writeText(preview.textContent);
    status.textContent = 'Inquiry copied. Paste it into your Facebook message.';
  } catch {
    status.textContent = 'Select and copy the inquiry above, then paste it into your Facebook message.';
  }
});
