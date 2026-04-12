import styles from "./Footer.module.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <p className={styles.copy}>© {year} Nitesh Singh.</p>
                <p className={styles.tagline}>Designed and built with 🛠️ caffeine</p>
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
