"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function Lightbox({ images, initialIdx, onClose }: { images: string[], initialIdx: number, onClose: () => void }) {
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
        <div key={isClosing ? 'closing' : 'open'} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2147483600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: isClosing ? 'fadeOut 0.25s ease-out forwards' : 'fadeIn 0.2s ease-out forwards' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClose(); }}>
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

export function AutoImageSlider({ images, alt, onImageClick, cover = false, showControls = false, pauseWhenDetailOpen = true, paused = false }: { images: readonly string[] | string[], alt: string, onImageClick?: () => void, cover?: boolean, showControls?: boolean, pauseWhenDetailOpen?: boolean, paused?: boolean }) {
    const [idx, setIdx] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const loadedCount = useRef(0);
    const len = images ? images.length : 0;
    const moveImage = (direction: number) => setIdx(current => (current + direction + len) % len);

    useEffect(() => {
        loadedCount.current = 0;
        setAllLoaded(len <= 1);
        if (len <= 1) return;
        images.forEach(src => {
            const image = new Image();
            image.onload = image.onerror = () => {
                loadedCount.current += 1;
                if (loadedCount.current >= len) setAllLoaded(true);
            };
            image.src = src;
        });
    }, [images, len]);

    useEffect(() => {
        const sync = () => setDetailOpen(document.documentElement.classList.contains("project-detail-open"));
        sync();
        window.addEventListener("project-detail-visibility", sync);
        return () => window.removeEventListener("project-detail-visibility", sync);
    }, []);

    useEffect(() => {
        if (!allLoaded || len <= 1 || hovered || paused || (pauseWhenDetailOpen && detailOpen)) return;
        const timer = setInterval(() => moveImage(1), 3500);
        return () => clearInterval(timer);
    }, [allLoaded, len, hovered, paused, detailOpen, pauseWhenDetailOpen]);

    if (len === 0) return <><i /><b /></>;

    return (
        <>
            <div
                style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', cursor: onImageClick ? 'pointer' : 'zoom-in' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (onImageClick) { onImageClick(); } else { setLightboxOpen(true); } }}
            >
                {images.map((src, i) => {
                    return (
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
                    );
                })}
                {showControls && len > 1 && <>
                    <button type="button" className="media-slider-nav media-slider-nav--prev" aria-label="Previous image" onClick={e => { e.preventDefault(); e.stopPropagation(); moveImage(-1); }}><span className="button-roll"><i>←</i><i>←</i></span></button>
                    <button type="button" className="media-slider-nav media-slider-nav--next" aria-label="Next image" onClick={e => { e.preventDefault(); e.stopPropagation(); moveImage(1); }}><span className="button-roll"><i>→</i><i>→</i></span></button>
                </>}
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
    "Figma": "https://skillicons.dev/icons?i=figma",
    "Vercel": "https://skillicons.dev/icons?i=vercel",
    "HTML5": "https://skillicons.dev/icons?i=html",
    "CSS3": "https://skillicons.dev/icons?i=css",
    "JavaScript": "https://skillicons.dev/icons?i=js",
    "React Native": "https://skillicons.dev/icons?i=react",
    "SwiftUI": "https://skillicons.dev/icons?i=swift",
    "Node.js": "https://skillicons.dev/icons?i=nodejs",
    "PostgreSQL": "https://skillicons.dev/icons?i=postgres",
    "Render": "https://skillicons.dev/icons?i=git",
    "Vite": "https://skillicons.dev/icons?i=vite"
};
const TECH_MARKS: Record<string, string> = {
    "Expo": "◉",
    "AsyncStorage": "▣",
    "UI Design": "✦",
    "Prototype": "◌",
    "Responsive UI": "↔"
};

export type ProjectCard = {
    id: string; title: string; stack: string; summary: string; images: string[];
    primaryUrl: string; description: string; tools: string[]; githubUrl: string; buttonLabel: string;
    videoUrl?: string;
};

// PROJECT CONTENT — edit named fields below; no need to remember array numbers.
export const aboutCards: ProjectCard[] = [
    { id: "01", title: "TODO LIST", stack: "[Next.js · React · TypeScript]", summary: "A task management application featuring clean state handling, task tracking, and an intuitive responsive UI.", images: ["/todo-pro-01-dashboard.png", "/todo-pro-02.png", "/todo-pro-03.png"], primaryUrl: "https://todolist-green-tau.vercel.app/", githubUrl: "https://github.com/omworakarn-maker/todolist", description: "Todo List is a full-stack task management application designed to make everyday planning feel clear and manageable. Users can create, organize, update, and track tasks through a responsive dashboard, while authentication keeps each workspace personal and secure. The interface includes profile customization and task analytics that make progress easier to understand at a glance. Building the project strengthened my understanding of typed React components, application state, database-backed workflows, authentication, and designing consistent experiences across desktop and mobile screens.", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Vercel"], buttonLabel: "VIEW PROJECT ↗" },
    { id: "02", title: "CAFE CAT", stack: "[HTML5 · CSS3 · JavaScript]", summary: "An interactive website for a cat cafe showcasing menus, cozy atmosphere, and responsive layout.", images: ["/cafe-pro-01-home.png", "/cafe-pro-02-cats.png", "/cafe-pro-03-menu.png", "/cafe-pro-04-events.png", "/cafe-pro-05-booking.png"], primaryUrl: "https://cafecatdemowebsite.vercel.app/", githubUrl: "https://github.com/omworakarn-maker/cafecatdemowebsite", description: "Cafe Cat is a responsive promotional website created for a fictional cat cafe. The experience introduces the cafe, its resident cats, food and drink menus, upcoming events, and booking information through a warm and playful visual direction. Subtle JavaScript interactions and CSS animation help the pages feel lively without distracting from the content. This project gave me practical experience structuring a multi-section website with semantic HTML, building responsive layouts from scratch, and using visual hierarchy to guide visitors toward important actions such as exploring the menu and making a reservation.", tools: ["HTML5", "CSS3", "JavaScript"], buttonLabel: "VIEW PROJECT ↗" },
    { id: "03", title: "GO WITH US", stack: "[SwiftUI · Node.js · PostgreSQL]", summary: "A modern, AI-Powered travel matching iOS application built with SwiftUI and a Node.js backend.", images: ["/gowithus-1.png?v=1", "/gowithus-2.png?v=1", "/gowithus-3.png?v=1", "/gowithus-4.png?v=1"], primaryUrl: "#", githubUrl: "https://github.com/omworakarn-maker/go-with-us", description: "Go With Us is an iOS travel-matching application that helps people discover compatible travel companions based on shared destinations, interests, and preferences. The mobile experience is built natively with SwiftUI to keep navigation and interactions smooth, while a Node.js API and PostgreSQL database manage profiles, trip information, and matching data. The project explores how a social travel product can reduce the friction of finding the right person to travel with. It also gave me experience connecting a native client to a deployed backend, designing structured data flows, and developing a larger product across mobile, server, and database layers.", tools: ["SwiftUI", "Node.js", "PostgreSQL", "Render"], buttonLabel: "WATCH DEMO ↗", videoUrl: "/gowithus-demo.mp4" },
    { id: "04", title: "PORTFOLIO", stack: "[Next.js 16 · React 19 · Vite]", summary: "A modern interactive single-page portfolio with dynamic card deck, smooth animations, and clean styling.", images: ["/portfolio-1.png?v=1"], primaryUrl: "#", githubUrl: "#", description: "This portfolio is a multi-page interactive website designed to present my projects, background, skills, experiments, process, and contact information as one connected experience. Its visual system combines oversized editorial typography, layered cards, horizontal navigation, rolling button labels, animated project carousels, responsive overlays, and small playful details. I built the reusable interactions with React and TypeScript while keeping keyboard navigation, reduced-motion preferences, mobile layouts, and performance in mind. The project has been an ongoing exercise in refining motion design, component structure, responsive behavior, and the balance between personality and usability.", tools: ["Next.js", "React", "TypeScript", "Vite"], buttonLabel: "(SECRET PROJECT)" },
    { id: "05", title: "FIGMA PROTOTYPE", stack: "[Figma · UI Design · Prototype]", summary: "A collection of interface explorations, flows, and clickable prototypes focused on clear, thoughtful user experiences.", images: ["/figma-cat-01-welcome.png", "/figma-cat-02-onboarding.png", "/figma-cat-03-home.png", "/figma-cat-04-menu.png", "/figma-cat-05-search.png", "/figma-cat-06-cat-detail.png", "/figma-cat-08-login.png", "/figma-cat-09-sign-up.png", "/figma-cat-10-reset-password.png", "/figma-cat-11-about-us.png", "/figma-cat-11-order.png?v=2"], primaryUrl: "https://www.figma.com/proto/kpiZifTnW2jPAZ7XSQjUKD/M-cat-031?node-id=2-4&p=f&t=rsnWPM2MoV8mV0UG-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A4", githubUrl: "#", description: "This Figma project explores a complete mobile experience for discovering cats, browsing information, managing accounts, and moving through an ordering flow. The screens cover onboarding, navigation, search, detailed content, authentication, password recovery, and supporting information pages. I used reusable components and consistent spacing, typography, and interaction patterns to keep the experience coherent across the full flow. Creating the clickable prototype helped me practice thinking beyond individual screens—considering user journeys, transition points, responsive behavior, edge cases, and how interface decisions affect clarity before development begins.", tools: ["Figma", "UI Design", "Prototype", "Responsive UI"], buttonLabel: "VIEW PROJECT ↗" },
    {
        id: "06",
        title: "KEEP GOING",
        stack: "[React Native · Expo · TypeScript]",
        summary: "A gentle mobile space for emotional check-ins, private journaling, and tracking each step of a personal healing journey.",
        images: [],
        primaryUrl: "#",
        githubUrl: "#",
        description: "Keep Going is a work-in-progress Thai-language mobile wellness application designed to give users a calm, private space to process difficult feelings without pressure. The app supports daily mood check-ins, personal journal entries, healing goals, time-based milestones, follow-up questions, and a history of past reflections. Information is stored locally on the device with AsyncStorage so the experience can remain personal and available without a separate account. I am building it with React Native, Expo, and TypeScript while learning how to structure multi-screen mobile navigation, manage persistent application state, and design sensitive emotional experiences with clear and supportive language.",
        tools: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
        buttonLabel: "(IN DEVELOPMENT)"
    },
];

export function ProjectPlaceholder({ title }: { title: string }) {
    if (title !== "KEEP GOING") return <div className="project-placeholder"><span>PROJECT PREVIEW</span></div>;
    return <div className="keep-going-preview" aria-label="Keep Going application preview">
        <div className="keep-going-phone">
            <div className="keep-going-notch" />
            <b>Keep Going</b>
            <small>พื้นที่เล็ก ๆ สำหรับใจของคุณ</small>
            <div className="keep-going-timer"><em>เวลาที่ฉันเลือกจะก้าวต่อไป</em><strong>07 : 12 : 48</strong></div>
            <div className="keep-going-days"><span>เราไม่ได้คุยกันมา</span><strong>7</strong><span>วัน</span></div>
            <i>เช็กอินความรู้สึกวันนี้</i>
        </div>
    </div>;
}

export function ProjectDetailsModal({ project, onClose }: { project: ProjectCard, onClose: () => void }) {
    const [mounted, setMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setMounted(true);
        const previousOverflow = document.body.style.overflow;
        const previousPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = "hidden";
        document.documentElement.classList.add("project-detail-open");
        window.dispatchEvent(new Event("project-detail-visibility"));
        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;
            document.documentElement.classList.remove("project-detail-open");
            window.dispatchEvent(new Event("project-detail-visibility"));
        };
    }, []);

    if (!mounted) return null;

    const handleClose = () => {
        if (isClosing) return;
        setIsClosing(true);
        setTimeout(() => onClose(), 320);
    };

    const { title, images, primaryUrl: link, description: fullDesc, tools: techStack, videoUrl } = project;

    return createPortal(
        <div className={`project-modal-backdrop${isClosing ? " is-closing" : ""}`} onClick={e => { e.stopPropagation(); handleClose(); }} onWheel={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()} onPointerMove={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}>
            <div className="project-modal-card" onClick={e => e.stopPropagation()}>

                {/* HEADER */}
                <div style={{ padding: '30px 30px 20px', position: 'relative' }}>
                    <button style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: '1px solid #111', color: '#111', fontSize: '20px', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onClick={handleClose} onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111'; }}>✕</button>

                    <h2 style={{ margin: 0, fontSize: 'clamp(40px, 6vw, 54px)', color: '#111', fontFamily: 'var(--sans)', fontWeight: '700', letterSpacing: '-0.04em', lineHeight: '1' }}>{title}</h2>
                </div>

                {/* CONTENT BODY */}
                <div style={{ padding: '0 30px 30px', overflowY: 'auto', flex: 1, color: '#111' }}>
                    <p style={{ lineHeight: '1.6', fontSize: '14px', fontFamily: 'var(--mono)', margin: '0 0 30px 0' }}>{fullDesc}</p>

                    {techStack && techStack.length > 0 && (
                        <div id="project-demo" style={{ marginBottom: '30px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', fontFamily: 'var(--sans)', letterSpacing: '0.05em', color: '#666', textTransform: 'uppercase', marginBottom: '12px' }}>Technologies Used</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {techStack.map((tech: string) => (
                                    <div key={tech} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f9f9f9', border: '1px solid #eaeaea', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontFamily: 'var(--mono)', color: '#111' }}>
                                        {TECH_ICONS[tech] ? <img src={TECH_ICONS[tech]} alt={tech} width={14} height={14} style={{ objectFit: 'contain' }} /> : TECH_MARKS[tech] && <span aria-hidden="true" style={{ font: '700 15px/1 var(--sans)' }}>{TECH_MARKS[tech]}</span>}
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {videoUrl && (
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', fontFamily: 'var(--sans)', letterSpacing: '0.05em', color: '#666', textTransform: 'uppercase', marginBottom: '12px' }}>App Walkthrough</div>
                            <video controls playsInline preload="metadata" style={{ display: 'block', width: '100%', maxHeight: '440px', borderRadius: '16px', background: '#111', border: '1px solid #ddd' }}>
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support this video.
                            </video>
                        </div>
                    )}

                    {images.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ height: '280px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', position: 'relative', backgroundColor: 'var(--paper)' }}>
                                <AutoImageSlider images={images} alt={title} showControls pauseWhenDetailOpen={false} />
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '11px', color: '#666', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                                {images.length} {images.length > 1 ? 'IMAGES' : 'IMAGE'} — CLICK TO EXPAND
                            </div>
                        </div>
                    )}
                    {images.length === 0 && <div style={{ height: '320px', marginTop: '4px' }}><ProjectPlaceholder title={title} /></div>}
                </div>

                {/* FOOTER ACTION */}
                <div style={{ padding: '20px 30px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', gap: '10px', background: 'var(--paper)' }}>
                    {project.githubUrl && project.githubUrl !== "#" && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', backgroundColor: '#111', color: '#fff', textDecoration: 'none', borderRadius: '999px', fontFamily: 'var(--sans)', fontWeight: '700', fontSize: '12px', transition: 'background 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(-100%)'; s.style.transform = 'translateY(-100%)'; } }} onMouseLeave={e => { e.currentTarget.style.background = '#111'; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(0)'; s.style.transform = 'translateY(0)'; } }}>
                            <div style={{ position: 'relative', height: '17px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <span className="roll-first" style={{ display: 'block', height: '17px', lineHeight: '17px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>GITHUB ↗</span>
                                <span className="roll-second" style={{ display: 'block', height: '17px', lineHeight: '17px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>GITHUB ↗</span>
                            </div>
                        </a>
                    )}
                    {!videoUrl && (link !== "#" ? <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', backgroundColor: '#111', color: '#fff', textDecoration: 'none', borderRadius: '999px', fontFamily: 'var(--sans)', fontWeight: '700', fontSize: '12px', transition: 'background 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(-100%)'; s.style.transform = 'translateY(-100%)'; } }} onMouseLeave={e => { e.currentTarget.style.background = '#111'; const f = e.currentTarget.querySelector('.roll-first') as HTMLElement; const s = e.currentTarget.querySelector('.roll-second') as HTMLElement; if (f && s) { f.style.transform = 'translateY(0)'; s.style.transform = 'translateY(0)'; } }}>
                        <div style={{ position: 'relative', height: '17px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <span className="roll-first" style={{ display: 'block', height: '17px', lineHeight: '17px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>VIEW PROJECT ↗</span>
                            <span className="roll-second" style={{ display: 'block', height: '17px', lineHeight: '17px', transition: 'transform 0.3s cubic-bezier(.83,0,.17,1)' }}>VIEW PROJECT ↗</span>
                        </div>
                    </a> : <span className="project-modal-disabled-action" aria-disabled="true">{project.buttonLabel}</span>)}
                </div>
            </div>
        </div>,
        document.body
    );
}

export function PileCards() {
    const cardCount = aboutCards.length;
    const [index, setIndex] = useState<number>(cardCount), [moving, setMoving] = useState(true), [paused, setPaused] = useState(false), timer = useRef<number | undefined>(undefined);
    const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
    const dragStart = useRef<number | null>(null);
    const didDrag = useRef(false);
    useEffect(() => { const vis = () => setPaused(document.hidden); document.addEventListener("visibilitychange", vis); return () => document.removeEventListener("visibilitychange", vis) }, []);
    useEffect(() => { if (paused || selectedProject) return; timer.current = window.setInterval(() => step(1, false), 3000); return () => window.clearInterval(timer.current) }, [paused, selectedProject, index]);
    const settle = (e: React.TransitionEvent<HTMLDivElement>) => { if (e.target !== e.currentTarget) return; if (index >= cardCount * 2 || index <= 0) { setMoving(false); setIndex(cardCount); requestAnimationFrame(() => requestAnimationFrame(() => setMoving(true))) } };
    const step = (direction: number, pauseAfterMove = true) => {
        if (pauseAfterMove) {
            setPaused(true);
            window.clearTimeout(timer.current);
        }
        const forwardEdge = direction > 0 && index >= cardCount * 2 - 1;
        const backwardEdge = direction < 0 && index <= 1;
        if (forwardEdge || backwardEdge) {
            // Rebase to an identical clone before the movement starts, so the loop is invisible.
            setMoving(false);
            setIndex(forwardEdge ? cardCount - 1 : cardCount * 2 + 1);
            requestAnimationFrame(() => requestAnimationFrame(() => { setMoving(true); setIndex(forwardEdge ? cardCount : cardCount * 2); }));
        } else {
            setIndex(x => x + direction);
        }
        if (pauseAfterMove) timer.current = window.setTimeout(() => setPaused(false), 1500);
    };
    const startDrag = (e: React.PointerEvent<HTMLDivElement>) => { dragStart.current = e.clientX; didDrag.current = false; setPaused(true); };
    const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragStart.current === null) return;
        const distance = e.clientX - dragStart.current;
        if (Math.abs(distance) > 8) didDrag.current = true;
        if (Math.abs(distance) >= 80) {
            step(distance < 0 ? 1 : -1);
            dragStart.current = e.clientX;
        }
    };
    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => { if (dragStart.current === null) return; const distance = e.clientX - dragStart.current; dragStart.current = null; if (Math.abs(distance) > 42) step(distance < 0 ? 1 : -1); else setPaused(false); window.setTimeout(() => { didDrag.current = false; }, 0); };
    return <section className="about-pile about-work-cards">
        <div className="pile-copy">
            <span className="micro">MY PROJECTS</span>
            <h2>Featured Work.</h2>
            <p>Interactive card deck showcasing selected projects. Hover or tap a card to explore details.</p>
        </div>
        <div className="about-work-viewport" onMouseEnter={() => setPaused(true)} onMouseLeave={() => { if (dragStart.current === null) setPaused(false); }} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onWheel={e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); step(e.deltaX > 0 ? 1 : -1); } }}>
            <div className={moving ? "work-track" : "work-track no-motion"} style={{ "--index": index } as React.CSSProperties} onTransitionEnd={settle}>
                {[...aboutCards, ...aboutCards, ...aboutCards].map((v, i) => <article key={`${v.id}-${i}`} tabIndex={0} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onClick={e => { if (didDrag.current) { e.preventDefault(); e.stopPropagation(); return; } setSelectedProject(v); }} style={{ cursor: 'pointer' }}>
                    <span className="tag">PROJECT {v.id}</span>
                    <div className={`work-art work-art-${i % 4}`}>
                        {v.images.length > 0 ? <AutoImageSlider images={v.images} alt={v.title} onImageClick={() => setSelectedProject(v)} cover paused={paused} /> : <ProjectPlaceholder title={v.title} />}
                    </div>
                    <h3 className="card-title-roll"><span>{v.title}</span><span aria-hidden="true">{v.title}</span></h3>
                    <div className="work-detail">
                        <small>{v.stack}</small>
                        <p>{v.summary}</p>
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

export function SelectedWorkShowcase() {
    const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    return (
        <section className="work-showcase">
            <div className="work-stack-container">
                {aboutCards.map((card, i) => (
                    <article key={card.id} className={`work-stack-card ${i % 2 ? "is-reversed" : ""}`} onMouseEnter={() => setHoveredProject(card.id)} onMouseLeave={() => setHoveredProject(null)} onFocus={() => setHoveredProject(card.id)} onBlur={() => setHoveredProject(null)}>
                        <div className="work-stack-copy">
                            <span className="work-stack-index">PROJECT {card.id} / {String(aboutCards.length).padStart(2, "0")}</span>
                            <h2>{card.title}</h2>
                            <p className="work-stack-summary">{card.summary}</p>
                            <div className="work-stack-tags">
                                {card.tools.map(tag => <span key={tag}>{TECH_ICONS[tag] ? <img src={TECH_ICONS[tag]} alt="" aria-hidden="true" width={15} height={15} /> : TECH_MARKS[tag] && <i aria-hidden="true">{TECH_MARKS[tag]}</i>}{tag}</span>)}
                            </div>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {card.primaryUrl !== "#" ? (
                                    <a href={card.primaryUrl} target="_blank" rel="noopener noreferrer" className="work-stack-action" style={{ borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 24px' }}>
                                        <span className="work-action-roll" style={{ textAlign: 'left', width: '100%' }}><i>{card.buttonLabel}</i><i>{card.buttonLabel}</i></span>
                                    </a>
                                ) : card.buttonLabel !== "WATCH DEMO ↗" && (
                                    <span className="work-stack-action is-disabled" style={{ borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 24px' }}>
                                        <span className="work-action-roll" style={{ textAlign: 'left', width: '100%' }}><i>{card.buttonLabel}</i><i>{card.buttonLabel}</i></span>
                                    </span>
                                )}
                                {card.githubUrl !== "#" && (
                                    <a href={card.githubUrl} target="_blank" rel="noopener noreferrer" className="work-stack-action" style={{ borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 24px' }}>
                                        <span className="work-action-roll" style={{ textAlign: 'left', width: '100%' }}><i>GITHUB ↗</i><i>GITHUB ↗</i></span>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="work-stack-media">
                            {card.images.length > 0 ? (
                                <AutoImageSlider images={card.images} alt={card.title} onImageClick={() => setSelectedProject(card)} cover={false} showControls paused={hoveredProject === card.id} />
                            ) : (
                                <ProjectPlaceholder title={card.title} />
                            )}
                        </div>
                    </article>
                ))}
            </div>
            {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </section>
    );
}
