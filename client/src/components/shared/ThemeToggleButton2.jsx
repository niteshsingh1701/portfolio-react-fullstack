import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./ThemeToggle.module.css";

const ThemeToggleButton2 = () => {
    const buttonRef = useRef(null);
    const thumbRef = useRef(null);
    const sunRef = useRef(null);
    const moonRef = useRef(null);

    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("portfolio-theme");
        return stored ? stored === "dark" : true;
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "dark" : "light"
        );
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    }, [isDark]);

    useEffect(() => {
        if (!buttonRef.current) return;

        gsap.to(thumbRef.current, {
            x: isDark ? 30 : 0,
            duration: 0.38,
            ease: "power3.inOut",
        });

        gsap.to(sunRef.current, {
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.65 : 1,
            rotate: isDark ? -70 : 0,
            transformOrigin: "50% 50%",
            duration: 0.38,
            ease: "power3.inOut",
        });

        gsap.to(moonRef.current, {
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.6,
            rotate: isDark ? 0 : 40,
            transformOrigin: "50% 50%",
            duration: 0.38,
            ease: "power3.inOut",
        });
    }, [isDark]);

    return (
        <button
            ref={buttonRef}
            type="button"
            className={`${styles.toggle} ${isDark ? styles.dark : styles.light}`}
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
        >
            <span className={styles.rail} aria-hidden="true" />

            <span ref={thumbRef} className={styles.thumb} aria-hidden="true">
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
                    <g ref={sunRef} className={styles.sun}>
                        <circle cx="12" cy="12" r="4.4" fill="currentColor" />
                        <path d="M12 2.8v2.4M12 18.8v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </g>
                    <g ref={moonRef} className={styles.moon}>
                        <path d="M15.5 14.7A7.2 7.2 0 0 1 9.2 5.2a7.35 7.35 0 1 0 9.6 9.6 7.2 7.2 0 0 1-3.3-.1Z" fill="currentColor" />
                    </g>
                </svg>
            </span>
        </button>
    );
};

export default ThemeToggleButton2;