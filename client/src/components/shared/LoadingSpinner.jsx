import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className={styles.wrapper}>
            <div className="spinner" />
            <p className={styles.msg}>{message}</p>
        </div>
    );
};

export default LoadingSpinner;
