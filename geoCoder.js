// geocoder.js - À exécuter avec Node.js (ex: node geocoder.js)
// Nécessite Node.js v18+ pour l'API fetch native

const fs = require('fs');

// Votre liste brute récupérée (exemple)
const etablissementsBruts = [
    {
        "id": "par-01",
        "ville": "Paris",
        "etablissement": "Université Paris 1 Panthéon-Sorbonne",
        "type": "Université",
        "statut": "Bloqué",
        "lat": 48.8471,
        "lng": 2.3435,
        "historique_mobilisation": {
            "2026-09-29": 3500,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "ssd-01",
        "ville": "Saint-Denis",
        "etablissement": "Université Paris 8 Vincennes - Saint-Denis",
        "type": "Université",
        "statut": "Filtrant",
        "lat": 48.9452,
        "lng": 2.3639,
        "historique_mobilisation": {
            "2026-09-29": 2200,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "ssd-02",
        "ville": "Montreuil",
        "etablissement": "Lycée Jean Jaurès",
        "type": "Lycée",
        "statut": "Tensions signalées - Intervention FDO",
        "lat": 48.8653,
        "lng": 2.4456,
        "historique_mobilisation": {
            "2026-09-29": 650,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "ssd-03",
        "ville": "Aubervilliers",
        "etablissement": "Lycée Henri Wallon",
        "type": "Lycée",
        "statut": "Blocage partiel",
        "lat": 48.9131,
        "lng": 2.3822,
        "historique_mobilisation": {
            "2026-09-29": 400,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "lyo-01",
        "ville": "Lyon",
        "etablissement": "Université Lumière Lyon 2",
        "type": "Université",
        "statut": "Bloqué",
        "lat": 45.7483,
        "lng": 4.8361,
        "historique_mobilisation": {
            "2026-09-29": 4200,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "lyo-02",
        "ville": "Lyon",
        "etablissement": "Lycée Ampère",
        "type": "Lycée",
        "statut": "Manifestation devant les grilles",
        "lat": 45.7634,
        "lng": 4.8367,
        "historique_mobilisation": {
            "2026-09-29": 800,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "lyo-03",
        "ville": "Lyon",
        "etablissement": "Lycée Antoine de Saint-Exupéry",
        "type": "Lycée",
        "statut": "Bloqué",
        "lat": 45.7765,
        "lng": 4.8258,
        "historique_mobilisation": {
            "2026-09-29": 500,
            "2026-09-30": null,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "TV5Monde (Vidéo)"
    },
    {
        "id": "lil-01",
        "ville": "Lille",
        "etablissement": "Lycée Fénelon",
        "type": "Lycée",
        "statut": "Bloqué",
        "lat": 50.6264,
        "lng": 3.0640,
        "historique_mobilisation": {
            "2026-09-29": 800,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "lil-02",
        "ville": "Lille",
        "etablissement": "Lycée Baggio",
        "type": "Lycée",
        "statut": "Bloqué - Tensions signalées",
        "lat": 50.6133,
        "lng": 3.0658,
        "historique_mobilisation": {
            "2026-09-29": 750,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "lil-03",
        "ville": "Lille",
        "etablissement": "Lycée Montebello",
        "type": "Lycée",
        "statut": "Bloqué - Incendie et intervention pompiers/FDO",
        "lat": 50.6190,
        "lng": 3.0375,
        "historique_mobilisation": {
            "2026-09-29": 600,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "lil-04",
        "ville": "Lille",
        "etablissement": "Lycée Pasteur",
        "type": "Lycée",
        "statut": "Bloqué",
        "lat": 50.6385,
        "lng": 3.0722,
        "historique_mobilisation": {
            "2026-09-29": 500,
            "2026-10-01": null,
            "2026-10-06": null
        }
    },
    {
        "id": "ren-02",
        "ville": "Rennes",
        "etablissement": "Lycée Coëtlogon",
        "type": "Lycée",
        "statut": "Bloqué - Saccage de l'accueil, affrontements FDO",
        "lat": 48.1250,
        "lng": -1.7020,
        "historique_mobilisation": {
            "2026-09-29": 0,
            "2026-09-30": 300,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "Le Télégramme"
    },
    {
        "id": "ren-03",
        "ville": "Rennes",
        "etablissement": "Université Rennes 2 (Campus Villejean)",
        "type": "Université",
        "statut": "Bloqué - Suspension des activités",
        "lat": 48.1197,
        "lng": -1.7013,
        "historique_mobilisation": {
            "2026-09-29": 0,
            "2026-09-30": 2000,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "Rennes Infos Autrement"
    },
    {
        "id": "tou-01",
        "ville": "Toulouse",
        "etablissement": "Lycée des Arènes",
        "type": "Lycée",
        "statut": "Bloqué - Intervention FDO (Gaz lacrymogène)",
        "lat": 43.5900,
        "lng": 1.4150,
        "historique_mobilisation": {
            "2026-09-29": 0,
            "2026-09-30": 400,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "Réseaux sociaux / Presse locale"
    },
    {
        "id": "mon-01",
        "ville": "Montbéliard",
        "etablissement": "Lycée Germaine Tillion",
        "type": "Lycée",
        "statut": "Blocus et rassemblement",
        "lat": 47.5098,
        "lng": 6.8043,
        "historique_mobilisation": {
            "2026-09-29": 200,
            "2026-09-30": null,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "Salade2Montbe"
    },
    {
        "id": "cre-01",
        "ville": "Créteil",
        "etablissement": "Lycée Saint-Exupéry",
        "type": "Lycée",
        "statut": "Blocus et tensions signalées",
        "lat": 48.7904,
        "lng": 2.4552,
        "historique_mobilisation": {
            "2026-09-29": 300,
            "2026-09-30": null,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "Le Nouveau Détective"
    },
    {
        "id": "ssd-04",
        "ville": "Saint-Denis",
        "etablissement": "Lycée Paul Éluard",
        "type": "Lycée",
        "statut": "Blocus",
        "lat": 48.9405,
        "lng": 2.3556,
        "historique_mobilisation": {
            "2026-09-29": 400,
            "2026-09-30": null,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "France 24"
    },
    {
        "id": "nan-01",
        "ville": "Nantes",
        "etablissement": "Université de Nantes (Campus Tertre)",
        "type": "Université",
        "statut": "Bloqué - Assemblée Générale en cours",
        "lat": 47.2301,
        "lng": -1.5517,
        "historique_mobilisation": {
            "2026-09-29": 1500,
            "2026-09-30": 1800,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "Ouest-France / Syndicat Étudiant"
    },
    {
        "id": "mar-01",
        "ville": "Marseille",
        "etablissement": "Lycée Thiers",
        "type": "Lycée",
        "statut": "Filtrant - Piquets de grève",
        "lat": 43.2980,
        "lng": 5.3813,
        "historique_mobilisation": {
            "2026-09-29": 500,
            "2026-09-30": 450,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "La Provence"
    },
    {
        "id": "str-01",
        "ville": "Strasbourg",
        "etablissement": "Palais Universitaire",
        "type": "Université",
        "statut": "Bloqué",
        "lat": 48.5846,
        "lng": 7.7615,
        "historique_mobilisation": {
            "2026-09-29": 800,
            "2026-09-30": null,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "DNA (Dernières Nouvelles d'Alsace)"
    },
        {
        "id": "van-01",
        "ville": "Vannes",
        "etablissement": "Lycée Charles de Gaulle",
        "type": "Lycée",
        "statut": "Bloqué - Départ en manifestation",
        "lat": 47.6631,
        "lng": -2.7503,
        "historique_mobilisation": {
            "2026-09-29": 400,
            "2026-09-30": null,
            "2026-10-01": null,
            "2026-10-06": null
        },
        "source": "Actu Morbihan (Vidéo)"
    },
];

async function geocodeAndGenerateJSON() {
    const mapData = [];

    for (let i = 0; i < etablissementsBruts.length; i++) {
        const item = etablissementsBruts[i];
        const query = encodeURIComponent(`${item.nom}, ${item.ville}, France`);
        
        console.log(`Recherche des coordonnées pour : ${item.nom} (${item.ville})...`);
        
        try {
            // Appel à l'API gratuite Nominatim (OpenStreetMap)
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
                headers: { 'User-Agent': 'Script-Veille-Mouvements-Etudiants/1.0' }
            });
            const data = await response.json();

            if (data.length > 0) {
                mapData.push({
                    id: `${item.ville.substring(0,3).toLowerCase()}-${Date.now().toString().slice(-4)}-${i}`,
                    ville: item.ville,
                    etablissement: item.nom,
                    type: item.type,
                    statut: item.statut,
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                    historique_mobilisation: {
                        "2026-09-29": item.effectif,
                        "2026-10-01": null,
                        "2026-10-06": null
                    },
                    source: "Agrégation syndicale"
                });
            } else {
                console.warn(`⚠️ Coordonnées non trouvées pour : ${item.nom}`);
            }

            // Pause de 1.5s obligatoire pour ne pas se faire bloquer par l'API gratuite d'OSM
            await new Promise(resolve => setTimeout(resolve, 1500));

        } catch (error) {
            console.error(`Erreur sur ${item.nom}:`, error);
        }
    }

    // Écriture du fichier final
    fs.writeFileSync('map_genere.json', JSON.stringify(mapData, null, 4));
    console.log('✅ Fichier map_genere.json créé avec succès ! Vous pouvez le fusionner avec map.json.');
}

geocodeAndGenerateJSON();