// map.js

let currentMap = null;
let markersGroup = null;

// map.js (Extrait)
function getColorByType(type) {
    switch(type) {
        case 'Université': return '#000091'; /* Bleu France */
        case 'Lycée': return '#e4794a'; /* Orange Terre Battue */
        case 'Collège': return '#a558a0'; /* Violet Glycine */
        case 'Mairie': return '#27a64c'; /* Vert institutionnel */
        case 'Préfecture': return '#161616'; /* Noir Autorité */
        case 'Trésor Public': return '#53657d'; /* Bleu Météore / Finances Publiques */
        case 'Cible financière / Commerce': return '#c9191e'; /* Rouge Marianne */
        case 'Bavure / Interpellation violente': return '#d1335b'; /* Rouge Framboise */
        default: return '#18753C';
    }
}

export function initMap(lieuxData, onMarkerClick) {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return null;

    if (!currentMap) {
        currentMap = L.map('map').setView([46.603354, 1.888334], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(currentMap);
        markersGroup = L.layerGroup().addTo(currentMap);
    }

    renderMarkers(lieuxData, onMarkerClick);
    return currentMap;
}

export function renderMarkers(lieuxData, onMarkerClick) {
    if (!markersGroup) return;
    markersGroup.clearLayers();

    lieuxData.forEach(lieu => {
        const markerColor = getColorByType(lieu.type);
        
        const marker = L.circleMarker([lieu.lat, lieu.lng], {
            radius: 8,
            fillColor: markerColor,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        });

        marker.bindTooltip(`
            <strong>${lieu.ville} - ${lieu.etablissement}</strong><br>
            <span style="color:${markerColor}; font-weight:bold;">${lieu.type}</span><br>
            ${lieu.statut}
        `);

        marker.on('click', () => onMarkerClick(lieu));
        markersGroup.addLayer(marker);
    });
}