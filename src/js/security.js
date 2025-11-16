// --- BioQCore Web Security Layer v1.1 ---

document.addEventListener("DOMContentLoaded", () => {
    // strict sanitizer
    const sanitize = (str) =>
        str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2F;");

    document.querySelectorAll("[data-sanitize]").forEach((el) => {
        const content = el.textContent;
        if (content) el.innerHTML = sanitize(content);
    });
});

// --- HTTPS enforce (except local dev) ---
if (
    window.location.protocol !== "https:" &&
    !["localhost", "127.0.0.1"].includes(window.location.hostname)
) {
    window.location.replace(
        "https://" + window.location.href.replace(/^http:\/\//, "")
    );
}

// --- Future Trust Center Integration ---
const TRUST_CENTER_ENDPOINT = "https://trust.bioqcore.org/health"; // placeholder

document.addEventListener("DOMContentLoaded", () => {
    const checkBtn = document.getElementById("check-trust-center");
    const status = document.getElementById("trust-center-status");

    if (!checkBtn || !status) return;

    checkBtn.addEventListener("click", async () => {
        status.textContent = "Checking Trust Center…";
        status.style.color = "#a3a3a3";

        await new Promise((r) => setTimeout(r, 500));

        status.textContent =
            "Trust Center is not public — internal design & lab experiments.";
        status.style.color = "#ff5f5f";
    });
});
