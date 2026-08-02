"use client";
import { useEffect, useRef } from "react";
import { PileCards } from "../components/ProjectKit";
import { Ticker } from "../components/Ticker";

export function RevealWords({ children, className = "" }: { children: string, className?: string }) {
    const ref = useRef<HTMLHeadingElement>(null);
    useEffect(() => { const el = ref.current; if (!el) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); observer.disconnect() } }, { threshold: .22 }); observer.observe(el); return () => observer.disconnect() }, []);
    return <h2 ref={ref} className={`reveal-words ${className}`}>{children.split(" ").map((word, i) => <span className="reveal-word" style={{ "--word": i } as React.CSSProperties} key={`${word}-${i}`}><i>{word}</i>&nbsp;</span>)}</h2>
}


export function AboutPage() {
    return <>
        {/* ── Hero ── */}
        <section className="about-opening">
            <span className="tag">PORTFOLIO / ABOUT ME</span>
            <h1><span>WELCOME TO</span><span>MY </span><span>PORTFOLIO</span><span></span></h1>
            <p>Software &amp; Web Developer crafting clean backend logic and intuitive frontend web applications.</p>
            <div className="hero-badge-container">
                {[
                    { name: "Swift", icon: "https://skillicons.dev/icons?i=swift" },
                    { name: "Java", icon: "https://skillicons.dev/icons?i=java" },
                    { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
                    { name: "React", icon: "https://skillicons.dev/icons?i=react" },
                    { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
                    { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
                ].map(t => (
                    <span key={t.name} className="hero-badge-pill">
                        <img src={t.icon} alt={t.name} width={14} height={14} />
                        {t.name}
                    </span>
                ))}
                <a href="#tech-stack" className="hero-badge-pill" style={{ textDecoration: "none", opacity: 0.8, backgroundColor: "rgba(255, 255, 255, 0.05)", transition: "background 0.2s" }} onClick={(e) => { e.preventDefault(); document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }); }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)"; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(-100%)'; s.style.transform = 'translateY(-100%)'; } }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(0)'; s.style.transform = 'translateY(0)'; } }}>
                    <div style={{ position: 'relative', height: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <span className="roll-first" style={{ display: 'block', height: '20px', lineHeight: '16px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>+ View All Skills ↓</span>
                        <span className="roll-second" style={{ display: 'block', height: '20px', lineHeight: '16px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>+ View All Skills ↓</span>
                    </div>
                </a>
            </div>
            <div className="about-spark" aria-hidden="true">✳</div>
        </section>

        {/* ── Approach Statement ── */}
        <section className="about-statement">
            <div className="about-statement-left">
                <span className="micro">INTRODUCTION</span>
                <p>Hello, my name is Worakan Pongseelawat. I'm a Computer Science student looking for a software engineering internship to gain real-world experience. I enjoy building web applications using React and Next.js, and I'm currently learning the basics of backend development with Java. I'm eager to join a professional team where I can learn, improve my coding skills, and grow as a developer.</p>
            </div>
            <div className="about-statement-right">
                <RevealWords>Driven by curiosity to build software that solves real problems.</RevealWords>
            </div>
        </section>

        {/* ── Core Capabilities ── */}
        <section className="capabilities-section">
            <div className="section-header">
                <span className="micro">WHAT I DO / SPECIALIZATIONS</span>
                <h2>Core Capabilities.</h2>
            </div>
            <div className="what-i-do-grid">

                {/* Card 01 — Backend */}
                <div className="cap-card cap-card--red">
                    <div className="cap-card-inner">
                        <div className="cap-card-icon" aria-hidden="true">
                            {/* Server / Database icon */}
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="6" width="40" height="12" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                <rect x="4" y="22" width="40" height="12" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                <circle cx="38" cy="12" r="2.5" fill="currentColor" />
                                <circle cx="38" cy="28" r="2.5" fill="currentColor" />
                                <line x1="12" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="12" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M14 40 C14 37 20 35 24 38 C28 41 34 39 34 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                            </svg>
                        </div>
                        <span className="cap-card-num">01</span>
                        <h3>Backend Architecture</h3>
                        <p>Learning to build well-structured backend logic, applying OOP principles, and creating REST APIs with Java.</p>
                        <div className="cap-card-tags">
                            {[
                                { name: "Java", icon: "https://skillicons.dev/icons?i=java" },
                                { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
                                { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
                                { name: "REST APIs" }
                            ].map(t => <span key={t.name}>{t.icon && <img src={t.icon} alt={t.name} width={14} height={14} />} {t.name}</span>)}
                        </div>
                    </div>
                </div>

                {/* Card 02 — Frontend */}
                <div className="cap-card cap-card--dark">
                    <div className="cap-card-inner">
                        <div className="cap-card-icon" aria-hidden="true">
                            {/* Code brackets icon */}
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="16,14 6,24 16,34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <polyline points="32,14 42,24 32,34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <line x1="28" y1="10" x2="20" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="cap-card-num">02</span>
                        <h3>Frontend Engineering</h3>
                        <p>Practicing modern web development with React and Next.js, focusing on component-based UI and type safety.</p>
                        <div className="cap-card-tags">
                            {[
                                { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
                                { name: "React", icon: "https://skillicons.dev/icons?i=react" },
                                { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
                                { name: "Vite", icon: "https://skillicons.dev/icons?i=vite" }
                            ].map(t => <span key={t.name}>{t.icon && <img src={t.icon} alt={t.name} width={14} height={14} />} {t.name}</span>)}
                        </div>
                    </div>
                </div>

                {/* Card 03 — Mobile / iOS */}
                <div className="cap-card cap-card--blue" style={{ background: "#007AFF" }}>
                    <div className="cap-card-inner">
                        <div className="cap-card-icon" aria-hidden="true">
                            {/* Mobile icon */}
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="12" y="4" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                <line x1="20" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="24" cy="38" r="2.5" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="cap-card-num">03</span>
                        <h3>Mobile Engineering</h3>
                        <p>Building native iOS applications with smooth user experiences, animations, and modern architecture.</p>
                        <div className="cap-card-tags">
                            {[
                                { name: "Swift", icon: "https://skillicons.dev/icons?i=swift" },
                                { name: "iOS 17" },
                                { name: "SwiftUI" }
                            ].map(t => <span key={t.name}>{t.icon && <img src={t.icon} alt={t.name} width={14} height={14} />} {t.name}</span>)}
                        </div>
                    </div>
                </div>

                {/* Card 04 — UI & Design */}
                <div className="cap-card cap-card--yellow">
                    <div className="cap-card-inner">
                        <div className="cap-card-icon" aria-hidden="true">
                            {/* Pen tool / design icon */}
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 36 L20 24 L28 32 L38 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <circle cx="28" cy="32" r="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                <circle cx="20" cy="24" r="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                <path d="M38 10 L42 8 L40 12 Z" fill="currentColor" />
                                <line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                            </svg>
                        </div>
                        <span className="cap-card-num">04</span>
                        <h3>Interactive UI &amp; Design</h3>
                        <p>Exploring web design principles to create clean, responsive interfaces with HTML, CSS, and animations.</p>
                        <div className="cap-card-tags">
                            {[
                                { name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
                                { name: "CSS3", icon: "https://skillicons.dev/icons?i=css" },
                                { name: "Responsive" }
                            ].map(t => <span key={t.name}>{t.icon && <img src={t.icon} alt={t.name} width={14} height={14} />} {t.name}</span>)}
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* ── Projects ── */}
        <Ticker text="FEATURED PROJECTS · SELECTED WORK" />
        <PileCards />

        {/* ── Tech Stack ── */}
        <section id="tech-stack" className="skills-section" style={{ scrollMarginTop: '130px' }}>
            <span className="micro">TECH STACK &amp; SKILLS</span>
            <h2>Technical Arsenal</h2>
            <div className="skills-grid">
                {[
                    { name: "Swift", category: "iOS Development", icon: "https://skillicons.dev/icons?i=swift" },
                    { name: "Java", category: "Core & Backend", icon: "https://skillicons.dev/icons?i=java" },
                    { name: "React", category: "Frontend Framework", icon: "https://skillicons.dev/icons?i=react" },
                    { name: "Next.js", category: "Fullstack / SSR", icon: "https://skillicons.dev/icons?i=nextjs" },
                    { name: "TypeScript", category: "Type Safe Code", icon: "https://skillicons.dev/icons?i=ts" },
                    { name: "HTML5", category: "Web Standards", icon: "https://skillicons.dev/icons?i=html" },
                    { name: "CSS3", category: "Styling", icon: "https://skillicons.dev/icons?i=css" },
                    { name: "JavaScript", category: "Dynamic Logic", icon: "https://skillicons.dev/icons?i=js" },
                    { name: "Git", category: "Version Control", icon: "https://skillicons.dev/icons?i=git" },
                    { name: "GitHub", category: "Version Control", icon: "https://skillicons.dev/icons?i=github" },
                    { name: "Vite", category: "Build Tools", icon: "https://skillicons.dev/icons?i=vite" },
                    { name: "Tailwind CSS", category: "Styling", icon: "https://skillicons.dev/icons?i=tailwind" },
                    { name: "Prisma", category: "ORM", icon: "https://skillicons.dev/icons?i=prisma" },
                    { name: "Vercel", category: "Deployment", icon: "https://skillicons.dev/icons?i=vercel" },
                    { name: "PostgreSQL", category: "Database", icon: "https://skillicons.dev/icons?i=postgres" },
                ].map(s => (
                    <div key={s.name} className="skill-card">
                        <img src={s.icon} alt={s.name} className="skill-logo" width={32} height={32} />
                        <b>{s.name}</b>
                        <span>{s.category}</span>
                    </div>
                ))}
            </div>
        </section>

        <Ticker text="EDUCATION · LEARNING JOURNEY" />

        {/* ── Academic Background ── */}
        <section className="now-building">
            <div className="now-header">
                <span className="micro">EDUCATION</span>
                <h2>Academic Background<span className="now-blink">_</span></h2>
            </div>
            <div className="now-grid">
                <article className="now-card now-card--main">
                    <div className="now-card-top">
                        <span className="now-status"><i aria-hidden="true" />2023 — PRESENT</span>
                        <span className="now-tag">BACHELOR'S DEGREE</span>
                    </div>
                    <div className="education-mark" aria-hidden="true"><span>01</span><i /></div>
                    <h3>Rajamangala University (Huntra)</h3>
                    <p>Currently studying Computer Science. Focusing on software engineering, data structures, and web technologies. Passionate about applying theoretical knowledge to real-world applications.</p>
                    <div className="now-stack">
                        {["Computer Science", "Software Engineering"].map(t => <span key={t}>{t}</span>)}
                    </div>
                </article>
                <article className="now-card now-card--side">
                    <div className="now-card-top">
                        <span className="now-status"><i aria-hidden="true" />2020 — 2023</span>
                        <span className="now-tag">BUSINESS COMPUTER</span>
                    </div>
                    <div className="education-mark" aria-hidden="true"><span>02</span><i /></div>
                    <h3>Bang Sai College</h3>
                    <p>Studied Business Computer, building a foundation in computer applications, digital tools, business systems, and practical technology skills.</p>
                    <div className="now-stack">
                        {["Business Computer", "Digital Tools"].map(t => <span key={t}>{t}</span>)}
                    </div>
                </article>
            </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="end-card about-end about-contact-cta" style={{ margin: '4vw', padding: '100px 6vw', background: 'var(--yellow)', borderRadius: '20px' }}>
            <span className="micro">GET IN TOUCH</span>
            <RevealWords>Let's build something great together.</RevealWords>
            <a className="capsule" href="/contact#contact-form" style={{ marginTop: '40px' }}>START A CONVERSATION ↗</a>
            <div className="contact-smile" aria-hidden="true"><span>LET'S · MAKE · IT · REAL · </span><div className="contact-smile-face"><i /><i /><b /></div></div>
        </section>
    </>
}
