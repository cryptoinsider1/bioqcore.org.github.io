// XSS protection
document.addEventListener('DOMContentLoaded', () => {
    const sanitize = (str) => {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    };

    document.querySelectorAll('[data-sanitize]').forEach(el => {
        if (el.textContent !== el.innerHTML) {
            el.innerHTML = sanitize(el.textContent);
        }
    });
});

// HTTPS redirect
if (location.protocol !== 'https:' && 
    !['localhost', '127.0.0.1'].includes(location.hostname.split(':')[0])) {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}