// services/speechService.ts

let voices: SpeechSynthesisVoice[] = [];

// 🔄 charge les voix une fois
function loadVoices() {
  voices = speechSynthesis.getVoices();
}

// Chrome / Android charge les voix en async
if (typeof window !== "undefined") {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * 🔊 Parle un texte simple
 */
export function speak(text: string) {
  if (typeof window === "undefined") return;

  speechSynthesis.cancel(); // évite superposition

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 1;
  utterance.pitch = 1;

  const frenchVoice =
    voices.find((v) => v.lang === "fr-FR") ||
    voices.find((v) => v.lang.startsWith("fr"));

  if (frenchVoice) {
    utterance.voice = frenchVoice;
  }

  speechSynthesis.speak(utterance);
}

/**
 * 🎙️ Parle plusieurs textes à la suite (GUIDE MODE)
 */
export function speakSequence(texts: string[]) {
  if (typeof window === "undefined") return;
  if (!texts.length) return;

  speechSynthesis.cancel();

  const speakNext = (index: number) => {
    if (index >= texts.length) return;

    const utterance = new SpeechSynthesisUtterance(texts[index]);
    utterance.lang = "fr-FR";
    utterance.rate = 1;

    const frenchVoice =
      voices.find((v) => v.lang === "fr-FR") ||
      voices.find((v) => v.lang.startsWith("fr"));

    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    utterance.onend = () => {
      speakNext(index + 1);
    };

    speechSynthesis.speak(utterance);
  };

  speakNext(0);
}

/**
 * ⛔ Stop immédiat
 */
export function stopSpeaking() {
  speechSynthesis.cancel();
}
