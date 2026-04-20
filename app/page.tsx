"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "welcome" | "menu" | "gallery" | "notes";

type ConfettiPiece = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  width: string;
  height: string;
  initialRotation: string;
};

type MediaItem = {
  type: "image" | "video";
  src: string;
};

type MenuCard = {
  icon: string;
  label: string;
  target: Screen;
  bg: string;
  border: string;
  text: string;
};

type NoteCard = {
  id: number;
  from: string;
  bg: string;
  ribbon: string;
  frontText: string;
  message: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
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

const FLOATING_EMOJIS = [
  { emoji: "🎂", pos: "top-8 left-8", delay: "0s" },
  { emoji: "🎁", pos: "top-8 right-8", delay: "0.3s" },
  { emoji: "🌸", pos: "bottom-24 left-12", delay: "0.6s" },
  { emoji: "✨", pos: "bottom-24 right-12", delay: "0.9s" },
  { emoji: "🎈", pos: "top-1/3 left-4", delay: "0.4s" },
  { emoji: "🌺", pos: "top-1/3 right-4", delay: "0.7s" },
  { emoji: "🍰", pos: "bottom-1/3 left-8", delay: "1.1s" },
  { emoji: "💖", pos: "bottom-1/3 right-8", delay: "1.3s" },
];

const MEDIA_ITEMS: MediaItem[] = [
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
  {
    type: "video",
    src: "/videos/393D2A22-8930-45FB-B74D-9B08E7663D4A.MP4",
  },
  {
    type: "video",
    src: "/videos/67CBA224-5D3C-44A1-884A-AED2E568AA63.MP4",
  },
  {
    type: "video",
    src: "/videos/9E95BDF1-FB61-464C-AB40-115568232BB4.MP4",
  },
  {
    type: "video",
    src: "/videos/C479D7F9-FDD1-434D-87FE-B376BC9E05C3.mp4",
  },
  {
    type: "video",
    src: "/videos/D43AECDC-49D2-4853-9ECE-AB38D2A238F9.MP4",
  },
  {
    type: "video",
    src: "/videos/F5968603-EA12-4E8F-AFAD-067BD7A9BCE8.MP4",
  },
  {
    type: "video",
    src: "/videos/FA8E0A2C-E29A-4D01-902C-FC131FB0895D.MP4",
  },
];

const MENU_CARDS: MenuCard[] = [
  {
    icon: "📸",
    label: "Gallery",
    target: "gallery",
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-600",
  },
  {
    icon: "💌",
    label: "Notes",
    target: "notes",
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-600",
  },
];

const NOTE_CARDS: NoteCard[] = [
  {
    id: 0,
    from: "Hans",
    bg: "bg-pink-100",
    ribbon: "bg-pink-400",
    frontText: "FROM: Hans 💕",
    message:
      "Hey Debby, I know I am a bit late. Today I planned on getting this to you earlier but life had other plans. Regardless, this is an amazing day. A day I get to celebrate one of the most special people in my life. You have had such an impact on my life, I do not think I can even start to explain. There is so much about you that I love, so much that I never thought I would get from one person in my life. You have made me feel special on so many occasions, and this is a little token for you, just so you know how special you are to me. And also to Eugene and Stacey, who have so gracefully blessed us with a few words and some pictures for your eyes. Thank you for everything and I pray you get all your heart desires. I love you Debby. Love from Hans 💖",
  },
  {
    id: 1,
    from: "Stacey",
    bg: "bg-purple-100",
    ribbon: "bg-purple-400",
    frontText: "FROM: Stacey 💜",
    message:
      "Hey Zee, so let us leave the past in the past okay. All the times when I was supposed to buy you loaded fries and all those past events. The future is now. Cheers to a good day and a good year. A year of growth and joy and peace. Thanks for all the laughter and the weirdness. You are one in a Gazillion! Happy birthday Zee 🎉",
  },
  {
    id: 2,
    from: "Eugene",
    bg: "bg-sky-100",
    ribbon: "bg-sky-400",
    frontText: "FROM: Eugene 💙",
    message:
      "Happy birthday Deborah! I am so grateful to have you in my corner. Your energy and support mean everything to me, and I have learned so much from you since we started working together. Here is to many more laughs, wins, and adventures together! Wishing you a year filled with joy, growth, and all your favourite things. 💕",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeConfetti(): ConfettiPiece[] {
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

function ConfettiLayer({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            backgroundColor: piece.color,
            width: piece.width,
            height: piece.height,
            transform: `rotate(${piece.initialRotation})`,
          }}
        />
      ))}
    </>
  );
}

// ─── BackButton ───────────────────────────────────────────────────────────────

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-pink-600 bg-white border border-pink-200 rounded-full shadow-sm hover:bg-pink-50 transition-colors"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      ← Back
    </button>
  );
}

// ─── MenuScreen ───────────────────────────────────────────────────────────────

function MenuScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center min-h-screen bg-linear-to-b from-pink-50 to-rose-50 px-6 py-12">
      <h2
        className="mb-10 text-4xl font-extrabold text-center text-pink-600"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        What would you like to open? 🎀
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
        {MENU_CARDS.map((card) => (
          <button
            key={card.target}
            type="button"
            onClick={() => setScreen(card.target)}
            className={cn(
              "flex flex-col items-center gap-3 p-8 rounded-2xl border-2 shadow hover:scale-105 transition-transform cursor-pointer",
              card.bg,
              card.border,
            )}
          >
            <span className="text-5xl">{card.icon}</span>
            <span
              className={cn("text-lg font-bold", card.text)}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {card.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── GalleryScreen ────────────────────────────────────────────────────────────

function GalleryScreen({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = MEDIA_ITEMS.length;

  const goPrev = () => setIndex((i) => Math.max(i - 1, 0));
  const goNext = () => setIndex((i) => Math.min(i + 1, total - 1));

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (delta > 50) goNext();
    if (delta < -50) goPrev();
    setTouchStartX(null);
  };

  const current = MEDIA_ITEMS[index];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <BackButton onBack={onBack} />
        <h2
          className="text-xl font-extrabold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Gallery 📸
        </h2>
        <span
          className="text-sm text-zinc-400 tabular-nums"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {index + 1} / {total}
        </span>
      </div>

      {/* Swipe area */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev button */}
        {index > 0 && (
          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            className="absolute left-2 z-10 text-5xl text-white/70 hover:text-white transition-colors px-2 py-6"
          >
            ‹
          </button>
        )}

        {/* Media item */}
        <div className="w-full max-w-3xl flex items-center justify-center">
          {current.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={current.src}
              src={current.src}
              alt={`Memory ${index + 1}`}
              className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
            />
          ) : (
            <video
              key={current.src}
              src={current.src}
              className="max-h-[78vh] w-auto max-w-full rounded-xl shadow-2xl"
              controls
              autoPlay
              playsInline
            />
          )}
        </div>

        {/* Next button */}
        {index < total - 1 && (
          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            className="absolute right-2 z-10 text-5xl text-white/70 hover:text-white transition-colors px-2 py-6"
          >
            ›
          </button>
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 py-4 shrink-0 flex-wrap px-4">
        {MEDIA_ITEMS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to item ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === index
                ? "bg-pink-400 scale-125"
                : "bg-zinc-600 hover:bg-zinc-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── NotesScreen ──────────────────────────────────────────────────────────────

function NotesScreen({ onBack }: { onBack: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-rose-50 to-pink-50 px-6 py-8">
      <div className="flex items-center gap-4 mb-10">
        <BackButton onBack={onBack} />
        <h2
          className="text-2xl font-extrabold text-pink-600"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Notes for Debby 💌
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center pb-10">
        {NOTE_CARDS.map((card) => (
          <div
            key={card.id}
            className="flip-card w-64 h-60 cursor-pointer select-none"
            onClick={() => toggle(card.id)}
          >
            <div
              className="flip-card-inner"
              style={{
                transform: flipped.has(card.id)
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
            >
              {/* Front — gift-wrap design */}
              <div
                className={cn(
                  "flip-card-front rounded-2xl overflow-hidden shadow-lg border-2 border-white/60",
                  card.bg,
                )}
              >
                {/* Horizontal ribbon */}
                <div
                  className={cn(
                    "absolute top-1/2 left-0 right-0 h-5 -translate-y-1/2 opacity-60",
                    card.ribbon,
                  )}
                />
                {/* Vertical ribbon */}
                <div
                  className={cn(
                    "absolute left-1/2 top-0 bottom-0 w-5 -translate-x-1/2 opacity-60",
                    card.ribbon,
                  )}
                />
                {/* Content over ribbons */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 p-4">
                  <span className="text-4xl">🎀</span>
                  <p
                    className="text-sm font-bold text-center text-zinc-700"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.frontText}
                  </p>
                  <p className="text-xs text-zinc-500">tap to open</p>
                </div>
              </div>

              {/* Back — message */}
              <div
                className={cn(
                  "flip-card-back rounded-2xl flex flex-col items-center justify-center p-5 shadow-lg border-2 border-white/60",
                  card.bg,
                )}
              >
                <p
                  className="text-center text-sm leading-relaxed text-zinc-700"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.message}
                </p>
                <p className="mt-3 text-xs text-zinc-400">tap to close</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    setConfetti(makeConfetti());
  }, []);

  if (screen === "menu") return <MenuScreen setScreen={setScreen} />;
  if (screen === "gallery")
    return <GalleryScreen onBack={() => setScreen("menu")} />;
  if (screen === "notes")
    return <NotesScreen onBack={() => setScreen("menu")} />;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center min-h-screen overflow-hidden bg-linear-to-b from-pink-100 via-rose-50 to-amber-50">
      <ConfettiLayer pieces={confetti} />

      {FLOATING_EMOJIS.map(({ emoji, pos, delay }) => (
        <span
          key={pos}
          className={cn(
            "absolute text-3xl sm:text-4xl animate-bounce select-none",
            pos,
          )}
          style={{ animationDelay: delay }}
          aria-hidden="true"
        >
          {emoji}
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <h1
          className="text-5xl font-extrabold leading-tight tracking-tight text-pink-600 drop-shadow-sm sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Happy Birthday Debby 🎉
        </h1>
        <p
          className="text-lg font-medium text-pink-400 sm:text-xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          A special day deserves a special surprise...
        </p>
        <button
          type="button"
          className="btn-pulse mt-2 px-10 py-4 text-lg font-bold text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-heading)" }}
          onClick={() => setScreen("menu")}
        >
          Open Your Day 🎀
        </button>
      </div>
    </div>
  );
}
