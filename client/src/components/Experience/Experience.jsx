import { useEffect, useRef, useState } from "react";
import { experiences } from "../../data/experienceData";
import styles from "./Experience.module.css";

// Import visual asset
import standoutSvg from "../../assets/Stand-out.svg";

const Experience = () => {
    const [activeId, setActiveId] = useState(experiences[0].id);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.05 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const activeExp = experiences.find((e) => e.id === activeId);

    return (
        <section 
            id="experience" 
            className={`${styles.section} ${isVisible ? styles.isVisible : ""}`} 
            ref={sectionRef}
        >
            {/* Background Visual Asset */}
            <div className={styles.visualWrapper}>
                <img 
                    src={standoutSvg} 
                    alt="" 
                    className={styles.standoutImage} 
                    width="400"
                    height="400"
                />
            </div>

            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Professional Path</span>
                    <h2 className={styles.title}>
                        Selected <span className="serif-font">Experience</span> & <br />
                        Career <span className="serif-font">Timeline.</span>
                    </h2>
                </div>

                <div className={styles.layout}>
                    {/* Left: Typographic Timeline */}
                    <nav className={styles.timeline} aria-label="Career timeline">
                        {experiences.map((exp) => (
                            <button
                                key={exp.id}
                                className={`${styles.timelineItem} ${activeId === exp.id ? styles.active : ""}`}
                                onClick={() => setActiveId(exp.id)}
                            >
                                <span className={styles.date}>{exp.duration}</span>
                                <div className={styles.timelineContent}>
                                    <span className={styles.company}>{exp.company}</span>
                                    <span className={styles.role}>{exp.role}</span>
                                </div>
                                {activeId === exp.id && <span className={styles.indicator} />}
                            </button>
                        ))}
                    </nav>

                    {/* Right: Detailed Narrative */}
                    <div className={styles.details}>
                        <div className={styles.detailHeader}>
                            <h3 className={styles.detailTitle}>
                                {activeExp.role} <span className={styles.at}>at</span> <span className="serif-font">{activeExp.company}</span>
                            </h3>
                            <div className={styles.meta}>
                                <span>{activeExp.location}</span>
                                <span className={styles.sep}>•</span>
                                <span>{activeExp.type}</span>
                            </div>
                        </div>
                        
                        <ul className={styles.highlights}>
                            {activeExp.highlights.map((point, i) => (
                                <li key={i} className={styles.highlight}>
                                    {point}
                                </li>
                            ))}
                        </ul>

                        <div className={styles.tags}>
                            {activeExp.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;