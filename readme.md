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

## discours d'un étudiant Grenoble

```
« Jamais nous n'avons vu un 8h-18h rendre plus intelligent. Jamais nous n'avons vu un ministre améliorer la vie d'un étudiant en France. Jamais nous n'avons vu jusqu'ici un présumé ministre de l'éducation délaisser à ce point ce dont il a la charge.   Mépriser nos blocages ne diminuera en rien notre détermination. Les mortiers ont été mis en place pour nous protéger face aux forces de l'ordre et à leurs multiples interventions musclées. Les balayer d'un revers de main ne changera rien non plus.   Aujourd'hui, nous sommes unis derrière les mêmes convictions et un même objectif : bâtir un avenir meilleur. Malheureusement pour vous, la jeunesse que vous avez tenté de formater ne s'est pas laissée faire. Le mécontentement général et national exprimé à travers les blocus en est la preuve. La conscience politique est aujourd'hui quasi globale. C'est pourquoi nous vous l'affirmons avec assurance et confiance : nous ne nous tairons pas, n'en déplaise à M. Pierre-Henri Dumont.   Aujourd'hui, nous voulons des conditions d'apprentissage dignes : des classes moins chargées, des emplois du temps plus cohérents et moins contre-productifs, des établissements climatisés et correctement chauffés. Apprendre suppose d'abord de pouvoir travailler dans de bonnes conditions. Nous souhaitons aussi un budget et des moyens à la hauteur : une revalorisation du budget de l'éducation nationale et davantage de moyens humains et matériels mis en place suite à des études sur terrain. Sans investissements réels, aucune amélioration durable n'est possible.   La fin de Parcoursup et une vraie méritocratie. Chaque élève doit pouvoir construire l'avenir qu'il souhaite sans être trié par un algorithme.   Une meilleure écoute de la jeunesse : nous exigeons une vraie prise en compte des revendications des jeunes ainsi qu'une potentielle dissolution de l'IGPN dont l'impartialité est contestée.   Un soutien aux jeunes entrepreneurs-entrepreneuses : plus d'aide pour les jeunes qui entreprennent et une baisse des taxes qui leur sont imposées afin de ne pas freiner l'initiative dès le départ. Investir dès le plus jeune âge : selon les travaux de James Heckman, les investissements dans la petite enfance sont les plus rentables sur le plan social comme économique. Il faut donc davantage investir sur les plus petits.   Notre conscience politique est plus forte que jamais. Nous continuerons à faire entrave, qu'il en plaise ou non ! » 


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