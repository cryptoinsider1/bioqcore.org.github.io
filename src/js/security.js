// XSS protection
document.addEventListener('DOMContentLoaded', () => {
  const sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

// Dynamic content sanitization
  document.querySelectorAll('[data-sanitize]').forEach(el => {
    el.innerHTML = sanitize(el.textContent);
  });
});

// Redirect to HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
