"use client";
import { useState } from "react";
import { PageEnd, PageHero } from "../components/PageFrame";

export function ContactForm() {
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
            <section className="contact-form-section" style={{ textAlign: "center", padding: "180px 10vw" }}>
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



export function ContactPage() {
    return <><PageHero page="contact" /><ContactForm /><PageEnd /></>;
}
