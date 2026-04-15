import { useState, useRef, useEffect, useCallback } from "react";
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
    const [activeDot, setActiveDot] = useState(0);

    const carouselRef = useRef(null);

    const filtered =
        activeFilter === "All"
            ? projects
            : projects.filter((p) =>
                  Array.isArray(p.category)
                      ? p.category.includes(activeFilter)
                      : p.category === activeFilter
              );

    const visible = filtered.slice(0, visibleCount);

    const handleFilterChange = (f) => {
        setActiveFilter(f);
        setVisibleCount(ITEMS_PER_PAGE);
        setActiveDot(0);
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    };

    // Update dot indicator on scroll
    const handleCarouselScroll = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;
        const cardWidth = el.scrollWidth / visible.length;
        const index = Math.round(el.scrollLeft / cardWidth);
        setActiveDot(index);
    }, [visible.length]);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleCarouselScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleCarouselScroll);
    }, [handleCarouselScroll]);

    // Reset dot when filter changes
    useEffect(() => {
        setActiveDot(0);
    }, [activeFilter]);

    const scrollToCard = (index) => {
        const el = carouselRef.current;
        if (!el) return;
        const cardWidth = el.scrollWidth / visible.length;
        el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    };

    return (
        <section id="projects" className={`section ${styles.projectsSection}`}>
            <div className={`container ${styles.projectsContainer}`}>
                <div className={`section-header ${styles.sectionHeader}`}>
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

                {!loading && !error && (
                    <>
                        {/* ─── Desktop Grid ─── */}
                        <div className={styles.grid}>
                            {visible.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>

                        {/* ─── Mobile Carousel ─── */}
                        <div className={styles.carouselWrapper}>
                            <div
                                className={styles.carousel}
                                ref={carouselRef}
                            >
                                {filtered.map((project) => (
                                    <ProjectCard key={project._id} project={project} />
                                ))}
                            </div>

                            {/* Dot indicators */}
                            {filtered.length > 1 && (
                                <div className={styles.dots}>
                                    {filtered.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`${styles.dot} ${activeDot === i ? styles.activeDot : ""}`}
                                            onClick={() => scrollToCard(i)}
                                            aria-label={`Go to project ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ─── Load More / Show Less (desktop only) ─── */}
                        {visibleCount < filtered.length && (
                            <div className={`${styles.center} ${styles.desktopOnly}`}>
                                <button
                                    className="outline-btn"
                                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                                >
                                    <i className="fas fa-chevron-down" />
                                    Load More
                                </button>
                            </div>
                        )}

                        {visibleCount >= filtered.length && filtered.length > ITEMS_PER_PAGE && (
                            <div className={`${styles.center} ${styles.desktopOnly}`}>
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