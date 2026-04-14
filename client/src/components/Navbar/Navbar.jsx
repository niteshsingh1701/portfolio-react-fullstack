import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Shuffle from "../shared/Shuffle";
import ThemeToggle from "../shared/ThemeToggle";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setMenuOpen(false), [pathname]);

    const handleNavClick = (e, href) => {
        if (href.startsWith("/#")) {
            // Smooth scroll to section on home page
            if (pathname === "/") {
                e.preventDefault();
                const id = href.replace("/#", "");
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }
        }
        setMenuOpen(false);
    };

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <div className={styles.container}>
                    {/* Logo */}
                    <Link to="/" className={styles.logo}>
                        <Shuffle text="Nitesh Singh" className={styles.logoText} />
                    </Link>

                    {/* Desktop Links */}
                    <ul className={styles.links} role="list">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="nav-link"
                                    onClick={(e) => handleNavClick(e, href)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.actions}>
                        <ThemeToggle />
                        {/* Hamburger */}
                        <button
                            className={styles.hamburger}
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle mobile menu"
                            aria-expanded={menuOpen}
                        >
                            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className={styles.mobileMenu}>
                        {NAV_LINKS.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className={styles.mobileLink}
                                onClick={(e) => handleNavClick(e, href)}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
