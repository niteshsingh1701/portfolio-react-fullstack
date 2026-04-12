# 🚀 Portfolio React App — Full-Stack

> A production-style full-stack portfolio by **Nitesh Singh**, rebuilt with React (Vite) + Node.js/Express + MongoDB.

---

## 📁 Folder Structure

```
portfolio-react-app/
├── client/        → React Vite frontend (port 5173)
└── server/        → Express backend (port 5000)
```

---

## ⚙️ Getting Started

### 1. Backend

```bash
cd server
npm install

# Optional: copy .env.example to .env and set MONGO_URI
# Without MONGO_URI the server uses in-memory fallback automatically
cp .env.example .env

npm run dev       # nodemon server.js
```

**Backend runs on:** `http://localhost:5000`

#### Available API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/projects` | All projects |
| GET | `/api/projects/:id` | Single project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/resume` | Download resume PDF |
| GET | `/api/resume/count` | Download count |

### 2. Frontend

```bash
cd client
npm install
npm run dev       # Vite dev server
```

**Frontend runs on:** `http://localhost:5173`

The Vite dev server automatically proxies `/api/*` → `http://localhost:5000` so no CORS config needed.

---

## 🗄️ MongoDB (Optional)

To use MongoDB persistence:

1. Ensure MongoDB is running locally: `mongod`
2. Set in `server/.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/portfolio
   ```
3. Seed the database with all 11 projects:
   ```bash
   cd server
   npm run seed
   ```

If `MONGO_URI` is not set, the server automatically falls back to in-memory data — **no MongoDB required to run**.

---

## 🎨 Features

- ✅ GSAP hero animations with staggered timeline
- ✅ Animated role text carousel
- ✅ Projects fetched from API via custom `useFetchProjects` hook
- ✅ Project category filters (All / React / WordPress / HTML/CSS / Full-Stack)
- ✅ Flip card hover effect on project cards
- ✅ `/project/:id` detail page with full project info
- ✅ Contact form with client + server validation
- ✅ Resume download via backend endpoint
- ✅ Dark / Light theme toggle with localStorage persistence
- ✅ Smooth scroll navigation
- ✅ Fully responsive (mobile-first)

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, React Router v6 |
| Animations | GSAP + ScrollTrigger |
| HTTP Client | Axios |
| Styling | CSS Modules + Custom Properties |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose (optional) |
| Dev Tools | Nodemon, Vite proxy |
