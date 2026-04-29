import { simulateMovement } from "@/simulator/robot-sim";

/* =========================
   CORE API
========================= */
async function send(action: string) {
  console.log("[ROBOT] Action:", action);

  const res = await fetch("/api/robot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action }),
  });

  return await res.json();
}

/* =========================
   MODES (HOME)
========================= */
export const setGuideMode = async () => {
  await send("GUIDE");
  await send("RESET"); // 🔥 important: reset entrée guide
};

export const setGuardianMode = () => send("GUARDIAN");

/* =========================
   RESET MANUEL
========================= */
export const resetRobot = () => send("RESET");

/* =========================
   ZONES (GUIDE FLOW)
========================= */
export async function goToZone(key: string) {
  simulateMovement(key);

  const map: Record<string, string> = {
    piscine: "PISCINE",
    namaza: "NAMAZA",
    savane: "SAVANE",
    historique: "HISTORIQUE",
  };

  const action = map[key];

  if (!action) {
    console.warn("[ROBOT] Zone inconnue:", key);
    return;
  }

  return send(action);
}

export const goToPiscine = () => goToZone("piscine");
export const goToNamaza = () => goToZone("namaza");
export const goToSavane = () => goToZone("savane");
export const goToHistorique = () => goToZone("historique");

/* =========================
   QUESTIONS (PIN SYSTEM)
========================= */
export async function sendQuestion(pin: string) {
  return send(pin); // 🔥 direct V10, V11, etc
}
