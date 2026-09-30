// modal.js

export function openLieuModal(lieu) {
    document.getElementById('modal-title').textContent = `${lieu.ville} - ${lieu.etablissement}`;
    document.getElementById('modal-status').textContent = lieu.statut;
    
    const typeBadge = document.getElementById('modal-type');
    if (typeBadge) typeBadge.textContent = lieu.type || "Non défini";

    // Gestion de l'historique par date
    const histBody = document.getElementById('modal-historique-body');
    if (histBody) {
        histBody.innerHTML = '';
        if (lieu.historique_mobilisation) {
            for (const [date, effectif] of Object.entries(lieu.historique_mobilisation)) {
                // Formater l'affichage si la donnée est null (événement futur) ou 0
                let affichageEffectif = "À venir / Inconnu";
                if (effectif !== null) {
                    affichageEffectif = effectif === 0 ? "Aucun" : effectif.toLocaleString('fr-FR');
                }
                
                histBody.innerHTML += `
                    <tr>
                        <td>${date}</td>
                        <td>${affichageEffectif}</td>
                    </tr>
                `;
            }
        } else {
            histBody.innerHTML = `<tr><td colspan="2" class="fr-text--center">Aucune donnée historique</td></tr>`;
        }
    }
    
    const triggerBtn = document.getElementById('hidden-modal-trigger');
    if (triggerBtn) {
        triggerBtn.click();
    }
}