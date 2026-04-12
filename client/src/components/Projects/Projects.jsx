import { useState } from "react";
import useFetchProjects from "../../hooks/useFetchProjects";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "../shared/LoadingSpinner";
import styles from "./Projects.module.css";

const FILTERS = ["All", "React", "WordPress", "HTML/CSS", "Full-Stack"];
const ITEMS_PER_PAGE = 6;

const Projects = () => {
    const { projects, loading, error } = useFetchProjects();
    const [activeFilter, setActiveFilter] = useState("All");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const filtered =
        activeFilter === "All"
            ? projects
            : projects.filter((p) => Array.isArray(p.category) ? p.category.includes(activeFilter) : p.category === activeFilter);

    const visible = filtered.slice(0, visibleCount);

    const handleFilterChange = (f) => {
        setActiveFilter(f);
        setVisibleCount(ITEMS_PER_PAGE); // Reset count when filter changes
    };

    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>My Projects</h2>
                    <div className="section-divider" />
                </div>

                {/* Filter Buttons */}
                <div className={styles.filters}>
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ""}`}
                            onClick={() => handleFilterChange(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* States */}
                {loading && <LoadingSpinner message="Fetching projects..." />}

                {error && (
                    <div className="alert alert-error">
                        <i className="fas fa-exclamation-circle" />
                        {error}
                    </div>
                )}

                {!loading && !error && filtered.length === 0 && (
                    <p className={styles.empty}>No projects found for "{activeFilter}".</p>
                )}

                {/* Grid */}
                {!loading && !error && (
                    <>
                        <div className={styles.grid}>
                            {visible.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>

                        {/* Show More Incremental Loading */}
                        {visibleCount < filtered.length && (
                            <div className={styles.center}>
                                <button
                                    className="outline-btn"
                                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                                >
                                    <i className="fas fa-chevron-down" />
                                    Load More
                                </button>
                            </div>
                        )}

                        {/* Show Less option when everything is loaded */}
                        {visibleCount >= filtered.length && filtered.length > ITEMS_PER_PAGE && (
                            <div className={styles.center}>
                                <button
                                    className="outline-btn"
                                    onClick={() => setVisibleCount(ITEMS_PER_PAGE)}
                                >
                                    <i className="fas fa-chevron-up" />
                                    Show Less
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Projects;
