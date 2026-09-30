// script.js

import { openLieuModal } from './modal.js';
import { initMap } from './map.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Récupération asynchrone des deux fichiers JSON
        const [mapRes, revRes] = await Promise.all([
            fetch('./map.json'),
            fetch('./revendications.json')
        ]);
        
        if (!mapRes.ok || !revRes.ok) {
            throw new Error("Erreur réseau (HTTP status non OK)");
        }

        const lieuxData = await mapRes.json();
        const revData = await revRes.json();

        // 2. Injection HTML des Revendications
        const revContainer = document.getElementById('revendications-list');
        if (revContainer) {
            revContainer.innerHTML = revData.map(rev => `
                <div class="fr-tile fr-tile--horizontal fr-mb-2w">
                    <div class="fr-tile__body">
                        <h3 class="fr-tile__title">${rev.categorie}</h3>
                        <p class="fr-tile__desc">${rev.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // 3. Injection HTML du tableau des lieux
        const tableBody = document.querySelector('#table-lieux tbody');
        if (tableBody) {
            tableBody.innerHTML = lieuxData.map(lieu => `
                <tr>
                    <td>${lieu.ville}</td>
                    <td>${lieu.etablissement}</td>
                    <td><span class="fr-badge fr-badge--info">${lieu.statut}</span></td>
                </tr>
            `).join('');
        }

        // 4. Lancement de la carte avec la fonction callback vers la modale
        initMap(lieuxData, openLieuModal);

    } catch (error) {
        console.error("Erreur d'initialisation de l'application :", error);
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="fr-alert fr-alert--error">
                    <h3 class="fr-alert__title">Erreur de chargement</h3>
                    <p>Impossible de charger les données JSON. Si vous développez en local, assurez-vous d'utiliser un serveur local (Live Server) et non le protocole file://.</p>
                </div>
            `;
        }
    }
});