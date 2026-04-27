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
  const [step, setStep] = useState<"intro" | "zones">("intro");

  const selectedZone = data.zones.find((z: Zone) => z.key === selectedKey);

  // 🎧 LANCER HISTORIQUE (UNE SEULE FOIS)
  const handleStartVisit = async () => {
    console.log("[UI] ▶ Début visite");

    try {
      await sendRobotToZone("historique");
      console.log("[ROBOT] Historique envoyé");
    } catch (err) {
      console.error("[ERROR ROBOT]", err);
    }

    const hist = data.parc.historique;

    // ⚠️ narration UNE seule fois
    speakSequence([
      `Bienvenue dans le parc national de ${data.parc.nom}.`,
      hist.introduction,
      hist.recit,
      `Le parc couvre ${hist.chiffrescles.superficie}.`,
      `Il a été créé le ${hist.chiffrescles.creation}.`,
      `On y trouve ${hist.chiffrescles.faune}.`,
      `La flore comprend ${hist.chiffrescles.flore}.`,
      `Quelle zone souhaites-tu visiter maintenant ?`,
    ]);

    // 👉 ON PASSE À L'ÉTAPE SUIVANTE
    setStep("zones");
  };

  // 📍 CLIQUE ZONE
  const handleClick = async (zone: Zone) => {
    console.log("[UI] Zone:", zone.key);

    setSelectedKey(zone.key);

    try {
      if (zone.key === "piscine") await goToPiscine();
      else if (zone.key === "namaza") await goToNamaza();
      else await sendRobotToZone(zone.key);

      console.log("[ROBOT] Déplacement OK:", zone.key);
    } catch (err) {
      console.error("[ERROR ROBOT]", err);
    }

    speakSequence([
      `Bienvenue à ${zone.nom}`,
      zone.introduction,
      zone.recit,
      zone.formationgeologique ?? "",
      zone.cequetupeuxobserver ?? "",
      zone.activites ?? "",
      zone.fadytabous ?? "",
      zone.detailsutiles ?? "",
    ]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 🧠 COLONNE GAUCHE */}
      <div className="space-y-4">
        {/* 🔥 ÉTAPE 1 → HISTORIQUE */}
        {step === "intro" && (
          <>
            <div className="p-4 border rounded-xl bg-yellow-50">
              <h2 className="text-xl font-bold mb-2">
                Histoire du {data.parc.nom}
              </h2>

              <p className="text-gray-700 mb-2">
                {data.parc.historique.introduction}
              </p>

              <p className="text-gray-700 mb-3">{data.parc.historique.recit}</p>

              <p className="text-sm text-gray-600">
                📌 Superficie : {data.parc.historique.chiffrescles.superficie}
                <br />
                📅 Création : {data.parc.historique.chiffrescles.creation}
                <br />
                🐾 Faune : {data.parc.historique.chiffrescles.faune}
                <br />
                🌿 Flore : {data.parc.historique.chiffrescles.flore}
              </p>
            </div>

            <button
              onClick={handleStartVisit}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              🎧 Lancer la narration
            </button>
          </>
        )}

        {/* 🔥 ÉTAPE 2 → ZONES */}
        {step === "zones" &&
          data.zones.map((zone: Zone) => (
            <div
              key={zone.key}
              className={`p-4 border rounded-xl cursor-pointer transition hover:bg-gray-100 ${
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

      {/* 📖 COLONNE DROITE */}
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
            {step === "zones"
              ? "Choisis une zone pour continuer la visite"
              : "Lance la narration pour commencer"}
          </p>
        )}
      </div>
    </div>
  );
}
