"use client";

import { useState } from "react";
import data from "@/data/data.json";
import {
  goToNamaza,
  goToPiscine,
  goToSavane,
  goToHistorique,
  sendQuestion,
} from "@/services/robotService";
//import { speakSequence } from "@/services/speechService";
import { Zone } from "@/domain/zone";
import questionsData from "@/data/questions.json";

export default function ViewCard() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [step, setStep] = useState<"intro" | "zones">("intro");

  const selectedZone = data.zones.find((z: Zone) => z.key === selectedKey);

  // 🎧 INTRO ISALO
  const handleStartVisit = async () => {
    await goToHistorique();

    const hist = data.parc.historique;

    // speakSequence([
    //   `Bienvenue dans le parc national de ${data.parc.nom}.`,
    //   hist.introduction,
    //   hist.recit,
    //   `Le parc couvre ${hist.chiffrescles.superficie}.`,
    //   `Il a été créé le ${hist.chiffrescles.creation}.`,
    //   `On y trouve ${hist.chiffrescles.faune}.`,
    //   `La flore comprend ${hist.chiffrescles.flore}.`,
    //   `Choisis une zone pour continuer.`,
    // ]);

    setStep("zones");
  };

  const getQuestions = (zoneKey: string) => {
    return (
      questionsData.questions[
        zoneKey as keyof typeof questionsData.questions
      ] || []
    );
  };

  const handleClick = async (zone: Zone) => {
    setSelectedKey(zone.key);

    if (zone.key === "piscine") await goToPiscine();
    else if (zone.key === "namaza") await goToNamaza();
    else if (zone.key === "savane") await goToSavane();
    else await goToHistorique();

    speakSequence([
      `Bienvenue à ${zone.nom}`,
      zone.introduction,
      zone.recit,
      zone.formationgeologique ?? "",
      zone.cequetupeuxobserver ?? "",
      zone.activites ?? "",
      zone.fadytabous ?? "",
      zone.detailsutiles ?? "",
      `Tu peux maintenant répondre aux questions.`,
    ]);
  };

  const handleQuestion = async (
    pin: string,
    question: string,
    reponse: string,
  ) => {
    await sendQuestion(pin);

    speakSequence([`Question : ${question}`, `Réponse : ${reponse}`]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
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
                Superficie : {data.parc.historique.chiffrescles.superficie}
                <br />
                Création : {data.parc.historique.chiffrescles.creation}
                <br />
                Faune : {data.parc.historique.chiffrescles.faune}
                <br />
                Flore : {data.parc.historique.chiffrescles.flore}
              </p>
            </div>

            <button
              onClick={handleStartVisit}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold"
            >
              Lancer la narration
            </button>
          </>
        )}

        {step === "zones" &&
          data.zones.map((zone: Zone) => (
            <div
              key={zone.key}
              className={`p-4 border rounded-xl cursor-pointer hover:bg-gray-100 ${
                selectedKey === zone.key ? "bg-blue-50 border-blue-400" : ""
              }`}
              onClick={() => handleClick(zone)}
            >
              <h2 className="font-bold text-lg">{zone.nom}</h2>
              <p className="text-sm text-gray-600">{zone.introduction}</p>
            </div>
          ))}
      </div>

      <div className="border rounded-xl p-4">
        {selectedZone ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{selectedZone.nom}</h2>

            <p className="text-gray-700 mb-4">{selectedZone.recit}</p>

            <h3 className="font-semibold">Activités</h3>
            <p className="ml-5 mb-3">{selectedZone.activites}</p>

            <h3 className="font-semibold">Tabous</h3>
            <p className="ml-5 mb-3">{selectedZone.fadytabous}</p>

            <h3 className="font-semibold">Infos utiles</h3>
            <p className="ml-5">{selectedZone.detailsutiles}</p>

            {/* ❓ QUESTIONS (UNIQUEMENT ICI) */}
            <div className="mt-6">
              <h3 className="font-bold mb-2">Questions</h3>

              {getQuestions(selectedZone.key).map((q, index) => (
                <div key={index} className="mb-3 p-3 border rounded">
                  <p className="font-semibold">{q.question}</p>

                  <button
                    onClick={() => handleQuestion(q.pin, q.question, q.reponse)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Activer réponse
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            {step === "zones" ? "Choisis une zone" : "Lance la narration"}
          </p>
        )}
      </div>
    </div>
  );
}
