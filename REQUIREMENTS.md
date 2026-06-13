# Full-Stack Developer Assessment
## Task Management Application

Welcome to our engineering hiring process. This take-home project evaluates your full-stack development workflow, code quality, and architectural decision-making.

> **Time guidance:** We estimate 6-8 hours of focused work. You have **7 days** from receiving this link — that is a ceiling, not a target. Submit when you are done and comfortable explaining every line.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React with Next.js (App Router or Pages Router) |
| Backend | Node.js with NestJS |
| Database / ORM | PostgreSQL with Prisma ORM |
| Architecture | Decoupled RESTful API + frontend as separate services |

---

## Recommended Repository Structure

Use the existing repo layout with two top-level directories. Both services run independently — the backend must never serve frontend static files.

```
task-tracker/
├── frontend/          # Next.js app — runs on port 3000
├── backend/           # NestJS API — runs on port 3001
│   └── prisma/        # schema.prisma + migrations folder (commit both)
├── docker-compose.yml # PostgreSQL container (optional but recommended)
└── README.md          # Update the bottom section before opening your PR
```

> **Default ports:** Frontend `3000`, Backend API `3001`, PostgreSQL `5432`. Keep these unless you have a specific reason to deviate — document any changes in `DECISIONS.md`.

---

## Functional Requirements

Your application must fulfill all four user stories below. Each has explicit acceptance criteria — treat them as your definition of done.

### 1. Task Creation

**User story:** As a user, I want to create a new task so I can keep track of my work.

**Acceptance criteria:**
- Title: required, string, maximum 100 characters.
- Description: required, string, no length limit.
- Status is set automatically to `PENDING` on creation — not supplied by the user.
- Validation fires on both layers: inline UI feedback before submission, and API-level DTO validation returning structured error payloads on invalid input.

---

### 2. Task Retrieval & Listing

**User story:** As a user, I want to view all my tasks so I know what needs to be done.

**Acceptance criteria:**
- Frontend fetches tasks from the backend API — no static or hardcoded data.
- Each task clearly shows its current status (`PENDING` or `COMPLETED`).
- The list updates dynamically without a hard page reload when tasks are added, updated, or deleted.

---

### 3. Task Completion Lifecycle

**User story:** As a user, I want to toggle a task's completion status to mark it done or reopen it.

**Acceptance criteria:**
- Status toggles in both directions: `PENDING` → `COMPLETED` and `COMPLETED` → `PENDING`.
- Valid status values are exactly `PENDING` and `COMPLETED`. The API must reject any other value.
- The UI either updates instantly (optimistic) or shows a loading indicator during the API call. On error, roll back to the previous status and surface an error message to the user.

---

### 4. Task Deletion

**User story:** As a user, I want to delete a task to permanently remove it from my list.

**Acceptance criteria:**
- A delete action is clearly available per task.
- The record is permanently removed from the PostgreSQL database.
- The UI updates dynamically — no hard page reload.

---

## Technical & Engineering Standards

These are evaluated criteria, not optional polish. A working app that ignores these will score lower than a simpler app that respects them.

### API Separation
- The NestJS backend runs as a fully decoupled RESTful API service.
- Do not serve Next.js static files from the NestJS server.
- Frontend communicates with the backend exclusively over HTTP.

### Database Migrations
- Commit both `schema.prisma` and the full `/prisma/migrations` folder.
- Reviewers will run `npx prisma migrate deploy` — it must succeed without manual SQL steps.
- Include a seed script (`prisma db seed`) that inserts at least 3–5 sample tasks so reviewers can evaluate the UI immediately.

### Input Validation

| Layer | Requirement |
|---|---|
| Frontend | Inline field errors before the form is submitted |
| Backend (NestJS) | `class-validator` DTOs returning structured error payloads — not raw unhandled exceptions |
| Database (Prisma) | Postgres native enum for status — not a plain `String` field |

### Unit Testing
- Write at least 2–3 meaningful unit tests. Quality over quantity — 100% coverage is not expected.
- Recommended focus: NestJS service methods (create, update, delete logic) and/or a critical React component or utility.
- Tests must pass when reviewers run them. Failing tests are worse than no tests.

### Local Setup *(optional but strongly recommended)*
Provide one of the following:

| Option | What to provide |
|---|---|
| Docker Compose | `docker-compose.yml` that starts PostgreSQL on port 5432 |
| Setup script | `npm run setup` that installs deps, runs migrations, and seeds the database |

---

## Reference Data Model

The following Prisma schema is a suggested starting point. You may adapt it, but your final schema must support all functional requirements. Justify any deviations in `DECISIONS.md`.

```prisma
model Task {
  id          String     @id @default(cuid())
  title       String     @db.VarChar(100)
  description String
  status      TaskStatus @default(PENDING)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

enum TaskStatus {
  PENDING
  COMPLETED
}
```

> Using a Postgres native enum enforces valid status values at the database layer. Using a plain `String` field for status will be flagged in the code review.

---

## Expected API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/tasks` | Return all tasks ordered by `createdAt` descending |
| `POST` | `/tasks` | Create task. Body: `{ title, description }`. Status defaults to `PENDING` |
| `PATCH` | `/tasks/:id` | Update title, description, or status. Return `404` if not found |
| `DELETE` | `/tasks/:id` | Permanently delete the task. Return `404` if not found |

---

## Submission Workflow

1. **Clone** this repository locally.
2. Create a working branch: `feature/your-name-submission`
3. Commit your changes **iteratively** with clear, descriptive commit messages. Avoid single-commit submissions — your commit history is part of the review.
4. Update the README with the three sections below before opening your PR.
5. Push your branch and open a **Pull Request against `main`**.
6. **Do not merge the PR.** Our team reviews directly inside your open PR.

> ⚠️ **Do not merge the PR.** Merged PRs cannot be reviewed in the standard workflow and will require resubmission.

---

## AI Tools Policy

We actively encourage the use of modern developer tools — GitHub Copilot, ChatGPT, Claude, and others are a core part of real-world engineering workflows. Using them is not penalised. Hiding their use is.

| Encouraged | Required |
|---|---|
| Using Copilot to scaffold boilerplate | Disclose AI usage in `DECISIONS.md` |
| Using AI to debug or explore options | Be able to explain every line in your 1:1 review call |
| Committing AI-generated code you understand | Verify AI-generated schema, DTO, or logic before committing |

---

## Bonus

These are not required but will earn extra points:

- `docker-compose.yml` where `docker compose up` starts the full environment
- Unit tests that pass with `npm run test`

---

