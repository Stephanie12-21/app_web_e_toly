import { EventEmitter } from "events";

export const robot = new EventEmitter();

let mode = "IDLE";

export function setMode(newMode: string) {
  mode = newMode;
  console.log("🤖 Mode changé:", mode);
}

import data from "@/data/data.json";

export function goToZone(zoneKey: string) {
  const zone = data.zones.find((z) => z.key === zoneKey);

  if (!zone) return;

  console.log("Déplacement vers:", zone.nom);

  setTimeout(() => {
    console.log("🤖 Arrivé à:", zone.nom);

    // 🔊 envoie TOUTES les infos
    robot.emit("speech", {
      zone: zone.nom,
      introduction: zone.introduction,
      recit: zone.recit,
    });
  }, 1500);
}

// simulation gardien
setInterval(() => {
  if (mode === "GUARDIAN") {
    robot.emit("alert", {
      type: "fumee",
      zone: "Isalo Sud",
      message: "Fumée détectée",
    });
  }
}, 8000);
