(function () {
  "use strict";

  function renderHeader() {
    const base = getBasePath();
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navItems = [
      { href: `${base}index.html`, label: "Home", match: ["index.html", ""] },
      { href: `${base}services/index.html`, label: "Services", match: ["services"] },
      { href: `${base}portfolio/index.html`, label: "Portfolio", match: ["portfolio"] },
      { href: `${base}pricing/index.html`, label: "Pricing", match: ["pricing"] },
      { href: `${base}about/index.html`, label: "About", match: ["about"] },
      { href: `${base}contact/index.html`, label: "Contact", match: ["contact"] }
    ];

    const path = window.location.pathname.replace(/\\/g, "/");
    const navLinks = navItems
      .map((item) => {
        const isActive = item.match.some((m) => path.includes(m) && m !== "") ||
          (item.label === "Home" && (currentPage === "index.html" || currentPage === ""));
        return `<li class="nav-item"><a class="nav-link${isActive ? " active" : ""}" href="${item.href}">${item.label}</a></li>`;
      })
      .join("");

    return `
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div class="container">
        <a class="navbar-brand" href="${base}index.html">
         <img src="${base}${SITE_CONFIG.logo}" alt="${SITE_CONFIG.logoAlt}" class="brand-logo">
          
          
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">${navLinks}</ul>
          <button type="button" class="btn btn-primary btn-quote-nav" data-bs-toggle="modal" data-bs-target="#quoteModal">Get Free Quote</button>
        </div>
      </div>
    </nav>`;
  }

  function renderFooter() {
    const base = getBasePath();
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <h5>${SITE_CONFIG.brandName}</h5>
            <p>${SITE_CONFIG.tagline}. We help businesses, professionals, schools and startups build modern websites.</p>
            <div class="mt-3">
              <a href="${getWhatsAppLink()}" target="_blank" rel="noopener" class="footer-contact-btn whatsapp">💬 WhatsApp</a>
              <a href="${getPhoneLink()}" class="footer-contact-btn phone">📱 Call</a>
              <a href="${getEmailLink()}" class="footer-contact-btn email">📧 Email</a>
            </div>
          </div>
          <div class="col-6 col-lg-2">
            <h5>Quick Links</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="${base}services/index.html">Services</a></li>
              <li><a href="${base}portfolio/index.html">Portfolio</a></li>
              <li><a href="${base}pricing/index.html">Pricing</a></li>
              <li><a href="${base}about/index.html">About</a></li>
              <li><a href="${base}contact/index.html">Contact</a></li>
              <li><a href="${base}blog/index.html">Blog</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2">
            <h5>Services</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="${base}services/business-website.html">Business Website</a></li>
              <li><a href="${base}services/school-website.html">School Website</a></li>
              <li><a href="${base}services/ecommerce-website.html">E-commerce</a></li>
              <li><a href="${base}services/portfolio-website.html">Portfolio</a></li>
            </ul>
          </div>
          <div class="col-lg-4">
            <h5>Legal</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="${base}legal/privacy-policy.html">Privacy Policy</a></li>
              <li><a href="${base}legal/terms-and-conditions.html">Terms & Conditions</a></li>
              <li><a href="${base}legal/refund-policy.html">Refund Policy</a></li>
              <li><a href="${base}legal/disclaimer.html">Disclaimer</a></li>
            </ul>
            <p class="mt-3 mb-0"><strong>Location:</strong> ${SITE_CONFIG.location}</p>
          </div>
        </div>
        <div class="footer-bottom text-center">
          <p class="mb-0">&copy; ${new Date().getFullYear()} ${SITE_CONFIG.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>`;
  }

  function renderQuoteModal() {
    return `
    <div class="modal fade quote-modal" id="quoteModal" tabindex="-1" aria-labelledby="quoteModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="quoteModalLabel">Tell us about your website</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="quoteFormWrapper">
              <form id="quoteForm" novalidate>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="quoteName" class="form-label">Name *</label>
                    <input type="text" class="form-control" id="quoteName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="quoteMobile" class="form-label">Mobile *</label>
                    <input type="tel" class="form-control" id="quoteMobile" required pattern="[0-9]{10,13}">
                  </div>
                  <div class="col-12">
                    <label for="quoteBusiness" class="form-label">Business</label>
                    <input type="text" class="form-control" id="quoteBusiness" placeholder="Your business name">
                  </div>
                  <div class="col-12">
                    <label class="form-label">Website Type *</label>
                    <div class="d-flex flex-wrap gap-2">
                      ${["Business", "School", "Portfolio", "E-commerce", "Restaurant", "Other"]
                        .map(
                          (t, i) =>
                            `<div class="form-check"><input class="form-check-input" type="radio" name="websiteType" id="wt${i}" value="${t}" ${i === 0 ? "required" : ""}><label class="form-check-label" for="wt${i}">${t}</label></div>`
                        )
                        .join("")}
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Budget *</label>
                    <div class="d-flex flex-wrap gap-2">
                      ${["₹3K–₹5K", "₹5K–₹10K", "₹10K–₹20K", "₹20K+"]
                        .map(
                          (b, i) =>
                            `<div class="form-check"><input class="form-check-input" type="radio" name="budget" id="bg${i}" value="${b}" ${i === 0 ? "required" : ""}><label class="form-check-label" for="bg${i}">${b}</label></div>`
                        )
                        .join("")}
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="quoteRequirements" class="form-label">Requirements</label>
                    <textarea class="form-control" id="quoteRequirements" rows="3" placeholder="Tell us about your website needs..."></textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-lg w-100">Submit Request</button>
                  </div>
                </div>
              </form>
            </div>
            <div id="quoteSuccess" class="quote-success">
              <div style="font-size:3rem;">✅</div>
              <h4>Thank you!</h4>
              <p>We will contact you shortly.</p>
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderBreadcrumb(items) {
    if (!items || !items.length) return "";
    const base = getBasePath();
    const links = items
      .map((item, i) => {
        if (i === items.length - 1) return `<li class="breadcrumb-item active" aria-current="page">${item.label}</li>`;
        return `<li class="breadcrumb-item"><a href="${base}${item.href}">${item.label}</a></li>`;
      })
      .join("");
    return `<div class="breadcrumb-section"><div class="container"><nav aria-label="breadcrumb"><ol class="breadcrumb">${links}</ol></nav></div></div>`;
  }

  function initFAQ() {
    document.querySelectorAll(".faq-question").forEach((q) => {
      q.addEventListener("click", () => {
        const item = q.closest(".faq-item");
        const wasActive = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("active"));
        if (!wasActive) item.classList.add("active");
      });
    });
  }

  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom");
    if (!revealElements.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealElements.forEach((el) => observer.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add("revealed"));
    }
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function animateCounter(counter) {
      const target = parseInt(counter.getAttribute("data-count"), 10);
      const prefix = counter.getAttribute("data-prefix") || "";
      const suffix = counter.getAttribute("data-suffix") || "";
      const duration = 1500;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = prefix + target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.innerText = prefix + Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => observer.observe(c));
    } else {
      counters.forEach((c) => animateCounter(c));
    }
  }

  function initBackToTop() {
    let btn = document.getElementById("backToTopBtn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "backToTopBtn";
      btn.className = "back-to-top";
      btn.setAttribute("aria-label", "Scroll back to top");
      btn.innerHTML = "↑";
      document.body.appendChild(btn);
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function showToast(message, icon = "✅") {
    let toast = document.getElementById("customGlobalToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "customGlobalToast";
      toast.className = "custom-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  function initLayout() {
    const headerEl = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");
    const modalEl = document.getElementById("site-modals");

    if (headerEl) headerEl.innerHTML = renderHeader();
    if (footerEl) footerEl.innerHTML = renderFooter();
    if (modalEl) modalEl.innerHTML = renderQuoteModal();

    initFAQ();
    initScrollReveal();
    initCounters();
    initBackToTop();

    document.querySelectorAll("[data-quote-trigger]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.getElementById("quoteModal"));
        modal.show();
      });
    });
  }

  window.renderBreadcrumb = renderBreadcrumb;
  window.initLayout = initLayout;
  window.showToast = showToast;

  document.addEventListener("DOMContentLoaded", initLayout);
})();

