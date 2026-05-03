import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    const year = new Date().getFullYear();
    const [quote, setQuote] = useState("Designed and built with caffeine");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
            const data = await response.json();
            if (data.success && data.data) {
                setQuote(data.data.content);
                setAuthor(data.data.author);
            }
        } catch (error) {
            console.error("Failed to fetch quote:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
        const intervalId = setInterval(fetchQuote, 12 * 60 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <p className={styles.copy}>© {year} Nitesh Singh.</p>
                <p className={styles.tagline}>
                    {loading ? "Loading..." : quote}
                    {author && <span> — {author}</span>}
                </p>
                <div className={styles.socials}>
                    <a
                        href="https://github.com/niteshsingh1701"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className={styles.icon}
                    >
                        <i className="fab fa-github" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/niteshsingh1701/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className={styles.icon}
                    >
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
