"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Canvas = dynamic<{ progress: number }>(
  () => import("./Canvas"),
  { ssr: false }
);

const accordionItems = [
  { id: 1, title: "Who We Are", content: "Qleos is a software house company based in Jakarta. Built by engineers who believe great software should be accessible to every business.", link: null },
  { id: 2, title: "What We Do", content: "We design, build, and maintain digital products end-to-end. From company profile to a full-scale ERP system.", link: "Our products" },
  { id: 3, title: "Who We Serve", content: "Startups finding their footing, growing businesses ready to scale, and enterprises looking to modernize. If you have a problem worth solving, we're the right team to call.", link: null },
  { id: 4, title: "Our Vision", content: "To become the most trusted digital partner in Southeast Asia.", link: null },
];

const services = [
  {
    name: "Company Profile",
    icon: "🏢",
    desc: "A professional, conversion-focused website that tells your brand story and leaves a lasting impression.",
    details: [
      "Custom design tailored to your brand identity",
      "Fully responsive across all devices",
      "SEO-optimized structure and content",
      "CMS integration so you can update content yourself",
      "Fast load times with optimized assets",
    ],
    cta: null,
  },
  {
    name: "Web App",
    icon: "💻",
    desc: "Full-featured web applications built for performance, scalability, and a great user experience.",
    details: [
      "Custom dashboards, portals, and SaaS platforms",
      "Modern stack: Next.js, React, Node.js",
      "Secure authentication and role-based access",
      "REST & GraphQL API integration",
      "CI/CD pipeline and cloud deployment",
    ],
    cta: null,
  },
  {
    name: "Mobile App",
    icon: "📱",
    desc: "Native and cross-platform mobile apps for iOS and Android, built for performance and great UX.",
    details: [
      "iOS and Android from a single codebase (React Native / Flutter)",
      "Smooth animations and native feel",
      "Push notifications, offline mode, and deep linking",
      "App Store and Play Store submission handled",
      "Ongoing maintenance and updates",
    ],
    cta: null,
  },
  {
    name: "E-Commerce",
    icon: "🛒",
    desc: "Scalable online stores with seamless checkout, payment gateway integration, and real-time analytics.",
    details: [
      "Product catalog, cart, and checkout flow",
      "Payment gateway integration (Midtrans, Stripe, etc.)",
      "Inventory and order management",
      "Promo codes, discounts, and loyalty features",
      "Sales analytics and reporting dashboard",
    ],
    cta: null,
  },
  {
    name: "ERP System",
    icon: "⚙️",
    desc: "End-to-end enterprise systems that unify your operations, from finance to HR to inventory.",
    details: [
      "Modular architecture — build only what you need",
      "Finance, HR, inventory, and procurement modules",
      "Role-based access control for your entire team",
      "Real-time reporting and analytics dashboard",
      "On-premise or cloud deployment",
    ],
    cta: null,
  },
  {
    name: "Custom App",
    icon: "✦",
    desc: "Got a unique idea that doesn't fit the mold? Let's talk. We build whatever you can imagine.",
    details: [],
    cta: "Let's discuss your idea →",
  },
];

export default function HeroSection() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [progress, setProgress] = useState(0);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hs-section {
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        .hs-layout {
          display: grid;
          grid-template-columns: 38fr 62fr;
          align-items: start;
          background-color: #f9f9fa;
          background-image:
            linear-gradient(rgba(180,180,195,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,180,195,0.15) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .hs-wormhole-col {
          position: relative;
          background: transparent;
          align-self: stretch;
        }
        .hs-wormhole-inner {
          position: absolute;
          inset: 0;
        }

        .hs-text-col {
          position: relative;
          background: transparent;
          padding-top: 80px;
          padding-bottom: 40px;
        }

        .hs-text-inner {
          padding: 5rem 5rem 5rem 4.5rem;
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        .hs-intro-block {
          position: relative;
          padding-left: 1.75rem;
        }
        .hs-intro-block::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.25em;
          bottom: 0.25em;
          width: 3px;
          background: linear-gradient(to bottom, #dc0000, rgba(220,0,0,0.08));
          border-radius: 2px;
        }

        .hs-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #dc0000;
          background: rgba(220,0,0,0.05);
          border: 1px solid rgba(220,0,0,0.15);
          border-radius: 100px;
          padding: 0.3em 0.9em;
          margin-bottom: 1.35rem;
        }
        .hs-pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #dc0000;
          opacity: 0.7;
          flex-shrink: 0;
        }

        .hs-headline {
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #dc0000;
          letter-spacing: -0.03em;
          padding-bottom: 0.08em;
        }

        .hs-subtext {
          margin-top: 1.75rem;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: rgba(180,0,0,0.65);
          line-height: 1.75;
          max-width: 520px;
        }

        /* Accordion */
        .hs-accordion { display: flex; flex-direction: column; margin-top: 3.5rem; }
        .hs-accordion-item { border-bottom: 1px solid rgba(220,0,0,0.12); }
        .hs-accordion-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 1.4rem 0;
          text-align: left;
          gap: 1rem;
        }
        .hs-accordion-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #dc0000;
          letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .hs-accordion-trigger:hover .hs-accordion-title { color: #a00000; }
        .hs-accordion-icon {
          flex-shrink: 0; width: 18px; height: 18px;
          color: #dc0000;
          transition: transform 0.3s ease;
        }
        .hs-accordion-icon.open { transform: rotate(180deg); }
        .hs-accordion-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
          overflow: hidden;
        }
        .hs-accordion-body.open { grid-template-rows: 1fr; }
        .hs-accordion-inner { overflow: hidden; }
        .hs-accordion-content {
          padding: 0 0 0.6rem 0;
          font-size: 0.875rem;
          color: rgba(160,0,0,0.7);
          line-height: 1.6;
        }
        .hs-accordion-item.active .hs-accordion-trigger { position: relative; }
        .hs-accordion-item.active .hs-accordion-trigger::before {
          content: '';
          position: absolute;
          left: -1.75rem;
          top: 0; bottom: 0;
          width: 3px;
          background: #dc0000;
          border-radius: 0 2px 2px 0;
        }

        /* "Our products" inline link */
        .hs-accordion-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 1.1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #dc0000;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          letter-spacing: 0.01em;
          transition: opacity 0.18s;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(220,0,0,0.3);
        }
        .hs-accordion-link:hover {
          opacity: 0.7;
        }
        .hs-accordion-link-arrow {
          font-size: 0.75rem;
          line-height: 1;
          display: inline-block;
          transform: translateY(-1px);
        }

        /* Services block */
        .hs-block-divider {
          background: rgba(255,255,255,0.6);
          border-radius: 16px;
          padding: 2.5rem;
          border: 1px solid rgba(220,0,0,0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 2px 24px rgba(220,0,0,0.04);
        }

        .hs-block-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(220,0,0,0.4);
          margin-bottom: 1.25rem;
        }
        .hs-block-headline {
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          color: #dc0000;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .hs-block-body {
          font-size: 1rem;
          color: rgba(180,0,0,0.6);
          line-height: 1.75;
          max-width: 500px;
          margin-bottom: 2.5rem;
        }

        /* Services grid */
        .hs-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid rgba(220,0,0,0.1);
          border-radius: 12px;
          overflow: visible;
        }
        .hs-service-card {
          background: #ffffff;
          padding: 1.4rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          cursor: pointer;
          transition: background 0.2s;
          border-right: 1px solid rgba(220,0,0,0.1);
          border-bottom: 1px solid rgba(220,0,0,0.1);
          position: relative;
          z-index: 1;
        }
        .hs-service-card:nth-child(2n) { border-right: none; }
        .hs-service-card:nth-last-child(-n+2) { border-bottom: none; }
        .hs-service-card:first-child { border-radius: 12px 0 0 0; }
        .hs-service-card:nth-child(2) { border-radius: 0 12px 0 0; }
        .hs-service-card:nth-last-child(1) { border-radius: 0 0 12px 0; }
        .hs-service-card:nth-last-child(2) { border-radius: 0 0 0 12px; }
        .hs-service-card:hover { background: #fafafa; }
        .hs-service-card.expanded {
          background: #fafafa;
          z-index: 10;
        }
        .hs-service-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .hs-service-icon { font-size: 1.4rem; margin-bottom: 0.25rem; }
        .hs-service-name { font-size: 0.9rem; font-weight: 700; color: #dc0000; }
        .hs-service-chevron {
          width: 16px; height: 16px;
          color: #dc0000;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .hs-service-chevron.open { transform: rotate(180deg); }
        .hs-service-desc {
          font-size: 0.8rem;
          color: rgba(160,0,0,0.6);
          line-height: 1.55;
        }
        .hs-service-expand {
          position: absolute;
          left: -1px;
          right: -1px;
          top: 100%;
          background: #fafafa;
          border: 1px solid rgba(220,0,0,0.1);
          border-top: none;
          border-radius: 0 0 12px 12px;
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
          z-index: 20;
          box-shadow: 0 8px 24px rgba(220,0,0,0.06);
        }
        .hs-service-expand.open {
          max-height: 400px;
          padding: 0.75rem 1.5rem 1rem;
        }
        .hs-service-details {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          border-top: 1px solid rgba(220,0,0,0.1);
          padding-top: 0.75rem;
        }
        .hs-service-details li {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: rgba(140,0,0,0.7);
          line-height: 1.5;
        }
        .hs-service-details li::before {
          content: "→";
          color: #dc0000;
          font-weight: 700;
          flex-shrink: 0;
        }

        .hs-service-card.custom {
          background: #ffffff;
          cursor: pointer;
        }
        .hs-service-card.custom:hover {
          background: #fafafa;
        }
        .hs-service-card.custom .hs-service-icon {
          font-size: 1.2rem;
          color: #dc0000;
        }
        .hs-service-cta {
          margin-top: 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #dc0000;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: gap 0.2s;
        }
        .hs-service-card.custom:hover .hs-service-cta {
          gap: 0.55rem;
        }

        @media (max-width: 900px) {
          .hs-layout { grid-template-columns: 1fr; }
          .hs-wormhole-col { height: 60vh; align-self: auto; }
          .hs-wormhole-inner { position: absolute; inset: 0; }
          .hs-text-inner { padding: 2.5rem 1.5rem; gap: 3rem; }
          .hs-intro-block { padding-left: 1.25rem; }
          .hs-accordion-item.active .hs-accordion-trigger::before { left: -1.25rem; }
          .hs-services-grid { grid-template-columns: 1fr 1fr; }
          .hs-block-divider { padding: 1.75rem; }
        }
        @media (max-width: 480px) {
          .hs-headline { font-size: 1.9rem; }
          .hs-text-inner { padding: 2rem 1.25rem; }
          .hs-block-divider { padding: 1.25rem; border-radius: 12px; }
          .hs-services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="hs-section" ref={sectionRef}>
        <div className="hs-layout">

          {/* LEFT: Canvas */}
          <div className="hs-wormhole-col">
            <div className="hs-wormhole-inner">
              <Canvas progress={progress} />
            </div>
          </div>

          {/* RIGHT: Text */}
          <div className="hs-text-col">
            <div className="hs-text-inner">

              {/* Intro block */}
              <div className="hs-intro-block">
                <div className="hs-pill">
                  <span className="hs-pill-dot" />
                  Jakarta, Indonesia
                </div>
                <h1 className="hs-headline">The Full Stack Digital Partner</h1>
                <p className="hs-subtext">
                  Qleos brings together expert software engineering, web development,
                  and reliable hosting to build, launch, and scale your digital presence.
                  We are your partner from concept to completion.
                </p>
                <div className="hs-accordion">
                  {accordionItems.map((item) => {
                    const isOpen = openItem === item.id;
                    return (
                      <div key={item.id} className={`hs-accordion-item ${isOpen ? "active" : ""}`}>
                        <button className="hs-accordion-trigger" onClick={() => setOpenItem(isOpen ? null : item.id)} aria-expanded={isOpen}>
                          <span className="hs-accordion-title">{item.title}</span>
                          <svg className={`hs-accordion-icon ${isOpen ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        <div className={`hs-accordion-body ${isOpen ? "open" : ""}`}>
                          <div className="hs-accordion-inner">
                            <p className="hs-accordion-content">{item.content}</p>
                            {item.link && (
                              <button className="hs-accordion-link" onClick={scrollToServices}>
                                {item.link}
                                <span className="hs-accordion-link-arrow">↗</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Services block */}
              <div className="hs-block-divider" ref={servicesRef}>
                <p className="hs-block-label">Services</p>
                <h2 className="hs-block-headline">What We Build</h2>
                <p className="hs-block-body">
                  From company profiles to ERP systems — we cover the full spectrum of digital products your business needs.
                </p>
                <div className="hs-services-grid">
                  {services.map((s) => {
                    const isExpanded = expandedService === s.name;
                    const isCustom = s.cta !== null;

                    if (isCustom) {
                      return (
                        <div
                          className="hs-service-card custom"
                          key={s.name}
                          onClick={() => {
                            const contact = document.getElementById("contact");
                            if (contact) contact.scrollIntoView({ behavior: "smooth" });
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const contact = document.getElementById("contact");
                              if (contact) contact.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          <div className="hs-service-icon">{s.icon}</div>
                          <div className="hs-service-header">
                            <div className="hs-service-name">{s.name}</div>
                          </div>
                          <div className="hs-service-desc">{s.desc}</div>
                          <div className="hs-service-cta">{s.cta}</div>
                        </div>
                      );
                    }

                    return (
                      <div
                        className={`hs-service-card ${isExpanded ? "expanded" : ""}`}
                        key={s.name}
                        onClick={() => setExpandedService(isExpanded ? null : s.name)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setExpandedService(isExpanded ? null : s.name)}
                      >
                        <div className="hs-service-icon">{s.icon}</div>
                        <div className="hs-service-header">
                          <div className="hs-service-name">{s.name}</div>
                          <svg className={`hs-service-chevron ${isExpanded ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                        <div className="hs-service-desc">{s.desc}</div>
                        <div className={`hs-service-expand ${isExpanded ? "open" : ""}`}>
                            <ul className="hs-service-details">
                              {s.details.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ minHeight: "4vh" }} />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}