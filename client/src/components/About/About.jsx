import { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";

// Import new editorial assets
import experienceSvg from "../../assets/Experience.svg";
import craftSvg from "../../assets/Craft.svg";
import philosophySvg from "../../assets/Philosophy.svg";

const CONTENT = [
    {
        tag: "01",
        title: "The Experience",
        body: "With over 2 years in the frontend landscape, I specialize in architecting scalable web applications. My journey is defined by a commitment to performance and maintainable codebases.",
        subBody: "I've navigated complex fintech ecosystems, developing high-stakes dashboards and onboarding flows where precision and security are paramount.",
        image: experienceSvg
    },
    {
        tag: "02",
        title: "The Craft",
        body: "I build more than just interfaces; I build data-driven workflows. From dynamic charts to complex state management, my focus is on production-grade UI that feels alive.",
        subBody: "Every pixel is intentional, every interaction is a chance to provide value and delight the user.",
        image: craftSvg
    },
    {
        tag: "03",
        title: "The Philosophy",
        body: "Design and development are not separate—they are a single narrative. I translate complex Figma designs into high-performance React systems with zero compromise on quality.",
        subBody: "Collaboration and clean architecture are the foundations of my workflow, ensuring long-term project success.",
        image: philosophySvg
    }
];

const About = () => {
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

    return (
        <section 
            id="about" 
            className={`section ${styles.aboutSection} ${isVisible ? styles.isVisible : ""}`} 
            ref={sectionRef}
        >
            <div className={`container ${styles.aboutContainer}`}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>The Narrative</span>
                    <h2 className={styles.title}>
                        Blending <span className="serif-font">Aesthetic</span> <br />
                        with <span className="serif-font">Performance.</span>
                    </h2>
                    <div className={styles.divider}></div>
                </div>

                <div className={styles.narrativeGrid}>
                    {CONTENT.map((item, i) => (
                        <div 
                            key={item.title} 
                            className={styles.narrativeItem}
                        >
                            <span className={styles.tag}>{item.tag}</span>
                            
                            <div className={styles.itemMain}>
                                <div className={styles.itemContent}>
                                    <h3 className={styles.itemTitle}>{item.title}</h3>
                                    <p className={styles.itemBody}>{item.body}</p>
                                    <p className={styles.itemSubBody}>{item.subBody}</p>
                                </div>
                                
                                <div className={styles.imageWrapper}>
                                    <img src={item.image} alt={item.title} className={styles.narrativeImage} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;