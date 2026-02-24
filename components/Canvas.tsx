"use client";

import { useEffect, useRef } from "react";

interface WormholeCanvasProps {
  progress: number;
}

export default function WormholeCanvas({ progress }: WormholeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorOffsetRef = useRef(0);
  const prevProgressRef = useRef(progress);

  useEffect(() => {
    const delta = progress - prevProgressRef.current;
    prevProgressRef.current = progress;
    colorOffsetRef.current += delta * 2;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement?.clientWidth ?? 400;
      const h = canvas.parentElement?.clientHeight ?? 700;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", resize);
    resize();

    /* ── Snake spine: a sinusoidal curve in 3D ───────────── */
    // The central axis of the tube follows a snake/wave path
    // instead of a straight vertical line.
    const SEG_L = 60;   // slices along the spine
    const SEG_T = 14;   // segments around each ring
    const TUBE_R = 0.6; // thicker tube
    const SPINE_AMP = 0.65;
    const SPINE_FREQ = 2.0;
    const L_MAX = 9.5;  // much longer snake

    type Vec3 = [number, number, number];


    const spinePoints: Vec3[] = [];

    for (let i = 0; i <= SEG_L; i++) {
      const t = i / SEG_L; // 0..1
      const y = -L_MAX + 2 * L_MAX * t;

      // non-linear shaping biar lebih organik
      const shapedT = Math.pow(t, 1.6);

      const baseX =
        - SPINE_AMP *
        1.7 *
        Math.sin(shapedT * Math.PI * SPINE_FREQ);

      // drift kanan di atas → kiri di bawah
      // t=0 (atas) = positif
      // t=1 (bawah) = negatif
      const directionalDrift = 2.4 * (0.5 - t);

      const taper = 1 - 0.5 * t;

      const x = baseX * taper + directionalDrift;

      const z =
        SPINE_AMP *
        0.6 *
        taper *
        Math.sin(shapedT * Math.PI * SPINE_FREQ * 0.8 + 1.2);

      spinePoints.push([x, y, z]);
    }

    // For each spine segment, compute local coordinate frame (Frenet frame)
    // so the tube rings are always perpendicular to the spine
    function normalize(v: Vec3): Vec3 {
      const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return [v[0]/len, v[1]/len, v[2]/len];
    }
    function cross(a: Vec3, b: Vec3): Vec3 {
      return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0],
      ];
    }

    // Build tube vertices using Frenet frames
    const verts: Vec3[]    = [];
    const normLs: number[] = [];

    for (let i = 0; i <= SEG_L; i++) {
      // Tangent: direction along the spine
      let tangent: Vec3;
      if (i === 0) {
        tangent = normalize([
          spinePoints[1][0] - spinePoints[0][0],
          spinePoints[1][1] - spinePoints[0][1],
          spinePoints[1][2] - spinePoints[0][2],
        ]);
      } else if (i === SEG_L) {
        tangent = normalize([
          spinePoints[i][0] - spinePoints[i-1][0],
          spinePoints[i][1] - spinePoints[i-1][1],
          spinePoints[i][2] - spinePoints[i-1][2],
        ]);
      } else {
        tangent = normalize([
          spinePoints[i+1][0] - spinePoints[i-1][0],
          spinePoints[i+1][1] - spinePoints[i-1][1],
          spinePoints[i+1][2] - spinePoints[i-1][2],
        ]);
      }

      // Build a perpendicular "up" vector that doesn't flip
      const worldUp: Vec3 = Math.abs(tangent[1]) < 0.99 ? [0,1,0] : [1,0,0];
      const right = normalize(cross(tangent, worldUp));
      const up    = normalize(cross(right, tangent));

      const normL = (i / SEG_L) * 2 - 1; // -1..1 for coloring

      for (let j = 0; j <= SEG_T; j++) {
        const θ = (2 * Math.PI * j) / SEG_T;
        const cosθ = Math.cos(θ), sinθ = Math.sin(θ);
        // point on the ring = spine + radius*(cosθ*right + sinθ*up)
        verts.push([
          spinePoints[i][0] + TUBE_R * (cosθ * right[0] + sinθ * up[0]),
          spinePoints[i][1] + TUBE_R * (cosθ * right[1] + sinθ * up[1]),
          spinePoints[i][2] + TUBE_R * (cosθ * right[2] + sinθ * up[2]),
        ]);
        normLs.push(normL);
      }
    }

    /* ── Colour (scroll-driven) ─────────────────────────── */
    function colorAt(normL: number, offset: number): string {
      const raw = ((normL + offset) % 2 + 2) % 2;
      const t   = raw < 1 ? raw : 2 - raw;

      // dark crimson → brand red → near-white at peak
      // #8b0000 → #dc0000 → #ffffff
      let rV: number, gV: number, bV: number;
      if (t < 0.6) {
        const a = t / 0.6;
        rV = Math.round(139 + a * (220 - 139)); // crimson → red
        gV = 0;
        bV = 0;
      } else {
        const a = (t - 0.6) / 0.4;
        rV = Math.round(220 + a * (255 - 220)); // red → white
        gV = Math.round(a * 255);
        bV = Math.round(a * 255);
      }
      const alpha = 0.22 + t * 0.72; // 0.22 at rest → 0.94 at peak
      return `rgba(${rV},${gV},${bV},${alpha.toFixed(2)})`;
    }

    /* ── Projection ──────────────────────────────────────── */
    const SIZE  = 420;  // px per unit
    const CAM_Z = 4.0;

    function project(
      x: number, y: number, z: number,
      rotY: number,
      cx: number, cy: number
    ): [number, number, number] {
      // Rotate around Y axis for the idle spin
      const cos = Math.cos(rotY), sin = Math.sin(rotY);
      const rx  = x * cos + z * sin;
      const rz  = -x * sin + z * cos;
      const depth = CAM_Z - rz;
      const s   = SIZE / depth;
      return [cx + rx * s, cy - y * s, depth];
    }

    /* ── Render loop ─────────────────────────────────────── */
    const draw = () => {
      frameId = requestAnimationFrame(draw);

      const dpr = window.devicePixelRatio || 1;
      const cw  = canvas.width  / dpr;
      const ch  = canvas.height / dpr;
      const cx  = cw / 2;
      const cy  = ch / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cw, ch);

      const offset = colorOffsetRef.current;

      type Seg = { x1:number; y1:number; x2:number; y2:number; depth:number; color:string; lw:number };
      const segs: Seg[] = [];

      for (let i = 0; i <= SEG_L; i++) {
        for (let j = 0; j <= SEG_T; j++) {
          const idx        = i * (SEG_T + 1) + j;
          const [x1,y1,d1] = project(...verts[idx], 0, cx, cy);
          const nL         = normLs[idx];
          const color      = colorAt(nL, offset);
          const lw         = 1.5;

          // ring line around circumference
          if (j < SEG_T) {
            const [x2,y2,d2] = project(...verts[i*(SEG_T+1)+(j+1)], 0, cx, cy);
            segs.push({ x1,y1,x2,y2, depth:(d1+d2)/2, color, lw });
          }
          // spine line along length
          if (i < SEG_L) {
            const [x2,y2,d2] = project(...verts[(i+1)*(SEG_T+1)+j], 0, cx, cy);
            segs.push({ x1,y1,x2,y2, depth:(d1+d2)/2, color, lw: lw * 0.8 });
          }
        }
      }

      segs.sort((a, b) => b.depth - a.depth);

      for (const s of segs) {
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.strokeStyle = s.color;
        ctx.lineWidth   = Math.max(0.5, s.lw);
        ctx.lineCap     = "round";
        ctx.stroke();
      }
    };

    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#ffffff",
      overflow: "hidden",
      WebkitMaskImage:
        "linear-gradient(to bottom, black 70%, rgba(0,0,0,0) 100%)",
      maskImage:
        "linear-gradient(to bottom, black 70%, rgba(0,0,0,0) 100%)",
    }}
  >
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  </div>
);
}