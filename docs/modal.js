// modal.js

/**
 * Remplir et ouvrir la modale DSFR avec les données d'un lieu
 * @param {Object} lieu - Les données du lieu cliqué
 */
export function openLieuModal(lieu) {
    // 1. Injection des données dans le DOM de la modale
    document.getElementById('modal-title').textContent = `${lieu.ville} - ${lieu.etablissement}`;
    document.getElementById('modal-status').textContent = lieu.statut;
    document.getElementById('modal-manifestants').textContent = lieu.manifestants || "Non précisé";
    
    // 2. Méthode robuste pour ouvrir la modale DSFR
    // On simule un clic sur le bouton déclencheur natif du DSFR
    const triggerBtn = document.getElementById('hidden-modal-trigger');
    
    if (triggerBtn) {
        triggerBtn.click();
    } else {
        console.error("Le bouton déclencheur de la modale (hidden-modal-trigger) est introuvable dans le HTML.");
    }
}