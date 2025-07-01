console.log("test");
function calculDuree() {
  return new Promise((resolve, reject) => {
    let clock = document.getElementById("clock");
    let finalClock;
    if (clock != undefined) {
      finalClock = clock.textContent;
    } else {
      reject("clock introuvable");
      return;
    }
    window.addEventListener("load", () => {
      setTimeout(() => {
        let interval = setInterval(() => {
          let logTable = document.getElementById("logTable");
          if (logTable && logTable.children.length > 0) {
            clearInterval(interval);
            let lignes = logTable.children;
            for (let i = 0; i < lignes.length; i++) {
              let ligne = lignes[i];
              let colonnes = ligne.children;
              for (let j = 0; j < colonnes.length; j++) {
                let cellule = colonnes[j];
                if (i === 1 && j === 0) {
                  let logTime = cellule?.children[1]?.textContent;
                  if (finalClock && logTime) {
                    let transition =
                      convertirHeureEnSecondes(finalClock) -
                      convertirHeureEnSecondes(logTime);
                    let result = convertirSecondesEnHeure(transition);
                    console.log("tu bosses depuis : ", result);
                    resolve(result);
                    return; // pour ne pas continuer la boucle inutilement
                  } else {
                    reject("Données manquantes pour calcul");
                    return;
                  }
                }
              }
            }
          } else {
            console.log("logTable pas encore dispo...");
          }
        }, 300);
      }, 5000);
    });
  });
}
function convertirHeureEnSecondes(heureStr) {
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
function convertirSecondesEnHeure(totalSecondes) {
  const heures = Math.floor(totalSecondes / 3600);
  const minutes = Math.floor((totalSecondes % 3600) / 60);
  const secondes = totalSecondes % 60;
  // On formate avec padStart pour avoir 2 chiffres
  return `${String(heures).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secondes).padStart(2, "0")}`;
}
(() => {
  const container = document.createElement("div");
  container.id = "fixed-widget";
  // Styles CSS directement en JS
  Object.assign(container.style, {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    width: "350px",
    height: "250px",
    background:
      "linear-gradient(180deg, #000000, #000000, #000000, #000000, #000000, #000000, #0e1513, #163028, #185240, #137a5b, #08a878)",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    zIndex: "99999",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  });
  calculDuree()
    .then((result) => {
      console.log("Résultat reçu :", result);
      container.textContent = result;
      document.body.appendChild(container);
    })
    .catch((err) => {
      console.error("Erreur :", err);
    });
  document.body.appendChild(container);
})();
