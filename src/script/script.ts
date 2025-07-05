
// --- Font Loader ---
function loadFont() {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
loadFont();

// --- Date Helpers ---
const now = new Date();
const month = String(now.getMonth() + 1).padStart(2, "0");
const date = String(now.getDate()).padStart(2, "0");

// --- Time Conversion Utilities ---
function convertirHeureEnSecondes(heureStr: string | null): number {
  if (heureStr === null) throw new Error("L'heure ne peut pas être nulle");
  const regex = /^(\d{1,2}):(\d{2}):(\d{2})$/;
  const match = heureStr.match(regex);
  if (!match) throw new Error("Format d'heure invalide. Utilise HH:MM:SS");
  const h = Number(match[1]);
  const m = Number(match[2]);
  const s = Number(match[3]);
  return h * 3600 + m * 60 + s;
}

function convertirSecondesEnHeure(totalSecondes: number): string {
  const heures = Math.floor(totalSecondes / 3600);
  const minutes = Math.floor((totalSecondes % 3600) / 60);
  const secondes = totalSecondes % 60;
  return `${String(heures).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;
}

// --- DOM Data Extraction ---
function calculDureeSemaine(): Promise<string> {
  return new Promise((resolve, reject) => {
    const clock = document.getElementById("clock");
    if (!clock) return reject("clock introuvable");
    const finalClock = clock.textContent;
    window.addEventListener("load", () => {
      setTimeout(() => {
        const interval = setInterval(() => {
          const tbody = document.getElementById("tbodyWeekCalendar");
          if (tbody && tbody.children.length > 0) {
            clearInterval(interval);
            for (let i = 0; i < tbody.children.length; i++) {
              const ligne = tbody.children[i];
              for (let j = 0; j < ligne.children.length; j++) {
                const cellule = ligne.children[j];
                const text = cellule?.firstElementChild?.textContent;
                if (text) {
                  const [jour, mois] = text.split("/");
                  if (jour.trim() === date.trim() && mois.trim() === month.trim()) {
                    const result = (ligne.children[8]?.textContent || "00:00:00") + ":00";
                    return resolve(result);
                  }
                }
              }
            }
          }
        }, 300);
      }, 5000);
    });
  });
}

function calculDureeLog(): Promise<string> {
  return new Promise((resolve, reject) => {
    const clock = document.getElementById("clock");
    if (!clock) return reject("clock introuvable");
    const finalClock = clock.textContent;
    window.addEventListener("load", () => {
      setTimeout(() => {
        const interval = setInterval(() => {
          const logTable = document.getElementById("logTable");
          if (logTable && logTable.children.length > 0) {
            clearInterval(interval);
            for (let i = 0; i < logTable.children.length; i++) {
              const ligne = logTable.children[i];
              for (let j = 0; j < ligne.children.length; j++) {
                const cellule = ligne.children[j];
                if (i === 1 && j === 0) {
                  const logTime = cellule?.children[1]?.textContent;
                  if (finalClock && logTime) {
                    const transition = convertirHeureEnSecondes(finalClock) - convertirHeureEnSecondes(logTime);
                    const result = convertirSecondesEnHeure(transition);
                    return resolve(result);
                  } else {
                    return reject("Données manquantes pour calcul");
                  }
                }
              }
            }
          }
        }, 300);
      }, 5000);
    });
  });
}

// --- Widget UI ---
function createWidget() {
  const container = document.createElement("div");
  container.id = "fixed-widget";
  Object.assign(container.style, {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    width: "350px",
    height: "250px",
    background:
      "linear-gradient(180deg, #ffffff, #feefff, #fcdfff, #faceff, #f0b8f8, #de9ce9, #cb80db, #b864cd)",
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

  const title = document.createElement("div");
  title.id = "tite";
  title.textContent = "Progression";
  Object.assign(title.style, {
    margin: "auto",
    fontFamily: "Playfair Display",
    fontWeight: "bold",
    fontSize: "24px",
    color: "rgb(185, 99, 207)",
  });

  const progressBarZone = document.createElement("div");
  progressBarZone.id = "progressBarZone";
  Object.assign(progressBarZone.style, {
    width: "100%",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "5%",
  });

  const progressBar = document.createElement("div");
  progressBar.id = "progressBar";
  Object.assign(progressBar.style, {
    width: "230px",
    height: "16px",
    borderWidth: "2px",
    borderColor: "rgb(81, 25, 88)",
    borderStyle: "solid",
    borderRadius: "20px",
  });

  const innerProgressBar = document.createElement("div");
  innerProgressBar.id = "innerProgressBar";
  Object.assign(innerProgressBar.style, {
    height: "12px",
    width: "0px",
    backgroundColor: "rgba(117, 8, 168, 0.72)",
    transition: "width 0.5s ease 0.25s",
    borderRadius: "20px",
  });

  const pourcentage = document.createElement("div");
  pourcentage.id = "pourcentage";
  pourcentage.innerText = "...%";
  Object.assign(pourcentage.style, {
    fontFamily: "Playfair Display",
    fontSize: "24px",
    fontWeight: "bold",
  });

  const heureSemaine = document.createElement("div");
  heureSemaine.id = "semain";
  heureSemaine.textContent = "... /35:00:00";
  Object.assign(heureSemaine.style, {
    backgroundColor: "rgb(47, 5, 52)",
    height: "40px",
    width: "260px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    fontFamily: "Playfair Display",
    fontSize: "24px",
  });

  const heureDuJour = document.createElement("div");
  heureDuJour.id = "en-tete";
  heureDuJour.textContent = "Calculating";
  Object.assign(heureDuJour.style, {
    fontSize: "20px",
    fontFamily: "Playfair Display",
  });

  const timeleft = document.createElement("div");
  timeleft.id = "timeleft";
  timeleft.textContent = "Time left";
  Object.assign(timeleft.style, {
    fontSize: "20px",
    fontFamily: "Playfair Display",
  });

  // --- Data Fetch & UI Update ---
  Promise.all([calculDureeSemaine(), calculDureeLog()])
    .then(([resSemaine, resToday]) => {
      const Semaine = convertirHeureEnSecondes(resSemaine);
      const today = convertirHeureEnSecondes(resToday);
      heureDuJour.textContent = `Today's log : ${resToday}`;
      const totalSecondes = today + Semaine;
      const totalEnHeure = convertirSecondesEnHeure(totalSecondes);
      heureSemaine.textContent = `${totalEnHeure} /35:00:00`;
      // Progress bar
      const widthInnerProgressBar = (totalSecondes * 238) / 126000;
      innerProgressBar.style.width = `${widthInnerProgressBar}px`;
      // Pourcentage
      const progressPourcentage = Math.floor((totalSecondes * 100) / 126000);
      pourcentage.innerText = `${progressPourcentage}%`;
      // Time left
      const tempsRestant = convertirSecondesEnHeure(126000 - totalSecondes);
      timeleft.innerText = `Time left : ${tempsRestant}`;
    })
    .catch((err) => {
      console.error("Erreur :", err);
    });

  // --- DOM Assembly ---
  document.body.appendChild(container);
  container.appendChild(title);
  progressBar.appendChild(innerProgressBar);
  progressBarZone.appendChild(progressBar);
  progressBarZone.appendChild(pourcentage);
  container.appendChild(progressBarZone);
  container.appendChild(heureSemaine);
  container.appendChild(heureDuJour);
  container.appendChild(timeleft);
}

// --- Init ---
createWidget();
