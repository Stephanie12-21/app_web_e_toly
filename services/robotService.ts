import { simulateMovement } from "@/simulator/robot-sim";

/* =========================
   CORE API SEND
========================= */
async function send(action: string) {
  console.log("[SERVICE] Envoi vers robot:", action);

  const res = await fetch("/api/robot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action }),
  });

  const data = await res.json();

  console.log("[SERVICE] Réponse API:", data);

  return data;
}

/* =========================
   MODES
========================= */
export const setGuideMode = () => send("GUIDE");
export const setGuardianMode = () => send("GUARDIAN");

/* =========================
   ZONES
========================= */
export async function goToZone(key: string) {
  console.log("[SERVICE] Simulation locale:", key);

  simulateMovement(key);

  const map: Record<string, string> = {
    piscine: "PISCINE",
    namaza: "NAMAZA",
    savane: "SAVANE",
    historique: "HISTORIQUE",
  };

  const action = map[key];

  if (!action) {
    console.warn("[SERVICE] Zone inconnue:", key);
    return;
  }

  return send(action);
}

export const goToPiscine = () => goToZone("piscine");
export const goToNamaza = () => goToZone("namaza");
export const goToSavane = () => goToZone("savane");
export const goToHistorique = () => goToZone("historique");

/* =========================
   PARC START
========================= */
export const goToParc = () => goToZone("historique");

/* =========================
   QUESTIONS (BLYNK)
========================= */
export async function sendQuestion(pin: string) {
  console.log("[ROBOT] Question envoyée:", pin);

  return fetch("/api/robot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pin,
      value: 1,
    }),
  });
}
