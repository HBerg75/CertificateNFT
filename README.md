# ESGIChain - Gestion des Certificats Académiques via NFT

## 📌 Description du Projet
Ce projet implémente une solution basée sur **Avalanche** pour la gestion des certificats académiques sous forme de **NFTs dynamiques**. Il repose sur un **L1 personnalisé** déployé sur un **subnet Avalanche** et utilise **Solidity & Foundry** pour le développement des smart contracts.

---

Le projet repose sur un **L1 personnalisé (ESGIChain)** qui permet la gestion des certificats sous forme de **NFTs**. L'accès est contrôlé via **AccessControl**, et les certificats sont stockés avec des **métadonnées dynamiques**.

---

## 🚀 Installation & Déploiement

### **1️⃣ Build et Lancement du Conteneur Docker**

Dans le répertoire du projet, exécutez :

```bash
docker build -t avalanche-cli .
docker run -it --rm --name avalanche-cli avalanche-cli /bin/bash
```

Une fois dans le conteneur, passez en root :

```bash
su root
```

---

### **2️⃣ Installation de l'Avalanche-CLI**

Si ce n'est pas encore fait, installez l'Avalanche-CLI dans le conteneur :

```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
export PATH=~/bin:$PATH
```

Ajoutez cette ligne à `~/.bashrc` pour la rendre permanente :

```bash
echo 'export PATH=~/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

### **3️⃣ Démarrage du Réseau Local Avalanche**

```bash
avalanche network start
```

Vérifiez le statut du réseau avec :

```bash
avalanche network status
```

---

### **4️⃣ Création de la Blockchain ESGIChain**

```bash
avalanche blockchain create ESGIChain
```

Répondez aux questions interactives :
- **VM** : `Subnet-EVM`
- **Validation** : `Proof of Authority`
- **Contrôleur** : sélectionnez une adresse
- **Chain ID** : 1234
- **Token Symbol** : ESGI

Une fois créé, déployez-le sur le réseau local :

prefunding address -> 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
```bash
ls ~/.avalanche-cli/subnets/ESGIChain
avalanche blockchain describe ESGIChain
avalanche blockchain deploy ESGIChain --local
```

Notez l'URL du point de terminaison RPC fourni après le déploiement.

---

## 🎯 Déploiement et Test des Smart Contracts

### **1️⃣ Installation des Dépendances**

```bash
forge install
forge install OpenZeppelin/openzeppelin-contracts
```

---

### **2️⃣ Compilation et Déploiement du Smart Contract**

```bash
source .env
forge script script/DeployCertificateNFT.s.sol --rpc-url $RPC_URL --sender $PUBLIC_WALLET_ADDRESS --private-key $PRIVATE_KEY -vvvv --broadcast
```

⚠️ **Remarque** : Remplacez `<PRIVATE_KEY>` par votre clé privée.

---

### **3️⃣ Exécution des Tests**

```bash
forge test
```

Pour voir la couverture des tests :

```bash
forge coverage
```

---

## 📜 Explication des Smart Contracts

Le **Smart Contract `CertificateNFT.sol`** permet de :
- **Émettre** un NFT pour un étudiant (`mintCertificate`)
- **Révoquer** un certificat (`revokeCertificate`)
- **Mettre à jour** les métadonnées (`updateCertificateMetadata`)
- **Récupérer** la liste des certificats d’un étudiant (`getCertificatesByStudent`)
- **Récupérer** les détails d’un certificat (`getCertificateDetails`)

---

## 🧪 Explication des Tests

Les tests incluent :
- `testMintCertificate()` : Vérifie qu’un certificat peut être émis ✅
- `testRevokeCertificate()` : Vérifie la révocation d’un certificat ✅
- `testUpdateMetadata()` : Vérifie la mise à jour des métadonnées ✅
- `testUnauthorizedAccess()` : Vérifie que seuls les admins peuvent révoquer un certificat ❌
- `testEventEmissionOnMint()` : Vérifie l’émission de l’événement lors du mint ✅
- `testGetCertificatesByStudent()` : Vérifie que les étudiants reçoivent bien leurs certificats ✅

---

### **📌 Remarque**
Si vous avez des questions ou besoin d’aide, référez-vous à la documentation Avalanche :
🔗 [Avalanche Docs](https://build.avax.network/docs/tooling/create-avalanche-l1)
