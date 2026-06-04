import { useState, useEffect, useRef } from "react";
import { submitContact, getResume } from "../../services/api";
import styles from "./Contact.module.css";

const INITIAL_FORM = { name: "", email: "", message: "" };

const validate = ({ name, email, message }) => {
    const errors = {};
    if (!name.trim() || name.trim().length < 2)
        errors.name = "Name must be at least 2 characters.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
        errors.email = "Please enter a valid email address.";
    if (!message.trim() || message.trim().length < 10)
        errors.message = "Message must be at least 10 characters.";
    return errors;
};

const Contact = () => {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [serverMsg, setServerMsg] = useState("");
    const [resumeStatus, setResumeStatus] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.isVisible);
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fieldErrors = validate(form);
        if (Object.keys(fieldErrors).length) {
            setErrors(fieldErrors);
            return;
        }

        setStatus("loading");
        try {
            const { data } = await submitContact(form);
            setStatus("success");
            setServerMsg(data.message || "Message sent!");
            setForm(INITIAL_FORM);
        } catch (err) {
            setStatus("error");
            setServerMsg(err.response?.data?.message || "Something went wrong.");
        }
    };

    const handleResumeDownload = async (e) => {
        e.preventDefault();
        setResumeStatus("loading");
        try {
            const { data } = await getResume();
            if (data.success && data.url) {
                const link = document.createElement("a");
                link.href = data.url;
                link.setAttribute("download", "Nitesh_Singh_Resume.pdf");
                link.click();
                setResumeStatus("success");
                setTimeout(() => setResumeStatus(null), 3000);
            }
        } catch (err) {
            setResumeStatus("error");
            setTimeout(() => setResumeStatus(null), 3000);
        }
    };

    return (
        <section id="contact" className={styles.section} ref={sectionRef}>
            <div className="container">
                <div className={styles.layout}>
                    {/* Left: Narrative Spread */}
                    <div className={styles.narrative}>
                        <span className={styles.eyebrow}>Start an Inquiry</span>
                        <h2 className={styles.title}>
                            Let’s start a <br />
                            <span className="serif-font">Conversation.</span>
                        </h2>
                        
                        <div className={styles.details}>
                            <div className={styles.detailGroup}>
                                <span className={styles.label}>Direct Inquiry</span>
                                <a href="mailto:ns1701200jan@gmail.com" className={styles.link}>ns1701200jan@gmail.com</a>
                            </div>
                            <div className={styles.detailGroup}>
                                <span className={styles.label}>Social Connection</span>
                                <div className={styles.socialLinks}>
                                    <a href="https://linkedin.com/in/niteshsingh1701" target="_blank" rel="noreferrer" className={styles.link}>LinkedIn</a>
                                    <span className={styles.sep}>/</span>
                                    <a href="https://github.com/niteshsingh1701" target="_blank" rel="noreferrer" className={styles.link}>GitHub</a>
                                </div>
                            </div>
                        </div>

                        <button 
                            className={styles.resumeBtn} 
                            onClick={handleResumeDownload}
                            disabled={resumeStatus === "loading"}
                        >
                            {resumeStatus === "loading" ? "Fetching Resume..." : "Download Curriculum Vitae"}
                        </button>
                    </div>

                    {/* Right: Stationery Form */}
                    <div className={styles.formContainer}>
                        {status === "success" ? (
                            <div className={styles.successMsg}>
                                <h3 className="serif-font">Thank you.</h3>
                                <p>Your message has been received. I'll get back to you shortly.</p>
                                <button className={styles.resetBtn} onClick={() => setStatus(null)}>Send another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formField}>
                                    <label className={styles.fieldLabel}>Your Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.fieldLabel}>Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.fieldLabel}>How can I help you?</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={form.message}
                                        onChange={handleChange}
                                        className={`${styles.input} ${errors.message ? styles.inputError : ""}`}
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                                </div>

                                <button 
                                    type="submit" 
                                    className={styles.submitBtn}
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? "Sending..." : "Submit Inquiry"}
                                </button>
                                
                                {status === "error" && <p className={styles.serverError}>{serverMsg}</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;