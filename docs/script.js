// script.js (Extrait mis à jour)

import { openLieuModal } from './modal.js';
import { initMap, renderMarkers } from './map.js';
import { initFilters } from './filtre.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [mapRes, revRes, comRes, repRes] = await Promise.all([
            fetch('./map.json'),
            fetch('./revendications.json'),
            fetch('./commerces.json'),
            fetch('./etablissements-republique.json')
        ]);
        
        if (!mapRes.ok || !revRes.ok || !comRes.ok || !repRes.ok) {
            throw new Error("Erreur réseau lors du chargement des sources de données.");
        }

        const lieuxData = await mapRes.json();
        const revData = await revRes.json();
        const commercesData = await comRes.json();
        const republiqueData = await repRes.json();

        // Fusion de toutes les bases de données cartographiques
        const globalData = [...lieuxData, ...commercesData, ...republiqueData];

        // Affichage des revendications
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

        const updateDisplay = (data) => {
            const tableBody = document.getElementById('table-lieux-body');
            if (tableBody) {
                tableBody.innerHTML = data.map(lieu => `
                    <tr>
                        <td>${lieu.ville}</td>
                        <td>${lieu.etablissement}</td>
                        <td><span class="fr-badge fr-badge--sm fr-badge--info">${lieu.type}</span></td>
                        <td>${lieu.statut}</td>
                    </tr>
                `).join('');
            }
            renderMarkers(data, openLieuModal);
        };

        initMap(globalData, openLieuModal);
        initFilters(globalData, updateDisplay);
        updateDisplay(globalData);

    } catch (error) {
        console.error("Erreur d'initialisation du système :", error);
    }
});