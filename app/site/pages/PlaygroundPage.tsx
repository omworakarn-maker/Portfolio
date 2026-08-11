"use client";
import Link from "next/link";
import { useState } from "react";
import { PageEnd } from "../components/PageFrame";

export function PlaygroundLab() {
    const palettes = [
        { name: "SIGNAL RED", color: "var(--red)", ink: "#fff" },
        { name: "SOFT PINK", color: "var(--pink)", ink: "#111" },
        { name: "ELECTRIC BLUE", color: "var(--blue)", ink: "#111" },
        { name: "ACID YELLOW", color: "var(--yellow)", ink: "#111" },
    ];
    const words = ["MOVE", "NOTICE", "MAKE", "REPEAT"];
    const learningItems = [
        { title: "Motion timing that feels physical", detail: "Studying easing, rhythm, and transitions that respond like real objects.", color: "var(--blue)" },
        { title: "Better component systems", detail: "Building reusable UI pieces that stay clear, flexible, and easy to maintain.", color: "var(--pink)" },
        { title: "Turning code into play", detail: "Exploring interactions that invite people to click, discover, and enjoy the interface.", color: "var(--yellow)" },
    ];
    const [palette, setPalette] = useState(0);
    const [word, setWord] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [learning, setLearning] = useState(0);
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
            <article className="lab-card lab-card-notes" style={{ "--notes-color": learningItems[learning].color } as React.CSSProperties}>
                <span className="lab-number">04 / NOW LEARNING</span>
                <ul>{learningItems.map((item, index) => <li key={item.title} className={learning === index ? "active" : ""}><button type="button" onClick={() => setLearning(index)} aria-pressed={learning === index}><b>0{index + 1}</b><span>{item.title}</span><i aria-hidden="true">↗</i></button></li>)}</ul>
                <p className="lab-learning-detail" key={learning}>{learningItems[learning].detail}</p>
                <span className="lab-stamp" style={{ transform: `rotate(${12 + learning * 120}deg)` }}>OPEN<br />TO<br />IDEAS</span>
            </article>
        </section>

        <section className="lab-manifesto"><span className="micro">THE RULE</span><h2>Make it clear.<br />Then make it <em>fun.</em></h2><Link className="rolling-capsule" href="/contact#contact-form"><span className="capsule-label-roll"><i>START A PROJECT ↗</i><i aria-hidden="true">START A PROJECT ↗</i></span></Link></section>
    </main>
}


export function PlaygroundPage() {
    return <><PlaygroundLab /><PageEnd /></>;
}
