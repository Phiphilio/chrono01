console.log("test");

const clock = document.getElementById("clock");
let finalClock: string | null;

if (clock != undefined) {
  finalClock = clock.textContent;
}

// récupération de la date
const maintenant = new Date();

const date = String(maintenant.getDate()).padStart(2, "0");
const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
const annee = String(maintenant.getFullYear()).padStart(2, "0");

const jour = ` ${annee}-${mois}-${date}`;
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
            console.log("la boucle se lance bien");

            if (i === 1 && j === 0) {
              console.log("la date correspond");
              const logTime = cellule?.children[1]?.textContent;
              console.log(
                "deuxième enfant :",
                cellule?.children[1]?.textContent
              );

              const transition =
                convertirHeureEnSecondes(finalClock) -
                convertirHeureEnSecondes(logTime);
              const result = convertirSecondesEnHeure(transition);

              chrome.runtime.sendMessage({
                type: "resultat-transition",
                data: result,
              });
              console.log(" tu bosses depuis : ", result);
            }
          }
        }
      } else {
        console.log("logTable pas encore dispo...");
      }
    }, 300); // essaie toutes les 300ms
  }, 5000); // attend 5 secondes après chargement
});

function convertirHeureEnSecondes(heureStr: string | null): number {
  if (heureStr === null) {
    throw new Error("L'heure ne peut pas être nulle");
  }

  const regex = /^(\d{1,2}):(\d{2}):(\d{2})$/;
  const match = heureStr.match(regex);

  if (!match) {
    throw new Error("Format d'heure invalide. Utilise HH:MM:SS");
  }

  const h = Number(match[1]);
  const m = Number(match[2]);
  const s = Number(match[3]);
  return h * 3600 + m * 60 + s;
}

function convertirSecondesEnHeure(totalSecondes: number): string {
  const heures = Math.floor(totalSecondes / 3600);
  const minutes = Math.floor((totalSecondes % 3600) / 60);
  const secondes = totalSecondes % 60;

  // On formate avec padStart pour avoir 2 chiffres
  return `${String(heures).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secondes).padStart(2, "0")}`;
}
