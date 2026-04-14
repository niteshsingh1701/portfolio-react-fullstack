import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project }) => {
    const { _id, emoji, title, description, techStack, features, liveUrl } = project;

    return (
        <div className={`project-card ${styles.card}`}>
            <div className={`project-inner ${styles.inner}`}>
                {/* ─── Front ─── */}
                <div className={`project-front ${styles.front}`}>
                    {/* Emoji banner */}
                    <div className={styles.banner}>
                        <span className={styles.emoji}>{emoji}</span>
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.desc}>{description}</p>
                        <div className={styles.tags}>
                            {techStack?.slice(0, 4).map((tech) => (
                                <span key={tech} className="tech-badge">
                                    {tech}
                                </span>
                            ))}
                            {techStack?.length > 4 && (
                                <span className="tech-badge">+{techStack.length - 4}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ─── Back ─── */}
                <div className={`project-back ${styles.back}`}>
                    <h3 className={styles.backTitle}>{title}</h3>
                    <ul className={styles.features}>
                        {features?.slice(0, 5).map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                    <div className={styles.backActions}>
                        {liveUrl && (
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.liveBtn}
                            >
                                <i className="fas fa-external-link-alt" /> View Live
                            </a>
                        )}
                        <Link to={`/project/${_id}`} className={styles.detailBtn}>
                            <i className="fas fa-info-circle" /> Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
