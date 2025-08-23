// Enhanced security functions
document.addEventListener('DOMContentLoaded', () => {
    // Improved sanitization function
    const sanitize = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    // Sanitize all elements with data-sanitize attribute
    document.querySelectorAll('[data-sanitize]').forEach(el => {
        if (el.textContent) {
            el.innerHTML = sanitize(el.textContent);
        }
    });

    // Add security headers dynamically where possible
    const securityHeaders = {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    // Note: These headers are set here but have limited effect
    // as they need to be set at server level for full protection
    for (const [header, value] of Object.entries(securityHeaders)) {
        try {
            if (!document[header]) {
                document[header] = value;
            }
        } catch (e) {
            console.log(`Cannot set ${header} header client-side`);
        }
    }
});

// Enhanced HTTPS redirect
if (location.protocol !== 'https:' && 
    location.hostname !== 'localhost' && 
    location.hostname !== '127.0.0.1' &&
    !location.hostname.startsWith('192.168.')) {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}