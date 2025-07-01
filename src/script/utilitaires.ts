export function convertirHeureEnSecondes(heureStr: String): number {
  const regex = /^(\d{1,2}):(\d{2}):(\d{2})$/;
  const match = heureStr.match(regex);
  if (!match) throw new Error("Format d'heure invalide. Utilise HH:MM:SS");

  const [, h, m, s] = match.map(Number);
  return h * 3600 + m * 60 + s;
}

export function convertirSecondesEnHeure(totalSecondes: number): string {
  const heures = Math.floor(totalSecondes / 3600);
  const minutes = Math.floor((totalSecondes % 3600) / 60);
  const secondes = totalSecondes % 60;

  // On formate avec padStart pour avoir 2 chiffres
  return `${String(heures).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secondes).padStart(2, "0")}`;
}
