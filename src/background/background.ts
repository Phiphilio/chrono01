// background.ts

let dernierResultat: string | null = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "resultat-transition") {
    dernierResultat = message.data;
    // Si popup ouvert, on peut envoyer le message directement
    // Sinon le popup demandera le dernier résultat à l'ouverture
  }
});

// Optionnel : écouter la demande du popup pour envoyer le dernier résultat

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "demande-resultat") {
    sendResponse({ data: dernierResultat });
  }
});
