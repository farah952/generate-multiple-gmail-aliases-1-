import { useEffect } from "react";

export interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  faqSchema?: { question: string; answer: string }[];
}

export function useSEO({ title, description, canonical, faqSchema }: SEOConfig) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = `https://gmailtools.app${canonical}`;

    // OG tags
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `https://gmailtools.app${canonical}`);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Gmail Tools");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    // JSON-LD FAQ Schema
    const existingSchema = document.getElementById("faq-schema");
    if (existingSchema) existingSchema.remove();

    if (faqSchema && faqSchema.length > 0) {
      const script = document.createElement("script");
      script.id = "faq-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSchema.map(({ question, answer }) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answer,
          },
        })),
      });
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById("faq-schema");
      if (s) s.remove();
    };
  }, [title, description, canonical, faqSchema]);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}
