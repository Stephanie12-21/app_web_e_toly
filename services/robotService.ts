import { setMode } from "@/simulator/robot-sim";
import { goToZone } from "@/simulator/robot-sim";

export function changeRobotMode(mode: "GUIDE" | "GARDIEN") {
  setMode(mode);
}

export function sendRobotToZone(zoneKey: string) {
  goToZone(zoneKey);
}
