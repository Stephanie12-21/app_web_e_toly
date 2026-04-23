import { changeRobotMode } from "@/services/robotService";

export async function POST(req: Request) {
  const { mode } = await req.json();

  changeRobotMode(mode);

  console.log("Mode reçu:", mode);

  return Response.json({ ok: true });
}
