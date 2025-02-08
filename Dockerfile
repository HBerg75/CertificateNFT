# Utiliser une image Ubuntu récente comme base
FROM ubuntu:22.04

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    curl wget unzip jq git \
    && rm -rf /var/lib/apt/lists/*

# Installer Avalanche-CLI
RUN curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s

# Ajouter le répertoire d'installation à la variable PATH
ENV PATH="/root/bin:${PATH}"

# Lien symbolique pour rendre `avalanche` accessible globalement
RUN ln -s /root/bin/avalanche /usr/local/bin/avalanche

# Installer AvalancheGo directement
RUN mkdir -p /root/.avalanche-cli/bin/avalanchego && \
    curl -L https://github.com/ava-labs/avalanchego/releases/download/v1.12.2/avalanchego-linux-amd64-v1.12.2.tar.gz | tar -xz -C /root/.avalanche-cli/bin/avalanchego --strip-components=1

# Définir le répertoire de travail
WORKDIR /root

# Créer un répertoire pour les configurations Avalanche
RUN mkdir -p /root/avalanche-config

# Définir ce répertoire comme volume pour la persistance des données
VOLUME ["/root/avalanche-config"]

# Exposer les ports Avalanche pour la connexion
EXPOSE 9650
EXPOSE 32991

# Lancer un shell interactif par défaut
CMD ["/bin/bash"]
