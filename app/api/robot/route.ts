export async function POST(req: Request) {
  const { action } = await req.json();

  console.log("[API] Action reçue:", action);

  let pin = "";

  switch (action) {
    // 🎮 MODES
    case "GUIDE":
      pin = "V0";
      break;

    case "GUARDIAN":
      pin = "V1";
      break;

    // 🧭 HISTORIQUE + ZONES
    case "HISTORIQUE":
      pin = "V2";
      break;

    case "PISCINE":
      pin = "V3";
      break;

    case "NAMAZA":
      pin = "V4";
      break;

    case "SAVANE":
      pin = "V5";
      break;

    // ❓ QUESTIONS PISCINE
    case "PISCINE_Q1":
      pin = "V10";
      break;

    case "PISCINE_Q2":
      pin = "V11";
      break;

    // ❓ QUESTIONS NAMAZA
    case "NAMAZA_Q1":
      pin = "V12";
      break;

    case "NAMAZA_Q2":
      pin = "V13";
      break;

    // ❓ QUESTIONS SAVANE
    case "SAVANE_Q1":
      pin = "V14";
      break;

    case "SAVANE_Q2":
      pin = "V15";
      break;

    // 🔙 RESET ROBOT
    case "RESET":
      pin = "V20";
      break;

    default:
      console.warn("[API] Action inconnue:", action);

      return Response.json(
        { success: false, error: "Unknown action", action },
        { status: 400 },
      );
  }

  if (!pin) {
    return Response.json(
      { success: false, error: "No pin mapped" },
      { status: 400 },
    );
  }

  console.log("[API] Envoi vers Blynk →", pin);

  try {
    const url = `https://blynk.cloud/external/api/update?token=${process.env.BLYNK_AUTH_TOKEN}&${pin}=1`;

    const res = await fetch(url);

    const text = await res.text();

    console.log("[API] Réponse Blynk:", text);

    return Response.json({
      success: true,
      action,
      pin,
      response: text,
    });
  } catch (err) {
    console.error("[API ERROR]", err);

    return Response.json(
      { success: false, error: "Blynk request failed" },
      { status: 500 },
    );
  }
}
