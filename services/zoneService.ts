import data from "@/data/data.json";
import { Zone } from "@/domain/zone";

export function getAllZones(): Zone[] {
  return data.zones;
}

export function getZoneByName(nom: string): Zone | undefined {
  return data.zones.find((z) => z.nom === nom);
}
