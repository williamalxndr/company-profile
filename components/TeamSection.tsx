"use client";

import Link from "next/dist/client/link";
import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Raja Rafael",
    role: "CEO",
    bio: "Visionary leader driving Qleos forward with a passion for innovation, building high-performance teams, and delivering real business impact through technology.",
    initials: "RR",
    color: "#dc0000",
  },
  {
    name: "William Alexander",
    role: "Deputy CEO",
    bio: "Strategic operator who bridges vision and execution. Ensures every initiative aligns with Qleos mission and delivers measurable results.",
    initials: "WA",
    color: "#b80000",
  },
  {
    name: "Dave Justin",
    role: "CTO",
    bio: "Full-stack engineer turned technology leader. Architects the systems that power Qleos products — scalable, secure, and built to last.",
    initials: "DJ",
    color: "#990000",
  },
  {
    name: "Paima Ishak",
    role: "COO",
    bio: "Operations expert who keeps everything running smoothly. From project delivery to client relationships, Paima makes sure nothing falls through the cracks.",
    initials: "PI",
    color: "#cc1111",
  },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="tm-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div className="tm-avatar" style={{ background: member.color }}>
        {member.initials}
      </div>
      <div className="tm-info">
        <h3 className="tm-name">{member.name}</h3>
        <p className="tm-role">{member.role}</p>
        <p className="tm-bio">{member.bio}</p>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');

        .tm-section {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          padding: 7rem 4.5rem;
          position: relative;
          overflow: hidden;
        }

        .tm-section::before {
          content: 'TEAM';
          position: absolute;
          right: -0.05em;
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(8rem, 18vw, 18rem);
          font-weight: 800;
          color: rgba(220,0,0,0.04);
          pointer-events: none;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .tm-header {
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }

        .tm-label {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(220,0,0,0.4);
          margin-bottom: 1rem;
        }

        .tm-headline {
          font-size: clamp(3.5rem, 5.5vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #dc0000;
          letter-spacing: -0.03em;
          max-width: 100%;
        }

        .tm-subtext {
          margin-top: 1rem;
          font-size: 1.25rem;
          color: rgba(180,0,0,0.55);
          line-height: 1.7;
          max-width: 480px;
        }

        .tm-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .tm-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 2rem;
          border: 1px solid rgba(220,0,0,0.1);
          border-radius: 16px;
          background: #fff;
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.2s, border-color 0.2s;
        }

        .tm-card:hover {
          box-shadow: 0 8px 32px rgba(220,0,0,0.08);
          border-color: rgba(220,0,0,0.22);
        }

        .tm-avatar {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }

        .tm-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .tm-name {
          font-size: 1rem;
          font-weight: 700;
          color: #dc0000;
        }

        .tm-role {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(220,0,0,0.45);
          margin-bottom: 0.5rem;
        }

        .tm-bio {
          font-size: 0.875rem;
          color: rgba(160,0,0,0.65);
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .tm-section { padding: 5rem 1.5rem; }
          .tm-grid { grid-template-columns: 1fr; }
          .tm-section::before { font-size: 5rem; }
        }
      `}</style>

      <section className="tm-section" id="team">
        <div className="tm-header">
          <p className="tm-label">Team</p>
          <h2 className="tm-headline">The People Behind<br />
          <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '1.2em', display: 'block', marginTop: '0.3em' }}>
            {/* Q */}
            <text x="5" y="36" fontFamily="'Zen Dots', sans-serif" fontWeight="400" fontSize="40" fill="#dc0000">QLEOS</text>
          </svg>
          </h2>
          <p className="tm-subtext">
            A team of engineers, designers, and strategists. All obsessed with building things that work beautifully.
          </p>
        </div>

        <div className="tm-grid">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}