// map.js

/**
 * Initialise la carte Leaflet et place les marqueurs
 * @param {Array} lieuxData - Tableau des données cartographiques (map.json)
 * @param {Function} onMarkerClick - Fonction de callback déclenchée au clic sur un marqueur
 */
export function initMap(lieuxData, onMarkerClick) {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return null;
    
    // Nettoyage de sécurité pour éviter l'erreur "Map container is already initialized"
    if (L.DomUtil.get('map') !== null) {
        L.DomUtil.get('map')._leaflet_id = null;
    }
    
    // Centrage sur la France
    const map = L.map('map').setView([46.603354, 1.888334], 5);
    
    // Fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Ajout des marqueurs
    lieuxData.forEach(lieu => {
        const marker = L.marker([lieu.lat, lieu.lng]).addTo(map);
        marker.bindTooltip(`<b>${lieu.ville}</b><br>${lieu.statut}`);
        
        // Au clic, on exécute la fonction importée depuis modal.js
        marker.on('click', () => {
            onMarkerClick(lieu);
        });
    });

    // Redimensionnement forcé pour éviter les bugs d'affichage
    setTimeout(() => { map.invalidateSize(); }, 500);

    return map;
}