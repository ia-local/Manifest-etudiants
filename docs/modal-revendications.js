// modal-revendications.js

export function openRevendicationModal(revendication) {
    // Remplissage des informations de la revendication
    document.getElementById('modal-rev-title').textContent = revendication.categorie;
    document.getElementById('modal-rev-desc').textContent = revendication.description;
    
    // Gestion de la source (facultative)
    const sourceContainer = document.getElementById('modal-rev-source');
    if (revendication.source) {
        sourceContainer.innerHTML = `<span class="fr-icon-warning-fill" aria-hidden="true"></span> <strong>Source :</strong> ${revendication.source}`;
        sourceContainer.style.display = 'block';
    } else {
        sourceContainer.style.display = 'none';
    }

    // Réinitialisation de l'espace solution (simulation de base de données locale)
    document.getElementById('solution-texte').value = '';

    // Déclenchement de l'ouverture de la modale DSFR
    const triggerBtn = document.getElementById('hidden-rev-modal-trigger');
    if (triggerBtn) {
        triggerBtn.click();
    }
}