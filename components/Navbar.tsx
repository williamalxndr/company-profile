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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;600;700&display=swap');
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
          height: 72px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(220, 0, 0, 0.08);
          font-family: 'DM Sans', sans-serif;
        }

        .qleos-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .qleos-logo svg {
          height: 36px;
        }

        /* DESKTOP LINKS */

        .qleos-links {
          display: flex;
          align-items: center;
          gap: 2.2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .qleos-links a {
          position: relative;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 999px;
          overflow: hidden;
          transition: color 0.3s ease, transform 0.2s ease;
        }

        /* Animated red fill */
        .qleos-links a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #dc0000, #ff2a2a, #dc0000);
          background-size: 200% 100%;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(.4,0,.2,1);
          border-radius: 999px;
          z-index: -1;
        }

        .qleos-links a:hover::before {
          transform: scaleX(1);
        }

        .qleos-links a:hover {
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(220, 0, 0, 0.28);
        }

        /* ACTION BUTTONS */

        .qleos-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .qleos-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          padding: 0 1.6rem;
          background: #dc0000;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 999px;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }

        .qleos-contact-btn:hover {
          background: #b80000;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(220, 0, 0, 0.35);
        }

        .qleos-grid-btn {
          width: 46px;
          height: 46px;
          background: #dc0000;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }

        .qleos-grid-btn:hover {
          background: #b80000;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(220, 0, 0, 0.35);
        }

        .qleos-grid-btn svg {
          width: 18px;
          height: 18px;
          fill: #fff;
        }

        /* HAMBURGER */

        .qleos-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .qleos-hamburger span {
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

        /* MOBILE */

        .qleos-mobile-menu {
          display: none;
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: #ffffff;
          padding: 1.8rem 2.5rem;
          border-bottom: 1px solid rgba(220, 0, 0, 0.12);
        }

        .qleos-mobile-menu.open {
          display: block;
        }

        .qleos-mobile-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .qleos-mobile-links a {
          font-weight: 600;
          text-decoration: none;
          color: #1a1a1a;
          transition: color 0.2s ease;
        }

        .qleos-mobile-links a:hover {
          color: #dc0000;
        }

        .qleos-mobile-actions {
          margin-top: 1.5rem;
        }

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
        <Link href="/" className="qleos-logo">
          <svg viewBox="0 0 180 46">
            <text x="5" y="34" fontFamily="'Zen Dots', sans-serif" fontSize="34" fill="#dc0000">
              QLEOS
            </text>
          </svg>
        </Link>

        <ul className="qleos-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="qleos-actions">
          <Link href="/contact" className="qleos-contact-btn">
            Contact
          </Link>

          <button className="qleos-grid-btn">
            <svg viewBox="0 0 16 16">
              {[0,6,12].map(x =>
                [0,6,12].map(y => (
                  <rect key={x+y} x={x} y={y} width="4" height="4" rx="1"/>
                ))
              )}
            </svg>
          </button>

          <button
            className={`qleos-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

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
          <Link href="/contact" className="qleos-contact-btn">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}