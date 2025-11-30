"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

const Hero = () => {
    const containerRef = useRef(null);
    const bubblesRef = useRef([]);

    const technologies = [
  // Top row
  { name: "React", icon: "/icons/react.svg", size: 100, x: "10%", y: "10%", bg: "#ffffff00" },
  { name: "Next.js", icon: "/icons/nextjs.svg", size: 90, x: "45%", y: "5%", bg: "#ffffff00" },
  { name: "TypeScript", icon: "/icons/typescript.svg", size: 80, x: "80%", y: "10%", bg: "#ffffff00" },

  // Middle row (spread nicely)
  { name: "Java", icon: "/icons/java.svg", size: 85, x: "8%", y: "40%", bg: "#ffffff00" },
  { name: "AI", icon: "/icons/ai.svg", size: 75, x: "90%", y: "10%", bg: "#ffffff00" },
  { name: "Python", icon: "/icons/python.svg", size: 95, x: "75%", y: "42%", bg: "#ffffff00" },

  // Bottom row (no overlaps)
  { name: "Cybersecurity", icon: "/icons/cybersecurity.svg", size: 75, x: "12%", y: "75%", bg: "#ffffff00" },
  { name: "Machine Learning", icon: "/icons/machine-learning.svg", size: 75, x: "45%", y: "80%", bg: "#ffffff00" },
  { name: "Data Science", icon: "/icons/data-science.svg", size: 75, x: "78%", y: "75%", bg: "#ffffff00" },

  // Extra floating icon (tools)
  { name: "Tools", icon: "/icons/tools.svg", size: 75, x: "5%", y: "5%", bg: "#ffffff00" },
];


    useEffect(() => {
        // clear any leftover refs
        bubblesRef.current = bubblesRef.current.slice(0, technologies.length);

        const ctx = gsap.context(() => {
            bubblesRef.current.forEach((bubble, i) => {
                if (!bubble) return;

                gsap.to(bubble, {
                    y: "+=30",
                    x: "+=20",
                    rotation: "+=10",
                    duration: 3 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2,
                });

                gsap.to(bubble, {
                    rotation: 360,
                    duration: 20 + Math.random() * 10,
                    repeat: -1,
                    ease: "none",
                });

                gsap.from(bubble, {
                    opacity: 0,
                    scale: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    delay: 0.5 + i * 0.1,
                });
            });

            // content animation
            gsap.from(`.${styles.content} > *`, {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, [technologies.length]); // re-run only if tech length changes

    return (
        <section className={styles.heroSection} ref={containerRef}>
            <div className={styles.backgroundGradient} />

            <div className={styles.bubblesContainer}>
                {technologies.map((tech, index) => (
                    <div
                        key={tech.name}
                        ref={(el) => (bubblesRef.current[index] = el)}
                        className={styles.bubble}
                        style={{
                            width: `${tech.size}px`,
                            height: `${tech.size}px`,
                            left: tech.x,
                            top: tech.y,
                            background: tech.bg,
                        }}
                        aria-label={tech.name}
                        role="img"
                    >
                        <img
                            src={tech.icon}
                            alt={tech.name}
                            className={styles.bubbleIcon}
                        
                        />
                    </div>
                ))}
            </div>

            <div className={styles.content}>
                <h1 className={styles.heading}>
                    Master the Future of <br />
                    Tech & Innovation
                </h1>
                <p className={styles.subheading}>
                    Launch your career with industry-leading training in Web Development,
                    Data Science, AI, and more. Learn from experts and get placed.
                </p>
                <Link href="/courses" className={styles.ctaButton}>
                    Explore Courses
                </Link>
            </div>
        </section>
    );
};

export default Hero;
