"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { nav, pages, PageKey } from "./siteData";

function Shell({ children, home = false, currentPage = "" }: { children: React.ReactNode, home?: boolean, currentPage?: string }) {
    const [menu, setMenu] = useState(false), [panel, setPanel] = useState<"cart" | "login" | "mood" | null>(null), [loaded, setLoaded] = useState(false), [mood, setMood] = useState("");
    useEffect(() => { requestAnimationFrame(() => setLoaded(true)); const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setPanel(null) } }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key) }, []);
    return <div className={home ? "site-shell home-shell" : "site-shell"}>
        <header className="topbar">
            <Link className="round-logo" href="/" aria-label="Home" style={{ marginTop: '-15px' }}>
                <svg viewBox="0 0 100 100" width="84" height="84" style={{ position: 'absolute', top: 8, left: 8, animation: 'spin 12s linear infinite' }}>
                    <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                    <text fontSize="11" fontFamily="var(--mono)" letterSpacing="0.1em" fill="currentColor" fontWeight="500">
                        <textPath href="#circlePath" startOffset="0%">
                            PORTFOLIO · PORTFOLIO ·
                        </textPath>
                    </text>
                </svg>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <b>O</b>
                </div>
            </Link>
            <nav>{nav.map(([n, h]) => <Link href={h} key={h} aria-label={n}><span className="nav-copy" aria-hidden="true"><span>{n}</span><span>{n}</span></span></Link>)}</nav><div className="utilities"><button className="saved-btn" onClick={() => setPanel("cart")}><span className="spin-smile">☻</span><i>Saved</i></button><button onClick={() => setPanel("login")}><span>☺</span><i>Hello</i></button><button className="menu-trigger" onClick={() => setMenu(true)}>Menu</button></div>
        </header>
        {children}
        <div className={menu ? "mega-menu show" : "mega-menu"} aria-hidden={!menu}><button onClick={() => setMenu(false)}>CLOSE ×</button><nav>{nav.map(([n, h], i) => <Link href={h} key={h} onClick={() => setMenu(false)}><small>0{i + 1}</small>{n}</Link>)}</nav><p>Designer & Developer<br />Bangkok · Available worldwide</p></div>
        {panel && <div className="panel-wrap" onMouseDown={() => setPanel(null)}><aside onMouseDown={e => e.stopPropagation()}><button className="panel-close" onClick={() => setPanel(null)}>CLOSE ×</button>{panel === "cart" ? <><span className="micro">YOUR SAVED THINGS</span><h2>Nothing here—yet.</h2><p>Keep exploring. Save the things that make your brain light up.</p><Link className="capsule" href="/work">Go to work ↗</Link></> : panel === "mood" ? <><span className="micro">QUICK CHECK-IN</span><h2>What’s your creative energy?</h2><p>Just a playful local prototype. Pick one, then replace the labels with your own.</p><div className="mood-spin-scene" aria-hidden="true"><div className="mood-spinner"><span>PLAY · PAUSE · MAKE · NOTICE · </span><div className="spinner-face"><i /><i /><b /></div></div></div><div className="mood-options">{[["LOW", "—"], ["SLOW", "⌣"], ["OKAY", "•"], ["BRIGHT", "⌣"], ["BUZZING", "⌣"]].map(([label, face]) => <button key={label} className={mood === label ? "selected" : ""} onClick={() => setMood(label)}><span>{face}</span>{label}</button>)}</div>{mood && <p className="mood-response">Noted: {mood}. Keep making at your own pace.</p>}</> : <><span className="micro">WELCOME, CURIOUS ONE</span><h2>Come on in.</h2><label>Email<input type="email" placeholder="you@example.com" /></label><label>Password<input type="password" placeholder="••••••••" /></label><button className="capsule">Log in ↗</button></>}</aside></div>}
        {!home && <footer><div><b>Worakan Pongseelawat</b><span>Developer.</span></div><nav style={{ alignItems: 'flex-start' }}><a href="https://github.com/omworakarn-maker" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>GitHub ↗</a><a href="mailto:omworakarn@gmail.com" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>Email ↗</a></nav><small>© 2026 · PORTFOLIO</small></footer>}</div>
}

function Ticker({ dark = false, text = "STAY CURIOUS" }: { dark?: boolean, text?: string }) { return <div className={dark ? "ticker dark" : "ticker"}><div>{Array(12).fill(`✳ ${text} `).join("")}</div></div> }
const cardItems = [
    ["01", "WEB UI", "[Experimenting with responsive design.]", "#", "card-red"],
    ["02", "REACT STATE", "[Managing complex states in apps.]", "#", "card-yellow"],
    ["03", "DATABASES", "[Modeling data with Prisma & SQL.]", "#", "card-pink"],
    ["04", "BACKEND API", "[Building robust Node.js services.]", "#", "card-blue"],
    ["05", "NATIVE iOS", "[Creating mobile apps with SwiftUI.]", "#", "card-green"],
] as const;
function CardDeck({ compact = false }: { compact?: boolean }) {
    const [active, setActive] = useState(0); return <section className={compact ? "card-deck compact" : "card-deck"}>
        <div className="deck-heading"><span className="micro">PLAYGROUND / EXPERIMENTS</span><h2>Small ideas.<br />Made interactive.</h2><p>Drag sideways to explore the core areas of technology I'm actively exploring and experimenting with.</p></div>
        <div className="deck-stage" aria-label="Interactive prompt cards">{cardItems.map((c, i) => <Link href={c[3]} key={c[0]} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={`prompt-card ${c[4]} ${active === i ? "active" : ""}`} style={{ "--i": i } as React.CSSProperties}><span>{c[0]} / 05</span><b>{c[1]}</b><p>{c[2]}</p><i>↗</i></Link>)}</div>
        <div className="deck-controls"><button onClick={() => setActive((active + 4) % 5)} aria-label="Previous card">←</button><span>0{active + 1} / 05</span><button onClick={() => setActive((active + 1) % 5)} aria-label="Next card">→</button></div>
    </section>
}
function Home() {
    const stage = useRef<HTMLDivElement>(null), drag = useRef({ active: false, x: 0, left: 0 }), isDragging = useRef(false);
    const [selectedProject, setSelectedProject] = useState<readonly any[] | null>(null);
    const [projectPair, setProjectPair] = useState(0);
    useEffect(() => {
        const timer = window.setInterval(() => setProjectPair(pair => pair === 0 ? 2 : 0), 4500);
        return () => window.clearInterval(timer);
    }, []);
    const leftProject = aboutCards[projectPair];
    const rightProject = aboutCards[projectPair + 1];
    const wheel = (e: React.WheelEvent<HTMLDivElement>) => { if (stage.current) stage.current.scrollLeft += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX };
    const down = (e: React.PointerEvent<HTMLDivElement>) => { const el = stage.current; if (!el) return; drag.current = { active: true, x: e.clientX, left: el.scrollLeft }; isDragging.current = false; };
    const move = (e: React.PointerEvent<HTMLDivElement>) => {
        if (drag.current.active && stage.current) {
            if (Math.abs(e.clientX - drag.current.x) > 5) isDragging.current = true;
            stage.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }
    };
    const up = () => { drag.current.active = false; setTimeout(() => { isDragging.current = false; }, 50); };
    const clickCapture = (e: React.MouseEvent) => { if (isDragging.current) { e.stopPropagation(); e.preventDefault(); } };

    return (
        <main ref={stage} className="home-stage" onWheel={wheel} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClickCapture={clickCapture}>
            <section className="portfolio-canvas" aria-label="Portfolio overview">
                <Link href="/about" className="portfolio-card p-intro"><span className="tag">PORTFOLIO</span><h1>[Worakan<br />Portfolio]</h1><p>Developer · Java · React · Nextjs · Click For More</p></Link>
                <Link href="/about" className="portfolio-card p-about"><span className="tag">ABOUT</span><h2>Welcome to my website click here </h2><span className="card-arrow">↗</span></Link>
                <a key={leftProject[0]} href="#" onClick={(e) => { e.preventDefault(); setSelectedProject(leftProject); }} className="portfolio-card p-project p-project-one home-project-swap" style={{ textDecoration: 'none' }}><div className="project-media media-one"><AutoImageSlider images={leftProject[4]} alt={`${leftProject[1]} preview`} onImageClick={() => setSelectedProject(leftProject)} /></div><span className="tag">PROJECT {leftProject[0]}</span><h2>{leftProject[1]}</h2><p>{leftProject[2]}</p></a>
                <a key={rightProject[0]} href="#" onClick={(e) => { e.preventDefault(); setSelectedProject(rightProject); }} className="portfolio-card p-project p-project-two home-project-swap" style={{ textDecoration: 'none' }}><div className="project-media media-two"><AutoImageSlider images={rightProject[4]} alt={`${rightProject[1]} preview`} onImageClick={() => setSelectedProject(rightProject)} /></div><span className="tag">PROJECT {rightProject[0]}</span><h2>{rightProject[1]}</h2><p>{rightProject[2]}</p><span className="card-arrow">↗</span></a>
                <Link href="/stories" className="portfolio-card p-note"><span className="tag">PLAYGROUND / PROTOTYPES</span><h2>My journey, technical prototypes, and things I'm learning.</h2></Link>
                <article className="portfolio-card p-contact"><span className="tag">CONTACT</span><h2>Let’s make something useful.</h2><a className="plain-action" href="mailto:omworakarn@gmail.com">EMAIL ME ↗</a><Link className="plain-action light" href="/work">VIEW WORK ↗</Link></article>
                <div className="drag-hint" aria-hidden="true">SCROLL / DRAG <span>→</span></div>
            </section>
            {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </main>
    );
}
function RevealWords({ children, className = "" }: { children: string, className?: string }) {
    const ref = useRef<HTMLHeadingElement>(null);
    useEffect(() => { const el = ref.current; if (!el) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); observer.disconnect() } }, { threshold: .22 }); observer.observe(el); return () => observer.disconnect() }, []);
    return <h2 ref={ref} className={`reveal-words ${className}`}>{children.split(" ").map((word, i) => <span className="reveal-word" style={{ "--word": i } as React.CSSProperties} key={`${word}-${i}`}><i>{word}</i>&nbsp;</span>)}</h2>
}

function Lightbox({ images, initialIdx, onClose }: { images: string[], initialIdx: number, onClose: () => void }) {
    const [idx, setIdx] = useState(initialIdx);
    const [mounted, setMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => onClose(), 250);
    }, [onClose]);

    useEffect(() => {
        setMounted(true);
        const key = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowRight") setIdx(i => (i + 1) % images.length);
            if (e.key === "ArrowLeft") setIdx(i => (i - 1 + images.length) % images.length);
        };
        window.addEventListener("keydown", key);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", key);
            document.body.style.overflow = "";
        };
    }, [images.length, handleClose]);

    if (!mounted) return null;

    return createPortal(
        <div key={isClosing ? 'closing' : 'open'} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: isClosing ? 'fadeOut 0.25s ease-out forwards' : 'fadeIn 0.2s ease-out forwards' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClose(); }}>
            <button style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'white', fontSize: 32, cursor: 'pointer', zIndex: 10, transition: 'transform 0.2s' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClose(); }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>×</button>
            <div style={{ position: 'relative', width: '90vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: isClosing ? 'scaleDown 0.25s ease-out forwards' : 'scaleUp 0.25s ease-out forwards' }} onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
                {images.length > 1 && <button style={{ position: 'absolute', left: 0, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: 32, padding: '10px 20px', cursor: 'pointer', borderRadius: '50%', zIndex: 10, transition: 'background 0.2s' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length) }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>‹</button>}
                <img src={images[idx]} alt="Enlarged view" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', clipPath: images[idx].includes('gowithus') ? 'inset(5.5% 0 0 0)' : 'none', transform: images[idx].includes('gowithus') ? 'translateY(-2.75%)' : 'none' }} />
                {images.length > 1 && <button style={{ position: 'absolute', right: 0, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: 32, padding: '10px 20px', cursor: 'pointer', borderRadius: '50%', zIndex: 10, transition: 'background 0.2s' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i => (i + 1) % images.length) }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>›</button>}
            </div>
            {images.length > 1 && <div style={{ color: 'white', marginTop: 16, zIndex: 10, font: '12px var(--mono)', letterSpacing: '0.1em' }}>{idx + 1} / {images.length}</div>}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes scaleDown { from { transform: scale(1); opacity: 1; } to { transform: scale(0.95); opacity: 0; } }
                @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            `}} />
        </div>,
        document.body
    );
}

function AutoImageSlider({ images, alt, onImageClick, cover = false }: { images: readonly string[] | string[], alt: string, onImageClick?: () => void, cover?: boolean }) {
    const [idx, setIdx] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const loadedCount = useRef(0);
    const len = images ? images.length : 0;

    useEffect(() => {
        loadedCount.current = 0;
        setAllLoaded(len <= 1);
        if (len <= 1) return;
        images.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount.current += 1;
                if (loadedCount.current >= len) setAllLoaded(true);
            };
            img.src = src;
        });
    }, [images, len]);

    useEffect(() => {
        if (!allLoaded || len <= 1 || hovered) return;
        const timer = setInterval(() => setIdx(i => (i + 1) % len), 3500);
        return () => clearInterval(timer);
    }, [allLoaded, len, hovered]);

    if (len === 0) return <><i /><b /></>;

    return (
        <>
            <div
                style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', cursor: onImageClick ? 'pointer' : 'zoom-in' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (onImageClick) { onImageClick(); } else { setLightboxOpen(true); } }}
            >
                {images.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={`${alt} slide ${i + 1}`}
                        loading="eager"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: src.includes('gowithus') ? 'translate(-50%, -53%)' : 'translate(-50%, -50%)',
                            width: cover ? '100%' : 'auto',
                            height: cover ? '100%' : 'auto',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: cover ? 'cover' : 'contain',
                            opacity: i === idx ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                            display: 'block',
                            clipPath: src.includes('gowithus') ? 'inset(6% 0 0 0)' : 'none',
                        }}
                    />
                ))}
            </div>
            {lightboxOpen && <Lightbox images={images as string[]} initialIdx={idx} onClose={() => setLightboxOpen(false)} />}
        </>
    );
}
const TECH_ICONS: Record<string, string> = {
    "Next.js": "https://skillicons.dev/icons?i=nextjs",
    "React": "https://skillicons.dev/icons?i=react",
    "TypeScript": "https://skillicons.dev/icons?i=ts",
    "Tailwind CSS": "https://skillicons.dev/icons?i=tailwind",
    "Prisma": "https://skillicons.dev/icons?i=prisma",
    "Vercel": "https://skillicons.dev/icons?i=vercel",
    "HTML5": "https://skillicons.dev/icons?i=html",
    "CSS3": "https://skillicons.dev/icons?i=css",
    "JavaScript": "https://skillicons.dev/icons?i=js",
    "SwiftUI": "https://skillicons.dev/icons?i=swift",
    "Node.js": "https://skillicons.dev/icons?i=nodejs",
    "PostgreSQL": "https://skillicons.dev/icons?i=postgres",
    "Render": "https://skillicons.dev/icons?i=git",
    "Vite": "https://skillicons.dev/icons?i=vite"
};

const aboutCards = [
    ["01", "TODO LIST", "[Next.js · React · TypeScript]", "A task management application featuring clean state handling, task tracking, and an intuitive responsive UI.", ["/todo-1.png?v=1", "/todo-2.png?v=1", "/todo-3.png?v=1"], "https://github.com/omworakarn-maker/todolist", "This Todo List application was built to solve task management inefficiencies. It features a complete dashboard, secure authentication, and real-time state updates. Users can customize their profiles, view analytics of completed tasks, and easily manage their daily workflow using a modern responsive interface.", ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Vercel"]],
    ["02", "CAFE CAT", "[HTML5 · CSS3 · JavaScript]", "An interactive website for a cat cafe showcasing menus, cozy atmosphere, and responsive layout.", ["/cafe-1.png?v=1", "/cafe-2.png?v=1", "/cafe-3.png?v=1", "/cafe-4.png?v=1", "/cafe-5.png?v=1"], "#", "A fully responsive front-end website for a fictional cat cafe. Features include a dynamic menu, beautiful CSS animations, and a cozy aesthetic designed to attract customers.", ["HTML5", "CSS3", "JavaScript"]],
    ["03", "GO WITH US", "[SwiftUI · Node.js · PostgreSQL]", "A modern, AI-Powered travel matching iOS application built with SwiftUI and a Node.js backend.", ["/gowithus-1.png?v=1", "/gowithus-2.png?v=1", "/gowithus-3.png?v=1", "/gowithus-4.png?v=1"], "#", "An iOS mobile application that matches travelers based on their preferences. Built natively with SwiftUI for a smooth user experience, backed by a robust Node.js backend and PostgreSQL database.", ["SwiftUI", "Node.js", "PostgreSQL", "Render"]],
    ["04", "PORTFOLIO", "[Next.js 16 · React 19 · Vite]", "A modern interactive single-page portfolio with dynamic card deck, smooth animations, and clean styling.", ["/portfolio-1.png?v=1"], "#", "This portfolio itself! A highly interactive single-page application showcasing custom animations, interactive card decks, and advanced CSS techniques. Built with Next.js and React.", ["Next.js", "React", "TypeScript", "Vite"]]
] as const;

function ProjectDetailsModal({ project, onClose }: { project: readonly any[], onClose: () => void }) {
    const [mounted, setMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    if (!mounted) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 500);
    };

    const title = project[1];
    const category = project[2];
    const shortDesc = project[3];
    const imageRaw = project[4];
    const images = Array.isArray(imageRaw) ? imageRaw : (imageRaw ? [imageRaw] : []);
    const link = project[5] || "#";
    const hasProjectLink = link !== "#";
    const fullDesc = project[6] || shortDesc;
    const techStack = project[7] as string[] | undefined;

    return createPortal(
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', perspective: '1000px', animation: isClosing ? 'modalFadeOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'modalFadeIn 0.5s ease-out forwards' }} onClick={handleClose}>
            <div style={{ width: '100%', maxWidth: '600px', maxHeight: '85vh', backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #ddd', boxShadow: '-12px 15px 35px rgba(0,0,0,0.1)', transformOrigin: 'center center', animation: isClosing ? 'modalSlideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} onClick={e => e.stopPropagation()}>

                {/* HEADER */}
                <div style={{ padding: '30px 30px 20px', position: 'relative' }}>
                    <button style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: '1px solid #111', color: '#111', fontSize: '20px', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onClick={handleClose} onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111'; }}>✕</button>

                    <h2 style={{ margin: 0, fontSize: 'clamp(40px, 6vw, 54px)', color: '#111', fontFamily: 'var(--sans)', fontWeight: '700', letterSpacing: '-0.04em', lineHeight: '1' }}>{title}</h2>
                </div>

                {/* CONTENT BODY */}
                <div style={{ padding: '0 30px 30px', overflowY: 'auto', flex: 1, color: '#111' }}>
                    <p style={{ lineHeight: '1.6', fontSize: '14px', fontFamily: 'var(--mono)', margin: '0 0 30px 0' }}>{fullDesc}</p>

                    {techStack && techStack.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', fontFamily: 'var(--sans)', letterSpacing: '0.05em', color: '#666', textTransform: 'uppercase', marginBottom: '12px' }}>Technologies Used</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {techStack.map((tech: string) => (
                                    <div key={tech} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f9f9f9', border: '1px solid #eaeaea', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontFamily: 'var(--mono)', color: '#111' }}>
                                        {TECH_ICONS[tech] && <img src={TECH_ICONS[tech]} alt={tech} width={14} height={14} style={{ objectFit: 'contain' }} />}
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {images.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ height: '280px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', position: 'relative', backgroundColor: 'var(--paper)' }}>
                                <AutoImageSlider images={images} alt={title} />
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '11px', color: '#666', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                                {images.length} {images.length > 1 ? 'IMAGES' : 'IMAGE'} — CLICK TO EXPAND
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER ACTION */}
                <div style={{ padding: '20px 30px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', background: 'var(--paper)' }}>
                    <a href={hasProjectLink ? link : undefined} target={hasProjectLink ? "_blank" : undefined} rel={hasProjectLink ? "noopener noreferrer" : undefined} aria-disabled={!hasProjectLink} onClick={e => { if (!hasProjectLink) e.preventDefault(); }} style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', backgroundColor: '#111', color: '#fff', textDecoration: 'none', borderRadius: '999px', fontFamily: 'var(--sans)', fontWeight: '700', fontSize: '12px', opacity: hasProjectLink ? 1 : .5, cursor: hasProjectLink ? 'pointer' : 'not-allowed', transition: 'transform 0.2s, background 0.2s' }} onMouseEnter={e => { if (!hasProjectLink) return; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--red)'; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(-100%)'; s.style.transform = 'translateY(-100%)'; } }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#111'; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(0)'; s.style.transform = 'translateY(0)'; } }}>
                        <div style={{ position: 'relative', height: '17px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <span className="roll-first" style={{ display: 'block', height: '17px', lineHeight: '17px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>{hasProjectLink ? "VIEW PROJECT ↗" : "(NOT YET)"}</span>
                            <span className="roll-second" style={{ display: 'block', height: '17px', lineHeight: '17px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>{hasProjectLink ? "VIEW PROJECT ↗" : "(NOT YET)"}</span>
                        </div>
                    </a>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes modalFadeIn { 
                    from { opacity: 0; backdrop-filter: blur(0px); } 
                    to { opacity: 1; backdrop-filter: blur(4px); } 
                }
                @keyframes modalSlideUp { 
                    from { opacity: 0; transform: translateY(60px) scale(0.9) rotateX(-5deg); } 
                    to { opacity: 1; transform: translateY(0) scale(1) rotateX(0); } 
                }
                @keyframes modalFadeOut { 
                    0% { opacity: 1; backdrop-filter: blur(4px); } 
                    100% { opacity: 0; backdrop-filter: blur(0px); } 
                }
                @keyframes modalSlideDown { 
                    0% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); } 
                    30% { opacity: 1; transform: translateY(-10px) scale(1.02) rotateX(2deg); }
                    100% { opacity: 0; transform: translateY(60px) scale(0.9) rotateX(-5deg); } 
                }
            `}} />
        </div>,
        document.body
    );
}

function PileCards() {
    const [index, setIndex] = useState(4), [moving, setMoving] = useState(true), [paused, setPaused] = useState(false), timer = useRef<number | undefined>(undefined);
    const [selectedProject, setSelectedProject] = useState<readonly any[] | null>(null);
    useEffect(() => { const vis = () => setPaused(document.hidden); document.addEventListener("visibilitychange", vis); return () => document.removeEventListener("visibilitychange", vis) }, []);
    useEffect(() => { if (paused || selectedProject) return; timer.current = window.setInterval(() => setIndex(x => x + 1), 3000); return () => window.clearInterval(timer.current) }, [paused, selectedProject]);
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
                {[...aboutCards, ...aboutCards, ...aboutCards].map((v, i) => <article key={`${v[0]}-${i}`} tabIndex={0} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onClick={() => setSelectedProject(v)} style={{ cursor: 'pointer' }}>
                    <span className="tag">PROJECT {v[0]}</span>
                    <div className={`work-art work-art-${i % 4}`}>
                        {v[4] && v[4].length > 0 ? <AutoImageSlider images={v[4]} alt={v[1]} onImageClick={() => setSelectedProject(v)} cover /> : <><i /><b /></>}
                    </div>
                    <h3 className="card-title-roll"><span>{v[1]}</span><span aria-hidden="true">{v[1]}</span></h3>
                    <div className="work-detail">
                        <small>{v[2]}</small>
                        <p>{v[3]}</p>
                        <em>VIEW DETAILS ↗</em>
                    </div>
                </article>)}
            </div>
        </div>
        <div className="pile-arrows">
            <button onClick={() => step(-1)} aria-label="Previous card"><span className="button-roll"><i>←</i><i>←</i></span></button>
            <button onClick={() => step(1)} aria-label="Next card"><span className="button-roll"><i>→</i><i>→</i></span></button>
        </div>
        {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
}

function SelectedWorkShowcase() {
    return (
        <section className="work-showcase">
            <div className="work-stack-container">
                {aboutCards.map((card, i) => (
                    <article key={card[0]} className={`work-stack-card ${i % 2 ? "is-reversed" : ""}`}>
                        <div className="work-stack-copy">
                            <span className="work-stack-index">PROJECT {card[0]} / 04</span>
                            <h2>{card[1]}</h2>
                            <p className="work-stack-summary">{card[3]}</p>
                            <div className="work-stack-tags">
                                {(card[7] as readonly string[] | undefined)?.map(tag => <span key={tag}>{tag}</span>)}
                            </div>
                            <a href={card[5] === "#" ? undefined : card[5]} target={card[5] === "#" ? undefined : "_blank"} rel={card[5] === "#" ? undefined : "noopener noreferrer"} aria-disabled={card[5] === "#"} className={`work-stack-action${card[5] === "#" ? " is-disabled" : ""}`} onClick={e => { if (card[5] === "#") e.preventDefault(); }}>
                                <span className="work-action-roll"><i>{card[5] === "#" ? "(NOT YET)" : "VIEW PROJECT ↗"}</i><i>{card[5] === "#" ? "(NOT YET)" : "VIEW PROJECT ↗"}</i></span>
                            </a>
                        </div>
                        <div className="work-stack-media">
                            {card[4] && card[4].length > 0 ? (
                                <AutoImageSlider images={card[4]} alt={card[1]} cover={false} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)', font: '14px var(--mono)' }}>Media not available</div>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

const skillsList = [
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
];



function AboutPage() {
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

        {/* ── What I'm Building Now ── */}
        <section className="now-building">
            <div className="now-header">
                <span className="micro">EDUCATION</span>
                <h2>Academic Background<span className="now-blink">_</span></h2>
            </div>
            <div className="now-grid">
                <article className="now-card now-card--main">
                    <div className="now-card-top">
                        <span className="now-status">🟢 Present</span>
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

        {/* ── Contact CTA ── */}
        <section className="end-card about-end about-contact-cta" style={{ margin: '4vw', padding: '100px 6vw', background: 'var(--yellow)', borderRadius: '20px' }}>
            <span className="micro">GET IN TOUCH</span>
            <RevealWords>Let's build something great together.</RevealWords>
            <Link className="capsule" href="/support#contact-form" style={{ marginTop: '40px' }}>START A CONVERSATION ↗</Link>
            <div className="contact-smile" aria-hidden="true"><span>LET'S · MAKE · IT · REAL · </span><div className="contact-smile-face"><i /><i /><b /></div></div>
        </section>
    </>
}
function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("A website");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "94ab03a2-66d1-475a-ba56-4d7a27273858",
                    name: name,
                    email: email,
                    subject: `New Project Enquiry: ${topic}`,
                    message: message,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <section id="contact-form" className="contact-form-section" style={{ textAlign: "center", padding: "180px 10vw" }}>
                <h2 style={{ fontSize: "40px", marginBottom: "20px" }}>Message Sent!</h2>
                <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus("idle")} className="capsule" style={{ background: "var(--ink)", color: "var(--paper)" }}>Send Another Message</button>
            </section>
        );
    }

    return (
        <section id="contact-form" className="contact-form-section">
            <div className="contact-form-header">
                <span className="micro">PROJECT ENQUIRY / SAY HELLO</span>
                <h2>What would you like to make together?</h2>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input id="name" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="topic">I'm interested in...</label>
                    <div className="topic-selector">
                        {["A website", "A digital product", "An interactive experiment", "Something else"].map(x => (
                            <button type="button" className={topic === x ? "selected" : ""} onClick={() => setTopic(x)} key={x}>
                                {x}<span>○</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message Details</label>
                    <textarea id="message" rows={5} placeholder="Tell me about your project, timeline, and goals..." value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                </div>

                {status === "error" && <p style={{ color: "red", fontSize: "14px" }}>Something went wrong. Please try again.</p>}

                <button type="submit" className="capsule form-submit-btn" disabled={status === "loading"}>
                    {status === "loading" ? "SENDING..." : "SEND MESSAGE ↗"}
                </button>
            </form>
        </section>
    );
}

function PlaygroundLab() {
    const palettes = [
        { name: "SIGNAL RED", color: "var(--red)", ink: "#fff" },
        { name: "SOFT PINK", color: "var(--pink)", ink: "#111" },
        { name: "ELECTRIC BLUE", color: "var(--blue)", ink: "#111" },
        { name: "ACID YELLOW", color: "var(--yellow)", ink: "#111" },
    ];
    const words = ["MOVE", "NOTICE", "MAKE", "REPEAT"];
    const [palette, setPalette] = useState(0);
    const [word, setWord] = useState(0);
    const [playing, setPlaying] = useState(false);
    const current = palettes[palette];

    return <main className="playground-lab">
        <section className="lab-hero" style={{ "--lab-color": current.color, "--lab-ink": current.ink } as React.CSSProperties}>
            <div className="lab-hero-copy"><span className="micro">03 / PLAYGROUND</span><p>Sketches, interfaces, little systems and strange ideas—made while learning in public.</p></div>
            <h1>PLAY<br /><em>WITH</em><br />THE WEB.</h1>
            <button className="lab-orbit" onClick={() => setPlaying(!playing)} aria-pressed={playing} aria-label="Toggle motion study"><span className={playing ? "is-playing" : ""}>PLAY · PAUSE · PLAY · PAUSE · </span><b>✳</b></button>
            <div className="lab-hero-footer"><span>SCROLL TO EXPLORE</span><span>2026 / EXPERIMENT LOG</span></div>
        </section>

        <section className="lab-intro"><span className="micro">A SMALL DIGITAL SKETCHBOOK</span><h2>Ideas don’t need to be finished to be worth exploring.</h2><p>Use this page for prototypes, motion tests, interface details and new things you are learning. Every tile below is an editable placeholder for your own experiments.</p></section>

        <section className="lab-grid" aria-label="Interactive experiments">
            <article className="lab-card lab-card-type">
                <span className="lab-number">01 / TYPE STUDY</span><div className="type-window"><span>CLICK THE WORD</span><button onClick={() => setWord((word + 1) % words.length)}><i>{words[word]}</i><i>{words[(word + 1) % words.length]}</i></button><small>Variable scale / rolling text</small></div>
            </article>
            <article className="lab-card lab-card-palette" style={{ "--swatch": current.color, "--swatch-ink": current.ink } as React.CSSProperties}>
                <span className="lab-number">02 / COLOUR SYSTEM</span><div className="palette-swatch"><b>{current.name}</b><i>●</i></div><div className="palette-controls">{palettes.map((item, index) => <button key={item.name} onClick={() => setPalette(index)} className={palette === index ? "active" : ""} style={{ background: item.color }} aria-label={`Use ${item.name}`} />)}</div>
            </article>
            <article className={`lab-card lab-card-motion ${playing ? "is-playing" : ""}`}>
                <span className="lab-number">03 / MOTION LOOP</span><button className="motion-disc" onClick={() => setPlaying(!playing)}><span>HOVER · CLICK · PLAY · </span><b>☺</b></button><p>A tiny interaction study. Press to start or pause the loop.</p>
            </article>
            <article className="lab-card lab-card-notes"><span className="lab-number">04 / NOW LEARNING</span><ul><li><b>01</b> Motion timing that feels physical</li><li><b>02</b> Better component systems</li><li><b>03</b> Turning code into play</li></ul><span className="lab-stamp">OPEN<br />TO<br />IDEAS</span></article>
        </section>

        <section className="lab-manifesto"><span className="micro">THE RULE</span><h2>Make it clear.<br />Then make it <em>fun.</em></h2><a className="capsule" href="mailto:omworakarn@gmail.com">START A PROJECT ↗</a></section>
    </main>
}

function HeroTitle({ children }: { children: string }) {
    const lines: Record<string, string[]> = {
        "A selection of projects, problems, and outcomes.": ["A selection of", "projects, problems,", "and outcomes."],
        "How an idea moves from question to working experience.": ["How an idea moves", "from question to", "working experience."],
        "Have an idea? Let's make something useful together.": ["Have an idea?", "Let's make something", "useful together."],
    };
    const titleLines = lines[children] ?? [children];
    return <>{titleLines.map((line, index) => <span className="hero-title-rise" key={line} style={{ "--hero-line": index } as React.CSSProperties}>{line}</span>)}</>;
}

function Interior({ page }: { page: Exclude<PageKey, "home"> }) {
    const p = pages[page]; const [slide, setSlide] = useState(0), [answer, setAnswer] = useState(""); if (page === "stories") return <><PlaygroundLab /><Ticker dark text="KEEP THE CONVERSATION MOVING" /><section className="end-card"><span className="micro">NEXT</span><h2>One bright thing can lead to another.</h2><Link className="capsule" href="/">Back to the beginning ↗</Link></section></>; return <>
        <section className={`page-hero ${p.color}${page === "work" ? " work-hero" : ""}`}><span className="tag">{p.kicker} / {p.index}</span><h1><HeroTitle>{p.title}</HeroTitle></h1><p>{p.intro}</p><div className="hero-orbit">✳</div></section>
        {page === "about" && <><section className="editorial"><span className="micro">OUR POINT OF VIEW</span><h2>Attention is a form of care. Good work begins by noticing what everyone else walked past.</h2><p>We choose conversation over performance, curiosity over certainty, and systems that feel human in the hand.</p></section><Ticker text="NOTICE MORE" /><section className="stats"><article><b>12</b><span>open questions at any given time</span></article><article><b>01</b><span>shared table, always ready</span></article><article><b>∞</b><span>ways to begin</span></article></section></>}
        {page === "work" && <SelectedWorkShowcase />}
        {page === "support" && <ContactForm />}
        <Ticker dark text={page === "take-five" ? "COMING SOON" : "KEEP THE CONVERSATION MOVING"} /><section className="end-card"><span className="micro">NEXT</span><h2>One bright thing can lead to another.</h2><Link className="capsule" href="/">Back to the beginning ↗</Link></section>
    </>
}
export function SitePage({ page }: { page: PageKey }) { return <Shell home={page === "home"} currentPage={page}>{page === "home" ? <Home /> : page === "about" ? <AboutPage /> : <Interior page={page} />}</Shell> }
