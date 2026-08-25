(function () {
  const STATUS_URL = "/data/status.json";
  let publicStatusPromise = null;

  function loadPublicStatus() {
    if (!publicStatusPromise) {
      publicStatusPromise = fetch(STATUS_URL, {
        cache: "no-store",
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Status request failed: ${response.status}`);
        }

        return response.json();
      });
    }

    return publicStatusPromise;
  }

  const statusPresentation = {
    online: ["Online", "active"],
    active: ["Active", "active"],
    active_mvp: ["Active / MVP", "active"],
    in_design: ["In Design", "design"],
    prototype_planned: ["Prototype / Planned", "prototype"],
    lab_phase: ["Lab Phase", "lab"],
    open_for_discussion: ["Open for Discussion", "design"],
    planned: ["Planned", "planned"],
    not_launched: ["Not Launched", "not"],
    not_active_future_optional: ["Not Active", "not"],
  };

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const btn = document.getElementById("check-trust-center");
  const trustCenterStatus = document.getElementById("trust-center-status");

  if (btn && trustCenterStatus) {
    btn.addEventListener("click", async () => {
      trustCenterStatus.textContent = "Checking public prototype status…";

      try {
        const data = await loadPublicStatus();
        trustCenterStatus.textContent =
          `${data.trust_center_label}: ${data.message}`;
      } catch {
        trustCenterStatus.textContent =
          "Trust Center status could not be refreshed. Static public status remains available.";
      }
    });
  }

  const statusCards = document.querySelectorAll("[data-status-key]");

  if (statusCards.length) {
    loadPublicStatus()
      .then((data) => {
        statusCards.forEach((card) => {
          const key = card.dataset.statusKey;
          const value = data[key];
          const presentation = statusPresentation[value];
          const badge = card.querySelector(".badge");

          if (!badge || !presentation) {
            return;
          }

          const [label, className] = presentation;
          badge.textContent = label;
          badge.className = `badge ${className}`;
        });

        const reviewed = document.querySelector("[data-status-reviewed]");

        if (reviewed && data.reviewed_at) {
          reviewed.dateTime = data.reviewed_at;

          const date = new Date(`${data.reviewed_at}T00:00:00Z`);

          reviewed.textContent = new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          }).format(date);
        }
      })
      .catch(() => {
        // Static HTML is the intentional fallback.
      });
  }

  const form = document.querySelector("[data-partner-form]");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);

      const name = String(formData.get("name") || "").trim();
      const organization = String(
        formData.get("organization") || ""
      ).trim();
      const role = String(formData.get("role") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const country = String(formData.get("country") || "").trim();
      const inquiryType = String(
        formData.get("inquiry_type") || "General inquiry"
      ).trim();
      const message = String(formData.get("message") || "").trim();

      const subject = `BioQCore inquiry: ${inquiryType}`;

      const body = [
        `Inquiry type: ${inquiryType}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${organization || "Not provided"}`,
        `Role: ${role || "Not provided"}`,
        `Country: ${country || "Not provided"}`,
        "",
        "Message:",
        message,
        "",
        "The sender confirmed that no medical records, patient-identifiable information, scans, genomic data, private keys or confidential documents were intended for submission.",
      ].join("\n");

      window.location.href =
        "mailto:contact@bioqcore.org" +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
    });
  }
})();