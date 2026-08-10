"use client";
import { useEffect, useRef, useState } from "react";
import { PageEnd, PageHero } from "../components/PageFrame";

export function ContactForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("A website");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        if (status !== "success") return;
        requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        const animationStarted = Date.now();

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
            const remainingAnimation = Math.max(0, 900 - (Date.now() - animationStarted));
            await new Promise(resolve => window.setTimeout(resolve, remainingAnimation));
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
            <section ref={sectionRef} id="contact-form" className="contact-form-section contact-success">
                <div className="contact-success-mark" aria-hidden="true"><span>✓</span></div>
                <span className="micro">MESSAGE DELIVERED</span>
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus("idle")} className="rolling-capsule form-submit-btn">
                    <span className="capsule-label-roll"><i>SEND ANOTHER MESSAGE</i><i aria-hidden="true">SEND ANOTHER MESSAGE</i></span>
                </button>
            </section>
        );
    }

    return (
        <section ref={sectionRef} id="contact-form" className={`contact-form-section${status === "loading" ? " is-sending" : ""}`}>
            <div className="contact-form-header">
                <span className="micro">PROJECT ENQUIRY / SAY HELLO</span>
                <h2>What would you like to make together?</h2>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input id="name" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" placeholder="Your-email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="topic">I'm interested in...</label>
                    <div className="topic-selector">
                        {["A website", "A digital product", "An interactive experiment", "Something else"].map(x => (
                            <button type="button" className={topic === x ? "selected" : ""} onClick={() => setTopic(x)} key={x}>
                                {x}<span aria-hidden="true">{topic === x ? "●" : "○"}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message Details</label>
                    <textarea id="message" rows={5} placeholder="Tell me about your project, timeline, and goals..." value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                </div>

                {status === "error" && <p style={{ color: "red", fontSize: "14px" }}>Something went wrong. Please try again.</p>}

                <button type="submit" className="rolling-capsule form-submit-btn" disabled={status === "loading"}>
                    <span className="capsule-label-roll"><i>{status === "loading" ? "SENDING..." : "SEND MESSAGE ↗"}</i><i aria-hidden="true">{status === "loading" ? "SENDING..." : "SEND MESSAGE ↗"}</i></span>
                </button>
                {status === "loading" && <div className="contact-flight" aria-hidden="true"><div><span>MESSAGE</span><b>↗</b></div><i /><i /><i /></div>}
            </form>
        </section>
    );
}



export function ContactPage() {
    return <><PageHero page="contact" /><ContactForm /><PageEnd /></>;
}
