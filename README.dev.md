# DPP - Codespaces / Devcontainer guide

## Quick start (GitHub Codespaces)
1. Push your repo to GitHub (if not already).
2. On GitHub, open the repo → Code → Codespaces → Create codespace.
3. Wait for Codespace to build (~2-5 min).
4. Once open, open the Terminal (Ctrl+`).

## Start local services
- Start Postgres & pgAdmin:
  - Run the VS Code task: `Docker Compose Up (Postgres)`  
  - OR run in terminal: `sudo docker compose -f .devcontainer/docker-compose.yml up -d`

- Start backend:
  - Run VS Code task: `Run Backend (Maven)`  
  - Or: `cd backend && mvn spring-boot:run -Dspring-boot.run.profiles=dev`

- Start frontend:
  - Run VS Code task: `Run Frontend (Angular)`  
  - Or: `cd frontend && npm run start` (ensure `package.json` has `"start": "ng serve --host 0.0.0.0 --port 4200"`)

## URLs
- Backend (inside Codespace): http://localhost:8080  
- Frontend (inside Codespace): http://localhost:4200  
- Postgres (pgAdmin): http://localhost:5050 (user: admin@local / pass: admin)

> Codespaces will provide preview links when ports are forwarded.

## Notes
- Do not commit secrets. Use environment variables or GitHub Secrets for deployment.
- If you need persistent DB across Codespace rebuilds, configure volume mapping. The current devcontainer uses a Docker named volume `dpp_db_data` inside Codespace.

## Knowledge Base Module

- Secure, user-scoped notes
- JWT-protected APIs
- CRUD operations
- Pagination & search
- Service-layer authorization (no controller-level security)

### Tech Stack
- Spring Boot
- Spring Security (JWT)
- JPA / Hibernate
- Angular (standalone)
