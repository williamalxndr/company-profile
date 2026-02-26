"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/qleos.lab",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [lineWidth, setLineWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setLineWidth(100), 50);
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');

        .ft-footer {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          color: #0f0f0f;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(220,0,0,0.08);
        }

        .ft-topline {
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          background: #dc0000;
          width: 0%;
          transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ft-inner {
          padding: 4.5rem 4.5rem 3rem;
          position: relative;
          z-index: 1;
        }

        .ft-top {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(220,0,0,0.08);
          gap: 2rem;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          transition-delay: 0.2s;
        }

        .ft-footer.visible .ft-top {
          opacity: 1;
          transform: translateY(0);
        }

        .ft-brand {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .ft-location {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: rgba(0,0,0,0.45);
          letter-spacing: 0.06em;
        }

        .ft-location-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #dc0000;
          opacity: 0.7;
          flex-shrink: 0;
        }

        .ft-nav {
          display: flex;
          gap: 4rem;
          align-items: flex-start;
        }

        .ft-nav-col {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .ft-nav-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(220,0,0,0.6);
          margin-bottom: 0.15rem;
        }

        .ft-nav-link {
          font-size: 0.95rem;
          color: rgba(0,0,0,0.6);
          text-decoration: none;
          transition: color 0.18s;
          line-height: 1;
        }

        .ft-nav-link:hover {
          color: #dc0000;
        }

        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          gap: 1.5rem;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          transition-delay: 0.4s;
        }

        .ft-footer.visible .ft-bottom {
          opacity: 1;
          transform: translateY(0);
        }

        .ft-copy {
          font-size: 0.82rem;
          color: rgba(0,0,0,0.45);
          letter-spacing: 0.02em;
        }

        .ft-copy strong {
          font-weight: 600;
          color: #dc0000;
        }

        .ft-socials {
          display: flex;
          gap: 0.45rem;
          align-items: center;
        }

        .ft-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(220,0,0,0.12);
          color: rgba(0,0,0,0.28);
          text-decoration: none;
          transition: border-color 0.18s, color 0.18s, background 0.18s;
          background: transparent;
        }

        .ft-social-btn:hover {
          border-color: rgba(220,0,0,0.45);
          color: #dc0000;
          background: rgba(220,0,0,0.04);
        }

        @media (max-width: 768px) {
          .ft-inner { padding: 3.5rem 1.5rem 2.5rem; }
          .ft-top { flex-direction: column; }
          .ft-nav { gap: 2.5rem; flex-wrap: wrap; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      <footer
        className={`ft-footer ${visible ? "visible" : ""}`}
        ref={footerRef}
      >
        <div className="ft-topline" style={{ width: `${lineWidth}%` }} />

        <div className="ft-inner">

          <div className="ft-top">
            <nav className="ft-nav">
              <div className="ft-nav-col">
                <p className="ft-nav-label">Company</p>
                {navLinks.slice(0, 3).map((l) => (
                  <a key={l.label} href={l.href} className="ft-nav-link">{l.label}</a>
                ))}
              </div>
              <div className="ft-nav-col">
                <p className="ft-nav-label">Resources</p>
                {navLinks.slice(3).map((l) => (
                  <a key={l.label} href={l.href} className="ft-nav-link">{l.label}</a>
                ))}
              </div>
              <div className="ft-nav-col">
                <p className="ft-nav-label">Contact</p>
                <a href="mailto:qleos.lab@gmail.com" className="ft-nav-link">qleos.lab@gmail.com</a>
                <a href="tel:+6287873876744" className="ft-nav-link">+62 878-7387-6744</a>
              </div>
            </nav>
          </div>

          <div className="ft-bottom">
            <p className="ft-copy">
              © {new Date().getFullYear()} <strong>Qleos</strong>. All rights reserved.
            </p>
            <div className="ft-location">
              <span className="ft-location-dot" />
              Jakarta, Indonesia
            </div>
            <div className="ft-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="ft-social-btn"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}