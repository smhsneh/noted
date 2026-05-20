# noted

noted is a full-stack infinite canvas productivity application that combines spatial note-taking with real-time cloud persistence and custom otp authentication. unlike traditional note-taking apps that rely on fixed layouts or document-style organization, noted allows users to freely create, drag, resize, and organize notes visually on an infinite workspace. the platform features autosave, personalized cloud boards, secure session-based authentication, interactive todo systems, stickers, zoom/pan navigation, and production-grade interaction handling built completely from scratch using next.js, zustand, mongodb atlas, and custom backend infrastructure.

live app:
https://notedbysneh.vercel.app

---

## features

- infinite spatial canvas
- pan and zoom system
- draggable sticky notes
- resizable notes
- todo note system
- editable todo items
- sticker system
- note pinning
- color customization
- font size controls
- context menus
- z-index interaction system
- autosave
- local persistence fallback
- cloud persistence
- otp authentication
- secure session cookies
- protected routes
- user-specific workspaces

---

## tech stack

### frontend

- next.js app router
- react
- zustand
- tailwind css

### backend

- next.js api routes
- mongodb atlas
- mongoose

### authentication

- custom otp authentication
- brevo transactional email api
- bcrypt hashing
- secure httpOnly sessions

### deployment

- vercel

---

## architecture

```
frontend ui
    ↓
zustand state management
    ↓
next.js api routes
    ↓
mongodb atlas
    ↓
brevo email delivery
```

authentication flow

```
user enters email
      ↓
otp generated
      ↓
otp hashed with bcrypt
      ↓
otp emailed using brevo
      ↓
otp verification
      ↓
session created
      ↓
httpOnly cookie stored
      ↓
authenticated workspace
```

persistence flow

```
zustand state
      ↓
debounced autosave
      ↓
api routes
      ↓
mongodb atlas
```

fallback persistence:

```
localstorage backup
```

---

## project highlights

- built custom infinite canvas interaction system
- implemented full otp authentication architecture
- designed secure session handling using cookies
- implemented backend hydration and autosave flow
- created production-grade interaction polish
- deployed fully working multi-user cloud application

---

## local setup

```bash
git clone <your_repo_url> && cd noted && npm install && touch .env.local && echo "MONGODB_URI=\nBREVO_API_KEY=\nSESSION_SECRET=\nCOOKIE_SECRET=" >> .env.local && npm run dev
```

fill in the values in `.env.local` before running the dev server:

```env
MONGODB_URI=
BREVO_API_KEY=
SESSION_SECRET=
COOKIE_SECRET=
```

---

## future improvements

- realtime collaboration
- multiplayer cursors
- markdown support
- board sharing
- keyboard shortcuts
- image uploads
- pwa support
- export/import support

---

## final status

noted is a fully deployed production-ready web application featuring:

- custom authentication
- cloud persistence
- infinite canvas interactions
- secure backend architecture
- multi-user personalized workspaces

made by smhsneh.