"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap');

        .qleos-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          height: 64px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(220, 0, 0, 0.08);
          font-family: 'DM Sans', sans-serif;
        }

        /* Logo */
        .qleos-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .qleos-logo svg {
          height: 28px;
          width: auto;
        }

        /* Nav links */
        .qleos-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .qleos-links a {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 0.01em;
          position: relative;
          transition: color 0.2s ease;
        }

        .qleos-links a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: #dc0000;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }

        .qleos-links a:hover {
          color: #dc0000;
        }

        .qleos-links a:hover::after {
          transform: scaleX(1);
        }

        /* Right side */
        .qleos-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        /* Contact button */
        .qleos-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          padding: 0 1.4rem;
          background: #dc0000;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .qleos-contact-btn:hover {
          background: #b80000;
          transform: translateY(-1px);
        }

        .qleos-contact-btn:active {
          transform: translateY(0);
        }

        /* Grid / apps icon button */
        .qleos-grid-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: #dc0000;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
          flex-shrink: 0;
          margin-left: 4px;
        }

        .qleos-grid-btn:hover {
          background: #b80000;
          transform: translateY(-1px);
        }

        .qleos-grid-btn svg {
          width: 16px;
          height: 16px;
          fill: #fff;
        }

        /* Mobile hamburger */
        .qleos-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .qleos-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #1a1a1a;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .qleos-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .qleos-hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .qleos-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile menu drawer */
        .qleos-mobile-menu {
          display: none;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: #fff;
          border-bottom: 1px solid rgba(220, 0, 0, 0.12);
          padding: 1.5rem 2.5rem;
          z-index: 99;
          font-family: 'DM Sans', sans-serif;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .qleos-mobile-menu.open {
          display: block;
        }

        .qleos-mobile-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .qleos-mobile-links a {
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.2s ease;
        }

        .qleos-mobile-links a:hover {
          color: #dc0000;
        }

        .qleos-mobile-actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .qleos-links {
            display: none;
          }
          .qleos-hamburger {
            display: flex;
          }
        }
      `}</style>

      <nav className="qleos-nav">
        {/* Logo */}
        <Link href="/" className="qleos-logo" aria-label="Qleos Home">
          <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Q */}
            <text x="5" y="28" fontFamily="'Zen Dots', sans-serif" fontWeight="400" fontSize="28" fill="#dc0000">QLEOS</text>
          </svg>
        </Link>

        {/* Desktop nav links */}
        <ul className="qleos-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="qleos-actions">
          <Link href="/contact" className="qleos-contact-btn">
            Contact
          </Link>
          <button className="qleos-grid-btn" aria-label="Apps menu">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="4" height="4" rx="1"/>
              <rect x="6" y="0" width="4" height="4" rx="1"/>
              <rect x="12" y="0" width="4" height="4" rx="1"/>
              <rect x="0" y="6" width="4" height="4" rx="1"/>
              <rect x="6" y="6" width="4" height="4" rx="1"/>
              <rect x="12" y="6" width="4" height="4" rx="1"/>
              <rect x="0" y="12" width="4" height="4" rx="1"/>
              <rect x="6" y="12" width="4" height="4" rx="1"/>
              <rect x="12" y="12" width="4" height="4" rx="1"/>
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button
            className={`qleos-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`qleos-mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul className="qleos-mobile-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="qleos-mobile-actions">
          <Link href="/contact" className="qleos-contact-btn" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}