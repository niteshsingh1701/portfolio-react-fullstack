import styles from "./Skills.module.css";

const CORE_SKILLS = [
    { icon: "fab fa-react", label: "React.js" },
    { icon: "fab fa-js", label: "JavaScript (ES6+)" },
    { icon: "fas fa-layer-group", label: "Component Architecture" },
    { icon: "fas fa-code-branch", label: "State Management (Redux Toolkit, Context API)" },
    { icon: "fas fa-plug", label: "API Integration & Data Handling" },
    { icon: "fas fa-chart-line", label: "Dashboard & Data-Driven UI" },
];

const FRONTEND_SKILLS = [
    { icon: "fab fa-html5", label: "HTML5" },
    { icon: "fab fa-css3-alt", label: "CSS3 / SCSS" },
    { icon: "fas fa-wind", label: "Tailwind CSS" },
    { icon: "fab fa-bootstrap", label: "Bootstrap" },
    { icon: "fas fa-mobile-alt", label: "Responsive & Mobile-First Design" },
    { icon: "fas fa-universal-access", label: "Accessibility (WCAG)" },
    { icon: "fas fa-tachometer-alt", label: "Performance Optimization" },
];

const ADDITIONAL_SKILLS = [
    { icon: "fas fa-server", label: "Node.js (Basics)" },
    { icon: "fas fa-network-wired", label: "REST API Architecture" },
    { icon: "fab fa-wordpress", label: "WordPress Development" },
    { icon: "fas fa-magic", label: "Animations (GSAP, Framer Motion)" },
];

const TOOL_SKILLS = [
    { icon: "fab fa-git-alt", label: "Git" },
    { icon: "fab fa-github", label: "GitHub" },
    { icon: "fas fa-tools", label: "Chrome DevTools" },
    { icon: "fas fa-tasks", label: "Jira / Agile Workflow" },
];

const Skills = () => {
    return (
        <section id="skills" className="section section-alt">
            <div className="container">
                <div className="section-header">
                    <h2>Skills & Expertise</h2>
                    <div className="section-divider" />
                </div>

                <div className={styles.grid}>

                    {/* CORE */}
                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>Core Expertise</h3>
                        <div className={styles.tags}>
                            {CORE_SKILLS.map((s) => (
                                <span key={s.label} className="skill-tag core">
                                    <i className={s.icon} />
                                    {s.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* FRONTEND */}
                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>Frontend Development</h3>
                        <div className={styles.tags}>
                            {FRONTEND_SKILLS.map((s) => (
                                <span key={s.label} className="skill-tag">
                                    <i className={s.icon} />
                                    {s.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ADDITIONAL */}
                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>Additional Skills</h3>
                        <div className={styles.tags}>
                            {ADDITIONAL_SKILLS.map((s) => (
                                <span key={s.label} className="skill-tag">
                                    <i className={s.icon} />
                                    {s.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* TOOLS */}
                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>Tools & Workflow</h3>
                        <div className={styles.tags}>
                            {TOOL_SKILLS.map((s) => (
                                <span key={s.label} className="skill-tag tools">
                                    <i className={s.icon} />
                                    {s.label}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                <p className={styles.quote}>
                    Focused on building scalable, high-performance frontend systems with real-world impact.
                </p>
            </div>
        </section>
    );
};

export default Skills;