# Task Tracker

Full-stack task management app with a Next.js frontend, NestJS REST API, and PostgreSQL database.

## Live Demo

- **Frontend:** Deploy on [Vercel](https://vercel.com) (root directory: `frontend`)
- **Backend API:** Deploy on [Render](https://render.com) using `render.yaml`
- **Database:** PostgreSQL (Render managed database via blueprint)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Next.js |
| Backend | NestJS |
| Database | PostgreSQL + Prisma ORM |

## Local Development

**Prerequisites:**
- Node.js >= 18
- PostgreSQL (or Docker Compose)

**Steps:**

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Configure environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 4. Run migrations and seed
cd backend && npx prisma migrate deploy && npx prisma db seed

# 5. Start services
# Terminal 1 — backend
cd backend && npm run start:dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Deployment

### 1. Push to GitHub

This repo is ready to deploy from GitHub.

### 2. Deploy backend + database (Render)

1. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
2. Connect your GitHub repo
3. Render reads `render.yaml` and creates:
   - PostgreSQL database (`task-tracker-db`)
   - NestJS API (`task-tracker-api`)
4. After deploy, copy the API URL (e.g. `https://task-tracker-api.onrender.com`)
5. In Render → **task-tracker-api** → **Environment**, set:
   - `FRONTEND_URL` = your Vercel frontend URL (set after step 3)

### 3. Deploy frontend (Vercel)

1. Go to [Vercel](https://vercel.com) → **Add New Project**
2. Import this GitHub repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render API URL
5. Deploy

### 4. Finish CORS setup

Return to Render and set `FRONTEND_URL` on the backend to your Vercel URL, then redeploy the API.

## API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/tasks` | List all tasks |
| `POST` | `/tasks` | Create a task |
| `PATCH` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

## Project Structure

```
task-tracker/
├── frontend/          # Next.js app (port 3000)
├── backend/           # NestJS API (port 3001)
│   └── prisma/        # Schema + migrations
├── docker-compose.yml # Local PostgreSQL
├── render.yaml        # Render deployment blueprint
└── README.md
```
