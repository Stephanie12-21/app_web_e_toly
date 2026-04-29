"use client";

import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import { Zone } from "@/domain/zone";
import { goToZone } from "@/services/robotService";

export default function ZonesPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {data.zones.map((zone: Zone) => (
          <div key={zone.key} className="p-4 border rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">{zone.nom}</h3>

            <p className="text-sm text-gray-600 mb-3">{zone.introduction}</p>

            <button
              onClick={async () => {
                await goToZone(zone.key);
                router.push(`/guide-mode/zone/${zone.key}`);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Explorer cette zone
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
