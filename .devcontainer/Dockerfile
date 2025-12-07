# Base image with common tools
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Avoid interactive prompts
ARG DEBIAN_FRONTEND=noninteractive

# Install packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    unzip \
    ca-certificates \
    apt-transport-https \
    gnupg \
    lsb-release \
    sudo \
    build-essential \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Install OpenJDK 17 (Temurin)
RUN apt-get update && apt-get install -y --no-install-recommends wget \
 && wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | gpg --dearmor > /usr/share/keyrings/adoptium.gpg \
 && echo "deb [signed-by=/usr/share/keyrings/adoptium.gpg] https://packages.adoptium.net/artifactory/deb $(lsb_release -cs) main" \
    > /etc/apt/sources.list.d/adoptium.list \
 && apt-get update \
 && apt-get install -y temurin-17-jdk \
 && rm -rf /var/lib/apt/lists/*

# Install Maven
ARG MAVEN_VERSION=3.9.5
RUN curl -fsSL https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
  | tar xz -C /opt \
  && ln -s /opt/apache-maven-${MAVEN_VERSION} /opt/maven \
  && ln -s /opt/maven/bin/mvn /usr/local/bin/mvn

# Install Node & npm (Node 18)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g @angular/cli@16

# Install Docker CLI (so you can run docker commands inside the Codespace)
RUN apt-get update && apt-get install -y docker.io docker-compose-plugin && rm -rf /var/lib/apt/lists/*

# Create 'vscode' user (same as Codespaces recommended)
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
  && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
  && apt-get update && apt-get install -y sudo \
  && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

# Set environment
ENV HOME=/home/${USERNAME}
WORKDIR /workspace

# Ensure permissions for /workspace
RUN chown -R ${USERNAME}:${USERNAME} /workspace

USER ${USERNAME}
