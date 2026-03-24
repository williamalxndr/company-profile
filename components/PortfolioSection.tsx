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
      {item.logo ? (
        <div className="pf-image-wrap">
          <img src={item.logo} alt={`${item.name} preview`} className="pf-image" />
        </div>
      ) : (
        <div className="pf-image-wrap"></div>
      )}
      <div className="pf-content-wrap">
        <span className="pf-category">{item.category}</span>
        <h3 className="pf-name">{item.name}</h3>
        <p className="pf-desc">{item.desc}</p>

        <div className="pf-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
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
          background: transparent;
          padding: 8rem 4.5rem;
          overflow: hidden;
        }

        /* Mesh gradient previously here is removed, allowing parent CircuitCanvas to handle the global background */

        .pf-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pf-header {
          margin-bottom: 4rem;
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
          font-size: clamp(3.5rem, 5.5vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #dc0000;
          letter-spacing: -0.03em;
          max-width: 100%;
        }

        .pf-grid {
          background: #ffffff;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 0;
          border: 2px solid #dc0000;
          border-radius: 20px;
        }
        
        .pf-grid::-webkit-scrollbar {
          display: none;
        }

        .pf-card {
          background: #ffffff;
          flex: 0 0 calc(100% / 3.5);
          scroll-snap-align: start;
          border-right: 2px solid #dc0000;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          text-align: left;
          gap: 0;
          text-decoration: none;
          min-height: 420px;
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }



        a.pf-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 36px rgba(220, 0, 0, 0.05);
        }

        .pf-image-wrap {
          width: 100%;
          aspect-ratio: 16 / 10;
          background: rgba(26, 26, 26, 0.03);
          border-bottom: 2px solid #dc0000;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .pf-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        a.pf-card:hover .pf-image {
          transform: scale(1.05);
        }
        
        .pf-content-wrap {
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .pf-category {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #dc0000;
          margin-bottom: 0.75rem;
        }

        .pf-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 0.75rem 0;
          line-height: 1.3;
          letter-spacing: normal;
        }

        .pf-desc {
          font-size: 0.95rem;
          color: rgba(26, 26, 26, 0.65);
          line-height: 1.6;
          margin: 0 0 2.5rem 0;
        }

        .pf-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(220, 0, 0, 0.2);
          border-radius: 50%;
          color: #dc0000;
          background: transparent;
          transition: background 0.2s ease, color 0.2s ease, transform 0.25s ease;
        }

        a.pf-card:hover .pf-btn {
          background: #dc0000;
          color: #ffffff;
          transform: scale(1.1);
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

        @media (max-width: 1024px) {
          .pf-card { flex: 0 0 50%; }
        }

        @media (max-width: 900px) {
          .pf-section { padding: 4rem 2rem; }
          .pf-card { flex: 0 0 65%; }
          .pf-content-wrap { padding: 3rem 1.75rem; }
        }

        @media (max-width: 560px) {
          .pf-section { padding: 3.5rem 1.25rem; }
          .pf-card { flex: 0 0 85%; }
          .pf-content-wrap { padding: 2rem 1.25rem; }
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
            <h2 className="pf-headline">Our Past Projects</h2>
          </div>

          <div className="pf-grid">
            {portfolioItems.map((item, i) => (
              <PortfolioCard
                key={`${item.name}-${i}`}
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
