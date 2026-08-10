# 🌐 Worakan Pongseelawat — Portfolio

> Personal portfolio website showcasing projects, skills, and experience.  
> Built with **Next.js**, **React**, and deployed on **Cloudflare Workers**.

---

## ✨ About

Hi, I'm **Worakan Pongseelawat** — call me **Ohm**.  
Developer based in Bangkok, Thailand. Currently available for internship opportunities.

This is my personal portfolio website featuring:
- 🗂 Selected projects with live previews
- 👤 About me & background
- 🛝 Playground / prototypes & experiments
- 📬 Contact form

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) |
| Runtime | [Cloudflare Workers (via vinext)](https://github.com/cloudflare/vinext) |
| Language | TypeScript / React 19 |
| Styling | Vanilla CSS |
| Build | Vite + Cloudflare Vite Plugin |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>=22.13.0`

### Install & Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

---

## 📁 Project Structure

```
├── app/
│   ├── site/
│   │   ├── components/    # Shared UI components (Shell, ProjectKit, etc.)
│   │   └── pages/         # Page content components
│   ├── about/             # /about route
│   ├── contact/           # /contact route
│   ├── playground/        # /playground route
│   ├── work/              # /work route
│   └── globals.css        # Global styles
├── public/                # Static assets (images, resume, etc.)
├── worker/                # Cloudflare Worker entry point
├── build/                 # Vite build plugins
└── tests/                 # Rendered HTML tests
```

---

## 📜 License

Copyright © 2026 Worakan Pongseelawat. All Rights Reserved.  
See [LICENSE](./LICENSE) for details.
