import styles from "./Footer.module.css";

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
                        <div className={styles.socials}>
                            <a href="https://github.com/niteshsingh1701" target="_blank" rel="noreferrer" className={styles.socialLink}>GitHub</a>
                            <span className={styles.sep}>/</span>
                            <a href="https://linkedin.com/in/niteshsingh1701" target="_blank" rel="noreferrer" className={styles.socialLink}>LinkedIn</a>
                        </div>
                        <p className={styles.credit}>Est. 2026</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;