"use client";

import { useEffect, useRef, useState } from "react";

const portfolioItems = [
  {
    name: "Todo Mitra Utama",
    category: "Company Profile",
    desc: "A professional website to highlight their business and services.",
    logo: "/todo-mitra-utama.png",
    url: "https://todomitrautama.com/",
  },
  {
    name: "Selatan Consulate",
    category: "Ticketing System",
    desc: "A fast and reliable ticketing platform tailored for seamless event management.",
    logo: "/selatan-consulate.png",
    url: "https://selatanconsulate.framer.website/",
  },
  {
    name: "KopiGo",
    category: "Mobile App",
    desc: "A mobile app for financial management and driver tracking.",
    logo: "/kopigo.jpeg",
    url: "#portfolio",
  },
];

function PortfolioCard({
  item,
  index,
  visible,
}: {
  item: (typeof portfolioItems)[number];
  index: number;
  visible: boolean;
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pf-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="pf-logo-wrap">
        <img src={item.logo} alt={`${item.name} logo`} className="pf-logo" />
      </div>
      <span className="pf-category">{item.category}</span>
      <p className="pf-name">{item.name}</p>
      <p className="pf-desc">{item.desc}</p>
    </a>
  );
}



export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);



  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');

        .pf-section {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          background: #ffffff;
          padding: 5rem 4.5rem;
          overflow: hidden;
        }

        .pf-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pf-header {
          margin-bottom: 2.5rem;
        }

        .pf-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(220, 0, 0, 0.4);
          margin-bottom: 0.75rem;
        }

        .pf-headline {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          color: #dc0000;
          letter-spacing: -0.03em;
        }

        .pf-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .pf-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(220, 0, 0, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 0;
          text-decoration: none;
          transition:
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        a.pf-card:hover {
          box-shadow: 0 8px 32px rgba(220, 0, 0, 0.1);
          border-color: rgba(220, 0, 0, 0.25);
          transform: translateY(-3px) !important;
        }

        .pf-logo-wrap {
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 1.25rem;
        }

        .pf-logo {
          max-height: 48px;
          max-width: 120px;
          object-fit: contain;
        }

        .pf-category {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #dc0000;
          margin-bottom: 0.4rem;
        }

        .pf-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .pf-desc {
          font-size: 0.85rem;
          color: rgba(26, 26, 26, 0.65);
          line-height: 1.5;
          margin: 0;
        }

        /* Empty slot */
        .pf-empty {
          border-style: dashed;
          border-color: rgba(220, 0, 0, 0.12);
          background: rgba(220, 0, 0, 0.01);
          cursor: default;
          justify-content: center;
          min-height: 140px;
        }

        .pf-empty-icon {
          font-size: 1.5rem;
          font-weight: 300;
          color: rgba(220, 0, 0, 0.2);
          line-height: 1;
        }

        .pf-empty-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(220, 0, 0, 0.2);
        }

        @media (max-width: 900px) {
          .pf-section { padding: 4rem 2rem; }
          .pf-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 560px) {
          .pf-section { padding: 3.5rem 1.25rem; }
          .pf-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (prefers-reduced-motion: reduce) {
          .pf-card {
            opacity: 1 !important;
            transform: none !important;
            transition: box-shadow 0.25s ease, border-color 0.25s ease !important;
          }
        }
      `}</style>

      <section className="pf-section" id="portfolio" ref={ref}>
        <div className="pf-content">
          <div className="pf-header">
            <p className="pf-label">Portfolio</p>
            <h2 className="pf-headline">Our Work</h2>
          </div>

          <div className="pf-grid">
            {portfolioItems.map((item, i) => (
              <PortfolioCard
                key={item.name}
                item={item}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
