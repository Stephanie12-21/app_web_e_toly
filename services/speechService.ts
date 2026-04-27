export function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!text) return resolve();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "fr-FR";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => resolve();

    speechSynthesis.speak(utterance);
  });
}

export async function speakSequence(texts: string[]): Promise<void> {
  for (const text of texts) {
    if (!text) continue;
    await speak(text);
  }
}
