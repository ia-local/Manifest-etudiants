# 🏛️ RIC_ENGINE : Cellule de Veille et de Suivi (Mouvements Étudiants 2026)

**Dôme d'Initiative Citoyenne** conçu pour documenter, cartographier et accompagner démocratiquement et juridiquement les mouvements sociaux (étudiants et lycéens) de l'automne 2026.

Le projet utilise le **Système de Design de l'État (DSFR)** pour garantir une interface institutionnelle, accessible et optimisée pour les usages mobiles (approche *Mobile-First*), tout en opérant dans une architecture décentralisée (fichiers JSON statiques).

---

## 📑 Table des matières
1. [Fonctionnalités Principales](#-fonctionnalités-principales)
2. [Architecture du Projet](#-architecture-du-projet)
3. [Technologies Utilisées](#-technologies-utilisées)
4. [Installation & Déploiement](#-installation--déploiement)
5. [Gestion des Données (JSON)](#-gestion-des-données-json)

---

## 🎯 Fonctionnalités Principales

*   🗺️ **Cartographie Interactive (`map.html`) :** Visualisation en temps réel des blocages, universités et lycées mobilisés via Leaflet.js. Intégration de preuves vidéos (YouTube, Facebook Reels) et de l'historique des effectifs.
*   📢 **Cahier des Revendications (`revendications.html`) :** Extraction et affichage dynamique des doléances du terrain (précarité, repas à 1€, Parcoursup, infrastructures). Intègre une interface de *Résolution Démocratique* permettant aux citoyens de proposer des solutions légales ou budgétaires.
*   ⚖️ **Droits & Justice (`justice.html`) :** Bouclier juridique pour les victimes de violences d'État (tirs de LBD, absence de RIO). Générateur automatique de signalement au Procureur de la République (Article 40 du Code de Procédure Pénale) et saisine de l'IGPN.
*   👁️ **Observatoire Démocratique (`observatoire.html`) :** Cellule d'analyse des asymétries institutionnelles : biais du traitement médiatique, instrumentalisation des forces de l'ordre, et opacité de la gouvernance judiciaire (ex: élections du CNB).
*   📱 **Navigation Mobile-First :** Barre d'onglets persistante (Bottom Navigation Bar) pour une utilisation optimale à une main sur le terrain, remplaçant le menu burger natif du DSFR sous 992px.

---

## 📂 Architecture du Projet

```text
/
├── index.html                  # Landing page (Contexte de la mobilisation & Tuiles de navigation)
├── map.html                    # Interface cartographique Leaflet
├── revendications.html         # Cahier national des doléances
├── justice.html                # Outils de recours juridique (Art. 40, IGPN)
├── observatoire.html           # Analyse des asymétries démocratiques
│
├── style-dsfr.css              # Surcharges CSS (Bottom Nav Bar, Vidéos responsives 16:9 / 9:16)
│
├── map.js                      # Configuration Leaflet et typologie des marqueurs
├── modal.js                    # Logique d'injection pour la modale cartographique (Lieux/Vidéos)
├── modal-revendications.js     # Logique de la modale de proposition de solutions
├── script.js                   # Contrôleur principal pour map.html
├── revendications-script.js    # Contrôleur principal pour revendications.html
│
├── map.json                    # Base de données cartographique (Coordonnées, Statuts, Vidéos)
└── revendications.json         # Base de données sémantique (Catégories, Descriptions)