"use client";

import { useEffect, useRef } from "react";

export function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Stars ────────────────────────────────────────────────────────────────
    const STAR_COUNT = 160;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // ── Shooting stars ────────────────────────────────────────────────────────
    const SHOOT_COUNT = 4;
    interface Shooter {
      x: number; y: number;
      vx: number; vy: number;
      len: number;
      opacity: number;
      active: boolean;
      cooldown: number;
    }
    const shooters: Shooter[] = Array.from({ length: SHOOT_COUNT }, (_, i) => ({
      x: 0, y: 0, vx: 0, vy: 0, len: 0, opacity: 0,
      active: false,
      cooldown: i * 90 + Math.random() * 60,
    }));

    const spawnShooter = (s: Shooter) => {
      s.x = Math.random() * 0.8 + 0.1;
      s.y = Math.random() * 0.4;
      const angle = (Math.random() * 20 + 25) * (Math.PI / 180);
      const speed = Math.random() * 0.004 + 0.003;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.len = Math.random() * 0.08 + 0.06;
      s.opacity = 0;
      s.active = true;
    };

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t++;

      // Draw stars
      for (const s of stars) {
        const tw = Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.opacity + tw * 0.2;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, alpha)})`;
        ctx.fill();
      }

      // Draw shooting stars
      for (const s of shooters) {
        if (!s.active) {
          s.cooldown--;
          if (s.cooldown <= 0) spawnShooter(s);
          continue;
        }

        // Fade in / fade out
        if (s.opacity < 1 && s.x < 0.4) s.opacity = Math.min(1, s.opacity + 0.06);
        else if (s.x > 0.6) s.opacity = Math.max(0, s.opacity - 0.04);

        if (s.opacity <= 0 && s.x > 0.6) {
          s.active = false;
          s.cooldown = Math.random() * 180 + 120;
          continue;
        }

        const x1 = s.x * W;
        const y1 = s.y * H;
        const tailX = (s.x - s.vx * (s.len / Math.hypot(s.vx, s.vy))) * W;
        const tailY = (s.y - s.vy * (s.len / Math.hypot(s.vx, s.vy))) * H;

        const grad = ctx.createLinearGradient(tailX, tailY, x1, y1);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(x1, y1, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x > 1.1 || s.y > 1.1) {
          s.active = false;
          s.cooldown = Math.random() * 180 + 120;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
