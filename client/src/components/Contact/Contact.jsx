import { useState } from "react";
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
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
    const [serverMsg, setServerMsg] = useState("");
    const [resumeStatus, setResumeStatus] = useState(null); // null | 'loading' | 'success' | 'error'

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
        setServerMsg("");

        try {
            const { data } = await submitContact(form);
            setStatus("success");
            setServerMsg(data.message || "Message sent!");
            setForm(INITIAL_FORM);
        } catch (err) {
            setStatus("error");
            setServerMsg(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
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
        <section id="contact" className={`section section-alt ${styles.contactSection}`}>
            <div className={`container ${styles.contactContainer}`}>
                <div className={`section-header ${styles.sectionHeader}`}>
                    <span className={styles.eyebrow}>Let's Connect</span>
                    <h2>Get In Touch</h2>
                    <div className="section-divider" />
                </div>

                {/* ── Resume Banner ─────────────────────────────── */}
                <div className={styles.resumeBanner}>
                    <div className={styles.resumeBannerLeft}>
                        <div className={styles.resumeBannerIcon}>
                            <i className="fas fa-file-alt" />
                        </div>
                        <div>
                            <h3 className={styles.resumeBannerTitle}>Want to know more about me?</h3>
                            <p className={styles.resumeBannerSub}>Download my resume — skills, experience &amp; projects, all in one place.</p>
                        </div>
                    </div>
                    <button
                        id="resume-download-btn"
                        onClick={handleResumeDownload}
                        disabled={resumeStatus === "loading"}
                        className={`gradient-btn ${styles.resumeBannerBtn}`}
                    >
                        {resumeStatus === "loading" ? (
                            <><i className="fas fa-spinner fa-spin" /> Downloading...</>
                        ) : resumeStatus === "success" ? (
                            <><i className="fas fa-check" /> Downloaded!</>
                        ) : resumeStatus === "error" ? (
                            <><i className="fas fa-exclamation-triangle" /> Try Again</>
                        ) : (
                            <><i className="fas fa-download" /> Download CV</>
                        )}
                    </button>
                </div>

                <div className={styles.layout}>
                    {/* Left: Info */}
                    <div className={styles.info}>
                        <h3 className={styles.infoTitle}>Let's talk about new opportunities</h3>
                        <p className={styles.infoPara}>
                            I'm currently building this portfolio to explore job opportunities.
                            If you're hiring, have a project that needs a frontend developer,
                            or just want to connect — feel free to reach out.
                        </p>

                        <div className={styles.contactItems}>
                            <div className={styles.contactItem}>
                                <div className={styles.iconBubble}>
                                    <i className="fas fa-envelope" />
                                </div>
                                <div>
                                    <p className={styles.contactLabel}>Email</p>
                                    <a href="mailto:ns1701200jan@gmail.com" className={styles.contactVal}>
                                        ns1701200jan@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconBubble}>
                                    <i className="fas fa-map-marker-alt" />
                                </div>
                                <div>
                                    <p className={styles.contactLabel}>Location</p>
                                    <p className={styles.contactVal}>Noida, India</p>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconBubble}>
                                    <i className="fas fa-phone-alt" />
                                </div>
                                <div>
                                    <p className={styles.contactLabel}>Phone</p>
                                    <a href="tel:8476874298" className={styles.contactVal}>
                                        +91 8476874298
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.socials}>
                            <a
                                href="https://www.linkedin.com/in/niteshsingh1701/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <div className={styles.socialIcon}>
                                    <i className="fab fa-linkedin-in" />
                                </div>
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href="https://github.com/niteshsingh1701"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <div className={styles.socialIcon}>
                                    <i className="fab fa-github" />
                                </div>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* Right: Form + Resume */}
                    <div className={styles.right}>
                        {/* Contact Form */}
                        <div className={`card ${styles.formCard}`}>
                            <h3 className={styles.formTitle}>Send a Message</h3>

                            {status === "success" && (
                                <div className="alert alert-success">
                                    <i className="fas fa-check-circle" /> {serverMsg}
                                </div>
                            )}
                            {status === "error" && (
                                <div className="alert alert-error">
                                    <i className="fas fa-exclamation-circle" /> {serverMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate className={styles.formSketch}>
                                <div className={`form-group ${styles.formGroup}`}>
                                    <label htmlFor="contact-name">Your Name</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={`${styles.formInput} ${errors.name ? "error" : ""}`}
                                        autoComplete="name"
                                    />
                                    {errors.name && <span className="form-error-msg">{errors.name}</span>}
                                </div>

                                <div className={`form-group ${styles.formGroup}`}>
                                    <label htmlFor="contact-email">Email Address</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`${styles.formInput} ${errors.email ? "error" : ""}`}
                                        autoComplete="email"
                                    />
                                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                                </div>

                                <div className={`form-group ${styles.formGroup}`}>
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={5}
                                        placeholder="Tell me about your project or opportunity..."
                                        value={form.message}
                                        onChange={handleChange}
                                        className={`${styles.formTextarea} ${errors.message ? "error" : ""}`}
                                    />
                                    {errors.message && <span className="form-error-msg">{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className={`gradient-btn ${styles.formSubmit}`}
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? (
                                        <><i className="fas fa-spinner fa-spin" /> Sending...</>
                                    ) : (
                                        <><i className="fas fa-paper-plane" /> Send Message</>
                                    )}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
