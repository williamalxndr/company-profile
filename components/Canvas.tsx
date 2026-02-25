"use client";

import { useEffect, useRef } from "react";

interface CanvasProps {
  progress: number;
}

export default function Canvas({ progress }: CanvasProps) {
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
    let time = 0;

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

    const SEG_L = 65;
    const SEG_T = 14;
    const TUBE_R = 0.6;
    const SPINE_AMP = 0.65;
    const SPINE_FREQ = 2.0;
    const L_MAX = 9.5;

    type Vec3 = [number, number, number];

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

    function buildVerts(t_anim: number): { verts: Vec3[]; normLs: number[] } {
      const spinePoints: Vec3[] = [];
      for (let i = 0; i <= SEG_L; i++) {
        const t = i / SEG_L;
        const y = -L_MAX + 2 * L_MAX * t;
        const shapedT = Math.pow(t, 1.6);
        const baseX = -SPINE_AMP * 1.7 * Math.sin(shapedT * Math.PI * SPINE_FREQ);
        const directionalDrift = 2.4 * (0.5 - t);
        const taper = 1 - 0.5 * t;
        const crawl = 0.55 * Math.sin(t * Math.PI * 2.0 - t_anim); // ← amplitude increased
        const x = baseX * taper + directionalDrift + crawl;
        const z = SPINE_AMP * 0.6 * taper * Math.sin(shapedT * Math.PI * SPINE_FREQ * 0.8 + 1.2);
        spinePoints.push([x, y, z]);
      }

      const verts: Vec3[] = [];
      const normLs: number[] = [];

      for (let i = 0; i <= SEG_L; i++) {
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

        const worldUp: Vec3 = Math.abs(tangent[1]) < 0.99 ? [0,1,0] : [1,0,0];
        const right = normalize(cross(tangent, worldUp));
        const up    = normalize(cross(right, tangent));
        const normL = (i / SEG_L) * 2 - 1;

        for (let j = 0; j <= SEG_T; j++) {
          const θ = (2 * Math.PI * j) / SEG_T;
          const cosθ = Math.cos(θ), sinθ = Math.sin(θ);
          verts.push([
            spinePoints[i][0] + TUBE_R * (cosθ * right[0] + sinθ * up[0]),
            spinePoints[i][1] + TUBE_R * (cosθ * right[1] + sinθ * up[1]),
            spinePoints[i][2] + TUBE_R * (cosθ * right[2] + sinθ * up[2]),
          ]);
          normLs.push(normL);
        }
      }

      return { verts, normLs };
    }

    function colorAt(normL: number, offset: number): string {
      const raw = ((normL + offset) % 2 + 2) % 2;
      const t   = raw < 1 ? raw : 2 - raw;
      let rV: number, gV: number, bV: number, alpha: number;
      if (t < 0.6) {
        const a = t / 0.6;
        rV = Math.round(139 + a * (220 - 139));
        gV = 0; bV = 0;
        alpha = 0.22 + t * 0.4;
      } else {
        const a = Math.pow((t - 0.6) / 0.4, 1.5);
        rV = 255;
        gV = Math.round(a * 160);
        bV = Math.round(a * 120);
        alpha = 0.55 + a * 0.35;
      }
      return `rgba(${rV},${gV},${bV},${alpha.toFixed(2)})`;
    }

    const SIZE  = 420;
    const CAM_Z = 4.0;

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number, number] {
      const depth = CAM_Z - z;
      const s = SIZE / depth;
      return [cx + x * s, cy - y * s, depth];
    }

    const draw = () => {
      frameId = requestAnimationFrame(draw);
      time += 0.004; 

      const dpr = window.devicePixelRatio || 1;
      const cw  = canvas.width  / dpr;
      const ch  = canvas.height / dpr;
      const cx  = cw / 2;
      const cy  = ch / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, cw, ch);

      const { verts, normLs } = buildVerts(time);
      const offset = colorOffsetRef.current;

      // 1. Spine lines
      for (let j = 0; j <= SEG_T; j++) {
        for (let i = 0; i < SEG_L; i++) {
          const idx1 = i * (SEG_T + 1) + j;
          const idx2 = (i + 1) * (SEG_T + 1) + j;
          const [x1, y1] = project(...verts[idx1], cx, cy);
          const [x2, y2] = project(...verts[idx2], cx, cy);
          const color = colorAt(normLs[idx1], offset);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.9;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // 2. Ring lines
      for (let i = 0; i <= SEG_L; i++) {
        for (let j = 0; j < SEG_T; j++) {
          const idx1 = i * (SEG_T + 1) + j;
          const idx2 = i * (SEG_T + 1) + (j + 1);
          const [x1, y1] = project(...verts[idx1], cx, cy);
          const [x2, y2] = project(...verts[idx2], cx, cy);
          const color = colorAt(normLs[idx1], offset);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.2;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }
    };

    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "transparent", overflow: "hidden",
    }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}