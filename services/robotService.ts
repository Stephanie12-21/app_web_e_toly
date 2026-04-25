import { setMode } from "@/simulator/robot-sim";
import { simulateMovement } from "@/simulator/robot-sim";

export function changeRobotMode(mode: "GUIDE" | "GARDIEN") {
  setMode(mode);
}

export function sendRobotToZone(zoneKey: string) {
  goToZone(zoneKey);
}

// 🎮 MODES
export const setGuideMode = () => send("GUIDE");
export const setGuardianMode = () => send("GUARDIAN");

// 📍 ZONES
export const goToPiscine = () => send("PISCINE");
export const goToNamaza = () => send("NAMAZA");
export const goToSavane = () => send("SAVANE");

async function send(action: string) {
  console.log("[SERVICE] Envoi vers robot:", action);

  const res = await fetch("/api/robot", {
    method: "POST",
    body: JSON.stringify({ action }),
  });

  const data = await res.json();

  console.log("[SERVICE] Réponse API:", data);
}

export async function goToZone(key: string) {
  console.log("[SERVICE] Simulation locale activée");

  simulateMovement(key);

  if (key === "piscine") return send("PISCINE");
  if (key === "namaza") return send("NAMAZA");
  if (key === "fenetre") return send("SAVANE");
}
