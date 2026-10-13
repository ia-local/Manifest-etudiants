// modal-preuve.js

export function openPreuveModal(videoSrc, title, desc) {
    const modalTitle = document.getElementById('modal-preuve-title');
    const modalDesc = document.getElementById('modal-preuve-desc');
    const videoContainer = document.getElementById('modal-preuve-video-container');

    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    if (videoContainer) {
        videoContainer.innerHTML = `
            <video controls width="100%" preload="metadata" style="border-radius: 0.25rem; background: #000; max-height: 400px;">
                <source src="${videoSrc}" type="video/mp4">
                Votre navigateur ne supporte pas la lecture de vidéos HTML5.
            </video>
        `;
    }

    // Déclenchement de l'ouverture de la modale DSFR via le bouton caché
    const trigger = document.getElementById('hidden-preuve-modal-trigger');
    if (trigger) {
        trigger.click();
    }
}