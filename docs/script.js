// script.js

import { openLieuModal } from './modal.js';
import { initMap } from './map.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [mapRes, revRes] = await Promise.all([
            fetch('./map.json'),
            fetch('./revendications.json')
        ]);
        
        if (!mapRes.ok || !revRes.ok) {
            throw new Error("Erreur réseau (HTTP status non OK)");
        }

        const lieuxData = await mapRes.json();
        const revData = await revRes.json();

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

        // Tableau enrichi avec le tag du type d'établissement
        const tableBody = document.querySelector('#table-lieux tbody');
        if (tableBody) {
            tableBody.innerHTML = lieuxData.map(lieu => `
                <tr>
                    <td>${lieu.ville}</td>
                    <td>${lieu.etablissement} <span class="fr-badge fr-badge--sm fr-badge--purple-glycine fr-ml-1w">${lieu.type}</span></td>
                    <td><span class="fr-badge fr-badge--info">${lieu.statut}</span></td>
                </tr>
            `).join('');
        }

        initMap(lieuxData, openLieuModal);

    } catch (error) {
        console.error("Erreur d'initialisation :", error);
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="fr-alert fr-alert--error">
                    <h3 class="fr-alert__title">Erreur de chargement</h3>
                    <p>Impossible de charger les données JSON. Vérifiez votre serveur local.</p>
                </div>
            `;
        }
    }
});