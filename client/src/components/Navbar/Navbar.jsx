import { useLocation, Link } from "react-router-dom";
import StaggeredMenu from "./StaggeredMenu";
import Shuffle from "../shared/Shuffle";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", link: "https://github.com/niteshsingh1701" },
  { label: "LinkedIn", link: "https://linkedin.com/in/niteshsingh1701" },
];

const Navbar = () => {
  const { pathname } = useLocation();

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        const id = href.replace("/#", "");
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const top =
            el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  const menuItems = NAV_LINKS.map((link) => ({
    label: link.label,
    link: link.href,
    onClick: (e) => handleNavClick(e, link.href),
    ariaLabel: `Go to ${link.label} section`,
  }));

  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={SOCIAL_LINKS}
      logoComponent={
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "var(--text-primary)",
            }}
          >
            <Shuffle text="Nitesh Singh" />
          </span>
        </Link>
      }
      colors={["var(--bg-secondary)", "var(--accent)"]}
      displayItemNumbering={true}
      position="right"
    />
  );
};

export default Navbar;
