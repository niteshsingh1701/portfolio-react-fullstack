import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollCurve.module.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollCurve = () => {
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Set up the path for the "drawing" effect
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        visibility: "visible",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
      });

      return () => {
        // Cleanup
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className={styles.container}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 2000"
        fill="none"
        preserveAspectRatio="none"
        className={styles.svg}
      >
        <path
          ref={pathRef}
          d="M350,0 C350,300 50,400 50,700 S350,1100 350,1400 S100,1700 100,2000"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeOpacity="0.2"
          strokeLinecap="round"
          style={{ visibility: "hidden" }}
        />
      </svg>
    </div>
  );
};

export default ScrollCurve;
