# noted

noted is a full-stack infinite canvas productivity application designed for visual note-taking, brainstorming, and task management. unlike traditional note-taking applications that rely on fixed layouts or document-based structures, noted provides a flexible workspace where users can freely create, drag, resize, and organize notes on an infinite canvas.

the platform features autosave, cloud persistence, interactive todo notes, stickers, zoom and pan navigation, secure authentication, and a smooth user experience built from scratch using the mern stack.

## live app

https://notedbysneh.vercel.app

---

## features

- infinite canvas workspace
- smooth pan and zoom navigation
- draggable sticky notes
- resizable notes
- todo note system
- editable todo items
- sticker support
- note pinning
- color customization
- font size controls
- context menus
- layered note interactions
- autosave functionality
- local persistence fallback
- cloud persistence
- otp-based authentication
- secure session management
- protected routes
- personalized user workspaces

---

## tech stack

### frontend

- react
- javascript
- html
- css
- tailwind css

### backend

- node.js
- express.js
- mongodb atlas
- mongoose

### authentication

- custom otp authentication
- brevo email api
- bcrypt
- secure cookies

### deployment

- vercel

---

## architecture

### application flow

```text
user
   ↓
react frontend
   ↓
application state
   ↓
express api
   ↓
mongodb atlas
```

### board persistence flow

```text
create / edit note
        ↓
application state updated
        ↓
debounced autosave
        ↓
api request
        ↓
mongodb atlas
```

### authentication flow

```text
email entered
      ↓
otp generated
      ↓
otp sent to user
      ↓
verification
      ↓
session created
      ↓
personal workspace loaded
```

### guest fallback

```text
application state
      ↓
local storage
```

---

## project highlights

- built a custom infinite canvas interaction system from scratch
- implemented drag, resize, zoom, pan, and note organization features
- developed secure otp-based authentication and session management
- implemented autosave with cloud persistence and local backup
- designed interactive todo notes, stickers, pinning, and workspace customization
- deployed a fully functional full-stack web application

---

## local setup

### clone the repository

```bash
git clone <your_repo_url>
cd noted
```

### install dependencies

```bash
npm install
```

### configure environment variables

create a `.env` file and add:

```env
mongodb_uri=
brevo_api_key=
```

### start the development server

```bash
npm run dev
```

---

## future improvements

- board sharing through links
- image uploads inside notes
- keyboard shortcuts
- note connections and relationships
- export and import support
- mobile optimization
- dark mode
- offline support

---

made by smhsneh
