// filtre.js

/**
 * Configure les écouteurs d'événements pour le filtrage par type
 * @param {Array} lieuxData - Données initiales complètes depuis map.json
 * @param {Function} updateMapAndTableCallback - Fonction de mise à jour de la carte et du tableau
 */
export function initFilters(lieuxData, updateMapAndTableCallback) {
    const filterContainer = document.getElementById('filter-buttons');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.js-filter-btn');
        if (!btn) return;

        // Mise à jour de l'état actif des boutons DSFR
        filterContainer.querySelectorAll('.js-filter-btn').forEach(b => {
            b.classList.remove('fr-btn--secondary');
            b.classList.add('fr-btn--tertiary');
        });
        btn.classList.remove('fr-btn--tertiary');
        btn.classList.add('fr-btn--secondary');

        const selectedType = btn.dataset.type;

        // Filtrage du jeu de données
        const filteredData = selectedType === 'ALL' 
            ? lieuxData 
            : lieuxData.filter(lieu => lieu.type === selectedType);

        updateMapAndTableCallback(filteredData);
    });
}