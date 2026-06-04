import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import heroSvg from "../../assets/Developer-activity-pana.svg";

const Hero = () => {
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) contentRef.current.classList.add(styles.isLoaded);
      if (visualRef.current) visualRef.current.classList.add(styles.isLoaded);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={styles.heroSection}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content} ref={contentRef}>
          <span className={styles.eyebrow}>Front-end Craftsmanship</span>
          <h1 className={styles.title}>
            Designing <span className="serif-font">Digital</span> <br />
            Experiences with <span className="serif-font">Precision.</span>
          </h1>
          <p className={styles.para}>
            I am Nitesh Singh, a Frontend Developer specialized in building 
            high-performance, data-driven web applications with a focus 
            on refined aesthetics and seamless motion.
          </p>
          <div className={styles.buttons}>
            <button
              className="gradient-btn"
              onClick={() => scrollTo("projects")}
            >
              Explore Work
            </button>
            <button
              className="outline-btn"
              onClick={() => scrollTo("contact")}
            >
              Let's Connect
            </button>
          </div>
        </div>

        <div className={styles.visual} ref={visualRef}>
          <div className={styles.imageWrapper}>
            <img src={heroSvg} alt="Developer Activity" className={styles.heroImg} />
          </div>
        </div>
      </div>
      
      <div className={styles.scrollHint}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;