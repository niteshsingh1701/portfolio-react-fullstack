import { useState } from "react";
import { submitContact, getResumeUrl } from "../../services/api";
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

    return (
        <section id="contact" className={`section section-alt`}>
            <div className="container">
                <div className="section-header">
                    <h2>Get In Touch</h2>
                    <div className="section-divider" />
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

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="contact-name">Your Name</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={errors.name ? "error" : ""}
                                        autoComplete="name"
                                    />
                                    {errors.name && <span className="form-error-msg">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-email">Email Address</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={errors.email ? "error" : ""}
                                        autoComplete="email"
                                    />
                                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={5}
                                        placeholder="Tell me about your project or opportunity..."
                                        value={form.message}
                                        onChange={handleChange}
                                        className={errors.message ? "error" : ""}
                                    />
                                    {errors.message && <span className="form-error-msg">{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className="gradient-btn"
                                    disabled={status === "loading"}
                                    style={{ width: "100%", justifyContent: "center" }}
                                >
                                    {status === "loading" ? (
                                        <><i className="fas fa-spinner fa-spin" /> Sending...</>
                                    ) : (
                                        <><i className="fas fa-paper-plane" /> Send Message</>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Resume Download */}
                        <div className={`card ${styles.resumeCard}`}>
                            <div className={styles.resumeIcon}>
                                <i className="fas fa-file-pdf" />
                            </div>
                            <div>
                                <h4 className={styles.resumeTitle}>My Resume</h4>
                                <p className={styles.resumeDesc}>
                                    Download to learn more about my experience and qualifications.
                                </p>
                            </div>
                            <a
                                href={getResumeUrl()}
                                className="gradient-btn"
                                style={{ marginLeft: "auto", flexShrink: 0 }}
                            >
                                <i className="fas fa-download" /> Download
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
