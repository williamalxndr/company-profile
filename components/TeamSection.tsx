"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const team = [
  {
    name: "Raja Rafael",
    role: "Project Manager",
    bio: "Keeps every project on track, on time, and on point. The bridge between the team and the client — making sure expectations are clear, communication flows, and nothing gets lost in translation.",
    initials: "RR",
    color: "#dc0000",
  },
  {
    name: "William Alexander",
    role: "Backend Engineer",
    bio: "Builds the systems you never see but always depend on. Specializes in high-performance APIs, cloud infrastructure, and the kind of architecture that holds up under pressure.",
    initials: "WA",
    color: "#b80000",
  },
  {
    name: "Dave Justin",
    role: "Frontend Engineer",
    bio: "Crafts the interfaces users actually interact with. Obsessed with performance, accessibility, and making every interaction feel effortless and intentional.",
    initials: "DJ",
    color: "#990000",
  },
  {
    name: "Paima Ishak",
    role: "UI/UX Designer",
    bio: "The eye behind every product. Translates business goals into intuitive designs — from early wireframes to polished design systems that developers love to build from.",
    initials: "PI",
    color: "#cc1111",
  },
];

// ─────────────────────────────────────────────
// Circuit layout — grid-based PCB traces
// Points are normalized [0..1, 0..1]
// ─────────────────────────────────────────────
type Pt = [number, number];

interface Segment {
  from: Pt;
  to: Pt;
}

interface Node {
  pos: Pt;
  radius: number;
}

// Build a rich PCB-style circuit
function buildCircuit(): { segments: Segment[]; nodes: Node[] } {
  const segments: Segment[] = [];
  const nodeSet = new Map<string, Node>();

  const addSeg = (a: Pt, b: Pt) => {
    segments.push({ from: a, to: b });
  };
  const addNode = (p: Pt, r = 3.5) => {
    const key = `${p[0]},${p[1]}`;
    if (!nodeSet.has(key)) nodeSet.set(key, { pos: p, radius: r });
  };
  const junction = (p: Pt) => addNode(p, 4.5);

  // ── Horizontal backbone rails ──
  // Rail 1 — top area
  addSeg([0.0, 0.12], [0.18, 0.12]);
  addSeg([0.18, 0.12], [0.35, 0.12]);
  addSeg([0.35, 0.12], [0.55, 0.12]);
  addSeg([0.55, 0.12], [0.72, 0.12]);
  addSeg([0.72, 0.12], [0.88, 0.12]);
  addSeg([0.88, 0.12], [1.0, 0.12]);

  // Rail 2 — mid-top
  addSeg([0.0, 0.3], [0.12, 0.3]);
  addSeg([0.12, 0.3], [0.28, 0.3]);
  addSeg([0.28, 0.3], [0.45, 0.3]);
  addSeg([0.45, 0.3], [0.65, 0.3]);
  addSeg([0.65, 0.3], [0.82, 0.3]);
  addSeg([0.82, 0.3], [1.0, 0.3]);

  // Rail 3 — center
  addSeg([0.0, 0.5], [0.15, 0.5]);
  addSeg([0.15, 0.5], [0.38, 0.5]);
  addSeg([0.38, 0.5], [0.62, 0.5]);
  addSeg([0.62, 0.5], [0.85, 0.5]);
  addSeg([0.85, 0.5], [1.0, 0.5]);

  // Rail 4 — mid-bottom
  addSeg([0.0, 0.7], [0.2, 0.7]);
  addSeg([0.2, 0.7], [0.42, 0.7]);
  addSeg([0.42, 0.7], [0.6, 0.7]);
  addSeg([0.6, 0.7], [0.78, 0.7]);
  addSeg([0.78, 0.7], [1.0, 0.7]);

  // Rail 5 — bottom
  addSeg([0.0, 0.88], [0.22, 0.88]);
  addSeg([0.22, 0.88], [0.48, 0.88]);
  addSeg([0.48, 0.88], [0.7, 0.88]);
  addSeg([0.7, 0.88], [1.0, 0.88]);

  // ── Vertical connectors ──
  addSeg([0.18, 0.0], [0.18, 0.12]);
  addSeg([0.18, 0.12], [0.18, 0.3]);
  addSeg([0.18, 0.3], [0.18, 0.5]);
  addSeg([0.18, 0.5], [0.18, 0.7]);
  addSeg([0.18, 0.7], [0.18, 0.88]);
  addSeg([0.18, 0.88], [0.18, 1.0]);

  addSeg([0.35, 0.0], [0.35, 0.12]);
  addSeg([0.35, 0.12], [0.35, 0.3]);
  addSeg([0.35, 0.3], [0.35, 0.5]);
  addSeg([0.35, 0.5], [0.35, 0.7]);

  addSeg([0.55, 0.12], [0.55, 0.3]);
  addSeg([0.55, 0.3], [0.55, 0.5]);
  addSeg([0.55, 0.5], [0.55, 0.7]);
  addSeg([0.55, 0.7], [0.55, 0.88]);
  addSeg([0.55, 0.88], [0.55, 1.0]);

  addSeg([0.72, 0.0], [0.72, 0.12]);
  addSeg([0.72, 0.12], [0.72, 0.3]);
  addSeg([0.72, 0.3], [0.72, 0.5]);
  addSeg([0.72, 0.5], [0.72, 0.7]);
  addSeg([0.72, 0.7], [0.72, 0.88]);

  addSeg([0.88, 0.12], [0.88, 0.3]);
  addSeg([0.88, 0.3], [0.88, 0.5]);
  addSeg([0.88, 0.5], [0.88, 0.7]);

  addSeg([0.28, 0.3], [0.28, 0.5]);
  addSeg([0.28, 0.5], [0.28, 0.7]);
  addSeg([0.28, 0.7], [0.28, 0.88]);

  addSeg([0.45, 0.3], [0.45, 0.5]);
  addSeg([0.45, 0.5], [0.45, 0.7]);
  addSeg([0.45, 0.7], [0.45, 0.88]);

  addSeg([0.65, 0.3], [0.65, 0.5]);
  addSeg([0.65, 0.5], [0.65, 0.7]);
  addSeg([0.65, 0.7], [0.65, 0.88]);

  addSeg([0.82, 0.3], [0.82, 0.5]);
  addSeg([0.82, 0.5], [0.82, 0.7]);

  // ── Small diagonal-ish jogs (45° steps via two segments) ──
  addSeg([0.12, 0.3], [0.15, 0.3]);
  addSeg([0.12, 0.3], [0.12, 0.5]);
  addSeg([0.12, 0.5], [0.15, 0.5]);

  addSeg([0.38, 0.5], [0.42, 0.5]);
  addSeg([0.42, 0.5], [0.42, 0.7]);

  addSeg([0.62, 0.5], [0.6, 0.5]);

  addSeg([0.2, 0.7], [0.22, 0.7]);
  addSeg([0.22, 0.7], [0.22, 0.88]);

  addSeg([0.78, 0.7], [0.7, 0.7]);
  addSeg([0.7, 0.7], [0.7, 0.88]);

  addSeg([0.48, 0.88], [0.45, 0.88]);
  addSeg([0.48, 0.88], [0.48, 1.0]);

  // ── IC-style pads / component stubs ──
  // Left edge entry pads
  addSeg([0.0, 0.12], [0.0, 0.12]);
  addSeg([0.0, 0.5], [0.0, 0.5]);
  addSeg([0.0, 0.88], [0.0, 0.88]);

  // Collect all unique points as nodes
  segments.forEach((s) => {
    addNode(s.from, 3);
    addNode(s.to, 3);
  });

  // Elevate junction points
  const junctionPts: Pt[] = [
    [0.18, 0.12], [0.18, 0.3], [0.18, 0.5], [0.18, 0.7], [0.18, 0.88],
    [0.35, 0.12], [0.35, 0.3], [0.35, 0.5],
    [0.55, 0.12], [0.55, 0.3], [0.55, 0.5], [0.55, 0.7], [0.55, 0.88],
    [0.72, 0.12], [0.72, 0.3], [0.72, 0.5], [0.72, 0.7], [0.72, 0.88],
    [0.28, 0.3], [0.28, 0.5], [0.28, 0.7],
    [0.45, 0.3], [0.45, 0.5], [0.45, 0.7],
    [0.65, 0.3], [0.65, 0.5], [0.65, 0.7],
    [0.88, 0.3], [0.88, 0.5],
  ];
  junctionPts.forEach(junction);

  return { segments, nodes: Array.from(nodeSet.values()) };
}

const CIRCUIT = buildCircuit();

// ─────────────────────────────────────────────
// Canvas renderer
// ─────────────────────────────────────────────
interface CircuitCanvasProps {
  progress: number; // 0..1 scroll progress within the section
}

function CircuitCanvas({ progress }: CircuitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const progressRef = useRef(progress);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dt = ts - timeRef.current;
    timeRef.current = ts;
    const p = progressRef.current;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const toX = (nx: number) => nx * W;
    const toY = (ny: number) => ny * H;

    const { segments, nodes } = CIRCUIT;
    const totalSegments = segments.length;

    // How far along the circuit the "charge front" has reached
    // As scroll goes 0→1, charge front sweeps 0→totalSegments
    const chargeFront = p * totalSegments;

    // ── Draw base traces (dim) ──
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    segments.forEach((seg) => {
      ctx.beginPath();
      ctx.moveTo(toX(seg.from[0]), toY(seg.from[1]));
      ctx.lineTo(toX(seg.to[0]), toY(seg.to[1]));
      ctx.strokeStyle = "rgba(220,0,0,0.04)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // ── Draw energized traces ──
    segments.forEach((seg, i) => {
      const segProgress = Math.max(0, Math.min(1, chargeFront - i));
      if (segProgress <= 0) return;

      const fx = toX(seg.from[0]), fy = toY(seg.from[1]);
      const tx = toX(seg.to[0]), ty = toY(seg.to[1]);

      // Partial segment draw
      const px = fx + (tx - fx) * segProgress;
      const py = fy + (ty - fy) * segProgress;

      // Glow layers
      [
        { w: 5, alpha: 0.06 },
        { w: 2.5, alpha: 0.14 },
        { w: 1.2, alpha: 0.4 },
      ].forEach(({ w, alpha }) => {
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = `rgba(220,0,0,${alpha})`;
        ctx.lineWidth = w;
        ctx.stroke();
      });

      // Bright core
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(255,80,80,0.5)`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    });

    // ── Single electron dot racing along energized segments only ──
    const energizedCount = Math.min(Math.floor(chargeFront), totalSegments);

    if (energizedCount > 0) {
      // t goes 0→1 looping, maps to position within energized segments
      const t = (ts * 0.0003) % 1;
      const rawIdx = t * energizedCount;
      const segIdx = Math.floor(rawIdx) % energizedCount;
      const segT = rawIdx - Math.floor(rawIdx);

      const seg = segments[segIdx];
      const ex = toX(seg.from[0]) + (toX(seg.to[0]) - toX(seg.from[0])) * segT;
      const ey = toY(seg.from[1]) + (toY(seg.to[1]) - toY(seg.from[1])) * segT;

      // Bloom glow — large outer halo
      const grad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 18);
      grad.addColorStop(0, "rgba(255,220,80,1)");
      grad.addColorStop(0.2, "rgba(255,150,20,0.7)");
      grad.addColorStop(0.5, "rgba(255,80,0,0.25)");
      grad.addColorStop(1, "rgba(255,60,0,0)");
      ctx.beginPath();
      ctx.arc(ex, ey, 18, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Mid glow
      const grad2 = ctx.createRadialGradient(ex, ey, 0, ex, ey, 7);
      grad2.addColorStop(0, "rgba(255,240,160,1)");
      grad2.addColorStop(1, "rgba(255,160,30,0)");
      ctx.beginPath();
      ctx.arc(ex, ey, 7, 0, Math.PI * 2);
      ctx.fillStyle = grad2;
      ctx.fill();

      // Core dot — pure white-hot center
      ctx.beginPath();
      ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,230,100,1)";
      ctx.fill();
    }

    // ── Node dots ──
    nodes.forEach((node) => {
      const nx = toX(node.pos[0]);
      const ny = toY(node.pos[1]);

      // Find nearest segment index for this node
      let nearestIdx = 0;
      let nearestDist = Infinity;
      segments.forEach((seg, i) => {
        const d = Math.hypot(seg.from[0] - node.pos[0], seg.from[1] - node.pos[1]);
        if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
      });

      const nodeEnergy = Math.max(0, Math.min(1, chargeFront - nearestIdx));
      if (nodeEnergy <= 0) {
        // Dormant dot
        ctx.beginPath();
        ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,0,0,0.06)";
        ctx.fill();
        return;
      }

      // Energized — pulsing glow
      const pulse = 0.6 + 0.4 * Math.sin(ts * 0.003 + nearestIdx * 0.5);
      const glowR = node.radius * (1.8 + pulse * 1.5) * nodeEnergy;

      const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
      grad.addColorStop(0, `rgba(255,80,80,${0.4 * nodeEnergy})`);
      grad.addColorStop(0.5, `rgba(220,0,0,${0.12 * nodeEnergy})`);
      grad.addColorStop(1, "rgba(220,0,0,0)");
      ctx.beginPath();
      ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(nx, ny, node.radius * nodeEnergy * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,0,0,${0.35 * nodeEnergy})`;
      ctx.fill();
    });

    // ── IC chip shapes at key junctions ──
    const chips: { pos: Pt; w: number; h: number }[] = [
      { pos: [0.18, 0.5], w: 0.04, h: 0.08 },
      { pos: [0.55, 0.3], w: 0.04, h: 0.08 },
      { pos: [0.72, 0.5], w: 0.04, h: 0.1 },
      { pos: [0.35, 0.3], w: 0.035, h: 0.07 },
    ];

    chips.forEach((chip) => {
      const cx = toX(chip.pos[0]);
      const cy = toY(chip.pos[1]);
      const cw = chip.w * W;
      const ch = chip.h * H;

      // Find energy near this chip
      let nearestEnergy = 0;
      segments.forEach((seg, i) => {
        const d = Math.hypot(seg.from[0] - chip.pos[0], seg.from[1] - chip.pos[1]);
        if (d < 0.08) {
          nearestEnergy = Math.max(nearestEnergy, Math.max(0, Math.min(1, chargeFront - i)));
        }
      });

      const chipAlpha = 0.02 + nearestEnergy * 0.08;
      const chipBorderAlpha = 0.05 + nearestEnergy * 0.2;

      // Chip body
      ctx.beginPath();
      ctx.roundRect(cx - cw / 2, cy - ch / 2, cw, ch, 2);
      ctx.fillStyle = `rgba(220,0,0,${chipAlpha})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(220,0,0,${chipBorderAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Pin marks on sides
      const pins = 3;
      for (let k = 0; k < pins; k++) {
        const pinY = cy - ch / 2 + (ch / (pins + 1)) * (k + 1);
        // Left pins
        ctx.beginPath();
        ctx.moveTo(cx - cw / 2 - 3, pinY);
        ctx.lineTo(cx - cw / 2, pinY);
        ctx.strokeStyle = `rgba(220,0,0,${chipBorderAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        // Right pins
        ctx.beginPath();
        ctx.moveTo(cx + cw / 2, pinY);
        ctx.lineTo(cx + cw / 2 + 3, pinY);
        ctx.stroke();
      }
    });

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ─────────────────────────────────────────────
// Team card
// ─────────────────────────────────────────────
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
        transitionDelay: `${index * 0.1}s`,
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

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────
export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Start animating 1 full viewport BEFORE section enters screen
      // so animation is already running when user scrolls into view
      const total = el.offsetHeight + viewH * 2;
      const gone = viewH * 2 - rect.top;
      setScrollProgress(Math.max(0, Math.min(1, gone / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Zen+Dots&display=swap');

        .tm-section {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          border-top: 1px solid rgba(220,0,0,0.12);
          padding: 7rem 4.5rem;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        /* Watermark */
        .tm-section::before {
          content: 'TEAM';
          position: absolute;
          right: -0.05em;
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(8rem, 18vw, 18rem);
          font-weight: 800;
          color: rgba(220,0,0,0.025);
          pointer-events: none;
          letter-spacing: -0.05em;
          line-height: 1;
          z-index: 0;
        }

        /* Canvas sits just above the section bg */
        .tm-canvas-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.55;
        }

        /* Everything else above canvas */
        .tm-content {
          position: relative;
          z-index: 2;
        }

        .tm-header {
          margin-bottom: 4rem;
        }

        .tm-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
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
          font-size: 1.1rem;
          color: rgba(180,0,0,0.55);
          line-height: 1.7;
          max-width: 480px;
        }

        .tm-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .tm-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 2rem;
          border: 1px solid rgba(220,0,0,0.1);
          border-radius: 16px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition:
            opacity 0.6s cubic-bezier(.22,1,.36,1),
            transform 0.6s cubic-bezier(.22,1,.36,1),
            box-shadow 0.25s,
            border-color 0.25s;
        }

        .tm-card:hover {
          box-shadow: 0 8px 40px rgba(220,0,0,0.1);
          border-color: rgba(220,0,0,0.28);
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
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
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
        }
      `}</style>

      <section className="tm-section" id="team" ref={sectionRef}>
        {/* Circuit canvas */}
        <div className="tm-canvas-wrap">
          <CircuitCanvas progress={scrollProgress} />
        </div>

        <div className="tm-content">
          <div className="tm-header">
            <p className="tm-label">Team</p>
            <h2 className="tm-headline">
              The People Behind<br />
              <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '1.2em', display: 'block', marginTop: '0.3em' }}>
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
        </div>
      </section>
    </>
  );
}