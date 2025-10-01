## PassOP Manager — Open Source Password Manager (React + Vite + Express + MongoDB)

PassOP Manager is a simple, free and open‑source password manager. The frontend is built with React + Vite; the backend is a minimal Express API that stores passwords in MongoDB.

This project is intentionally small and easy to run locally so anyone can clone and use it.

### Features
- Minimal UI for saving, listing, and deleting passwords
- REST API using Express
- MongoDB for storage
- CORS enabled for local development
- Vite dev server with fast HMR

### Tech Stack
- Frontend: React 19, Vite 7, Tailwind CSS
- Backend: Node.js, Express, MongoDB Driver

---

## Project Structure

```
.
├─ backend/                # Express + MongoDB API
│  ├─ server.js
│  └─ package.json
├─ src/                    # React app source
│  ├─ components/
│  ├─ App.jsx
│  └─ main.jsx
├─ public/
├─ package.json            # Frontend package.json
└─ vite.config.js
```

---

## Prerequisites
- Node.js 18+ and npm
- A MongoDB connection string (e.g., MongoDB Atlas or local MongoDB)

---

## Quick Start

### 1) Clone the repo
```bash
git clone https://github.com/your-username/PassOP-Manager.git
cd PassOP-Manager
```

### 2) Start the backend (Express API)
Create an `.env` file in `backend/` and install dependencies:

```bash
cd backend
npm install

# Create .env
echo MONGODB_URI="your-mongodb-connection-string" > .env
echo PORT=3000 >> .env  # optional, defaults to 3000 in code

# Run the API
node server.js
```

The API should be available at `http://localhost:3000`.

### 3) Start the frontend (Vite + React)
In a new terminal (from the project root):

```bash
npm install
npm run dev
```

By default Vite serves at `http://localhost:5173`.

> Tip: Keep backend and frontend running in separate terminals during development.

---

## Configuration

### Backend environment variables (`backend/.env`)
```bash
MONGODB_URI=your-mongodb-connection-string
PORT=3000
```

### CORS
The backend enables CORS by default via `cors()` so the React app can call the API from `localhost:5173`.

---

## API Reference

Base URL: `http://localhost:3000`

### GET `/`
Returns all stored passwords.

Response: `200 OK` JSON array of password documents.

### POST `/`
Saves a new password document.

Body: JSON object representing the password entry you want to store.

Response: `200 OK` with `{ success: true, result }`.

### DELETE `/`
Deletes a password by document filter (e.g., by `_id`).

Body: JSON filter object passed to `deleteOne`.

Response: `200 OK` with `{ success: true, result }`.

> Note: For production use, you should implement validation, authentication, encryption, and safer delete semantics.

---

## Scripts

Frontend (`package.json` in project root):
- `npm run dev` — Start Vite dev server
- `npm run build` — Build production assets
- `npm run preview` — Preview production build locally

Backend (`backend/`):
- Start server: `node server.js`

---

## Production Build
Build the frontend:
```bash
npm run build
```
The output will be in `dist/`. You can serve it with any static file server. The backend can be hosted separately (e.g., on a Node host or platform-as-a-service) with access to your MongoDB.

---

## Contributing
Contributions are welcome! Feel free to open issues and pull requests.

Suggested improvements:
- Add authentication and encryption for stored passwords
- Add update endpoint and input validation
- Improve UI/UX and accessibility

---

## License
This project is free and open source under the MIT License.

---

## Acknowledgements
- Built with React + Vite and Express
- Uses the official MongoDB Node.js driver
