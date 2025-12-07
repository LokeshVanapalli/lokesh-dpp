#!/usr/bin/env bash
set -e
echo "[devcontainer] Installing Java 17 (Temurin), Maven, Angular CLI, Docker CLI..."

# Install Temurin-17 JDK
if ! java -version 2>/dev/null | grep -q "17"; then
  sudo apt-get update -y
  sudo apt-get install -y wget gnupg2
  wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo gpg --dearmor -o /usr/share/keyrings/adoptium.gpg
  echo "deb [signed-by=/usr/share/keyrings/adoptium.gpg] https://packages.adoptium.net/artifactory/deb bullseye main" | sudo tee /etc/apt/sources.list.d/adoptium.list
  sudo apt-get update -y
  sudo apt-get install -y temurin-17-jdk
fi

# Install Maven
if ! command -v mvn >/dev/null 2>&1; then
  sudo apt-get update -y
  sudo apt-get install -y maven
fi

# Install docker cli & compose plugin (may already exist)
if ! command -v docker >/dev/null 2>&1; then
  sudo apt-get update -y
  sudo apt-get install -y docker.io docker-compose-plugin
fi

# Install Angular CLI globally (use npm installed in the image)
if ! command -v ng >/dev/null 2>&1; then
  sudo npm install -g @angular/cli@17
fi

echo "[devcontainer] Tooling install complete."
