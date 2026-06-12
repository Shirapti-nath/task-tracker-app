# Task Tracker — Engineering Assessment

See [REQUIREMENTS.md](./REQUIREMENTS.md) for the full project brief.

## Getting started
1. Clone this repo
2. Create a branch: `feature/your-name-submission`
3. Build the project per the requirements
4. Open a PR against `main` when done — do not merge it

---


<!-- ============================================================ -->
 **CANDIDATE: Fill in the three sections below before your PR**  
<!-- ============================================================ -->



## Setup Instructions

 *Replace this section with your actual setup steps.
     A reviewer should go from fresh clone to running app in under 5 minutes.* 



**Prerequisites:**
- Node.js >= 18
- PostgreSQL running locally (or use the provided Docker Compose)

**Steps:**

```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Configure environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your database connection string

# 3. Run database migrations
cd backend && npx prisma migrate deploy

# 4. Seed sample data
npx prisma db seed

# 5. Start both services
# Terminal 1 — backend
cd backend && npm run start:dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
Backend API available at [http://localhost:3001](http://localhost:3001).

---

## Architectural Decisions

*Replace this with 2–4 paragraphs covering:
     How you structured the codebase and why, 
     Any meaningful schema or API design choices, 
     Where and how you used AI tools, and what you verified*



---

## Future Enhancements

*Replace this with specific features you would build next.
     Name the feature, explain why it matters, and describe how you would implement it.*

