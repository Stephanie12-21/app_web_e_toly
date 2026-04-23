export type Zone = {
  key: string;
  nom: string;
  introduction: string;
  recit: string;
  formationgeologique: string;
  cequetupeuxobserver: string;
  activites?: string;
  fadytabous: string;
  detailsutiles: string;
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
