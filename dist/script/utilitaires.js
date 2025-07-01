export function convertirHeureEnSecondes(heureStr) {
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
export function convertirSecondesEnHeure(totalSecondes) {
    const heures = Math.floor(totalSecondes / 3600);
    const minutes = Math.floor((totalSecondes % 3600) / 60);
    const secondes = totalSecondes % 60;
    // On formate avec padStart pour avoir 2 chiffres
    return `${String(heures).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;
}
