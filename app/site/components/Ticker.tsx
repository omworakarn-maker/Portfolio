"use client";
export function Ticker({ dark = false, text = "STAY CURIOUS" }: { dark?: boolean, text?: string }) { return <div className={dark ? "ticker dark" : "ticker"}><div>{Array(12).fill(`✳ ${text} `).join("")}</div></div> }

