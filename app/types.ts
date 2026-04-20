export type Screen = "welcome" | "menu" | "gallery" | "notes";

export type ConfettiPiece = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  width: string;
  height: string;
  initialRotation: string;
};

export type MediaItem = {
  type: "image" | "video";
  src: string;
};

export type MenuCard = {
  icon: string;
  label: string;
  sublabel: string;
  target: Screen;
  bg: string;
  border: string;
  text: string;
  accent: string;
};

export type NoteCard = {
  id: number;
  from: string;
  bg: string;
  ribbon: string;
  frontText: string;
  message: string;
  paperBg: string;
  marginBg: string;
  lineColor: string;
};
