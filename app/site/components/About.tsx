"use client";
import React from "react";
import { RevealWords } from "./ui/RevealWords";

export function AboutPage() {
    return <>
        <section className="about-hero">
            <span className="micro">01 / INTRODUCTION</span>
            <h1>I design and build digital experiences that feel human.</h1>
            <p className="about-lead">I am a full-stack developer with a passion for creating beautiful, intuitive interfaces and robust backend systems. I believe in writing clean code and designing with empathy.</p>
        </section>

        <section className="now-section">
            <span className="micro">02 / WHAT I'M DOING NOW</span>
            <h2>Current Focus & Learning</h2>
            <div className="now-grid">
                <article className="now-card now-card--main">
                    <div className="now-card-top">
                        <span className="now-status">🔄 Current</span>
                        <span className="now-tag">BACHELOR'S DEGREE</span>
                    </div>
                    <h3>Rajamangala University (Huntra)</h3>
                    <p>Currently studying Computer Science. Focusing on software engineering, data structures, and web technologies. Passionate about applying theoretical knowledge to real-world applications.</p>
                    <div className="now-stack">
                        {["Computer Science", "Software Engineering"].map(t => <span key={t}>{t}</span>)}
                    </div>
                </article>
                <article className="now-card now-card--side">
                    <div className="now-card-top">
                        <span className="now-status">📚 Past</span>
                        <span className="now-tag">PREVIOUS EDUCATION</span>
                    </div>
                    <h3>Bang Sai College</h3>
                    <p>Science-Math Program. Built a strong foundation in mathematics and analytical thinking.</p>
                    <div className="now-stack">
                        {["Science-Math", "Analytical Thinking"].map(t => <span key={t}>{t}</span>)}
                    </div>
                </article>
            </div>
        </section>

        <section id="tech-stack" className="skills-section" style={{ scrollMarginTop: '130px', margin: '4vw', padding: '60px 4vw', background: 'var(--paper)', borderRadius: '20px' }}>
            <span className="micro">03 / TECH STACK &amp; SKILLS</span>
            <h2>Technical Arsenal</h2>
            <div className="skills-grid">
                {[
                    { name: "Swift", category: "iOS Development", icon: "https://skillicons.dev/icons?i=swift" },
                    { name: "Java", category: "Core & Backend", icon: "https://skillicons.dev/icons?i=java" },
                    { name: "React", category: "Frontend Framework", icon: "https://skillicons.dev/icons?i=react" },
                    { name: "Next.js", category: "Fullstack / SSR", icon: "https://skillicons.dev/icons?i=nextjs" },
                    { name: "TypeScript", category: "Type Safe Code", icon: "https://skillicons.dev/icons?i=ts" },
                    { name: "HTML5 & CSS3", category: "Web Standards & UI", icon: "https://skillicons.dev/icons?i=html" },
                    { name: "JavaScript (ES6+)", category: "Dynamic Logic", icon: "https://skillicons.dev/icons?i=js" },
                    { name: "Git", category: "Version Control", icon: "https://skillicons.dev/icons?i=git" },
                    { name: "GitHub", category: "Version Control", icon: "https://skillicons.dev/icons?i=github" },
                    { name: "Vite", category: "Build Tools", icon: "https://skillicons.dev/icons?i=vite" },
                    { name: "Tailwind CSS", category: "Styling", icon: "https://skillicons.dev/icons?i=tailwind" },
                    { name: "Prisma", category: "ORM", icon: "https://skillicons.dev/icons?i=prisma" },
                    { name: "Vercel", category: "Deployment", icon: "https://skillicons.dev/icons?i=vercel" },
                    { name: "Render", category: "Deployment", icon: "https://www.google.com/s2/favicons?domain=render.com&sz=128" },
                ].map(s => (
                    <div key={s.name} className="skill-card">
                        <img src={s.icon} alt={s.name} className="skill-logo" width={32} height={32} />
                        <b>{s.name}</b>
                        <span>{s.category}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="end-card about-end about-contact-cta" style={{ margin: '4vw', padding: '100px 6vw', background: 'var(--yellow)', borderRadius: '20px' }}>
            <span className="micro">GET IN TOUCH</span>
            <RevealWords>Let's build something great together.</RevealWords>
            <a className="capsule" href="mailto:omworakarn@gmail.com" style={{ marginTop: '40px' }}>START A CONVERSATION ↗</a>
            <div className="contact-smile" aria-hidden="true"><span>LET'S · MAKE · IT · REAL · </span><div className="contact-smile-face"><i /><i /><b /></div></div>
        </section>
    </>
}
