export async function POST(req: Request) {
  const { action } = await req.json();

  console.log("[API] Action reçue:", action);

  let pin = "";

  switch (action) {
    case "GUIDE":
      pin = "V0";
      break;
    case "GUARDIAN":
      pin = "V1";
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
  }

  console.log("[API] Envoi vers Blynk →", pin);

  const url = `https://blynk.cloud/external/api/update?token=${process.env.BLYNK_AUTH_TOKEN}&${pin}=1`;

  await fetch(url);

  console.log("[API] Commande envoyée avec succès");

  return Response.json({ success: true, pin });
}
