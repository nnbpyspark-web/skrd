"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    let raf: number;
    let rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      rx += (e.clientX - 12 - rx) * 0.12;
      ry += (e.clientY - 12 - ry) * 0.12;
    };

    const loop = () => {
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const addHover = () => { dot.classList.add("scale-[2]"); ring.classList.add("scale-150"); };
    const rmHover  = () => { dot.classList.remove("scale-[2]"); ring.classList.remove("scale-150"); };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", rmHover);
    });
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" aria-hidden>
      <div ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-saffron-400
          transition-transform duration-[50ms]" />
      <div ref={ringRef}
        className="absolute top-0 left-0 w-6 h-6 rounded-full
          border border-saffron-500/50 transition-transform duration-100" />
    </div>
  );
}
