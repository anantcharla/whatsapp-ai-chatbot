# ChatWave AI — WhatsApp AI Chatbot Dashboard (Frontend)

A production-quality, **frontend-only** dashboard for a WhatsApp AI Chatbot SaaS product. Built with React + Vite + Tailwind CSS + React Router + Framer Motion + React Icons + Recharts.

All data is **dummy/mock JSON** (see `src/data/dummyData.js`). There is no backend or real authentication — every place a real API would plug in is marked with a `🔌 BACKEND HOOK` comment in the code.

---

## ✨ Features

- **Login** — dummy auth screen, any email/password logs you in
- **Dashboard** — KPIs, message volume trends, resolution breakdown, activity feed
- **Chat Interface** — WhatsApp-Web-style 3-column layout: chat list, message thread, customer details, AI quick-reply suggestions
- **Analytics** — date-range filter, trend charts, top intents, peak-hour heatmap
- **Knowledge Base** — searchable article table, create/edit/delete via modal
- **Broadcast** — campaign table + create-broadcast modal
- **Prompt Management** — AI system-prompt cards with an editor modal
- **Settings** — tabbed: general, team, integrations, notifications
- **Profile** — user info + password change form
- Dark mode, toasts, modals, loaders, empty states, notification dropdown, profile menu — all reusable components

---

## 🎨 Design system

- WhatsApp-inspired brand colors: `#25D366` (green), `#128C7E` (dark teal), `#34B7F1` (blue)
- Glassmorphism panels, soft shadows, gradient CTAs, rounded-2xl corners
- Framer Motion micro-interactions (page transitions, hover states, dropdowns, toasts)
- Fully responsive: collapsible sidebar drawer on mobile, adaptive grids
- Dark mode via Tailwind's `class` strategy, persisted to `localStorage`

---

## 📁 Folder structure

```
whatsapp-ai-chatbot/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                 # App entry, wraps providers
    ├── App.jsx                  # Route table
    ├── index.css                # Tailwind layers + custom utility classes
    ├── context/                 # React Context API state
    │   ├── ThemeContext.jsx     # dark/light mode
    │   ├── AuthContext.jsx      # dummy auth
    │   ├── ToastContext.jsx     # global toast notifications
    │   └── ChatContext.jsx      # conversations + active chat state
    ├── data/
    │   └── dummyData.js         # ALL mock JSON data lives here
    ├── components/
    │   ├── common/               # Button, Card, Badge, Modal, Loader, EmptyState
    │   ├── layout/                # Sidebar, Navbar, DashboardLayout
    │   ├── chat/                  # ChatList, ChatWindow, MessageBubble,
    │   │                          # CustomerDetails, AISuggestions
    │   └── charts/                # LineChartCard, BarChartCard, DonutChartCard
    ├── pages/                    # One file per route (see Features above)
    └── routes/
        └── ProtectedRoute.jsx    # Auth guard wrapper
```

---

## 📦 Required npm packages

```
react, react-dom, react-router-dom, framer-motion, react-icons, recharts
```

Dev dependencies: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`

All of these are already listed in `package.json`.

---

## 🚀 Installation & running locally

```bash
# 1. Move into the project folder
cd whatsapp-ai-chatbot

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# App runs at http://localhost:5173
# Log in with ANY email/password — auth is fully mocked.

# 4. Build for production
npm run build
npm run preview
```

---

## 🔌 Where the backend connects

Search the codebase for `🔌 BACKEND HOOK` to find every integration point. Key ones:

| Feature | File | What to wire up |
|---|---|---|
| Login | `src/context/AuthContext.jsx` | `POST /api/auth/login`, store JWT |
| Dashboard KPIs | `src/pages/Dashboard.jsx` + `dummyData.js` | `GET /api/dashboard/summary` |
| Chat messages | `src/context/ChatContext.jsx` | WebSocket/Socket.IO + `POST /api/conversations/:id/messages` |
| AI quick replies | `src/components/chat/AISuggestions.jsx` | `POST /api/ai/suggest-reply` |
| Analytics | `src/pages/Analytics.jsx` | `GET /api/analytics?range=` |
| Knowledge Base | `src/pages/KnowledgeBase.jsx` | CRUD via `/api/knowledge-base` |
| Broadcast | `src/pages/Broadcast.jsx` | `POST /api/broadcasts` |
| Prompt Management | `src/pages/PromptManagement.jsx` | CRUD via `/api/prompts` |
| Settings | `src/pages/Settings.jsx` | `PATCH /api/workspace`, `/api/team`, `/api/integrations` |
| Profile | `src/pages/Profile.jsx` | `PATCH /api/users/me` |

To connect a real backend:
1. Replace the static imports from `src/data/dummyData.js` with `fetch`/`axios` calls (e.g. inside `useEffect`, or a data-fetching library like React Query).
2. Swap `AuthContext`'s in-memory login for real token storage + refresh logic.
3. Replace `ChatContext`'s local state mutations with WebSocket events for real-time messaging.

---

## 🧩 Notes

- Charts use **Recharts**; all chart data comes from `dummyData.js` and is easily swappable for API responses of the same shape.
- No `localStorage`/`sessionStorage` is used for sensitive data — only theme preference and the mock auth flag, which is safe since there's no real backend to protect.
- Icons are from `react-icons` (`Fi`, `Hi2`, `Fa` sets) — tree-shaken automatically by Vite.
