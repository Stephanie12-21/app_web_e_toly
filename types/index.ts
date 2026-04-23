export type Zone = {
  key: string;
  nom: string;
  introduction: string;
  recit: string;
  formation_geologique: string;
  ce_que_tu_peux_observer: string;
  activites?: string[];
  fady_tabous: string[];
  details_utiles: string[];
};

export type Parc = {
  parc: string;
  zones: Zone[];
};

export type SpeechEvent = {
  zone: string;
  introduction: string;
  recit: string;
};