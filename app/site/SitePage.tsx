"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, pages, PageKey } from "./siteData";

function Shell({ children, home = false }: { children: React.ReactNode, home?: boolean }) {
    const [menu, setMenu] = useState(false), [panel, setPanel] = useState<"cart" | "login" | "mood" | null>(null), [loaded, setLoaded] = useState(false), [mood, setMood] = useState("");
    useEffect(() => { requestAnimationFrame(() => setLoaded(true)); const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setPanel(null) } }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key) }, []);
    return <div className={home ? "site-shell home-shell" : "site-shell"}><div className={loaded ? "loader done" : "loader"}><b>L</b><span>LIGHT IN PROGRESS</span></div>
        <header className="topbar"><Link className="round-logo" href="/"><span>Portfolio—</span><b>L</b></Link><nav>{nav.map(([n, h]) => <Link href={h} key={h} aria-label={n}><span className="nav-copy" aria-hidden="true"><span>{n}</span><span>{n}</span></span></Link>)}</nav><div className="utilities"><button onClick={() => setPanel("cart")}><span>0</span><i>Saved</i></button><button onClick={() => setPanel("login")}><span>☺</span><i>Hello</i></button><button className="menu-trigger" onClick={() => setMenu(true)}>Menu</button></div></header>
        {children}
        <div className={menu ? "mega-menu show" : "mega-menu"} aria-hidden={!menu}><button onClick={() => setMenu(false)}>CLOSE ×</button><nav>{nav.map(([n, h], i) => <Link href={h} key={h} onClick={() => setMenu(false)}><small>0{i + 1}</small>{n}</Link>)}</nav><p>Designer & Developer<br />Bangkok · Available worldwide</p></div>
        {panel && <div className="panel-wrap" onMouseDown={() => setPanel(null)}><aside onMouseDown={e => e.stopPropagation()}><button className="panel-close" onClick={() => setPanel(null)}>CLOSE ×</button>{panel === "cart" ? <><span className="micro">YOUR SAVED THINGS</span><h2>Nothing here—yet.</h2><p>Keep exploring. Save the things that make your brain light up.</p><Link className="capsule" href="/work">Go to work ↗</Link></> : panel === "mood" ? <><span className="micro">QUICK CHECK-IN</span><h2>What’s your creative energy?</h2><p>Just a playful local prototype. Pick one, then replace the labels with your own.</p><div className="mood-spin-scene" aria-hidden="true"><div className="mood-spinner"><span>PLAY · PAUSE · MAKE · NOTICE · </span><div className="spinner-face"><i /><i /><b /></div></div></div><div className="mood-options">{[["LOW", "—"], ["SLOW", "⌣"], ["OKAY", "•"], ["BRIGHT", "⌣"], ["BUZZING", "⌣"]].map(([label, face]) => <button key={label} className={mood === label ? "selected" : ""} onClick={() => setMood(label)}><span>{face}</span>{label}</button>)}</div>{mood && <p className="mood-response">Noted: {mood}. Keep making at your own pace.</p>}</> : <><span className="micro">WELCOME, CURIOUS ONE</span><h2>Come on in.</h2><label>Email<input type="email" placeholder="you@example.com" /></label><label>Password<input type="password" placeholder="••••••••" /></label><button className="capsule">Log in ↗</button></>}</aside></div>}
        {!home && <footer><div><b>[NAME]</b><span>Designer & Developer.</span></div><nav><Link href="/about">About</Link><Link href="/work">Selected Work</Link><Link href="/support">Contact</Link><a href="mailto:hello@example.com">Email ↗</a></nav><small>© 2026 · PORTFOLIO</small></footer>}</div>
}

function Ticker({ dark = false, text = "STAY CURIOUS" }: { dark?: boolean, text?: string }) { return <div className={dark ? "ticker dark" : "ticker"}><div>{Array(12).fill(`✳ ${text} `).join("")}</div></div> }
const cardItems = [
    ["01", "MOTION", "[A small animation or transition study.]", "/stories", "card-red"],
    ["02", "TYPE", "[An experiment with expressive typography.]", "/stories", "card-yellow"],
    ["03", "HOVER", "[A playful interaction for mouse and keyboard.]", "/stories", "card-pink"],
    ["04", "LAYOUT", "[A responsive composition or grid study.]", "/stories", "card-blue"],
    ["05", "CURSOR", "[A pointer, drag, or movement experiment.]", "/stories", "card-green"],
] as const;
function CardDeck({ compact = false }: { compact?: boolean }) {
    const [active, setActive] = useState(0); return <section className={compact ? "card-deck compact" : "card-deck"}>
        <div className="deck-heading"><span className="micro">PLAYGROUND / EXPERIMENTS</span><h2>Small ideas.<br />Made interactive.</h2><p>Drag sideways, choose a card, and replace each placeholder with your own experiment.</p></div>
        <div className="deck-stage" aria-label="Interactive prompt cards">{cardItems.map((c, i) => <Link href={c[3]} key={c[0]} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={`prompt-card ${c[4]} ${active === i ? "active" : ""}`} style={{ "--i": i } as React.CSSProperties}><span>{c[0]} / 05</span><b>{c[1]}</b><p>{c[2]}</p><i>↗</i></Link>)}</div>
        <div className="deck-controls"><button onClick={() => setActive((active + 4) % 5)} aria-label="Previous card">←</button><span>0{active + 1} / 05</span><button onClick={() => setActive((active + 1) % 5)} aria-label="Next card">→</button></div>
    </section>
}
function Home() {
    const stage = useRef<HTMLDivElement>(null), drag = useRef({ active: false, x: 0, left: 0 });
    const wheel = (e: React.WheelEvent<HTMLDivElement>) => { if (stage.current) stage.current.scrollLeft += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX };
    const down = (e: React.PointerEvent<HTMLDivElement>) => { const el = stage.current; if (!el) return; drag.current = { active: true, x: e.clientX, left: el.scrollLeft }; el.setPointerCapture(e.pointerId) };
    const move = (e: React.PointerEvent<HTMLDivElement>) => { if (drag.current.active && stage.current) stage.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x) };
    const up = () => { drag.current.active = false };
    return <main ref={stage} className="home-stage" onWheel={wheel} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <section className="portfolio-canvas" aria-label="Portfolio overview">
            <article className="portfolio-card p-intro"><span className="tag">PORTFOLIO</span><h1>[Worakan<br />Portfolio]</h1><p>Developer · Java · React · Nextjs</p></article>
            <Link href="/about" className="portfolio-card p-about"><span className="tag">ABOUT</span><h2>Welcome to my website click here </h2><span className="card-arrow">↗</span></Link>
            <Link href="/work" className="portfolio-card p-project p-project-one"><div className="project-media media-one"><img src="/og.png" alt="Todo list project preview" /></div><span className="tag">PROJECT 01</span><h2>[Todo list]</h2><p>[Role · Create by Nextjs]</p></Link>
            <Link href="/work" className="portfolio-card p-project p-project-two"><div className="project-media media-two"><img src="/og.png" alt="Cafe Cat project preview" /></div><span className="tag">PROJECT 02</span><h2>[Cafe Cat]</h2><p>[Role · Create by Html]</p><span className="card-arrow">↗</span></Link>
            <Link href="/stories" className="portfolio-card p-note"><span className="tag">PLAYGROUND</span><h2>Motion, interface experiments, and things in progress.</h2></Link>
            <article className="portfolio-card p-contact"><span className="tag">CONTACT</span><h2>Let’s make something useful.</h2><a className="plain-action" href="mailto:hello@example.com">EMAIL ME ↗</a><Link className="plain-action light" href="/work">VIEW WORK ↗</Link></article>
            <div className="drag-hint" aria-hidden="true">SCROLL / DRAG <span>→</span></div>
        </section>
    </main>
}
function RevealWords({ children, className = "" }: { children: string, className?: string }) {
    const ref = useRef<HTMLHeadingElement>(null);
    useEffect(() => { const el = ref.current; if (!el) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); observer.disconnect() } }, { threshold: .22 }); observer.observe(el); return () => observer.disconnect() }, []);
    return <h2 ref={ref} className={`reveal-words ${className}`}>{children.split(" ").map((word, i) => <span className="reveal-word" style={{ "--word": i } as React.CSSProperties} key={`${word}-${i}`}><i>{word}</i>&nbsp;</span>)}</h2>
}
const aboutCards = [
    ["01", "TODO LIST", "[Next.js · React · TypeScript]", "A task management application featuring clean state handling, task tracking, and an intuitive responsive UI."],
    ["02", "CAFE CAT", "[HTML5 · CSS3 · JavaScript]", "An interactive website for a cat cafe showcasing menus, cozy atmosphere, and responsive layout."],
    ["03", "JAVA APP", "[Java · OOP · Data Structures]", "Backend software systems and data management programs built with Java using Object-Oriented Programming."],
    ["04", "PORTFOLIO", "[Next.js 16 · React 19 · Vite]", "A modern interactive single-page portfolio with dynamic card deck, smooth animations, and clean styling."]
] as const;

function PileCards() {
    const [index, setIndex] = useState(4), [moving, setMoving] = useState(true), [paused, setPaused] = useState(false), timer = useRef<number | undefined>(undefined);
    useEffect(() => { const vis = () => setPaused(document.hidden); document.addEventListener("visibilitychange", vis); return () => document.removeEventListener("visibilitychange", vis) }, []);
    useEffect(() => { if (paused) return; timer.current = window.setInterval(() => setIndex(x => x + 1), 3000); return () => window.clearInterval(timer.current) }, [paused]);
    const settle = (e: React.TransitionEvent<HTMLDivElement>) => { if (e.target !== e.currentTarget) return; if (index >= 8 || index <= 0) { setMoving(false); setIndex(4); requestAnimationFrame(() => requestAnimationFrame(() => setMoving(true))) } };
    const step = (direction: number) => { setPaused(true); setIndex(x => x + direction); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setPaused(false), 1500) };
    return <section className="about-pile about-work-cards">
        <div className="pile-copy">
            <span className="micro">MY PROJECTS</span>
            <h2>Featured Work.</h2>
            <p>Interactive card deck showcasing selected projects. Hover or tap a card to explore details.</p>
        </div>
        <div className="about-work-viewport" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className={moving ? "work-track" : "work-track no-motion"} style={{ "--index": index } as React.CSSProperties} onTransitionEnd={settle}>
                {[...aboutCards, ...aboutCards, ...aboutCards].map((v, i) => <article key={`${v[0]}-${i}`} tabIndex={0} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
                    <span className="tag">PROJECT {v[0]}</span>
                    <div className={`work-art work-art-${i % 4}`}><i /><b /></div>
                    <h3 className="card-title-roll"><span>{v[1]}</span><span aria-hidden="true">{v[1]}</span></h3>
                    <div className="work-detail">
                        <small>{v[2]}</small>
                        <p>{v[3]}</p>
                        <em>VIEW PROJECT ↗</em>
                    </div>
                </article>)}
            </div>
        </div>
        <div className="pile-arrows">
            <button onClick={() => step(-1)} aria-label="Previous card"><span className="button-roll"><i>←</i><i>←</i></span></button>
            <button onClick={() => step(1)} aria-label="Next card"><span className="button-roll"><i>→</i><i>→</i></span></button>
        </div>
    </section>
}

const workCards = [["01", "[PROJECT ONE]", "UI/UX · DEVELOPMENT", "A short overview of the problem, your role, and the outcome."], ["02", "[PROJECT TWO]", "BRANDING · MOTION", "Add the key idea and what made this project worth showing."], ["03", "[PROJECT THREE]", "PRODUCT · RESEARCH", "Explain the challenge, approach, and one measurable result."], ["04", "[PROJECT FOUR]", "EXPERIMENT · CREATIVE CODE", "Use this card for a personal project or playful exploration."]] as const;
function WorkCarousel() { const total = workCards.length, [index, setIndex] = useState(total), [moving, setMoving] = useState(true), [paused, setPaused] = useState(false), timer = useRef<number | undefined>(undefined); useEffect(() => { const vis = () => setPaused(document.hidden); document.addEventListener("visibilitychange", vis); return () => document.removeEventListener("visibilitychange", vis) }, []); useEffect(() => { if (paused) return; timer.current = window.setInterval(() => setIndex(x => x + 1), 3000); return () => window.clearInterval(timer.current) }, [paused]); const settle = (e: React.TransitionEvent<HTMLDivElement>) => { if (e.target !== e.currentTarget) return; if (index >= total * 2 || index <= 0) { setMoving(false); setIndex(total); requestAnimationFrame(() => requestAnimationFrame(() => setMoving(true))) } }; const step = (n: number) => { setPaused(true); setIndex(x => x + n); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setPaused(false), 1500) }; return <section className="work-carousel"><header><span className="micro">SELECTED WORK / 01—04</span><h2>Projects, problems,<br />and outcomes.</h2><p>[Replace these cards with your strongest work. Keep each summary short and specific.]</p></header><div className="work-viewport" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}><div className={moving ? "work-track" : "work-track no-motion"} style={{ "--index": index } as React.CSSProperties} onTransitionEnd={settle}>{[...workCards, ...workCards, ...workCards].map((card, i) => <article key={`${card[0]}-${i}`} tabIndex={0} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}><span className="tag">PROJECT {card[0]}</span><div className={`work-art work-art-${i % 4}`}><i /><b /></div><h3>{card[1]}</h3><div className="work-detail"><small>{card[2]}</small><p>{card[3]}</p><em>VIEW CASE STUDY ↗</em></div></article>)}</div></div><div className="pile-arrows"><button onClick={() => step(-1)} aria-label="Previous project"><span className="button-roll"><i>←</i><i>←</i></span></button><button onClick={() => step(1)} aria-label="Next project"><span className="button-roll"><i>→</i><i>→</i></span></button></div></section> }

const skillsList = [
    { name: "Java",               category: "Core & Backend",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "React",              category: "Frontend Framework",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js",            category: "Fullstack / SSR",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript",         category: "Type Safe Code",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "HTML5 & CSS3",       category: "Web Standards & UI",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "JavaScript (ES6+)",  category: "Dynamic Logic",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Git & GitHub",       category: "Version Control",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Vite",               category: "Build Tools",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
];



function AboutPage() {
    return <>
        {/* ── Hero ── */}
        <section className="about-opening">
            <span className="tag">PORTFOLIO / ABOUT ME</span>
            <h1><span>WELCOME TO</span><span>MY </span><span>PORTFOLIO</span><span></span></h1>
            <p>Software &amp; Web Developer crafting clean backend logic and intuitive frontend web applications.</p>
            <div className="hero-badge-container">
        <span className="hero-badge-pill">Available for Work</span>
        {[
          { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
          { name: "HTML",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
          { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        ].map(t => (
          <span key={t.name} className="hero-badge-pill">
            <img src={t.icon} alt={t.name} width={14} height={14} />
            {t.name}
          </span>
        ))}
      </div>
            <div className="about-spark" aria-hidden="true">✳</div>
        </section>

        {/* ── Approach Statement ── */}
        <section className="about-statement">
            <div className="about-statement-left">
                <span className="micro">INTRODUCTION</span>
                <p>Hello, my name is Worakan Pongseelawat. I am a Computer Science student seeking a software engineering internship. I have a strong interest in backend development with Java and building web applications using React and Next.js. I am dedicated to learning how to write clean code, understand robust architecture, and I'm eager to grow within a professional team.</p>
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
                            {["Java", "OOP", "Data Structures", "REST APIs"].map(t => <span key={t}>{t}</span>)}
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
                            {["Next.js", "React", "TypeScript", "Vite"].map(t => <span key={t}>{t}</span>)}
                        </div>
                    </div>
                </div>

                {/* Card 03 — UI & Design */}
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
                        <span className="cap-card-num">03</span>
                        <h3>Interactive UI &amp; Design</h3>
                        <p>Exploring web design principles to create clean, responsive interfaces with HTML, CSS, and basic animations.</p>
                        <div className="cap-card-tags">
                            {["HTML5 / CSS3", "Animation", "Responsive"].map(t => <span key={t}>{t}</span>)}
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* ── Projects ── */}
        <Ticker text="FEATURED PROJECTS · SELECTED WORK" />
        <PileCards />

        {/* ── Tech Stack ── */}
        <section className="skills-section">
            <span className="micro">TECH STACK &amp; SKILLS</span>
            <h2>Technical Arsenal</h2>
            <div className="skills-grid">
                {skillsList.map(s => (
                    <div key={s.name} className="skill-card">
                        <img src={s.icon} alt={s.name} className="skill-logo" width={32} height={32} />
                        <b>{s.name}</b>
                        <span>{s.category}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* ── What I'm Building Now ── */}
        <section className="now-building">
            <div className="now-header">
                <span className="micro">CURRENTLY BUILDING</span>
                <h2>What I'm working on<span className="now-blink">_</span></h2>
            </div>
            <div className="now-grid">
                <article className="now-card now-card--main">
                    <div className="now-card-top">
                        <span className="now-status">🟢 Active</span>
                        <span className="now-tag">PERSONAL PROJECT</span>
                    </div>
                    <h3>[Project Name]</h3>
                    <p>Describe what you're building right now — the problem it solves, what stack you're using, and what you're learning from it.</p>
                    <div className="now-stack">
                        {["Next.js","TypeScript","Java"].map(t => <span key={t}>{t}</span>)}
                    </div>
                </article>
                <article className="now-card now-card--side">
                    <div className="now-card-top">
                        <span className="now-status">🟡 Exploring</span>
                        <span className="now-tag">LEARNING</span>
                    </div>
                    <h3>Spring Boot</h3>
                    <p>Deepening backend skills with Spring Boot — building REST APIs and learning service architecture.</p>
                    <div className="now-stack">
                        {["Java","Spring Boot","REST API"].map(t => <span key={t}>{t}</span>)}
                    </div>
                </article>
            </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="end-card about-end">
            <span className="micro">GET IN TOUCH</span>
            <RevealWords>Let's build something great together.</RevealWords>
            <a className="capsule" href="mailto:hello@example.com">START A CONVERSATION ↗</a>
        </section>
    </>
}
function Interior({ page }: { page: Exclude<PageKey, "home"> }) {
    const p = pages[page]; const [slide, setSlide] = useState(0), [answer, setAnswer] = useState(""); return <>
        <section className={`page-hero ${p.color}`}><span className="tag">{p.kicker} / {p.index}</span><h1>{p.title}</h1><p>{p.intro}</p><div className="hero-orbit">✳</div></section>
        {page === "about" && <><section className="editorial"><span className="micro">OUR POINT OF VIEW</span><h2>Attention is a form of care. Good work begins by noticing what everyone else walked past.</h2><p>We choose conversation over performance, curiosity over certainty, and systems that feel human in the hand.</p></section><Ticker text="NOTICE MORE" /><section className="stats"><article><b>12</b><span>open questions at any given time</span></article><article><b>01</b><span>shared table, always ready</span></article><article><b>∞</b><span>ways to begin</span></article></section></>}
        {page === "work" && <WorkCarousel />}
        {page === "take-five" && <section className="five"><div className="five-card"><span>0{slide + 1} / 05</span><h2>{["Understand the problem.", "Find the useful question.", "Explore more than one direction.", "Build and test the idea.", "Refine what matters."][slide]}</h2><div><button onClick={() => setSlide((slide + 4) % 5)}>←</button><button onClick={() => setSlide((slide + 1) % 5)}>→</button></div></div><aside><b>My process.</b><p>[Replace these steps with your real workflow, tools, collaborators, and decision-making process.]</p></aside></section>}
        {page === "stories" && <><CardDeck compact /><section className="story-wall">{["I stopped waiting for perfect.", "We made a table long enough for everyone.", "Saying it out loud made it smaller.", "A wrong turn became the whole idea."].map((x, i) => <article key={x}><div className={`avatar a${i}`} /><span>STORY 0{i + 1}</span><h2>{x}</h2><button>READ STORY ↗</button></article>)}</section></>}
        {page === "partners" && <section className="partner"><div className="partner-art"><i /><b /></div><article><span className="micro">SOUL PARTNER 01</span><h2>Common Ground Workshop</h2><p>A small fabrication studio that shares our obsession with honest materials, weird prototypes, and generous collaboration.</p><a className="capsule" href="#">Meet the workshop ↗</a></article></section>}
        {page === "support" && <section className="checkin"><span className="micro">PROJECT ENQUIRY / SAY HELLO</span><h2>What would you like to make together?</h2><div>{["A website", "A digital product", "An interactive experiment", "Something else"].map(x => <button className={answer === x ? "selected" : ""} onClick={() => setAnswer(x)} key={x}>{x}<span>○</span></button>)}</div>{answer && <p className="response">Great — “{answer}”. Replace this prototype response with your email or contact form later.</p>}<a className="capsule" href="mailto:hello@example.com">EMAIL ME ↗</a></section>}
        <Ticker dark text="KEEP THE CONVERSATION MOVING" /><section className="end-card"><span className="micro">NEXT</span><h2>One bright thing can lead to another.</h2><Link className="capsule" href="/">Back to the beginning ↗</Link></section>
    </>
}
export function SitePage({ page }: { page: PageKey }) { return <Shell home={page === "home"}>{page === "home" ? <Home /> : page === "about" ? <AboutPage /> : <Interior page={page} />}</Shell> }
