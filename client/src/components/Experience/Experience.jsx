import { useEffect, useRef, useState } from "react";
import { experiences, stats } from "../../data/experienceData";
import styles from "./Experience.module.css";

const Experience = () => {
    const [activeId, setActiveId] = useState(experiences[0].id);
    const [animating, setAnimating] = useState(false);
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const cardRef = useRef(null);

    const activeExp = experiences.find((e) => e.id === activeId);

    // Animate section in on scroll — section only, not timeline items
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add(styles.visible);
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const handleSelect = (id) => {
        if (id === activeId || animating) return;
        setAnimating(true);
        cardRef.current?.classList.add(styles.cardExit);
        setTimeout(() => {
            setActiveId(id);
            cardRef.current?.classList.remove(styles.cardExit);
            cardRef.current?.classList.add(styles.cardEnter);
            setTimeout(() => {
                cardRef.current?.classList.remove(styles.cardEnter);
                setAnimating(false);
            }, 350);
        }, 200);
    };

    return (
        <section id="experience" className={`section ${styles.section}`} ref={sectionRef}>
            <div className="container">
                {/* Header */}
                <div className={`section-header ${styles.header}`}>
                    <span className={styles.eyebrow}>Career Journey</span>
                    <h2>Work Experience</h2>
                    <div className="section-divider" />
                    <p className={styles.subtitle}>
                        Where I've worked and what I've built along the way.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className={styles.statsBar}>
                    {stats.map((s, i) => (
                        <div className={styles.statItem} key={i} style={{ "--delay": `${i * 0.1}s` }}>
                            <span className={`gradient-text ${styles.statValue}`}>{s.value}</span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Main Layout */}
                <div className={styles.layout}>
                    {/* Left: Timeline Nav — wrapped for the mobile fade hint */}
                    <div className={styles.timelineWrapper}>
                        <nav className={styles.timeline} ref={timelineRef} aria-label="Work experience timeline">
                            {experiences.map((exp, i) => (
                                <button
                                    key={exp.id}
                                    className={`${styles.timelineItem} ${activeId === exp.id ? styles.active : ""}`}
                                    onClick={() => handleSelect(exp.id)}
                                    style={{ "--accent-color": exp.color, "--delay": `${i * 0.12}s` }}
                                    aria-selected={activeId === exp.id}
                                >
                                    {/* Connector line */}
                                    {i < experiences.length - 1 && (
                                        <span className={styles.connector} />
                                    )}

                                    {/* Dot */}
                                    <span className={styles.dot}>
                                        <i className={exp.icon} />
                                        {exp.current && <span className={styles.liveRing} />}
                                    </span>

                                    {/* Info */}
                                    <div className={styles.timelineMeta}>
                                        <div className={styles.topRow}>
                                            <strong className={styles.companyName}>{exp.company}</strong>
                                            {exp.current && (
                                                <span className={styles.presentBadge}>
                                                    <span className={styles.presentDot} /> Now
                                                </span>
                                            )}
                                            {!exp.current && (
                                                <span className={styles.typeBadge}>{exp.type}</span>
                                            )}
                                        </div>
                                        <span className={styles.roleSmall}>{exp.role}</span>
                                        <span className={styles.durationSmall}>
                                            <i className="fas fa-calendar-alt" /> {exp.duration}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </nav>

                        {/* Mobile-only: swipe hint + progress dots */}
                        <div className={styles.mobileNav}>
                            <span className={styles.swipeHint}>
                                <i className="fas fa-hand-point-right" /> Swipe to explore
                            </span>
                            <div className={styles.scrollDots}>
                                {experiences.map((exp) => (
                                    <button
                                        key={exp.id}
                                        className={`${styles.dot_indicator} ${activeId === exp.id ? styles.dotActive : ""}`}
                                        onClick={() => handleSelect(exp.id)}
                                        style={{ "--accent-color": exp.color }}
                                        aria-label={exp.company}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Detail Card */}
                    <div className={styles.detailCard} ref={cardRef} style={{ "--accent-color": activeExp.color }}>
                        {/* Card Header — always visible, not scrolled */}
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIconWrap}>
                                <i className={activeExp.icon} />
                            </div>
                            <div className={styles.cardTitleGroup}>
                                <h3 className={styles.cardRole}>{activeExp.role}</h3>
                                <div className={styles.cardCompanyRow}>
                                    <span className={styles.cardCompany}>{activeExp.company}</span>
                                    {activeExp.client && (
                                        <>
                                            <span className={styles.clientSep}>·</span>
                                            <span className={styles.cardClient}>
                                                <i className="fas fa-users" /> {activeExp.client}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className={styles.cardMeta}>
                                    <span>
                                        <i className="fas fa-calendar-alt" /> {activeExp.duration}
                                    </span>
                                    <span>
                                        <i className="fas fa-map-marker-alt" /> {activeExp.location}
                                    </span>
                                    <span>
                                        <i className="fas fa-briefcase" /> {activeExp.type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className={styles.cardDivider} />

                        {/* Scrollable body — highlights + tags */}
                        <div className={styles.cardBody}>
                            {/* Highlights */}
                            <ul className={styles.highlights}>
                                {activeExp.highlights.map((point, i) => (
                                    <li key={i} className={styles.highlight} style={{ "--i": i }}>
                                        <span className={styles.bullet}>
                                            <i className="fas fa-arrow-right" />
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            {/* Tags */}
                            <div className={styles.tags}>
                                {activeExp.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
