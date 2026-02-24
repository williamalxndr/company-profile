"use client";

import { useState, useEffect, useRef } from "react";

const accordionItems = [
  { id: 1, title: "About", content: "Software company located in Jakarta, with a vision to bring expert software engineering results to businesses across Southeast Asia." },
  { id: 2, title: "Services", content: "We design, build, and host digital products — from company profiles to full-scale ERP systems and custom platforms." },
  { id: 3, title: "Vision", content: "To become the leading digital partner in Southeast Asia, delivering world-class software solutions with local expertise." },
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
  },
];

export default function HeroSection() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [progress, setProgress] = useState(0);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setProgress(p);

      if (textInnerRef.current) {
        const innerH = textInnerRef.current.scrollHeight;
        const colH = textInnerRef.current.parentElement?.clientHeight ?? window.innerHeight;
        const maxTranslate = Math.max(0, innerH - colH);
        textInnerRef.current.style.transform = `translateY(-${p * maxTranslate}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topInset = (1 - progress) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float-dots-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(20px); }
          50% { transform: translateY(-60px) translateX(0); }
          75% { transform: translateY(-30px) translateX(-20px); }
        }

        @keyframes float-dots-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(30px) translateX(-20px); }
          50% { transform: translateY(60px) translateX(0); }
          75% { transform: translateY(30px) translateX(20px); }
        }

        @keyframes float-dots-3 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(180deg); }
        }

        .hs-section {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          height: 350vh;
          position: relative;
        }

        .hs-sticky {
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          display: grid;
          grid-template-columns: 30fr 70fr;
          overflow: hidden;
        }

        .hs-img-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          background: #fff;
        }

        .hs-img-wrapper {
          position: relative;
          width: 100%;
          max-width: 240px;
          /* height driven by a hidden ghost image so wrapper has natural size */
        }

        /* ghost — invisible, just holds the natural image height */
        .hs-img-ghost {
          width: 100%;
          height: auto;
          display: block;
          visibility: hidden;
        }

        /* both before and after absolutely overlap each other perfectly */
        .hs-img-before,
        .hs-img-after {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .hs-text-col {
          overflow: hidden;
          height: 100%;
          position: relative;
        }

        .hs-text-inner {
          padding: 4rem 4.5rem 4rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 5rem;
          will-change: transform;
        }

        /* ── Block styles ── */
        .hs-headline {
          font-size: clamp(2.2rem, 3.5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.2;
          color: #dc0000;
          letter-spacing: -0.02em;
          padding-bottom: 0.08em;
        }

        .hs-subtext {
          margin-top: 1.25rem;
          font-size: 0.95rem;
          color: rgba(180,0,0,0.65);
          line-height: 1.7;
          max-width: 520px;
        }

        .hs-accordion { display: flex; flex-direction: column; margin-top: 3rem; }
        .hs-accordion-item { border-bottom: 1px solid rgba(220,0,0,0.15); }
        .hs-accordion-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 1.1rem 0;
          text-align: left;
          gap: 1rem;
        }
        .hs-accordion-title {
          font-size: 1rem;
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
          padding: 0 0 1.1rem 0;
          font-size: 0.875rem;
          color: rgba(160,0,0,0.7);
          line-height: 1.6;
        }
        .hs-accordion-item.active .hs-accordion-trigger { position: relative; }
        .hs-accordion-item.active .hs-accordion-trigger::before {
          content: '';
          position: absolute;
          left: -4rem;
          top: 0; bottom: 0;
          width: 3px;
          background: #dc0000;
          border-radius: 0 2px 2px 0;
        }

        /* ── Section block header ── */
        .hs-block-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(220,0,0,0.4);
          margin-bottom: 1rem;
        }

        .hs-block-headline {
          font-size: clamp(1.6rem, 2.5vw, 2.4rem);
          font-weight: 800;
          line-height: 1.2;
          color: #dc0000;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .hs-block-body {
          font-size: 0.95rem;
          color: rgba(180,0,0,0.6);
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 2rem;
        }

        .hs-block-divider {
          border-top: 1px solid rgba(220,0,0,0.1);
          padding-top: 0.5rem;
        }

        /* ── Services grid ── */
        .hs-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(220,0,0,0.1);
          border: 1px solid rgba(220,0,0,0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .hs-service-card {
          background: #fff;
          padding: 1.4rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .hs-service-card:hover {
          background: rgba(220,0,0,0.03);
        }

        .hs-service-card.expanded {
          background: rgba(220,0,0,0.04);
        }

        .hs-service-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .hs-service-icon {
          font-size: 1.4rem;
          margin-bottom: 0.25rem;
        }

        .hs-service-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #dc0000;
        }

        .hs-service-chevron {
          width: 16px;
          height: 16px;
          color: #dc0000;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .hs-service-chevron.open {
          transform: rotate(180deg);
        }

        .hs-service-desc {
          font-size: 0.8rem;
          color: rgba(160,0,0,0.6);
          line-height: 1.55;
        }

        /* inline expand area */
        .hs-service-expand {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
          overflow: hidden;
        }

        .hs-service-expand.open {
          grid-template-rows: 1fr;
        }

        .hs-service-expand-inner {
          overflow: hidden;
        }

        .hs-service-details {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(220,0,0,0.1);
          margin-top: 0.5rem;
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

        @media (max-width: 900px) {
          .hs-sticky { grid-template-columns: 1fr; grid-template-rows: 280px 1fr; }
          .hs-text-inner { padding: 2.5rem 1.5rem; gap: 3rem; }
          .hs-accordion-item.active .hs-accordion-trigger::before { left: -1.5rem; }
          .hs-services-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .hs-headline { font-size: 1.9rem; }
          .hs-text-inner { padding: 2rem 1.25rem; }
          .hs-modal { padding: 2rem 1.5rem; }
        }
      `}</style>

      <section className="hs-section" ref={sectionRef}>
        <div className="hs-sticky">

          {/* LEFT: sticky image */}
          <div className="hs-img-col">
            <div className="hs-img-wrapper">
              {/* ghost: invisible, just holds the wrapper height */}
              <img className="hs-img-ghost" src="/images/before.png" alt="" aria-hidden="true" />
              {/* before: visible only on the top portion not yet covered */}
              <img
                className="hs-img-before"
                src="/images/before.png"
                alt="before"
                style={{ clipPath: `inset(0% 0% ${100 - topInset}% 0%)` }}
              />
              {/* after: reveals upward from the bottom */}
              <img
                className="hs-img-after"
                src="/images/after.png"
                alt="after"
                style={{ clipPath: `inset(${topInset}% 0% 0% 0%)` }}
              />
            </div>
          </div>

          {/* RIGHT: text moves up via translateY */}
          <div className="hs-text-col">
            <div className="hs-text-inner" ref={textInnerRef}>

              {/* ── Block 1: Hero ── */}
              <div>
                <h1 className="hs-headline">The Full Stack Digital Partner</h1>
                <p className="hs-subtext">
                  Qleos brings together expert software engineering, stunning web development,
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
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Block 2: Services ── */}
              <div className="hs-block-divider">
                <p className="hs-block-label">02 — Services</p>
                <h2 className="hs-block-headline">What We Build</h2>
                <p className="hs-block-body">
                  From company profiles to ERP systems <br /> We cover the full spectrum of digital products your business needs.
                </p>
                <div className="hs-services-grid">
                  {services.map((s) => {
                    const isExpanded = expandedService === s.name;
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
                          <div className="hs-service-expand-inner">
                            <ul className="hs-service-details">
                              {s.details.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* spacer */}
              <div style={{ minHeight: "30vh" }} />

            </div>
          </div>

        </div>
      </section>

    </>
  );
}