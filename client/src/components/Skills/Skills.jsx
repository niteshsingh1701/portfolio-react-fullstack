import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css";

// Import background asset
import toolsSvg from "../../assets/tools.svg";

const SKILL_GROUPS = [
    {
        category: "Core Expertise",
        skills: ["React.js", "Next.js", "Node.js", "JavaScript (ES6+)", "Component Architecture", "Redux Toolkit", "Context API", "API Integration", "GSAP"]
    },
    {
        category: "Frontend & UI",
        skills: ["HTML5", "CSS3 / SCSS", "Tailwind CSS", "Bootstrap", "Responsive Design", "Accessibility (WCAG)", "SEO Best Practices", "Performance Optimization"]
    },
    {
        category: "AI & Innovation",
        skills: ["Claude AI Workflows", "GitHub Copilot", "Prompt Engineering", "AI-Powered Prototyping", "Rapid Iteration Systems"]
    },
    {
        category: "Tools & Process",
        skills: ["Git", "GitHub", "Chrome DevTools", "Lighthouse", "Jira", "Agile Methodologies", "Figma-to-Code"]
    }
];

const Skills = () => {
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
            id="skills" 
            className={`${styles.section} ${isVisible ? styles.isVisible : ""}`} 
            ref={sectionRef}
        >
            {/* Background Visual Asset */}
            <div className={styles.visualWrapper}>
                <img src={toolsSvg} alt="" className={styles.toolsImage} />
            </div>

            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>The Toolkit</span>
                    <h2 className={styles.title}>
                        Technical <span className="serif-font">Proficiency</span> & <br />
                        Digital <span className="serif-font">Capabilities.</span>
                    </h2>
                </div>

                <div className={styles.grid}>
                    {SKILL_GROUPS.map((group) => (
                        <div key={group.category} className={styles.group}>
                            <h3 className={styles.groupTitle}>{group.category}</h3>
                            <div className={styles.tags}>
                                {group.skills.map((skill) => (
                                    <span key={skill} className={styles.tag}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <footer className={styles.footer}>
                    <p className={styles.statement}>
                        Continuously evolving at the intersection of design precision and technical excellence.
                    </p>
                </footer>
            </div>
        </section>
    );
};

export default Skills;