import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById } from "../services/api";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetch = async () => {
            try {
                setLoading(true);
                const { data } = await getProjectById(id);
                if (!cancelled) setProject(data.data);
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.response?.status === 404
                            ? "Project not found."
                            : "Failed to load project details."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetch();
        return () => { cancelled = true; };
    }, [id]);

    if (loading) return (
        <div className={styles.page}>
            <div className="container">
                <LoadingSpinner message="Loading project..." />
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.error}>
                    <span className={styles.errorEmoji}>🔍</span>
                    <h2>{error}</h2>
                    <button className="gradient-btn" onClick={() => navigate("/")}>
                        <i className="fas fa-arrow-left" /> Back to Home
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Back nav */}
                <Link to="/#projects" className={styles.back}>
                    <i className="fas fa-arrow-left" /> All Projects
                </Link>

                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.headerEmoji}>{project.emoji}</span>
                    <div>
                        <div>
                            <span className={styles.categoryBadge}>
                                {Array.isArray(project.category) ? project.category.join(", ") : project.category}
                            </span>
                            <h1 className={styles.title}>{project.title}</h1>
                            <p className={styles.desc}>{project.longDescription || project.description}</p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <i className="fas fa-layer-group" /> Tech Stack
                    </h2>
                    <div className={styles.tags}>
                        {project.techStack?.map((tech) => (
                            <span key={tech} className="tech-badge" style={{ fontSize: "0.9rem", padding: "6px 16px" }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Features */}
                {project.features?.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <i className="fas fa-star" /> Key Features
                        </h2>
                        <ul className={styles.featureList}>
                            {project.features.map((f, i) => (
                                <li key={i} className={styles.featureItem}>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Links */}
                <div className={styles.links}>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gradient-btn"
                        >
                            <i className="fas fa-external-link-alt" /> View Live Project
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="outline-btn"
                        >
                            <i className="fab fa-github" /> View Source
                        </a>
                    )}
                    <button className="outline-btn" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left" /> Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
