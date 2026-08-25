import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("cursor-none-lg");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);
      const t = e.target as HTMLElement;
      setActive(!!t.closest("a,button,[data-cursor]"));
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x - 20}px, ${ringPos.y - 20}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-lg");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" style={{ opacity: visible ? 1 : 0 }}>
      <div ref={dot} className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-cyan-400" />
      <div
        ref={ring}
        className="absolute top-0 left-0 h-10 w-10 rounded-full border border-violet-500/70 transition-[width,height,background-color,border-color] duration-300"
        style={{
          backgroundColor: active ? "rgba(124,58,237,0.18)" : "transparent",
          transform: "translate3d(-100px,-100px,0)",
          scale: active ? "1.5" : "1",
        }}
      />
    </div>
  );
}
