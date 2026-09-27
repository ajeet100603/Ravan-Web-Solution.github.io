const SITE_CONFIG = {
  
  logo: "images/logo.png",
    logoAlt: "Ravan Web Solutions Logo",

  phone: "+916367231278",
  whatsapp: "+916367231278",
  email: "hello@yourdomain.com",
  location: "Jaipur, Rajasthan, India",
  serviceAreas: ["Jaipur", "Bharatpur", "Rajasthan"],
  domain: "https://yourdomain.com",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#"
  }
};

function getBasePath() {
  const path = window.location.pathname.replace(/\\/g, "/");
  if (path.includes("/blog/posts/") || path.includes("/demos/")) {
    const demoSubFolder = path.match(/\/demos\/[^\/]+\//);
    if (demoSubFolder || path.includes("/blog/posts/")) {
      return "../../";
    }
  }
  if (
    path.includes("/services/") ||
    path.includes("/portfolio/") ||
    path.includes("/pricing/") ||
    path.includes("/about/") ||
    path.includes("/contact/") ||
    path.includes("/blog/") ||
    path.includes("/legal/")
  ) {
    return "../";
  }
  return "";
}

function getWhatsAppLink(message) {
  const text = encodeURIComponent(message || `Hi, I am interested in your website development services.`);
  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${text}`;
}

function getPhoneLink() {
  return `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`;
}

function getEmailLink(subject) {
  const sub = encodeURIComponent(subject || "Website Development Enquiry");
  return `mailto:${SITE_CONFIG.email}?subject=${sub}`;
}
