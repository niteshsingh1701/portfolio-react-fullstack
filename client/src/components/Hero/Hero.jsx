import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";
import HeroVisual from "./HeroVisual/HeroVisual";

const ROLES = [
  "Frontend Developer",
  "React Developer",
  "UI Developer",
  "Full-Stack Developer",
  "HTML/CSS Developer",
];

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const paraRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { y: -20, opacity: 0, duration: 0.7 })
        .from(h1Ref.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(h2Ref.current, { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(paraRef.current, { y: 25, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          btnsRef.current.children,
          { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 },
          "-=0.4",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={`${styles.hero} hero-pattern`} ref={heroRef}>
      <div className={`container ${styles.inner}`}>
        {/* Left: Text */}
        <div className={styles.content}>
          <div className="available-badge" ref={badgeRef}>
            <span className="available-dot" />
            Available for work
          </div>

          <h1 ref={h1Ref} className={styles.title}>
            Hi, I'm <span className="gradient-text">Nitesh Kumar Singh</span>
          </h1>

          <h2 ref={h2Ref} className={styles.subtitle}>
            <span className="animated-text-wrapper">
              {ROLES.map((role) => (
                <span key={role} className="animated-text gradient-text">
                  {role}
                </span>
              ))}
            </span>
          </h2>

          <p ref={paraRef} className={styles.para}>
            I create beautiful, responsive websites and web apps with modern
            technologies and animations that bring your vision to life.
          </p>

          <div ref={btnsRef} className={styles.buttons}>
            <button
              className="gradient-btn"
              onClick={() => scrollTo("projects")}
            >
              <i className="fas fa-folder-open" />
              View Projects
            </button>
            <button className="outline-btn" onClick={() => scrollTo("contact")}>
              <i className="fas fa-paper-plane" />
              Contact Me
            </button>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
};

export default Hero;
