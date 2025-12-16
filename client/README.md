# Blogging App — Frontend

Lightweight React + TypeScript frontend built with Vite for a simple blogging demo application.

This repository contains the UI for a small community blogging app (Explore blogs, Write, Profile, Notifications) that uses a mocked auth flow and localStorage for persistence. It's great for demos, learning, or extending into a full-stack app.

---

## 🚀 Quick Start

Prerequisites: Node.js 16+ and npm (or yarn/pnpm)

1. Install dependencies

```bash
npm install
# or: yarn, pnpm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open http://localhost:5173 (Vite default) and explore the app.

4. Build for production

```bash
npm run build
npm run preview
```

---

## ✨ Features

- React + TypeScript + Vite
- Bootstrap 5 styling
- Mock authentication (see credentials below)
- Persisted demo content in localStorage (blogs, user)
- Pages: Explore, My Blogs, Write Blog, Login/Signup, Profile, Notifications
- Reusable UI components (BlogCard, Editor, Navbar, etc.)

---

## 🔐 Mock Authentication

You can sign in using the demo credentials (handled in `src/context/AuthContext.tsx`):

- Email: `user@example.com`
- Password: `password`

Signing in saves a mock `user` and `token` in localStorage.

---

## 🧪 Demo Data & Persistence

- The Explore page seeds a set of mock blogs on first load and saves them to `localStorage` under the `blogs` key.
- To reset demo content: open DevTools → Application → Local Storage → delete the `blogs` key and refresh.
- The `My Blogs` page filters blogs by the currently authenticated user's `id`.

If you'd like to change or add sample blog posts, edit the `mockBlogs` array located in `src/pages/BlogList.tsx`.

---

## 📁 Project Structure

- `src/components/` — reusable UI components (BlogCard, Editor, Navbar, etc.)
- `src/pages/` — route pages (BlogList, BlogDetail, WriteBlog, MyBlogs, Login, Signup, Profile)
- `src/context/` — React Context providers (Auth, Theme, Notifications)
- `src/styles/` — page/component styles (CSS)
- `src/types/` — TypeScript types used across the app

---

## 🧰 Scripts

- `npm run dev` — start dev server
- `npm run build` — build production bundle
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint (if configured)

---

## 🤝 Contributing

Contributions are welcome! Suggested steps:

1. Fork the repo and create a feature branch
2. Run and test your changes locally
3. Open a pull request with a clear description

Please follow existing code style and include tests where appropriate.

---

## 📝 Notes

> This project uses a mocked backend (localStorage + simulated API delays). It's intended as a frontend demo and is not production-ready for authentication or data security.

If you'd like help wiring this frontend to a real backend API, I can scaffold API hooks and adapters.

---

## ⚖️ License

This project is provided under the MIT License. See the `LICENSE` file for details.

---

## 🙋 Need help?

Open an issue or reach out in the repository — I'd be happy to help with setup, adding features, or integrating a backend.

