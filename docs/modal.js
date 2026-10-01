// modal.js

export function openLieuModal(lieu) {
    document.getElementById('modal-title').textContent = `${lieu.ville} - ${lieu.etablissement}`;
    document.getElementById('modal-status').textContent = lieu.statut;
    
    const typeBadge = document.getElementById('modal-type');
    if (typeBadge) typeBadge.textContent = lieu.type || "Non défini";

    // 1. Gestion de l'intégration vidéo
    const videoContainer = document.getElementById('modal-video-container');
    if (videoContainer) {
        videoContainer.innerHTML = ''; // Coupe le flux vidéo précédent
        if (lieu.video_url) {
            videoContainer.innerHTML = `
                <h4 class="fr-h6 fr-mt-3w fr-mb-1w">Vidéo de référence</h4>
                <div class="video-responsive-wrapper">
                    <iframe 
                        src="${lieu.video_url}" 
                        title="Vidéo de suivi - ${lieu.etablissement}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        }
    }

    // 2. Historique de mobilisation par date
    const histBody = document.getElementById('modal-historique-body');
    if (histBody) {
        histBody.innerHTML = '';
        if (lieu.historique_mobilisation) {
            for (const [date, effectif] of Object.entries(lieu.historique_mobilisation)) {
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
    
    // 3. Déclenchement de l'ouverture DSFR
    const triggerBtn = document.getElementById('hidden-modal-trigger');
    if (triggerBtn) {
        triggerBtn.click();
    }
}