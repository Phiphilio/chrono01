"use strict";
// popup.ts
// Demander le dernier résultat au background au chargement du popup
chrome.runtime.sendMessage({ type: "demande-resultat" }, (response) => {
    if (response?.data) {
        document.getElementById("affichage").textContent = response.data;
    }
});
