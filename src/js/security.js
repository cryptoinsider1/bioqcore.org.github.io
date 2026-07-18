// --- BioQCore Web Security Layer v1.1 ---

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-sanitize]").forEach((el) => {
        const content = el.textContent;
        if (content !== null) {
            el.textContent = content;
        }
    });
});

// HTTPS redirect
if (
    window.location.protocol !== "https:" &&
    !["localhost", "127.0.0.1"].includes(window.location.hostname)
) {
    location.replace(
        "https://" + window.location.href.replace(/^http:\/\//, "")
    );
}

// Trust Center placeholder
const TRUST_CENTER_ENDPOINT = "https://trust.bioqcore.org/health";

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("check-trust-center");
    const out = document.getElementById("trust-center-status");
    if (!btn || !out) return;

    btn.addEventListener("click", async () => {
        out.textContent = "Checking Trust Center…";
        out.style.color = "#a3a3a3";

        await new Promise((r) => setTimeout(r, 500));

        out.textContent =
            "Trust Center is not public — internal design & lab experiments.";
        out.style.color = "#ff5f5f";
    });
});
