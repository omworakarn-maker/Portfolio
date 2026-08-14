import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
    name?: unknown;
    email?: unknown;
    topic?: unknown;
    message?: unknown;
};

const clean = (value: unknown, limit: number) =>
    typeof value === "string" ? value.trim().slice(0, limit) : "";

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
}[character] ?? character));

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function contactEmailHtml(name: string, email: string, topic: string, message: string) {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeTopic = escapeHtml(topic);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const receivedAt = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Bangkok",
    }).format(new Date());

    return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f8eff3;font-family:Arial,Helvetica,sans-serif;color:#111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8eff3;">
    <tr>
      <td align="center" style="padding:36px 14px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border:2px solid #111111;border-radius:26px;box-shadow:8px 8px 0 #111111;overflow:hidden;">
          <tr>
            <td style="padding:15px 28px;background:#f20d0d;color:#ffffff;font-family:Courier New,monospace;font-size:12px;font-weight:700;letter-spacing:1.5px;">
              NEW PORTFOLIO MESSAGE&nbsp;&nbsp;✳
            </td>
          </tr>
          <tr>
            <td style="padding:34px 28px 18px;">
              <div style="display:inline-block;padding:8px 14px;border:1px solid #111111;border-radius:999px;font-family:Courier New,monospace;font-size:11px;font-weight:700;">${safeTopic}</div>
              <h1 style="margin:22px 0 8px;font-size:42px;line-height:0.98;letter-spacing:-2px;">${safeName}<br />wants to talk.</h1>
              <p style="margin:0;color:#6d6d6d;font-family:Courier New,monospace;font-size:11px;">Received ${receivedAt} · Bangkok time</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0 8px;">
                <tr>
                  <td style="width:112px;padding:14px;background:#ffe74c;border-radius:14px 0 0 14px;font-family:Courier New,monospace;font-size:11px;font-weight:700;">EMAIL</td>
                  <td style="padding:14px;background:#fff8d4;border-radius:0 14px 14px 0;font-size:14px;"><a href="mailto:${safeEmail}" style="color:#111111;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="width:112px;padding:14px;background:#ffc2df;border-radius:14px 0 0 14px;font-family:Courier New,monospace;font-size:11px;font-weight:700;">INTEREST</td>
                  <td style="padding:14px;background:#fff0f7;border-radius:0 14px 14px 0;font-size:14px;">${safeTopic}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 10px;">
              <p style="margin:0 0 10px;font-family:Courier New,monospace;font-size:11px;font-weight:700;letter-spacing:1px;">MESSAGE DETAILS</p>
              <div style="padding:22px;border:1px solid #d8d8d8;border-radius:18px;background:#fafafa;font-size:15px;line-height:1.7;">${safeMessage}</div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 28px 34px;">
              <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${topic}`)}" style="display:inline-block;padding:15px 24px;background:#111111;border-radius:999px;color:#ffffff;text-decoration:none;font-family:Courier New,monospace;font-size:12px;font-weight:700;">REPLY TO ${safeName.toUpperCase()} ↗</a>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0;color:#888888;font-family:Courier New,monospace;font-size:10px;">SENT FROM WORAKAN PORTFOLIO</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
    try {
        const payload = await request.json() as ContactPayload;
        const name = clean(payload.name, 80);
        const email = clean(payload.email, 160);
        const topic = clean(payload.topic, 80);
        const message = clean(payload.message, 5000);

        if (!name || !validEmail(email) || !topic || !message) {
            return NextResponse.json({ success: false, message: "Invalid form details." }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL;
        if (!apiKey || !contactEmail) {
            return NextResponse.json({ success: false, message: "Email service is not configured." }, { status: 500 });
        }

        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from: "Worakan Portfolio <onboarding@resend.dev>",
            to: contactEmail,
            replyTo: email,
            subject: `📩 ${topic} — ${name}`,
            html: contactEmailHtml(name, email, topic, message),
            text: `NEW PORTFOLIO MESSAGE\n\nName: ${name}\nEmail: ${email}\nInterested in: ${topic}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend contact error:", error.name, error.message);
            return NextResponse.json({ success: false, message: "Unable to send message." }, { status: 502 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
    }
}
