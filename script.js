const select = document.querySelector('#service-select');
const textLink = document.querySelector('#text-link');
const preview = document.querySelector('#message-preview');
function updateMessage() {
  const message = `Hi Sharlin! I'd like to ask about ${select.value.toLowerCase()}. What schedules and shades are available, and where are you located? Thank you!`;
  preview.textContent = message;
  const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
  textLink.href = `sms:+639635091844${separator}body=${encodeURIComponent(message)}`;
}
select.addEventListener('change', updateMessage);
updateMessage();
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { select.value = link.dataset.service; updateMessage(); });
});
document.querySelectorAll('[data-shade]').forEach(button => {
  button.addEventListener('click', () => {
    document.body.dataset.shade = button.dataset.shade;
    document.querySelector('#shade-name').textContent = button.getAttribute('aria-label');
    document.querySelectorAll('[data-shade]').forEach(swatch => swatch.setAttribute('aria-pressed', String(swatch === button)));
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
