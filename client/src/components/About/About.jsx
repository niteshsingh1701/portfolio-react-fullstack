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
        body: "With over 3 years in the engineering landscape, I've evolved from building interfaces to architecting resilient, full-stack systems. My focus is on the intersection of performance, infrastructure, and user-centric design.",
        subBody: "I've navigated complex fintech ecosystems and cloud-native architectures, developing high-stakes dashboards where security, scalability, and deployment precision are paramount.",
        image: experienceSvg
    },
    {
        tag: "02",
        title: "The Craft",
        body: "I build more than just UI; I build production-grade environments. My workflow integrates modern DevOps practices and AI-driven optimization to ensure every application is robust and future-proof.",
        subBody: "From Dockerized microservices to pixel-perfect React components, every layer is intentional and engineered for long-term scale.",
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
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className={styles.narrativeImage} 
                                        width="500"
                                        height="500"
                                    />
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