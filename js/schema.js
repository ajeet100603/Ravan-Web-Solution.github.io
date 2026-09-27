function getOrganizationSchema(pageUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.brandName,
    description: "Professional website development in Jaipur and Rajasthan",
    url: SITE_CONFIG.domain + pageUrl,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN"
    },
    areaServed: SITE_CONFIG.serviceAreas,
    priceRange: "₹₹"
  };
}

function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.domain,
    potentialAction: {
      "@type": "SearchAction",
      target: SITE_CONFIG.domain + "/blog/index.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: SITE_CONFIG.domain + "/" + item.url
    }))
  };
}

function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
}

function getServiceSchema(name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.brandName
    },
    areaServed: SITE_CONFIG.serviceAreas
  };
}

function getBlogPostSchema(title, description, date, url) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: date,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.brandName
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.brandName
    },
    url: SITE_CONFIG.domain + url
  };
}

function injectSchema(schemas) {
  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
