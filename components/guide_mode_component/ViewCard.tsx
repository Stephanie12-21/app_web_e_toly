"use client";

import { useState } from "react";
import data from "@/data/data.json";
import {
  goToNamaza,
  goToPiscine,
  sendRobotToZone,
} from "@/services/robotService";
import { speakSequence } from "@/services/speechService";
import { Zone } from "@/domain/zone";

export default function ViewCard() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selectedZone = data.zones.find((z: Zone) => z.key === selectedKey);

  const handleClick = async (zone: Zone) => {
    console.log("[UI] Zone cliquée:", zone.key);

    setSelectedKey(zone.key);

    // 🎯 1. Déplacement robot (UNE SEULE FOIS)
    try {
      if (zone.key === "piscine") await goToPiscine();
      else if (zone.key === "namaza") await goToNamaza();
      else if (zone.key === "fenetre") await sendRobotToZone("savane");
      else await sendRobotToZone(zone.key);

      console.log("[UI] Commande robot envoyée");
    } catch (err) {
      console.error("[ERROR] Robot:", err);
    }

    // 🎙️ 2. Préparer texte propre
    const speechParts = [
      `Bienvenue à ${zone.nom}`,
      zone.introduction,
      zone.recit,
      zone.formationgeologique,
      zone.cequetupeuxobserver,
      zone.activites,
      zone.fadytabous,
      zone.detailsutiles,
    ].filter(Boolean); // 🔥 enlève undefined/null

    console.log("[VOICE] Démarrage narration");

    // 🎤 3. Lancer narration
    speakSequence(speechParts as string[]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 📍 LISTE DES ZONES */}
      <div className="space-y-4">
        {data.zones.map((zone: Zone) => (
          <div
            key={zone.key}
            className={`p-4 border rounded-xl transition hover:bg-gray-100 ${
              selectedKey === zone.key ? "bg-blue-50 border-blue-400" : ""
            }`}
          >
            <h2 className="font-bold text-lg">{zone.nom}</h2>
            <p className="text-gray-600 text-sm">{zone.introduction}</p>

            <button
              onClick={() => handleClick(zone)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Explorer
            </button>
          </div>
        ))}
      </div>

      {/* 📖 DÉTAIL ZONE */}
      <div className="border rounded-xl p-4">
        {selectedZone ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{selectedZone.nom}</h2>

            <p className="text-gray-700 mb-4">{selectedZone.recit}</p>

            <h3 className="font-semibold">🌿 Activités</h3>
            <p className="ml-5 mb-3">{selectedZone.activites}</p>

            <h3 className="font-semibold">⚠️ Tabous</h3>
            <p className="ml-5 mb-3">{selectedZone.fadytabous}</p>

            <h3 className="font-semibold">📌 Infos utiles</h3>
            <p className="ml-5">{selectedZone.detailsutiles}</p>
          </>
        ) : (
          <p className="text-gray-500">
            Clique sur une destination pour découvrir
          </p>
        )}
      </div>
    </div>
  );
}
