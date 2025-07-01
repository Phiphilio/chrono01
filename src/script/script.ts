console.log("test");

const clock = document.getElementById("clock");

if (clock) {
  console.log("heure :", clock.textContent);
}

// récupération de la date
const maintenant = new Date();

const date = maintenant.getDate();
const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
const annee = String(maintenant.getFullYear()).padStart(2, "0");

console.log(`on est le : ${annee}-${mois}-${date}`);
// Attendre que la page soit *vraiment* chargée
window.addEventListener("load", () => {
  // Délai pour laisser le site remplir dynamiquement le DOM
  setTimeout(() => {
    const interval = setInterval(() => {
      const logTable = document.getElementById("logTable");
      if (logTable && logTable.children.length > 0) {
        clearInterval(interval);
        console.log("logTable trouvé après délai");

        const lignes = logTable.children;
        for (let i = 0; i < lignes.length; i++) {
          const ligne = lignes[i];
          const colonnes = ligne.children;
          for (let j = 0; j < colonnes.length; j++) {
            const cellule = colonnes[j];
            console.log(`cellule [${i},${j}]`, cellule);
            console.log(`Cellule [${i},${j}]:`, cellule.textContent);
          }
        }
      } else {
        console.log("logTable pas encore dispo...");
      }
    }, 300); // essaie toutes les 300ms
  }, 5000); // attend 5 secondes après chargement
});
