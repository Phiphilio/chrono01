console.log("test");

const now = new Date();

const month = String(now.getMonth() + 1).padStart(2, "0");
const date = String(now.getDate()).padStart(2, "0");

function calculDureeSemaine(): Promise<string> {
  return new Promise((resolve, reject) => {
    let clock = document.getElementById("clock");
    let finalClock: string | null;

    if (clock != undefined) {
      finalClock = clock.textContent;
    } else {
      reject("clock introuvable");
      return;
    }

    window.addEventListener("load", () => {
      setTimeout(() => {
        let interval = setInterval(() => {
          let tbody = document.getElementById("tbodyWeekCalendar");
          if (tbody && tbody.children.length > 0) {
            clearInterval(interval);

            let lignes = tbody.children;
            for (let i = 0; i < lignes.length; i++) {
              let ligne = lignes[i];
              let colonnes = ligne.children;
              for (let j = 0; j < colonnes.length; j++) {
                let cellule = colonnes[j];
                console.log(`cellule[${i},${j}]`, cellule);
                console.log(
                  `cellule.firstElementChild?.textContent`,
                  cellule.firstElementChild?.textContent
                );

                const text = cellule?.firstElementChild?.textContent;
                if (text) {
                  const [jour, mois] = text.split("/");

                  if (
                    jour.trim() === date.trim() &&
                    mois.trim() === month.trim()
                  ) {
                    console.log("les date correspondent !!!");
                    console.log(" heure totale :", colonnes[8].textContent);

                    let result = colonnes[8].textContent + ":00";

                    resolve(result);
                  }
                }
              }
            }
          } else {
            console.log("tbody pas encore dispo...");
          }
        }, 300);
      }, 5000);
    });
  });
}

function calculDureeLog(): Promise<string> {
  return new Promise((resolve, reject) => {
    let clock = document.getElementById("clock");
    let finalClock: string | null;

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

function convertirHeureEnSecondes(heureStr: string | null): number {
  if (heureStr === null) {
    throw new Error("L'heure ne peut pas être nulle");
  }

  console.log("valeur de heureStr :", heureStr);
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10%",
  });

  //
  const title = document.createElement("div");
  title.id = "tite";
  title.textContent = "Progression sur 35h";
  Object.assign(title.style, {
    fontWeight: "bold",
  });

  const progressBarZone = document.createElement("div");
  progressBarZone.id = "progressBarZone";

  Object.assign(progressBarZone.style, {
    width: "100%",
    height: "20px",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "5%",
  });

  const progressBar = document.createElement("div");
  progressBar.id = "progressBar";

  Object.assign(progressBar.style, {
    width: "238px",
    height: "16px",
    borderWidth: "1px",
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderRadius: "20px",
  });

  const innerProgressBar = document.createElement("div");
  innerProgressBar.id = "innerProgressBar";

  Object.assign(innerProgressBar.style, {
    height: "14.5px",
    width: "0px",
    backgroundColor: " #08a878",
    transition: "width 0.5s ease 0.25s",
    borderRadius: "20px",
  });

  const pourcentage = document.createElement("div");
  pourcentage.id = "pourcentage";

  pourcentage.innerText = "...%";

  Object.assign(pourcentage.style, {
    height: "14.5px",
    width: "30px",
  });

  const heureSemaine = document.createElement("div");
  heureSemaine.id = "semain";
  heureSemaine.textContent = "Soit: ... /35:00:00";
  Object.assign(heureSemaine.style, {});

  const heureDuJour = document.createElement("div");
  heureDuJour.id = "en-tete";
  heureDuJour.textContent = "calcul...";
  Object.assign(heureDuJour.style, {});

  const timeleft = document.createElement("div");
  timeleft.id = "timeleft";
  timeleft.textContent = "Il reste...";
  Object.assign(timeleft.style, {});

  const icon = document.createElement("img");
  icon.src = "../../src/styles/assets/chrono01.png"; // ou "images/icon.png", selon ton chemin
  icon.alt = "icone";
  icon.style.width = "24px";
  icon.style.height = "24px";

  container.appendChild(icon); // ou à un endroit plus spécifique

  let tempsAccomplie: string;

  Promise.all([calculDureeSemaine(), calculDureeLog()])
    .then(([resSemaine, resToday]) => {
      const Semaine = convertirHeureEnSecondes(resSemaine);
      const today = convertirHeureEnSecondes(resToday);

      heureDuJour.textContent = `Today log : ${resToday}`;
      container.appendChild(heureDuJour);

      const totalSecondes = today + Semaine;
      const totalEnHeure = convertirSecondesEnHeure(totalSecondes);
      tempsAccomplie = totalEnHeure; // ou un format lisible
      heureSemaine.textContent = `Soit: ${tempsAccomplie} /35:00:00`;
      console.log("Temps accompli :", tempsAccomplie);

      // modification de la barre de progression
      const widthInnerProgressBar = (totalSecondes * 238) / 126000;
      innerProgressBar.style.width = `${widthInnerProgressBar}px`;

      //modification du pourcentage
      const progressPourcentage = Math.floor((totalSecondes * 100) / 126000);
      pourcentage.innerText = `${progressPourcentage}%`;

      // temps restant
      const tempsRestant = convertirSecondesEnHeure(126000 - totalSecondes);
      timeleft.innerText = `Time left :${tempsRestant}`;
    })
    .catch((err) => {
      console.error("Erreur :", err);
    });

  document.body.appendChild(container);
  container.appendChild(icon);
  container.appendChild(title);
  progressBar.appendChild(innerProgressBar);
  progressBarZone.appendChild(progressBar);
  progressBarZone.appendChild(pourcentage);
  container.appendChild(progressBarZone);

  container.appendChild(heureSemaine);
  container.appendChild(timeleft);
  container.appendChild(heureDuJour);
})();
