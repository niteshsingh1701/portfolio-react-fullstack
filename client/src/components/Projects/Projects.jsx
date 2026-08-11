import { useState, useRef, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.05 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) =>
          Array.isArray(p.category)
            ? p.category.includes(activeFilter)
            : p.category === activeFilter,
        );

  const visible = filtered.slice(0, visibleCount);

  const handleFilterChange = (f) => {
    setActiveFilter(f);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section
      id="projects"
      className={`${styles.projectsSection} ${isVisible ? styles.isVisible : ""}`}
      ref={sectionRef}
    >
      <div className={`container ${styles.projectsContainer}`}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Portfolio</span>
          <h2 className={styles.title}>
            Digital <span className="serif-font">Products</span> & <br />
            Client <span className="serif-font">Showcase.</span>
          </h2>
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
          <p className={styles.empty}>
            No projects found for "{activeFilter}".
          </p>
        )}

        {!loading && !error && (
          <>
            <div className={styles.grid}>
              {visible.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filtered.length && (
              <div className={styles.center}>
                <button
                  className="outline-btn"
                  onClick={() =>
                    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
                  }
                >
                  View More Projects
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
