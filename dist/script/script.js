"use strict";
console.log("test");
const now = new Date();
const month = String(now.getMonth() + 1).padStart(2, "0");
const date = String(now.getDate()).padStart(2, "0");
function calculDureeSemaine() {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            const tbody = document.getElementById("tbodyWeekCalendar");
            if (tbody && tbody.children.length > 0) {
                clearInterval(interval);
                const lignes = tbody.children;
                for (let i = 0; i < lignes.length; i++) {
                    const ligne = lignes[i];
                    const colonnes = ligne.children;
                    for (let j = 0; j < colonnes.length; j++) {
                        const cellule = colonnes[j];
                        const text = cellule?.firstElementChild?.textContent;
                        if (text) {
                            const [jour, mois] = text.split("/");
                            if (jour.trim() === date.trim() && mois.trim() === month.trim()) {
                                const result = colonnes[8].textContent + ":00";
                                resolve(result);
                                return;
                            }
                        }
                    }
                }
                reject("Aucune cellule avec date trouvée");
            }
        }, 300);
    });
}
function calculDureeLog() {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            const logTable = document.getElementById("logTable");
            const clock = document.getElementById("clock");
            if (logTable && logTable.children.length > 0 && clock) {
                clearInterval(interval);
                const finalClock = clock.textContent;
                const lignes = logTable.children;
                for (let i = 0; i < lignes.length; i++) {
                    const ligne = lignes[i];
                    const colonnes = ligne.children;
                    for (let j = 0; j < colonnes.length; j++) {
                        const cellule = colonnes[j];
                        if (i === 1 && j === 0) {
                            const logTime = cellule?.children[1]?.textContent;
                            if (finalClock && logTime) {
                                const transition = convertirHeureEnSecondes(finalClock) -
                                    convertirHeureEnSecondes(logTime);
                                const result = convertirSecondesEnHeure(transition);
                                resolve(result);
                                return;
                            }
                            else {
                                reject("Horloges manquantes");
                                return;
                            }
                        }
                    }
                }
                reject("Pas de cellule log trouvée");
            }
        }, 300);
    });
}
function convertirHeureEnSecondes(heureStr) {
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
function convertirSecondesEnHeure(totalSecondes) {
    const heures = Math.floor(totalSecondes / 3600);
    const minutes = Math.floor((totalSecondes % 3600) / 60);
    const secondes = totalSecondes % 60;
    // On formate avec padStart pour avoir 2 chiffres
    return `${String(heures).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;
}
function mettreAJourProgression() {
    const container = document.createElement("div");
    container.id = "fixed-widget";
    // Styles CSS directement en JS
    Object.assign(container.style, {
        position: "fixed",
        bottom: "10px",
        right: "10px",
        width: "350px",
        height: "250px",
        background: "linear-gradient(180deg, #000000, #000000, #000000, #000000, #000000, #000000, #0e1513, #163028, #185240, #137a5b, #08a878)",
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
    /*
    const icon = document.createElement("img");
    icon.src = "chrono01.png"; // ou "images/icon.png", selon ton chemin
    icon.alt = "icone";
    icon.style.width = "24px";
    icon.style.height = "24px";
  
    container.appendChild(icon); // ou à un endroit plus spécifique//*/
    let tempsAccomplie;
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
    //container.appendChild(icon);
    container.appendChild(title);
    progressBar.appendChild(innerProgressBar);
    progressBarZone.appendChild(progressBar);
    progressBarZone.appendChild(pourcentage);
    container.appendChild(progressBarZone);
    container.appendChild(heureSemaine);
    container.appendChild(timeleft);
    container.appendChild(heureDuJour);
}
// Appel initial
setTimeout(() => {
    mettreAJourProgression();
    setInterval(mettreAJourProgression, 60000); // toutes les 60 secondes
}, 5000); // petit délai pour être sûr que le DOM est prêt
