import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./HeroVisual.module.css";

const HeroVisual = () => {
    const visualWrapRef = useRef(null);
    const panelRef = useRef(null);
    const haloRef = useRef(null);
    const scanRef = useRef(null);
    const sparkRef = useRef(null);
    const cardARef = useRef(null);
    const cardBRef = useRef(null);
    const cardCRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(panelRef.current, {
                scale: 0.84,
                opacity: 0,
                y: 28,
                duration: 0.95,
                ease: "back.out(1.5)",
            }).from([cardARef.current, cardBRef.current, cardCRef.current], {
                scale: 0.82,
                opacity: 0,
                y: 18,
                duration: 0.72,
                stagger: 0.12,
            }, "-=0.55");

            gsap.to(panelRef.current, {
                y: -8,
                duration: 4.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(haloRef.current, {
                scale: 1.03,
                opacity: 0.75,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(scanRef.current, {
                xPercent: 100,
                duration: 4.8,
                repeat: -1,
                ease: "none",
            });

            gsap.to(sparkRef.current, {
                y: -10,
                x: 6,
                duration: 2.3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(cardARef.current, {
                y: -12,
                x: 6,
                rotate: -2,
                duration: 4.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(cardBRef.current, {
                y: 10,
                x: -8,
                rotate: 2,
                duration: 5.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(cardCRef.current, {
                y: -4,
                x: 5,
                duration: 4.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to([cardARef.current, cardBRef.current, cardCRef.current], {
                rotateY: 6,
                duration: 7,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, visualWrapRef);

        return () => ctx.revert();
    }, []);

    const handleVisualMove = (event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(panelRef.current, {
            x: x * 18,
            y: y * 12,
            rotateY: x * 10,
            rotateX: -y * 8,
            duration: 0.45,
            ease: "power3.out",
        });

        gsap.to([cardARef.current, cardBRef.current, cardCRef.current], {
            x: x * 12,
            y: y * 10,
            duration: 0.45,
            ease: "power3.out",
        });
    };

    const handleVisualLeave = () => {
        gsap.to(panelRef.current, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
        });

        gsap.to([cardARef.current, cardBRef.current, cardCRef.current], {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    return (
        <div
            className={styles.visualWrap}
            ref={visualWrapRef}
            onMouseMove={handleVisualMove}
            onMouseLeave={handleVisualLeave}
        >
            <div className={styles.visualHalo} ref={haloRef} />
            <div className={styles.visualFrame} ref={panelRef}>
                <div className={styles.frameTopbar}>
                    <span className={styles.frameDot} />
                    <span className={styles.frameDot} />
                    <span className={styles.frameDot} />
                    <span className={styles.frameLabel}>Motion Studio</span>
                </div>

                <div className={styles.frameBody}>
                    <div className={styles.trackColumn}>
                        <span className={styles.trackLabel}>React / UI systems</span>
                        <div className={styles.codeCard}>
                            <span style={{ width: "84%" }} />
                            <span style={{ width: "68%" }} />
                            <span style={{ width: "92%" }} />
                            <span style={{ width: "61%" }} />
                        </div>
                    </div>

                    <div className={styles.centerCore}>
                        <span className={styles.centerBadge}>NKS</span>
                        <span className={styles.centerText}>Designing premium interfaces</span>
                        <span className={styles.centerSubtext}>Dark, tactile, and motion-led.</span>
                    </div>

                    <div className={styles.metricColumn}>
                        <div className={styles.metricCard}>
                            <span className={styles.metricValue}>94%</span>
                            <span className={styles.metricLabel}>Polish</span>
                        </div>
                        <div className={styles.barStack}>
                            <span style={{ width: "72%" }} />
                            <span style={{ width: "88%" }} />
                            <span style={{ width: "54%" }} />
                        </div>
                    </div>
                </div>

                <div className={styles.frameFooter}>
                    <span>Motion system</span>
                    <span>React</span>
                    <span>GSAP</span>
                </div>

                <span className={styles.scanline} ref={scanRef} />
            </div>

            <div className={`${styles.statChip} ${styles.chip1}`}>
                <span className={styles.statNum}>2+</span>
                <span className={styles.statLabel}>Years Exp.</span>
            </div>
            <div className={`${styles.statChip} ${styles.chip2}`}>
                <span className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>Projects</span>
            </div>

            <div className={`${styles.floatCard} ${styles.floatCardA}`} ref={cardARef}>
                <span>Design systems</span>
                <strong>Composable UI</strong>
            </div>

            <div className={`${styles.floatCard} ${styles.floatCardB}`} ref={cardBRef}>
                <span>Interaction</span>
                <strong>Subtle motion</strong>
            </div>

            <div className={`${styles.floatCard} ${styles.floatCardC}`} ref={cardCRef}>
                <span>Frontend craft</span>
                <strong>Premium feel</strong>
            </div>

            <span className={styles.spark} ref={sparkRef} />
        </div>
    );
};

export default HeroVisual;
