"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import data from "@/data/data.json";
import questionsData from "@/data/questions.json";
import { Zone } from "@/domain/zone";
import { sendQuestion } from "@/services/robotService";

export default function ZoneDetail() {
  const params = useParams();
  const router = useRouter();

  const rawKey = params.key;
  const key =
    typeof rawKey === "string"
      ? rawKey
      : Array.isArray(rawKey)
        ? rawKey[0]
        : "";

  const zone = data.zones.find(
    (z: Zone) => z.key.toLowerCase() === key.toLowerCase(),
  );

  const questions =
    questionsData.questions[key as keyof typeof questionsData.questions] || [];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 🔥 TOGGLE + ROBOT SYNC
  const handleToggleAnswer = async (index: number, pin?: string) => {
    const isOpening = openIndex !== index;

    setOpenIndex(isOpening ? index : null);

    // 👉 robot uniquement quand ouverture réponse
    if (isOpening && pin) {
      await sendQuestion(pin);
    }
  };

  if (!zone) {
    return <p>Zone introuvable</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* 🔙 RETOUR GUIDE MODE + RESET CONTEXT POSSIBLE */}
      <button
        onClick={() => router.push("/guide-mode")}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Retour
      </button>

      {/* 🗺️ ZONE INFOS */}
      <h1 className="text-3xl font-bold">{zone.nom}</h1>

      <p>{zone.recit}</p>

      <div>
        <h2 className="font-semibold">Activités</h2>
        <p>{zone.activites}</p>
      </div>

      <div>
        <h2 className="font-semibold">Tabous</h2>
        <p>{zone.fadytabous}</p>
      </div>

      <div>
        <h2 className="font-semibold">Infos utiles</h2>
        <p>{zone.detailsutiles}</p>
      </div>

      {/* ❓ QUESTIONS INTERACTIVES */}
      <div>
        <h2 className="font-bold text-xl">Questions</h2>

        {questions.map((q, index) => (
          <div key={index} className="p-3 border rounded mb-3">
            {/* QUESTION */}
            <p className="font-semibold">{q.question}</p>

            {/* BUTTON */}
            <button
              onClick={() => handleToggleAnswer(index, q.pin)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              {openIndex === index ? "Masquer la réponse" : "Voir la réponse"}
            </button>

            {/* RÉPONSE */}
            {openIndex === index && (
              <div className="mt-2 p-2 bg-gray-100 rounded">{q.reponse}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
