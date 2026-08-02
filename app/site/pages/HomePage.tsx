"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { aboutCards, AutoImageSlider, ProjectDetailsModal } from "../components/ProjectKit";

export function Home() {
    const homeProjectSets = [[aboutCards[0], aboutCards[1]], [aboutCards[2], aboutCards[3]], [aboutCards[4], aboutCards[1]]] as const;
    const stage = useRef<HTMLDivElement>(null), drag = useRef({ active: false, x: 0, left: 0 }), isDragging = useRef(false);
    const [selectedProject, setSelectedProject] = useState<readonly any[] | null>(null);
    const [projectSet, setProjectSet] = useState(0);
    const [projectPaused, setProjectPaused] = useState(false);
    useEffect(() => {
        if (projectPaused || selectedProject) return;
        const timer = window.setInterval(() => setProjectSet(current => (current + 1) % homeProjectSets.length), 5200);
        return () => window.clearInterval(timer);
    }, [projectPaused, selectedProject]);
    const wheel = (e: React.WheelEvent<HTMLDivElement>) => { if (selectedProject) return; if (stage.current) stage.current.scrollLeft += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX };
    const down = (e: React.PointerEvent<HTMLDivElement>) => { if (selectedProject) return; const el = stage.current; if (!el) return; drag.current = { active: true, x: e.clientX, left: el.scrollLeft }; isDragging.current = false; };
    const move = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!selectedProject && drag.current.active && stage.current) {
            if (Math.abs(e.clientX - drag.current.x) > 5) isDragging.current = true;
            stage.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }
    };
    const up = () => { drag.current.active = false; setTimeout(() => { isDragging.current = false; }, 50); };
    const clickCapture = (e: React.MouseEvent) => { if (isDragging.current) { e.stopPropagation(); e.preventDefault(); } };
    const moveCardEffect = (e: React.PointerEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--pointer-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--pointer-y", `${e.clientY - rect.top}px`);
        e.currentTarget.style.setProperty("--tilt-x", `${((e.clientX - rect.left) / rect.width - .5) * 12}px`);
        e.currentTarget.style.setProperty("--tilt-y", `${((e.clientY - rect.top) / rect.height - .5) * 12}px`);
    };
    const resetCardEffect = (e: React.PointerEvent<HTMLElement>) => {
        e.currentTarget.style.setProperty("--tilt-x", "0px");
        e.currentTarget.style.setProperty("--tilt-y", "0px");
    };

    return (
        <main ref={stage} className={`home-stage${selectedProject ? " has-project-modal" : ""}`} onWheel={wheel} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClickCapture={clickCapture}>
            <section className="portfolio-canvas" aria-label="Portfolio overview">
                <Link href="/about" className="portfolio-card p-intro" onPointerMove={moveCardEffect} onPointerLeave={resetCardEffect}><span className="tag">PORTFOLIO</span><span className="home-card-code">01 / 05</span><h1>[Worakan<br />Portfolio]</h1><p>Developer · Java · React · Nextjs · Click For More</p><span className="intro-orbit" aria-hidden="true">✳</span></Link>
                <Link href="/about" className="portfolio-card p-about"><span className="tag">ABOUT</span><h2>Welcome to my website click here </h2><span className="about-status"><i /> AVAILABLE FOR INTERNSHIP</span><span className="card-arrow">↗</span></Link>
                {homeProjectSets.flatMap((projects, set) => projects.map((project, slot) => {
                    return <button
                        type="button"
                        key={`${set}-${project[0]}`}
                        onClick={() => setSelectedProject(project)}
                        onMouseEnter={() => setProjectPaused(true)}
                        onMouseLeave={() => setProjectPaused(false)}
                        onFocus={() => setProjectPaused(true)}
                        onBlur={() => setProjectPaused(false)}
                        className={`portfolio-card p-project ${slot === 0 ? "p-project-one" : "p-project-two"} home-project-layer ${projectSet === set ? "is-current" : "is-next"}`}
                        aria-hidden={projectSet !== set}
                        tabIndex={projectSet === set ? 0 : -1}
                    >
                        <div className={`project-media ${slot === 0 ? "media-one" : "media-two"}`}><AutoImageSlider images={project[4]} alt={`${project[1]} preview`} onImageClick={() => setSelectedProject(project)} /></div>
                        <span className="tag">PROJECT {project[0]}</span>
                        <span className="project-swap-indicator" aria-hidden="true"><small>{projects[0][0]}—{projects[1][0]}</small><b /></span>
                        <h2>{project[1]}</h2>
                        <p>{project[2].replace(/[\[\]]/g, "")}</p>
                        <span className="project-view-reveal">VIEW DETAILS ↗</span>
                        {slot === 1 && <span className="card-arrow">↗</span>}
                    </button>;
                }))}
                <Link href="/playground" className="portfolio-card p-note" onPointerMove={moveCardEffect} onPointerLeave={resetCardEffect}><span className="tag">PLAYGROUND / PROTOTYPES</span><span className="note-index">03 / EXPERIMENTS</span><h2>My journey, technical prototypes, and things I'm learning.</h2><i className="playground-follower" aria-hidden="true">✳</i></Link>
                <article className="portfolio-card p-contact"><span className="tag">CONTACT</span><span className="contact-availability"><i /> OPEN TO LEARN &amp; COLLABORATE</span><h2>Let’s make something useful.</h2><Link className="plain-action" href="/contact#contact-form">CONTACT ME ↗</Link><Link className="plain-action light" href="/work">VIEW WORK ↗</Link></article>
            </section>
            {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </main>
    );
}
