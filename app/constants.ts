import type { ConfettiPiece, MediaItem, MenuCard, NoteCard } from "@/app/types";

export const CONFETTI_COLORS = [
  "#ff6b9d",
  "#ff9eb5",
  "#ffb347",
  "#ffd700",
  "#98fb98",
  "#87ceeb",
  "#dda0dd",
  "#f0e68c",
  "#ff69b4",
  "#ba55d3",
  "#f4a261",
  "#e76f51",
];

export const FLOATING_EMOJIS = [
  { emoji: "🎂", pos: "top-8 left-8", delay: "0s" },
  { emoji: "🎁", pos: "top-8 right-8", delay: "0.3s" },
  { emoji: "🌸", pos: "bottom-24 left-12", delay: "0.6s" },
  { emoji: "✨", pos: "bottom-24 right-12", delay: "0.9s" },
  { emoji: "🎈", pos: "top-1/3 left-4", delay: "0.4s" },
  { emoji: "🌺", pos: "top-1/3 right-4", delay: "0.7s" },
  { emoji: "🍰", pos: "bottom-1/3 left-8", delay: "1.1s" },
  { emoji: "💖", pos: "bottom-1/3 right-8", delay: "1.3s" },
];

export const MEDIA_ITEMS: MediaItem[] = [
  { type: "image", src: "/photos/IMG_3763.jpg" },
  { type: "image", src: "/photos/IMG_3764.jpg" },
  { type: "image", src: "/photos/IMG_3976%202.jpg" },
  { type: "image", src: "/photos/IMG_3976.jpg" },
  { type: "image", src: "/photos/IMG_3977.jpg" },
  { type: "image", src: "/photos/IMG_3978.jpg" },
  { type: "image", src: "/photos/IMG_3979.jpg" },
  { type: "image", src: "/photos/IMG_5037.JPG" },
  { type: "image", src: "/photos/IMG_5065.JPG" },
  { type: "image", src: "/photos/IMG_5093.JPG" },
  { type: "image", src: "/photos/IMG_5939.jpg" },
  { type: "image", src: "/photos/IMG_5940.jpg" },
  { type: "image", src: "/photos/IMG_5941.jpg" },
  { type: "image", src: "/photos/IMG_5942.jpg" },
  { type: "image", src: "/photos/IMG_5943.jpg" },
  { type: "image", src: "/photos/IMG_5944.jpg" },
  { type: "video", src: "/videos/393D2A22-8930-45FB-B74D-9B08E7663D4A.MP4" },
  { type: "video", src: "/videos/67CBA224-5D3C-44A1-884A-AED2E568AA63.MP4" },
  { type: "video", src: "/videos/9E95BDF1-FB61-464C-AB40-115568232BB4.MP4" },
  { type: "video", src: "/videos/C479D7F9-FDD1-434D-87FE-B376BC9E05C3.mp4" },
  { type: "video", src: "/videos/D43AECDC-49D2-4853-9ECE-AB38D2A238F9.MP4" },
  { type: "video", src: "/videos/F5968603-EA12-4E8F-AFAD-067BD7A9BCE8.MP4" },
  { type: "video", src: "/videos/FA8E0A2C-E29A-4D01-902C-FC131FB0895D.MP4" },
];

export const MENU_CARDS: MenuCard[] = [
  {
    icon: "📸",
    label: "Gallery",
    sublabel: "Photos & videos",
    target: "gallery",
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    accent: "bg-sky-100",
  },
  {
    icon: "💌",
    label: "Notes",
    sublabel: "Messages from friends",
    target: "notes",
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    accent: "bg-pink-100",
  },
  {
    icon: "🎵",
    label: "Vibes",
    sublabel: "Playing in the background",
    target: "menu",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    accent: "bg-purple-100",
  },
  {
    icon: "🎂",
    label: "Your Day",
    sublabel: "Celebrating you today",
    target: "menu",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    accent: "bg-amber-100",
  },
];

export const NOTE_CARDS: NoteCard[] = [
  {
    id: 0,
    from: "Hans",
    bg: "bg-pink-100",
    ribbon: "bg-pink-400",
    frontText: "FROM: Hans 💕",
    message:
      "Hey Debby, I know I am a bit late. Today I planned on getting this to you earlier but life had other plans. Regardless, this is an amazing day. A day I get to celebrate one of the most special people in my life. You have had such an impact on my life, I do not think I can even start to explain. There is so much about you that I love, so much that I never thought I would get from one person in my life. You have made me feel special on so many occasions, and this is a little token for you, just so you know how special you are to me. And also to Eugene and Stacey, who have so gracefully blessed us with a few words and some pictures for your eyes. Thank you for everything and I pray you get all your heart desires. I love you Debby. Love from Hans 💖",
    paperBg: "#fff5f7",
    marginBg: "#fecdd3",
    lineColor: "#fda4af",
  },
  {
    id: 1,
    from: "Stacey",
    bg: "bg-purple-100",
    ribbon: "bg-purple-400",
    frontText: "FROM: Stacey 💜",
    message:
      "Hey Zee, so let us leave the past in the past okay. All the times when I was supposed to buy you loaded fries and all those past events. The future is now. Cheers to a good day and a good year. A year of growth and joy and peace. Thanks for all the laughter and the weirdness. You are one in a Gazillion! Happy birthday Zee 🎉",
    paperBg: "#faf5ff",
    marginBg: "#e9d5ff",
    lineColor: "#c4b5fd",
  },
  {
    id: 2,
    from: "Eugene",
    bg: "bg-sky-100",
    ribbon: "bg-sky-400",
    frontText: "FROM: Eugene 💙",
    message:
      "Happy birthday Deborah! I am so grateful to have you in my corner. Your energy and support mean everything to me, and I have learned so much from you since we started working together. Here is to many more laughs, wins, and adventures together! Wishing you a year filled with joy, growth, and all your favourite things. 💕",
    paperBg: "#f0f7ff",
    marginBg: "#bfdbfe",
    lineColor: "#93c5fd",
  },
];

export function makeConfetti(): ConfettiPiece[] {
  return Array.from({ length: 80 }, (_, i) => {
    const size = 6 + Math.random() * 8;
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${2.5 + Math.random() * 3}s`,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      width: `${size}px`,
      height: `${size * (Math.random() > 0.5 ? 1 : 2.5)}px`,
      initialRotation: `${Math.random() * 360}deg`,
    };
  });
}
