import { memo } from "react";
import styles from "./Shuffle.module.css";

const Shuffle = ({ text, className = "", as: Component = "span" }) => {
    return (
        <Component
            className={`${styles.shuffle} ${className}`.trim()}
            aria-label={typeof text === "string" ? text : undefined}
        >
            {text}
        </Component>
    );
};

export default memo(Shuffle);