import { useEffect } from "react";

export default function LuxuryCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("alhambra-luxury-cursor");

    const dot = document.createElement("div");
    dot.className = "alhambra-cursor-dot";
    const ring = document.createElement("div");
    ring.className = "alhambra-cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };

    const animate = () => {
      ringX += (x - ringX) * 0.15;
      ringY += (y - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      const t = e.target;
      if (t.closest("a, button, [role='button'], input, select, textarea")) {
        ring.classList.add("is-hover");
      } else {
        ring.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    const raf = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("alhambra-luxury-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
