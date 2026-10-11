const select = document.querySelector('#service-select');
const textLink = document.querySelector('#text-link');
const preview = document.querySelector('#message-preview');
const visit = document.querySelector('#visit-select');
const color = document.querySelector('#color-select');
function updateMessage() {
  const location = visit.value === 'home' ? 'for home service within Mt. Claire Village' : 'at Generoso Sari-Sari Store, Phase 2, Mt. Claire Village';
  const message = `Hi Sharlin! I'd like to ask about ${select.value.toLowerCase()} ${location}. ${color.value ? `My color preference is ${color.value}. ` : ""}What schedules are available? Please confirm the final quote. Thank you!`;
  preview.textContent = message;
  const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
  textLink.href = `sms:+639635091844${separator}body=${encodeURIComponent(message)}`;
}
select.addEventListener('change', updateMessage);
visit.addEventListener('change', updateMessage);
color.addEventListener('change', updateMessage);
color.addEventListener('change', syncColorButtons);
function syncColorButtons() {
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
