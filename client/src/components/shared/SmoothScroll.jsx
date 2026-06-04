import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = () => {
  useEffect(() => {
    // Official standard Lenis setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Track scroll for reveal effects
    lenis.on("scroll", () => {
      const reveals = document.querySelectorAll(".reveal-on-scroll");
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add("is-visible");
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;