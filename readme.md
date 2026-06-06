<div align="center">

<br/>

# noted

**infinite canvas · cloud persistence · visual-first**

*a full-stack infinite canvas productivity application for visual note-taking, brainstorming, and task management — built from scratch on the mern stack.*

<br/>

![react](https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61dafb)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![tailwindcss](https://img.shields.io/badge/TailwindCSS-0f172a?style=flat-square&logo=tailwindcss&logoColor=38bdf8)
![vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![mongodb](https://img.shields.io/badge/MongoDB-47a248?style=flat-square&logo=mongodb&logoColor=white)

<br/>

**[live app](https://notedbysneh.vercel.app)**

</div>

---

## overview

**noted** is a full-stack infinite canvas productivity application designed for visual note-taking, brainstorming, and task management. unlike traditional note-taking apps that rely on fixed layouts or document-based structures, noted provides a flexible workspace where users can freely create, drag, resize, and organize notes without constraint.

the platform features autosave, cloud persistence, interactive todo notes, stickers, zoom and pan navigation, and secure otp-based authentication — all built from scratch using the mern stack.

---

## features

### canvas
- infinite workspace with smooth pan and zoom navigation
- draggable, resizable sticky notes
- layered note interactions with context menus
- note pinning and color customization
- font size controls

### notes & content
- todo note system with editable todo items
- sticker support
- per-user personalized workspaces

### persistence
- autosave with debounced cloud sync
- local storage fallback for guest sessions
- full cloud persistence via mongodb atlas

### authentication
- otp-based email authentication via brevo
- secure session management with cookies
- protected routes

---

## tech stack

```
react + tailwind css ────── frontend
node.js + express ───────── backend api
mongodb atlas + mongoose ─── database and odm
bcrypt + secure cookies ──── session and password handling
brevo email api ─────────── otp delivery
vercel ──────────────────── deployment
```

---

## architecture

### application flow
```text
user → react frontend → application state → express api → mongodb atlas
```

### board persistence flow
```text
create / edit note → application state updated → debounced autosave → api request → mongodb atlas
```

### authentication flow
```text
email entered → otp generated → otp sent → verification → session created → workspace loaded
```

### guest fallback
```text
application state → local storage
```

---

## project highlights

- built a custom infinite canvas interaction system entirely from scratch
- implemented drag, resize, zoom, pan, and note organization without any canvas libraries
- developed secure otp-based authentication and session management
- autosave with cloud persistence and local storage backup
- interactive todo notes, stickers, pinning, and workspace customization

---

## local setup

### 1. clone the repository
```bash
git clone <your_repo_url>
cd noted
```

### 2. install dependencies
```bash
npm install
```

### 3. configure environment variables

create a `.env` file and add:
```env
MONGODB_URI=
BREVO_API_KEY=
```

### 4. start the development server
```bash
npm run dev
```

---

## future scope

- board sharing through links
- image uploads inside notes
- keyboard shortcuts
- note connections and relationships
- export and import support
- mobile optimization
- dark mode
- offline support

---

## made by

> **smhsneh** — designed and developed noted as a full-stack productivity application focused on building a flexible, visual-first workspace experience.
