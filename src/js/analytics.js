// --- BioQCore Local Analytics v1.0 ---
// Privacy-first analytics, no external requests.

document.addEventListener("DOMContentLoaded", () => {
    const session = {
        url: location.href,
        ts: Date.now(),
        lang: navigator.language,
        ua: navigator.userAgent,
        ref: document.referrer || "direct"
    };

    // For future Trust Center / secure cluster logging
    console.debug("[BioQCore:analytics]", session);

    // If Trust Center becomes public:
    // fetch(TRUST_CENTER_ENDPOINT + "/log", { method: "POST", body: JSON.stringify(session) });
});
