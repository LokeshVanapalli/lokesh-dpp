#!/usr/bin/env bash
set -e
echo "[devcontainer] post-start: verifying services..."

# Wait briefly for postgres
echo "[devcontainer] waiting for postgres to come up..."
# simple wait loop (timeout ~30s)
for i in {1..30}; do
  if sudo docker compose -f .devcontainer/docker-compose.yml ps dpp-postgres >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "[devcontainer] Post-start complete. Use VS Code tasks to run backend/frontend."
