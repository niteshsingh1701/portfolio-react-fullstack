import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    {
        icon: "fas fa-briefcase",
        title: "Experience",
        body1:
            "Frontend developer with 2+ years of experience building scalable web applications using modern JavaScript frameworks like React and similar ecosystems.",
        body2:
            "Worked on a fintech platform developing dashboards, onboarding flows, and handling complex financial data through APIs, with a strong focus on performance and maintainable architecture.",
        accent: false,
    },
    {
        icon: "fas fa-laptop-code",
        title: "What I Build",
        body1:
            "I specialize in building data-driven interfaces like dashboards, charts, and user workflows that require clean architecture and efficient state management.",
        body2:
            "My focus is on performance, reusability, and delivering production-grade UI.",
        accent: true,
    },
    {
        icon: "fas fa-users",
        title: "How I Work",
        body1:
            "I translate Figma designs into responsive, pixel-perfect UI and collaborate closely with backend teams to understand API structures.",
        body2:
            "I focus on writing clean, maintainable code and optimizing performance for real-world usage and scale.",
        accent: false,
    },
];

const About = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: "top 88%" },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "power3.out",
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className={`section ${styles.aboutSection}`} ref={sectionRef}>
            <div className={`container ${styles.aboutContainer}`}>
                <div className={`section-header ${styles.sectionHeader}`}>
                    <span className={styles.eyebrow}>Who I am</span>
                    <h2>About Me</h2>
                    <div className="section-divider" />
                </div>

                <div className={styles.grid}>
                    {CARDS.map((card, i) => (
                        <div
                            key={card.title}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className={`${styles.card} ${card.accent ? styles.cardAccent : ""}`}
                        >
                            <div className={styles.iconWrap}>
                                <i className={card.icon} />
                            </div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardBody}>{card.body1}</p>
                            <p className={styles.cardBody}>{card.body2}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
