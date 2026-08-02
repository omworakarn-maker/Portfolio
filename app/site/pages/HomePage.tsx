"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { aboutCards, AutoImageSlider, ProjectDetailsModal } from "../components/ProjectKit";

export function Home() {
    const stage = useRef<HTMLDivElement>(null), drag = useRef({ active: false, x: 0, left: 0 }), isDragging = useRef(false);
    const [selectedProject, setSelectedProject] = useState<readonly any[] | null>(null);
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
                <button type="button" onClick={() => setSelectedProject(aboutCards[0])} className="portfolio-card p-project p-project-one" style={{ textDecoration: 'none' }}><div className="project-media media-one"><AutoImageSlider images={["/todo-1.png", "/todo-2.png", "/todo-3.png"]} alt="Todo List preview" onImageClick={() => setSelectedProject(aboutCards[0])} /></div><span className="tag">PROJECT 01</span><h2>Todo List</h2><p>Next.js & Prisma</p></button>
                <button type="button" onClick={() => setSelectedProject(aboutCards[1])} className="portfolio-card p-project p-project-two" style={{ textDecoration: 'none' }}><div className="project-media media-two"><AutoImageSlider images={["/cafe-1.png", "/cafe-2.png", "/cafe-3.png", "/cafe-4.png", "/cafe-5.png"]} alt="Cafe Cat project preview" onImageClick={() => setSelectedProject(aboutCards[1])} /></div><span className="tag">PROJECT 02</span><h2>Cafe Cat</h2><p>Frontend · HTML & CSS</p><span className="card-arrow">↗</span></button>
                <button type="button" onClick={() => setSelectedProject(aboutCards[2])} className="portfolio-card p-project p-project-one" style={{ textDecoration: 'none' }}><div className="project-media media-one"><AutoImageSlider images={["/gowithus-1.png", "/gowithus-2.png", "/gowithus-3.png", "/gowithus-4.png"]} alt="Go With Us project preview" onImageClick={() => setSelectedProject(aboutCards[2])} /></div><span className="tag">PROJECT 03</span><h2>Go With Us</h2><p>SwiftUI · Node.js</p></button>
                <button type="button" onClick={() => setSelectedProject(aboutCards[3])} className="portfolio-card p-project p-project-two" style={{ textDecoration: 'none' }}><div className="project-media media-two"><AutoImageSlider images={["/portfolio-1.png"]} alt="Portfolio project preview" onImageClick={() => setSelectedProject(aboutCards[3])} /></div><span className="tag">PROJECT 04</span><h2>Portfolio</h2><p>Next.js · React 19</p><span className="card-arrow">↗</span></button>
                <Link href="/playground" className="portfolio-card p-note"><span className="tag">PLAYGROUND / PROTOTYPES</span><h2>My journey, technical prototypes, and things I'm learning.</h2></Link>
                <article className="portfolio-card p-contact"><span className="tag">CONTACT</span><h2>Let’s make something useful.</h2><Link className="plain-action" href="/contact#contact-form">CONTACT ME ↗</Link><Link className="plain-action light" href="/work">VIEW WORK ↗</Link></article>
                <div className="drag-hint" aria-hidden="true">SCROLL / DRAG <span>→</span></div>
            </section>
            {selectedProject && <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </main>
    );
}
