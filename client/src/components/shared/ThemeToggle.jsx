import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("portfolio-theme");
        return stored ? stored === "dark" : true; // default dark
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "dark" : "light"
        );
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <button
            className={styles.toggle}
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
        >
            <span className={styles.icon}>{isDark ? "☀️" : "🌙"}</span>
        </button>
    );
};

export default ThemeToggle;
