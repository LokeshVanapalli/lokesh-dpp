#!/usr/bin/env bash
set -e

echo "[devcontainer] Running post-create script..."

# Go to workspace root
cd /workspace

# Ensure docker-compose file exists
if [ -f ".devcontainer/docker-compose.yml" ]; then
  echo "[devcontainer] Starting local containers (postgres + pgadmin)..."
  sudo docker compose -f .devcontainer/docker-compose.yml up -d
else
  echo "[devcontainer] No docker-compose file found."
fi

# Install frontend node modules if folder exists
if [ -d "frontend" ]; then
  echo "[devcontainer] Installing frontend npm packages..."
  cd frontend
  npm ci --silent || npm install --silent
  cd ..
fi

echo "[devcontainer] Post-create finished."
