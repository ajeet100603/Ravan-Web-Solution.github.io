(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const floatBtn = document.createElement("a");
    floatBtn.href = getWhatsAppLink();
    floatBtn.target = "_blank";
    floatBtn.rel = "noopener";
    floatBtn.className = "whatsapp-float";
    floatBtn.setAttribute("aria-label", "Chat on WhatsApp");
    floatBtn.innerHTML = "💬 <span>WhatsApp</span>";
    document.body.appendChild(floatBtn);
  });
})();
