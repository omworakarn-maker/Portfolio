"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "../siteData";

export function Shell({ children, home = false }: { children: React.ReactNode, home?: boolean }) {
    const [menu, setMenu] = useState(false), [panel, setPanel] = useState<"resume" | "login" | null>(null);
    useEffect(() => { const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setPanel(null) } }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key) }, []);
    return <div className={home ? "site-shell home-shell" : "site-shell"}>
        <header className="topbar">
            <Link className="round-logo" href="/" aria-label="Home" style={{ marginTop: '-15px' }}>
                <svg viewBox="0 0 100 100" width="90" height="90" style={{ position: 'absolute', top: 3, left: 5, animation: 'spin 16s linear infinite reverse', transformOrigin: '50% 50%' }} aria-hidden="true">
                    <path id="circlePath" d="M 50, 50 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" fill="transparent" />
                    <text fontSize="8.5" fontFamily="var(--mono)" letterSpacing="0.08em" fill="currentColor" fontWeight="500">
                        <textPath href="#circlePath" startOffset="0%" textLength="268" lengthAdjust="spacing">
                            PORTFOLIO · PORTFOLIO · PORTFOLIO ·
                        </textPath>
                    </text>
                </svg>
                <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transform: 'translateY(8px)' }}>
                    <img src="/IMG_1816-removebg-preview-3.png" alt="" width={46} height={46} style={{ objectFit: 'contain' }} />
                </div>
            </Link>
            <nav>{nav.map(([n, h]) => <Link href={h} key={h} aria-label={n}><span className="nav-copy" aria-hidden="true"><span>{n}</span><span>{n}</span></span></Link>)}</nav><div className="utilities"><button className="saved-btn" onClick={() => setPanel("resume")}><span className="spin-smile" aria-hidden="true" /><i>Resume</i></button><button onClick={() => setPanel("login")}><span>☺</span><i>Hello</i></button><button className="menu-trigger" onClick={() => setMenu(true)}>Menu</button></div>
        </header>
        {children}
        <div className={menu ? "mega-menu show" : "mega-menu"} aria-hidden={!menu}><button onClick={() => setMenu(false)}>CLOSE ×</button><nav>{nav.map(([n, h], i) => <Link href={h} key={h} onClick={() => setMenu(false)}><small>0{i + 1}</small>{n}</Link>)}</nav><p>Designer & Developer<br />Bangkok · Available worldwide</p></div>
        {panel && <div className="panel-wrap" onMouseDown={() => setPanel(null)}><aside onMouseDown={e => e.stopPropagation()}><button className="panel-close" onClick={() => setPanel(null)}>CLOSE ×</button>{panel === "resume" ? <><span className="micro">RESUME / CV</span><h2>My resume is ready.</h2><p>Download the latest version to view my education, technical skills, experience, and selected projects.</p><a href="/resume.pdf" download className="rolling-capsule resume-download"><span className="capsule-label-roll"><i>DOWNLOAD RESUME ↓</i><i>DOWNLOAD RESUME ↓</i></span></a></> : <><span className="micro">WELCOME, CURIOUS ONE</span><h2>Come on in.</h2><label>Email<input type="email" placeholder="you@example.com" /></label><label>Password<input type="password" placeholder="••••••••" /></label><button className="capsule">Log in ↗</button></>}</aside></div>}
        {!home && <footer><div><b>Worakan Pongseelawat</b>Call me Ohm<span>Developer.</span></div><nav style={{ alignItems: 'flex-start' }}><a href="https://github.com/omworakarn-maker" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>GitHub ↗</a><Link href="/contact#contact-form" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>Contact ↗</Link></nav><small>© 2026 · ALL RIGHTS RESERVED · WORAKAN PONGSEELAWAT</small></footer>}</div>
}
