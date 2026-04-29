"use client";

import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import { resetRobot } from "@/services/robotService";
import { useEffect } from "react";

export default function GuideIntro() {
  const router = useRouter();
  useEffect(() => {
    resetRobot();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="p-6 border rounded-xl bg-yellow-50">
        <h2 className="text-2xl font-bold mb-3">Histoire du {data.parc.nom}</h2>

        <p className="mb-2">{data.parc.historique.introduction}</p>
        <p className="mb-4">{data.parc.historique.recit}</p>
      </div>

      <button
        onClick={() => router.push("/guide-mode/zone")}
        className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold"
      >
        Commencer l’exploration
      </button>
    </div>
  );
}
