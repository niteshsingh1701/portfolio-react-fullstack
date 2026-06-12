import styles from "./Footer.module.css";
import ThemeToggle from "../shared/ThemeToggle";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.divider}></div>
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <p className={styles.copy}>© {year} Nitesh Singh.</p>
                        <p className={styles.tagline}>Crafting with intention & precision.</p>
                    </div>
                    
                    <div className={styles.right}>
                        <div className={styles.topRow}>
                            <div className={styles.socials}>
                                <a href="https://github.com/niteshsingh1701" target="_blank" rel="noreferrer" className={styles.socialLink}>GitHub</a>
                                <span className={styles.sep}>/</span>
                                <a href="https://linkedin.com/in/niteshsingh1701" target="_blank" rel="noreferrer" className={styles.socialLink}>LinkedIn</a>
                            </div>
                            <div className={styles.toggleWrapper}>
                                <span className={styles.vSep}></span>
                                <ThemeToggle />
                            </div>
                        </div>
                        <p className={styles.credit}>Est. 2026</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;