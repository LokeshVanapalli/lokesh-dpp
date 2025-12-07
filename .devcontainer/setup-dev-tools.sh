#!/usr/bin/env bash
set -euo pipefail
echo "[devcontainer] Installing Java 17, Maven, Angular CLI, Docker CLI..."

run_cmd() {
  # Run command with sudo if available and not root, else run directly
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  elif command -v sudo >/dev/null 2>&1; then
    sudo "$@"
  else
    echo "Warning: not running as root and 'sudo' not available — attempting to run: $*"
    "$@"
  fi
}

detect_pkg_mgr() {
  if command -v apk >/dev/null 2>&1; then
    echo "apk"
  elif command -v apt-get >/dev/null 2>&1; then
    echo "apt"
  else
    echo "unknown"
  fi
}

PKG_MGR=$(detect_pkg_mgr)

install_on_apt() {
  # Debian/Ubuntu path (keeps original Temurin install)
  echo "Using apt-get to install packages..."

  if ! java -version 2>/dev/null | grep -q "17"; then
    run_cmd apt-get update -y
    run_cmd apt-get install -y wget gnupg2
    wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | run_cmd gpg --dearmor -o /usr/share/keyrings/adoptium.gpg
    echo "deb [signed-by=/usr/share/keyrings/adoptium.gpg] https://packages.adoptium.net/artifactory/deb bullseye main" | run_cmd tee /etc/apt/sources.list.d/adoptium.list >/dev/null
    run_cmd apt-get update -y
    run_cmd apt-get install -y temurin-17-jdk
  else
    echo "Java 17 already installed"
  fi

  if ! command -v mvn >/dev/null 2>&1; then
    run_cmd apt-get update -y
    run_cmd apt-get install -y maven
  else
    echo "Maven already installed"
  fi

  if ! command -v docker >/dev/null 2>&1; then
    run_cmd apt-get update -y
    run_cmd apt-get install -y docker.io docker-compose-plugin
  else
    echo "Docker already installed"
  fi

  if ! command -v ng >/dev/null 2>&1; then
    if ! command -v npm >/dev/null 2>&1; then
      run_cmd apt-get install -y npm
    fi
    run_cmd npm install -g @angular/cli@17
  else
    echo "Angular CLI already installed"
  fi
}

install_on_apk() {
  # Alpine path: use openjdk17 and apk packages
  echo "Using apk to install packages (Alpine)..."

  run_cmd apk update

  if ! java -version 2>/dev/null | grep -q "17"; then
    # On Alpine the OpenJDK package for 17 is usually openjdk17
    run_cmd apk add --no-cache openjdk17
  else
    echo "Java 17 already installed"
  fi

  if ! command -v mvn >/dev/null 2>&1; then
    run_cmd apk add --no-cache maven
  else
    echo "Maven already installed"
  fi

  if ! command -v docker >/dev/null 2>&1; then
    # docker package provides the daemon/cli; docker-compose plugin may not be packaged the same way
    run_cmd apk add --no-cache docker
  else
    echo "Docker already installed"
  fi

  if ! command -v npm >/dev/null 2>&1; then
    run_cmd apk add --no-cache nodejs npm
  fi

  if ! command -v ng >/dev/null 2>&1; then
    run_cmd npm install -g @angular/cli@17
  else
    echo "Angular CLI already installed"
  fi
}

case "$PKG_MGR" in
  apt)
    install_on_apt
    ;;
  apk)
    install_on_apk
    ;;
  *)
    echo "Unsupported OS / package manager. Detected: $PKG_MGR"
    echo "Please run this script on a Debian/Ubuntu-based or Alpine-based image, or install packages manually."
    exit 1
    ;;
esac

echo "[devcontainer] Tooling install complete."
