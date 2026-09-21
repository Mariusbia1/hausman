# HAUSMAN — Paris Fashion Showroom & Archive Wardrobe Rental

> **Showroom d'archives de mode et de location de vestiaire de créateurs (Paris 75003 Le Marais).**  
> Maquette interactive haute couture conçue pour les stylistes, directeurs artistiques, productions éditoriales et artistes.

---

## Presentation du Projet

**HAUSMAN** est un showroom parisien haut de gamme proposant a la location un vestiaire d'archives rares, de pieces de defiles et de silhouettes contemporaines de grands designers (*Maison Margiela, Balenciaga, Rick Owens, Raf Simons, Yohji Yamamoto, Jean Paul Gaultier*).

Cette maquette interactive a ete pensee et architecturee en respectant scrupuleusement les exigences du cahier des charges client, avec une inspiration forte de l'elegance editoriale minimaliste de **SSENSE** et des codes du **Quiet Luxury**.

---

## Caracteristiques de la Maquette

### 1. Front-Office (Experience Showroom Public)
- **Design Minimaliste & Typographie Haute Couture** : Utilisation des polices architecturales *Chillax* et *Inter*, noir onyx (`#000000`), blanc pur et contrastes feutres.
- **Bilingue (Francais / Anglais)** : Bascule dynamique `EN / FR` instantanee sur toutes les pages sans rechargement.
- **Catalogue Garde-robe Interactif (`wardrobe.html`)** :
  - Filtres multicriteres en temps reel : Categories, Createurs, Tailles, Disponibilites.
  - Selecteur de grille dynamique : Affichage 2 colonnes, 3 colonnes ou 4 colonnes.
  - Survol interactif : Alternance instantanee entre le packshot a plat (*flat*) et le visuel porte (*model*).
  - Pagination de luxe integree.
- **Fiche Piece Dediee (`garment.html`)** :
  - Caracteristiques detaillees, reference archive, saison, description bilingue.
  - Galerie photo haute definition avec bascule packshot / silhouette portee.
  - Bouton d'ajout direct au panier de pull (*Request Pull*).
- **HAUSMAN Files / Projets & Editoriaux (`projects.html`)** :
  - Presentation des parutions magazines (*Vogue Paris, Numero, Dazed*), lookbooks et clips video avec credits complets (styliste, photographe, pieces utilisees).
- **Page About / Showroom Paris Marais (`about.html`)** :
  - Manifeste, historique et protocole de prise de rendez-vous pour les professionnels accredites.
- **Page Contact & Demande de Pull (`contact.html`)** :
  - Formulaire qualifie pour stylistes et productions.
  - Integration automatique des pieces selectionnees dans le panier de location.

### 2. Back-Office (Administration & CMS Showroom `admin.html`)
- **Tableau de bord (Vue d'ensemble)** : Indicateurs cles (KPIs), pieces en tournage, demandes de pull recentes et synthese d'inventaire.
- **Gestion de l'Inventaire & Garde-robe** : Consultation, recherche dynamique, bascule d'etat en un clic (*Disponible*, *En location*, *Masque*), ajout d'une nouvelle piece et suppression.
- **Traitement des Demandes de Pull** : Visualisation des demandes des stylistes, changement de statut et contact email direct.
- **Edition des Textes & Presentation** : Mise a jour autonome des textes de presentation en francais et anglais.
- **Module d'Authentification** : Gestion de session et modal de connexion / deconnexion administrateur.

---

## Architecture des Fichiers

```
HAUSMAN/
├── index.html              # Page d'accueil (Hero, Nouveautes, HAUSMAN Files)
├── wardrobe.html           # Catalogue complet de la garde-robe avec filtres
├── garment.html            # Fiche detaillee d'une piece d'archive
├── projects.html           # HAUSMAN Files (Editoriaux & Productions)
├── about.html              # Presentation du Showroom & Protocole Marais
├── contact.html            # Formulaire de demande de pull & contact
├── admin.html              # Panel d'administration CMS (Showroom Management)
├── assets/
│   ├── css/
│   │   ├── main.css        # Styles Front-Office (Design System SSENSE / Luxury)
│   │   └── admin.css       # Styles Back-Office (Console Admin Monochrome)
│   ├── js/
│   │   ├── data.js         # Base de donnees d'archives (JSON structure)
│   │   ├── app.js          # Moteur Front-Office (Filtres, Panier, i18n)
│   │   └── admin.js        # Moteur Admin CMS (CRUD, Metriques, Onglets)
│   └── img/                # Visuels editoriaux et packshots haute definition
├── .gitignore              # Exclusion des fichiers inutiles
└── README.md               # Documentation du projet
```

---

## Visualisation Locale

Vous pouvez previsualiser la maquette localement de deux manieres :

### Option 1 : Ouvrir directement dans le navigateur
Double-cliquez simplement sur le fichier `index.html` pour explorer le site, ou sur `admin.html` pour tester l'espace d'administration.

### Option 2 : Via un serveur local rapide
A la racine du dossier dans votre terminal :
```bash
# Avec Python 3
python3 -m http.server 8080

# Ou avec Node.js (serveur npx)
npx serve .
```
Puis ouvrez votre navigateur sur [http://localhost:8080](http://localhost:8080).

---

## Deploiement sur GitHub & GitHub Pages

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
