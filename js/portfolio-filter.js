(function () {
  "use strict";

  function renderProjectCard(project, base) {
    const fullDemoUrl = `${base}${project.demoUrl}`;
    return `
    <div class="col-md-6 col-lg-4 project-item" data-category="${project.category}">
      <div class="project-card">
        <div class="project-thumb" style="background: linear-gradient(135deg, ${project.color}, ${project.color}bb);">
          <div class="text-center p-3">
            <div class="display-6 mb-2">🌐</div>
            <div class="fw-bold">${project.title}</div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-start mb-2 mt-3">
          <h5 class="mb-0 fs-6 fw-bold">${project.title}</h5>
          <span class="project-badge">${project.badge}</span>
        </div>
        <div class="project-tags mb-3">
          ${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <p class="text-muted small">${project.description}</p>
        <div class="d-flex gap-2 mt-auto">
          <a href="${fullDemoUrl}" class="btn btn-sm btn-primary px-3 fw-semibold" target="_blank" rel="noopener">
            🚀 Live Demo
          </a>
          <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#projectModal${project.id}">
            📋 Details
          </button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="projectModal${project.id}" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">${project.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <span class="badge bg-success mb-3">${project.badge}</span>
            <p>${project.description}</p>
            <h6 class="fw-bold mt-3">Included Features:</h6>
            <ul class="list-group list-group-flush mb-3">
              ${project.tags.map((t) => `<li class="list-group-item px-0 py-1 bg-transparent border-0">✅ ${t}</li>`).join("")}
            </ul>
            <div class="p-3 bg-light rounded text-muted small border">
              ℹ️ <em>This is a fully interactive demo site created by Ravan Web Solutions to showcase our website design quality and capabilities.</em>
            </div>
          </div>
          <div class="modal-footer">
            <a href="${fullDemoUrl}" class="btn btn-primary" target="_blank" rel="noopener">Launch Live Demo Page</a>
            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" data-quote-trigger="true">Get Similar Website</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  function initPortfolio(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container || typeof PORTFOLIO_PROJECTS === "undefined") return;

    const base = getBasePath();
    const projects = limit ? PORTFOLIO_PROJECTS.slice(0, limit) : PORTFOLIO_PROJECTS;
    container.innerHTML = projects.map((p) => renderProjectCard(p, base)).join("");

    if (containerId === "portfolioGrid") {
      initFilters();
    }
  }

  function initFilters() {
    const tabs = document.querySelectorAll(".filter-tabs .btn");
    const items = document.querySelectorAll(".project-item");

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        const filter = this.dataset.filter;

        items.forEach((item) => {
          if (filter === "all" || item.dataset.category === filter) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  window.initPortfolio = initPortfolio;

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("portfolioGrid")) {
      initPortfolio("portfolioGrid");
    }
    if (document.getElementById("featuredProjects")) {
      initPortfolio("featuredProjects", 6);
    }
  });
})();
