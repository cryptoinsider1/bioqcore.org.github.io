(function () {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const btn = document.getElementById("check-trust-center");
  const status = document.getElementById("trust-center-status");

  if (btn && status) {
    btn.addEventListener("click", async () => {
      status.textContent = "Checking public prototype status…";

      try {
        const response = await fetch("/data/status.json", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Status request failed: ${response.status}`);
        }

        const data = await response.json();
        status.textContent = `${data.trust_center_label}: ${data.message}`;
      } catch {
        status.textContent =
          "Trust Center is not yet connected. Current status: design/prototype phase.";
      }
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
        `mailto:contact@bioqcore.org` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
    });
  }
})();
