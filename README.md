# Resume Builder

Resume builder with 24 premium templates, PDF export, and JSON import/export.

## Tech Stack

- **Backend:** Java 21, Spring Boot 3.4.3, Spring Security + JWT, Spring Data JPA, H2 Database, Lombok, Maven
- **Frontend:** React 19, TypeScript, Vite, Ant Design, Zustand, Browser Print (PDF export)
- **Database:** H2 (embedded, no external DB needed)

## Prerequisites

| Tool | Version | Note |
|------|---------|------|
| Java | 21+ | Required |
| Maven | 3.9+ | Required to build BE |
| Node.js | 18+ | Required to build/run FE |

> **No database setup required** — H2 is embedded and auto-creates its data file on first run.

---

## Getting Started

> You'll need **2 terminals** — one for BE, one for FE.

### Terminal 1 — Backend

```bash
# Step 1: Go to BE directory
cd BE

# Step 2: Build the JAR
mvn clean package -DskipTests

# Step 3: Start the server
java -jar target/resume-builder-1.0.0.jar
```

When you see `Started CvBuilderApplication` in the logs, the API is ready.

| Link | Description |
|------|-------------|
| http://localhost:8080 | API server |
| http://localhost:8080/swagger-ui.html | Swagger UI — test APIs |
| http://localhost:8080/h2-console | H2 Console — browse database |

> H2 Console login: JDBC URL = `jdbc:h2:file:./data/resume-builder`, User = `sa`, Password = *(leave empty)*

### Terminal 2 — Frontend

> **BE must be running first** — FE proxies API calls to `localhost:8080`.

```bash
# Step 1: Go to FE directory
cd FE

# Step 2: Install dependencies
npm install

# Step 3: Start dev server
npm run dev
```

Open http://localhost:5173

---

## Data Storage

```
BE/data/                           <- auto-created on first run
  └── resume-builder.mv.db         <- all data (users, resumes, avatars)
```

- Data **persists** across server restarts
- To reset: stop server → delete `BE/data/` → start again

## Templates (24)

### Classic Collection
Riesling, Barolo, Sauvignon, Malbec, Champagne, Bordeaux, Pinot Grigio, Cabernet, Prosecco

### Tech Collection
Absinthe, Hennessy, Tanqueray, Belvedere, Lagavulin, Macallan, Aperol, Chartreuse, Glenfiddich, Courvoisier

### Premium Collection
Dom Perignon, Veuve Clicquot, Armagnac, Amarone, Opus One

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Resumes (requires JWT)
- `GET /api/resumes` - List all resumes
- `POST /api/resumes` - Create resume
- `GET /api/resumes/{id}` - Get resume
- `PUT /api/resumes/{id}` - Update resume
- `DELETE /api/resumes/{id}` - Delete resume
- `POST /api/resumes/{id}/avatar` - Upload avatar
- `GET /api/resumes/{id}/export-json` - Export JSON
- `POST /api/resumes/import-json` - Import JSON

### Public
- `GET /api/public/resumes/{slug}` - View shared resume
