import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById, getProjects } from "../services/api";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [nav, setNav] = useState({ prev: null, next: null });
  const pageRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await getProjectById(id);
        setProject(data.data);
      } catch (err) {
        setError("Project not found.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    getProjects()
      .then(({ data }) => {
        if (!cancelled) setAllProjects(data.data || []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (project && allProjects.length > 1) {
      const idx = allProjects.findIndex((p) => p._id === project._id);
      if (idx !== -1) {
        setNav({
          prev: allProjects[(idx - 1 + allProjects.length) % allProjects.length],
          next: allProjects[(idx + 1) % allProjects.length],
        });
      }
    }
  }, [project, allProjects]);

  useEffect(() => {
    if (!loading && project) {
      const timer = setTimeout(() => {
        if (pageRef.current) pageRef.current.classList.add(styles.isLoaded);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, project]);

  useEffect(() => {
    if (!loading && project) {
      const targets = pageRef.current?.querySelectorAll(`.${styles.reveal}`);
      if (!targets || !targets.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.isVisible);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      targets.forEach((t) => observer.observe(t));
      return () => observer.disconnect();
    }
  }, [loading, project, allProjects.length, nav.prev?._id, nav.next?._id]);

  const handleStartProject = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  if (loading)
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className={styles.error}>
        <h1>{error}</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );

  // Dynamic placeholder mapping (Sync with ProjectCard)
  const webPlaceholders = [
    "photo-1498050108023-c5249f4df085",
    "photo-1461749280684-dccba630e2f6",
    "photo-1498758536662-35b82cd15e29",
    "photo-1517694712202-14dd9538aa97",
    "photo-1550745165-9bc0b252726f",
    "photo-1555066931-4365d14bab8c",
    "photo-1587620962725-abab7fe55159",
    "photo-1516116216624-53e697fedbea",
    "photo-1522542550221-31fd19575a2d",
    "photo-1558655146-d09347e92766",
  ];

  const getPlaceholderIndex = (id) => {
    if (!id) return 0;
    const charSum = id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return charSum % webPlaceholders.length;
  };

  const imageId = webPlaceholders[getPlaceholderIndex(id)];
  const fallbackImage = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&q=80&w=2000`;
  const heroImg = project.image || fallbackImage;

  return (
    <article className={styles.page} ref={pageRef}>
      {/* Immersive Hero */}
      <header className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <img src={heroImg} alt={project.title} className={styles.heroImg} />
        <button
          className={styles.heroBack}
          onClick={() => navigate("/")}
          aria-label="Back to project gallery"
        >
          <i className="fas fa-arrow-left" /> Gallery
        </button>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.mainTitle}>{project.title}</h1>
          <div className={styles.heroMeta}>
            <span className={styles.categoryBadge}>
              {Array.isArray(project.category)
                ? project.category.join(" / ")
                : project.category}
            </span>
            {project.featured && (
              <span className={styles.featuredBadge}>Featured</span>
            )}
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.grid}>
          {/* Sidebar: Info */}
          <aside className={styles.sidebar}>
            <div className={styles.stickySidebar}>
              <div className={styles.infoGroup}>
                <h2 className={styles.groupLabel}>Role</h2>
                <p className={styles.groupVal}>Frontend Architecture & UI</p>
              </div>
              <div className={styles.infoGroup}>
                <h2 className={styles.groupLabel}>Tech Stack</h2>
                <div className={styles.stackList}>
                  {project.techStack?.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className={styles.stackCount}>
                  {project.techStack?.length || 0} technologies
                </span>
              </div>
              <div className={styles.infoGroup}>
                <h2 className={styles.groupLabel}>Status</h2>
                <p className={styles.groupVal}>
                  <span
                    className={`${styles.statusDot} ${project.liveUrl ? styles.statusLive : ""}`}
                  />
                  {project.liveUrl ? "Live on the web" : "Case study"}
                </p>
              </div>
              <div className={styles.links}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="gradient-btn"
                  >
                    Visit Live <i className="fas fa-external-link-alt" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="outline-btn"
                  >
                    View Code <i className="fab fa-github" />
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Main: Narrative */}
          <main className={styles.mainContent}>
            <section className={`${styles.narrativeSection} ${styles.reveal}`}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.largePara}>
                {project.longDescription || project.description}
              </p>
            </section>

            {project.features?.length > 0 && (
              <section className={`${styles.narrativeSection} ${styles.reveal}`}>
                <h2 className={styles.sectionTitle}>Key Features</h2>
                <ul className={styles.featureList}>
                  {project.features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <span className={styles.featureIndex}>0{i + 1}</span>
                      <p>{f}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className={`${styles.ctaBand} ${styles.reveal}`}>
              <h2 className={styles.ctaTitle}>
                Like what you see?{" "}
                <span className="serif-font">Let's build something.</span>
              </h2>
              <div className={styles.ctaActions}>
                <button className="gradient-btn" onClick={handleStartProject}>
                  Start a Project <i className="fas fa-arrow-right" />
                </button>
                <a href="mailto:ns1701200jan@gmail.com" className="outline-btn">
                  Email Me
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Prev / Next Project Nav */}
      {allProjects.length > 1 && nav.prev && nav.next && (
        <nav
          className={`container ${styles.projectNav} ${styles.reveal}`}
          aria-label="Browse other projects"
        >
          <Link to={`/project/${nav.prev._id}`} className={styles.navLink}>
            <span className={styles.navLabel}>
              <i className="fas fa-arrow-left" /> Previous Project
            </span>
            <span className={styles.navTitle}>{nav.prev.title}</span>
          </Link>
          <Link
            to={`/project/${nav.next._id}`}
            className={`${styles.navLink} ${styles.navLinkNext}`}
          >
            <span className={styles.navLabel}>
              Next Project <i className="fas fa-arrow-right" />
            </span>
            <span className={styles.navTitle}>{nav.next.title}</span>
          </Link>
        </nav>
      )}
    </article>
  );
};

export default ProjectDetails;
