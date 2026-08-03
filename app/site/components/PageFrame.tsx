"use client";
import Link from "next/link";
import { pages, PageKey } from "../siteData";
import { Ticker } from "./Ticker";

type InteriorPageKey = Exclude<PageKey, "home" | "about">;

function HeroTitle({ children }: { children: string }) {
    const lines: Record<string, string[]> = {
        "A selection of projects, problems, and outcomes.": ["A selection of", "projects, problems,", "and outcomes."],
        "How an idea moves from question to working experience.": ["How an idea moves", "from question to", "working experience."],
        "Have an idea? Let's make something useful together.": ["Have an idea?", "Let's make something", "useful together."],
    };
    const titleLines = lines[children] ?? [children];
    return <>{titleLines.map((line, index) => <span className="hero-title-rise" key={line} style={{ "--hero-line": index } as React.CSSProperties}>{line}</span>)}</>;
}

export function PageHero({ page }: { page: InteriorPageKey }) {
    const p = pages[page];
    return <section className={`page-hero ${p.color}${page === "work" ? " work-hero" : ""}`}><span className="tag">{p.kicker} / {p.index}</span><h1><HeroTitle>{p.title}</HeroTitle></h1><p>{p.intro}</p><div className="hero-orbit">✳</div></section>;
}

export function PageEnd({ tickerText = "KEEP THE CONVERSATION MOVING" }: { tickerText?: string }) {
    return null;
}
