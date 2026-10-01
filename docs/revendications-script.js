// revendications-script.js

import { openRevendicationModal } from './modal-revendications.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./revendications.json');
        if (!response.ok) throw new Error("Erreur de chargement du JSON");
        
        const data = await response.json();
        const grid = document.getElementById('revendications-grid');
        
        // Génération des cartes
        grid.innerHTML = data.map((rev, index) => `
            <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <div class="fr-card fr-enlarge-link fr-card--no-border fr-background-alt--grey" id="rev-card-${index}" style="cursor: pointer;">
                    <div class="fr-card__body">
                        <div class="fr-card__content">
                            <h3 class="fr-card__title">
                                <span class="fr-card__link">${rev.categorie}</span>
                            </h3>
                            <p class="fr-card__desc">${rev.description.length > 100 ? rev.description.substring(0, 100) + '...' : rev.description}</p>
                            ${rev.source ? `<div class="fr-card__start"><p class="fr-card__detail fr-icon-info-fill"> ${rev.source}</p></div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Ajout des écouteurs de clic sur chaque carte
        data.forEach((rev, index) => {
            const card = document.getElementById(`rev-card-${index}`);
            if (card) {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    openRevendicationModal(rev);
                });
            }
        });
        
    } catch (error) {
        console.error("Erreur :", error);
        document.getElementById('revendications-grid').innerHTML = `
            <div class="fr-col-12">
                <div class="fr-alert fr-alert--error">
                    <h3 class="fr-alert__title">Erreur</h3>
                    <p>Impossible de charger le cahier des revendications.</p>
                </div>
            </div>`;
    }
});