# Aaryan Chaturvedi — Marketing Portfolio

Personal marketing portfolio site, split into a static frontend and a small
Express backend that currently handles the contact form.

## Project structure

```
portfolio Aaryan/
├─ frontend/
│  ├─ index.html      # the site itself
│  ├─ styles.css
│  └─ script.js       # nav behavior + contact form submission
├─ backend/
│  ├─ server.js        # Express app, currently just /api/contact + /api/health
│  ├─ package.json
│  └─ .env.example      # copy to .env and fill in before adding email/DB
├─ CVs/                 # source CVs (not linked from the site)
└─ README.md
```

## Running locally

**Backend**

```
cd backend
npm install
cp .env.example .env
npm run dev
```

This starts the API at `http://localhost:3001`. Contact form submissions are
logged to the console and appended to `backend/messages.json` (gitignored)
until you wire up real email sending or a database.

**Frontend**

Just open `frontend/index.html` in a browser, or serve it with any static
server, e.g.:

```
cd frontend
npx serve .
```

The contact form (in `frontend/script.js`) points at
`http://localhost:3001/api/contact` when running on localhost, so start the
backend first.

## Next steps / ideas

- Wire up real email sending (e.g. `nodemailer`) or store submissions in a
  database instead of `messages.json`.
- Deploy the backend (Render, Railway, Fly.io) and the frontend (Vercel,
  Netlify, GitHub Pages) separately, then update `API_BASE` in `script.js`.
- Add a proper build step / framework (Vite, React, etc.) if the site grows.
