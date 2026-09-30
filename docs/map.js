// map.js

/**
 * Définit la couleur du marqueur en fonction du type d'établissement
 * @param {string} type - Le type d'établissement
 * @returns {string} Code couleur hexadécimal (palette DSFR)
 */
function getColorByType(type) {
    switch(type) {
        case 'Université': return '#000091'; /* Bleu France */
        case 'Lycée': return '#e4794a'; /* Orange Terre Battue */
        case 'Institut': return '#a558a0'; /* Violet */
        case 'Académie': return '#161616'; /* Titre/Noir */
        default: return '#18753C'; /* Vert par défaut */
    }
}

/**
 * Initialise la carte Leaflet et place les marqueurs
 * @param {Array} lieuxData - Tableau des données cartographiques (map.json)
 * @param {Function} onMarkerClick - Fonction de callback déclenchée au clic sur un marqueur
 */
export function initMap(lieuxData, onMarkerClick) {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return null;
    
    // Nettoyage de sécurité
    if (L.DomUtil.get('map') !== null) {
        L.DomUtil.get('map')._leaflet_id = null;
    }
    
    // Centrage sur la France
    const map = L.map('map').setView([46.603354, 1.888334], 5);
    
    // Fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Injection des marqueurs vectoriels optimisés pour des volumes importants
    lieuxData.forEach(lieu => {
        const markerColor = getColorByType(lieu.type);
        
        const marker = L.circleMarker([lieu.lat, lieu.lng], {
            radius: 8,
            fillColor: markerColor,
            color: '#fff',     // Bordure blanche pour détacher le point de la carte
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // Tooltip enrichi affichant le type avec sa couleur dédiée
        marker.bindTooltip(`
            <strong>${lieu.ville}</strong><br>
            <span style="color:${markerColor}; font-weight:bold;">${lieu.type}</span><br>
            ${lieu.statut}
        `);
        
        // Transmission de l'objet de données enrichi au clic
        marker.on('click', () => {
            onMarkerClick(lieu);
        });
    });

    // Redimensionnement forcé pour éviter les artefacts de rendu
    setTimeout(() => { map.invalidateSize(); }, 500);

    return map;
}