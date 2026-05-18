import styles from "./Skills.module.css";

const CORE_SKILLS = [
    { icon: "fab fa-react", label: "React.js" },
    {icon: "fab fa-js", label: "Next.js"},
    { icon: "fab fa-node-js", label: "Node.js" },
    { icon: "fab fa-js", label: "JavaScript (ES6+)" },
    { icon: "fas fa-layer-group", label: "Component Architecture" },
    { icon: "fas fa-code-branch", label: "State Management (Redux Toolkit, Context API)" },
    { icon: "fas fa-plug", label: "API Integration & Data Handling" },
    { icon: "fas fa-chart-line", label: "Dashboard & Data-Driven UI" },
    { icon: "fas fa-magic", label: "Animations (GSAP, Framer Motion)" },
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

const AI_SKILLS = [
    { icon: "fas fa-brain", label: "Claude AI - Development & Problem Solving" },
    { icon: "fab fa-github", label: "GitHub Copilot - Code Generation" },
    { icon: "fas fa-comments", label: "Prompt Engineering - AI Workflows" },
    { icon: "fas fa-rocket", label: "AI-Powered Prototyping & Rapid Iteration" },
];

const TOOL_SKILLS = [
    { icon: "fab fa-git-alt", label: "Git" },
    { icon: "fab fa-github", label: "GitHub" },
    { icon: "fas fa-tools", label: "Chrome DevTools" },
    { icon: "fas fa-tools", label: "Lighthouse" },
    { icon: "fas fa-tasks", label: "Jira / Agile Workflow" },
];

const Skills = () => {
    return (
        <section id="skills" className={`section section-alt ${styles.skillsSection}`}>
            <div className={`container ${styles.skillsContainer}`}>
                <div className={`section-header ${styles.sectionHeader}`}>
                    <span className={styles.eyebrow}>Skill Notebook</span>
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

                    {/* AI & PRODUCTIVITY */}
                    <div className={styles.group}>
                        <h3 className={styles.groupTitle}>AI & Productivity</h3>
                        <div className={styles.tags}>
                            {AI_SKILLS.map((s) => (
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