import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project }) => {
    const { _id, title, category, description } = project;
    
    // Dynamic placeholder mapping for variety
    const webPlaceholders = [
        "photo-1498050108023-c5249f4df085", // Coding on macbook
        "photo-1461749280684-dccba630e2f6", // Web dev screen
        "photo-1498758536662-35b82cd15e29", // Minimal workspace
        "photo-1517694712202-14dd9538aa97", // Code lines
        "photo-1550745165-9bc0b252726f", // Tech gear
        "photo-1555066931-4365d14bab8c", // VS Code
        "photo-1587620962725-abab7fe55159", // Programming
        "photo-1516116216624-53e697fedbea", // Software dev
        "photo-1522542550221-31fd19575a2d", // UI Design
        "photo-1558655146-d09347e92766"  // App interface
    ];

    // Simple hash function to get a consistent index from the project ID
    const getPlaceholderIndex = (id) => {
        if (!id) return 0;
        const charSum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return charSum % webPlaceholders.length;
    };

    const imageId = webPlaceholders[getPlaceholderIndex(_id)];
    const fallbackImage = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&q=80&w=1000`;
    const displayImage = project.image || fallbackImage;

    return (
        <Link to={`/project/${_id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img 
                    src={displayImage} 
                    alt={title} 
                    className={styles.image} 
                    width="600"
                    height="400"
                />
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