// popup.ts

// Demander le dernier résultat au background au chargement du popup
chrome.runtime.sendMessage({ type: "demande-resultat" }, (response) => {
  if (response?.data) {
    document.getElementById("affichage")!.textContent = response.data;
  }
});

console.log("Popup ouvert !");
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (tab?.id) {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["dist/script/script.js"],
      })
      .then(() => {
        console.log("Script injecté !");
      })
      .catch((err) => {
        console.error("Erreur d'injection :", err);
      });
  }
});
