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
        {!home && <footer>
            <div><b>Worakan Pongseelawat</b>Call me Ohm<span>Developer.</span></div>
            <nav style={{ alignItems: 'flex-start' }}>
                <a className="footer-icon-link footer-github-link" href="https://github.com/omworakarn-maker" target="_blank" rel="noopener noreferrer">
                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.29-5.29-1.29-5.29-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.72 5.39-5.31 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>
                    <span className="footer-link-roll"><i>GitHub ↗</i><i aria-hidden="true">GitHub ↗</i></span>
                </a>
                <Link className="footer-icon-link footer-contact-link" href="/contact#contact-form">
                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 12.2a5.1 5.1 0 1 0 0-10.2 5.1 5.1 0 0 0 0 10.2Zm0 2.3c-5.4 0-9.3 2.8-9.3 6.1 0 .8.6 1.4 1.4 1.4h15.8c.8 0 1.4-.6 1.4-1.4 0-3.3-3.9-6.1-9.3-6.1Z" /></svg>
                    <span className="footer-link-roll"><i>Contact ↗</i><i aria-hidden="true">Contact ↗</i></span>
                </Link>
                <a className="footer-icon-link footer-email-link" href="mailto:omworakarn@gmail.com">
                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 4.5h17A2.5 2.5 0 0 1 23 7v10a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 17V7a2.5 2.5 0 0 1 2.5-2.5Zm8.5 8.1L20.2 7H3.8l8.2 5.6Zm0 2.4L3 8.9V17c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5V8.9L12 15Z" /></svg>
                    <span className="footer-link-roll"><i>Email ↗</i><i aria-hidden="true">Email ↗</i></span>
                </a>
            </nav>
            <small>© 2026 · ALL RIGHTS RESERVED · WORAKAN PONGSEELAWAT</small>
        </footer>}</div>
}
