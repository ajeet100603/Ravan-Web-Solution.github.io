(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quoteForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        form.reportValidity();
        return;
      }

      const name = document.getElementById("quoteName").value.trim();
      const mobile = document.getElementById("quoteMobile").value.trim();
      const business = document.getElementById("quoteBusiness").value.trim() || "Not specified";
      const websiteType = form.querySelector('input[name="websiteType"]:checked')?.value || "Not specified";
      const budget = form.querySelector('input[name="budget"]:checked')?.value || "Not specified";
      const requirements = document.getElementById("quoteRequirements").value.trim() || "Not specified";

      const message = `*New Website Quote Request*\n\nName: ${name}\nMobile: ${mobile}\nBusiness: ${business}\nWebsite Type: ${websiteType}\nBudget: ${budget}\nRequirements: ${requirements}`;

      document.getElementById("quoteFormWrapper").style.display = "none";
      document.getElementById("quoteSuccess").classList.add("show");

      setTimeout(function () {
        window.open(getWhatsAppLink(message), "_blank");
      }, 500);
    });

    const modal = document.getElementById("quoteModal");
    if (modal) {
      modal.addEventListener("hidden.bs.modal", function () {
        form.reset();
        form.classList.remove("was-validated");
        document.getElementById("quoteFormWrapper").style.display = "block";
        document.getElementById("quoteSuccess").classList.remove("show");
      });
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }

        const name = document.getElementById("contactName").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const businessType = document.getElementById("contactBusinessType").value.trim() || "Not specified";
        const websiteType = document.getElementById("contactWebsiteType").value;
        const budget = document.getElementById("contactBudget").value || "Not specified";
        const message = document.getElementById("contactMessage").value.trim();

        const waMessage = `*Contact Form Enquiry*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nBusiness Type: ${businessType}\nWebsite Type: ${websiteType}\nBudget: ${budget}\nMessage: ${message}`;

        window.open(getWhatsAppLink(waMessage), "_blank");
        contactForm.reset();
        const alert = document.getElementById("contactSuccess");
        if (alert) {
          alert.classList.remove("d-none");
          setTimeout(() => alert.classList.add("d-none"), 5000);
        }
      });
    }
  });
})();
