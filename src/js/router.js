// --- BioQCore Static Router v1.0 ---
// Works on GitHub Pages without server-side routing.
// Prepares structure for future SPA / Trust Center integration.

document.addEventListener("DOMContentLoaded", () => {
    const routes = {
        "/": "/index.html",
        "/ru": "/index.ru.html",
        "/trust": "/docs/TRUST_FABRIC.md",
        "/architecture": "/docs/ARCHITECTURE_OVERVIEW.md",
        "/roadmap": "/docs/PLATFORM_ROADMAP.md"
    };

    const path = window.location.pathname.replace(/\/+$/, "");

    if (routes[path]) {
        window.location.replace(routes[path]);
    }
});
