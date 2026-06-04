import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project }) => {
    const { _id, title, category, description } = project;
    
    // Placeholder image mapping based on category or ID
    const placeholderImg = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop`;

    return (
        <Link to={`/project/${_id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={placeholderImg} alt={title} className={styles.image} />
                <div className={styles.overlay}>
                    <div className={styles.content}>
                        <span className={styles.category}>
                            {Array.isArray(category) ? category[0] : category}
                        </span>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.desc}>{description}</p>
                        <span className={styles.cta}>View Case Study</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;