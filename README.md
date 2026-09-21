# HAUSMAN — Paris Fashion Showroom & Archive Wardrobe Rental

> **Showroom d'archives de mode et de location de vestiaire de créateurs (Paris 75003 Le Marais).**  
> Maquette interactive haute couture conçue pour les stylistes, directeurs artistiques, productions éditoriales et artistes.

---

## 🏛️ Présentation du Projet

**HAUSMAN** est un showroom parisien haut de gamme proposant à la location un vestiaire d'archives rares, de pièces de défilés et de silhouettes contemporaines de grands designers (*Maison Margiela, Balenciaga, Rick Owens, Raf Simons, Yohji Yamamoto, Jean Paul Gaultier*).

Cette maquette interactive a été pensée et architecturée en respectant scrupuleusement les exigences du cahier des charges client, avec une inspiration forte de l'élégance éditoriale minimaliste de **SSENSE** et des codes du **Quiet Luxury**.

---

## ✨ Caractéristiques de la Maquette

### 1. Front-Office (Expérience Showroom Public)
- **Design Minimaliste & Typographie Haute Couture** : Utilisation des polices architecturales *Chillax* et *Inter*, noir onyx (`#000000`), blanc pur et contrastes feutrés.
- **Bilingue (Français / Anglais)** : Bascule dynamique `EN / FR` instantanée sur toutes les pages sans rechargement.
- **Catalogue Garde-robe Interactif (`wardrobe.html`)** :
  - Filtres multicritères en temps réel : Catégories, Créateurs, Tailles, Disponibilités.
  - Sélecteur de grille dynamique : Affichage 2 colonnes, 3 colonnes ou 4 colonnes.
  - Survol interactif : Alternance instantanée entre le packshot à plat (*flat*) et le visuel porté (*model*).
  - Pagination de luxe intégrée.
- **Fiche Pièce Dédiée (`garment.html`)** :
  - Caractéristiques détaillées, référence archive, saison, description bilingue.
  - Galerie photo haute définition avec bascule packshot / silhouette portée.
  - Bouton d'ajout direct au panier de pull (*Request Pull*).
- **HAUSMAN Files / Projets & Éditoriaux (`projects.html`)** :
  - Présentation des parutions magazines (*Vogue Paris, Numéro, Dazed*), lookbooks et clips vidéo avec crédits complets (styliste, photographe, pièces utilisées).
- **Page About / Showroom Paris Marais (`about.html`)** :
  - Manifeste, historique et protocole de prise de rendez-vous pour les professionnels accrédités.
- **Page Contact & Demande de Pull (`contact.html`)** :
  - Formulaire qualifié pour stylistes et productions.
  - Intégration automatique des pièces sélectionnées dans le panier de location.

### 2. Back-Office (Administration & CMS Showroom `admin.html`)
- **Tableau de bord (Vue d'ensemble)** : Indicateurs clés (KPIs), pièces en tournage, demandes de pull récentes et synthèse d'inventaire.
- **Gestion de l'Inventaire & Garde-robe** : Consultation, recherche dynamique, bascule d'état en un clic (*Disponible*, *En location*, *Masqué*), ajout d'une nouvelle pièce et suppression.
- **Traitement des Demandes de Pull** : Visualisation des demandes des stylistes, changement de statut et contact email direct.
- **Édition des Textes & Présentation** : Mise à jour autonome des textes de présentation en français et anglais.
- **Module d'Authentification** : Gestion de session et modal de connexion / déconnexion administrateur.

---

## 📂 Architecture des Fichiers

```
HAUSMAN/
├── index.html              # Page d'accueil (Hero, Nouveautés, HAUSMAN Files)
├── wardrobe.html           # Catalogue complet de la garde-robe avec filtres
├── garment.html            # Fiche détaillée d'une pièce d'archive
├── projects.html           # HAUSMAN Files (Éditoriaux & Productions)
├── about.html              # Présentation du Showroom & Protocole Marais
├── contact.html            # Formulaire de demande de pull & contact
├── admin.html              # Panel d'administration CMS (Showroom Management)
├── assets/
│   ├── css/
│   │   ├── main.css        # Styles Front-Office (Design System SSENSE / Luxury)
│   │   └── admin.css       # Styles Back-Office (Console Admin Monochrome)
│   ├── js/
│   │   ├── data.js         # Base de données d'archives (JSON structuré)
│   │   ├── app.js          # Moteur Front-Office (Filtres, Panier, i18n)
│   │   └── admin.js        # Moteur Admin CMS (CRUD, Métriques, Onglets)
│   └── img/                # Visuels éditoriaux et packshots haute définition
├── .gitignore              # Exclusion des fichiers inutiles
└── README.md               # Documentation du projet
```

---

## 🚀 Visualisation Locale

Vous pouvez prévisualiser la maquette localement de deux manières :

### Option 1 : Ouvrir directement dans le navigateur
Double-cliquez simplement sur le fichier `index.html` pour explorer le site, ou sur `admin.html` pour tester l'espace d'administration.

### Option 2 : Via un serveur local rapide
À la racine du dossier dans votre terminal :
```bash
# Avec Python 3
python3 -m http.server 8080

# Ou avec Node.js (serveur npx)
npx serve .
```
Puis ouvrez votre navigateur sur [http://localhost:8080](http://localhost:8080).

---

## 🌐 Déploiement sur GitHub & GitHub Pages

Pour permettre à votre client de visualiser la maquette en ligne via un lien web direct :

1. **Initialiser le dépôt Git** :
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of HAUSMAN Paris showroom prototype"
   ```

2. **Créer un nouveau dépôt sur votre compte GitHub** (ex. `hausman-showroom`).

3. **Lier et pousser le code** :
   ```bash
   git branch -M main
   git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/hausman-showroom.git
   git push -u origin main
   ```

4. **Activer GitHub Pages** :
   - Rendez-vous sur votre dépôt GitHub : **Settings** > **Pages**.
   - Sous **Build and deployment** / **Branch**, sélectionnez la branche `main` et le dossier `/ (root)`.
   - Cliquez sur **Save**.
   - Votre lien public sera immédiatement disponible sous la forme :  
     `https://VOTRE_NOM_UTILISATEUR.github.io/hausman-showroom/`

---

© 2026 **HAUSMAN Paris** — Showroom d'archives & location de vestiaire de mode.
