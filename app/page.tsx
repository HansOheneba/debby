"use client";

import { useEffect, useRef, useState } from "react";
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
  sublabel: string;
  target: Screen;
  bg: string;
  border: string;
  text: string;
  accent: string;
};

type NoteCard = {
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
  { type: "video", src: "/videos/393D2A22-8930-45FB-B74D-9B08E7663D4A.MP4" },
  { type: "video", src: "/videos/67CBA224-5D3C-44A1-884A-AED2E568AA63.MP4" },
  { type: "video", src: "/videos/9E95BDF1-FB61-464C-AB40-115568232BB4.MP4" },
  { type: "video", src: "/videos/C479D7F9-FDD1-434D-87FE-B376BC9E05C3.mp4" },
  { type: "video", src: "/videos/D43AECDC-49D2-4853-9ECE-AB38D2A238F9.MP4" },
  { type: "video", src: "/videos/F5968603-EA12-4E8F-AFAD-067BD7A9BCE8.MP4" },
  { type: "video", src: "/videos/FA8E0A2C-E29A-4D01-902C-FC131FB0895D.MP4" },
];

const MENU_CARDS: MenuCard[] = [
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

const NOTE_CARDS: NoteCard[] = [
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
      className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-pink-600 bg-white border border-pink-200 rounded-full shadow-sm hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all duration-200"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      ← Back
    </button>
  );
}

// ─── ScreenTransition ─────────────────────────────────────────────────────────
// Wraps each screen in a fade+slide-up entrance

function ScreenTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className={cn("transition-all duration-500 ease-out", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

// ─── MenuScreen ───────────────────────────────────────────────────────────────

function MenuScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <ScreenTransition className="flex flex-1 flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 px-6 py-12">
      {/* Animated name header */}
      <div className="mb-2 text-center overflow-hidden">
        {"Deborah Ama Zenaba Kontoh".split(" ").map((word, wi) => (
          <span
            key={wi}
            className="inline-block mr-2 name-word"
            style={{
              animationDelay: `${wi * 0.12}s`,
              fontFamily: "var(--font-heading)",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <h2
        className="mb-10 text-3xl font-extrabold text-center text-pink-500 menu-fade-in"
        style={{ fontFamily: "var(--font-heading)", animationDelay: "0.6s" }}
      >
        What would you like to open? 🎀
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm sm:max-w-lg">
        {MENU_CARDS.map((card, i) => (
          <button
            key={card.target + card.label}
            type="button"
            onClick={() => setScreen(card.target)}
            className={cn(
              "menu-card-enter flex flex-col items-center gap-2 p-6 rounded-2xl border-2 shadow-md",
              "hover:scale-105 hover:shadow-lg active:scale-95",
              "transition-all duration-200 cursor-pointer text-center",
              card.bg,
              card.border,
            )}
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <span className="text-4xl">{card.icon}</span>
            <span
              className={cn("text-base font-bold leading-tight", card.text)}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {card.label}
            </span>
            <span
              className="text-xs text-zinc-400 leading-snug"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {card.sublabel}
            </span>
          </button>
        ))}
      </div>
    </ScreenTransition>
  );
}

// ─── GalleryScreen ────────────────────────────────────────────────────────────

function GalleryScreen({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = MEDIA_ITEMS.length;

  const navigate = (dir: "left" | "right") => {
    if (animating) return;
    if (dir === "right" && index >= total - 1) return;
    if (dir === "left" && index <= 0) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) => (dir === "right" ? i + 1 : i - 1));
      setDirection(null);
      setAnimating(false);
    }, 320);
  };

  const goPrev = () => navigate("left");
  const goNext = () => navigate("right");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, animating]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (delta > 50) goNext();
    else if (delta < -50) goPrev();
    setTouchStartX(null);
  };

  const current = MEDIA_ITEMS[index];

  const slideStyle: React.CSSProperties = animating
    ? {
        opacity: 0,
        transform:
          direction === "right" ? "translateX(-60px)" : "translateX(60px)",
        transition: "opacity 0.32s ease, transform 0.32s ease",
      }
    : {
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.32s ease, transform 0.32s ease",
      };

  return (
    <ScreenTransition className="flex flex-col min-h-screen bg-zinc-950 text-white select-none">
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
        {index > 0 && (
          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            className="absolute left-2 z-10 text-5xl text-white/60 hover:text-white transition-colors px-2 py-6 hover:scale-110 active:scale-95"
          >
            ‹
          </button>
        )}

        <div
          className="w-full max-w-3xl flex items-center justify-center"
          style={slideStyle}
        >
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

        {index < total - 1 && (
          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            className="absolute right-2 z-10 text-5xl text-white/60 hover:text-white transition-colors px-2 py-6 hover:scale-110 active:scale-95"
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
            onClick={() => !animating && setIndex(i)}
            className={cn(
              "rounded-full transition-all duration-300",
              i === index
                ? "bg-pink-400 w-4 h-2"
                : "bg-zinc-600 hover:bg-zinc-400 w-2 h-2",
            )}
          />
        ))}
      </div>
    </ScreenTransition>
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
    <ScreenTransition className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 px-4 py-8">
      <div className="flex items-center gap-4 mb-10">
        <BackButton onBack={onBack} />
        <h2
          className="text-2xl font-extrabold text-pink-600"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Notes for Debby 💌
        </h2>
      </div>

      <div className="flex flex-col items-center gap-14 pb-12">
        {NOTE_CARDS.map((card, i) => (
          <div
            key={card.id}
            className="flip-card w-full max-w-lg cursor-pointer select-none note-card-enter"
            style={{ height: "520px", animationDelay: `${i * 0.15}s` }}
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
              {/* Front — gift-wrap */}
              <div
                className={cn(
                  "flip-card-front rounded-2xl overflow-hidden shadow-lg border-2 border-white/60",
                  card.bg,
                )}
              >
                <div
                  className={cn(
                    "absolute top-1/2 left-0 right-0 h-6 -translate-y-1/2 opacity-60",
                    card.ribbon,
                  )}
                />
                <div
                  className={cn(
                    "absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 opacity-60",
                    card.ribbon,
                  )}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-6">
                  <span className="text-6xl">🎀</span>
                  <p
                    className="text-lg font-bold text-center text-zinc-700"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.frontText}
                  </p>
                  <p className="text-sm text-zinc-500">tap to open</p>
                </div>
              </div>

              {/* Back — lined paper note */}
              <div
                className="flip-card-back rounded-2xl overflow-hidden shadow-xl flex"
                style={{ backgroundColor: card.paperBg }}
              >
                {/* Margin strip */}
                <div
                  className="w-10 shrink-0 flex flex-col items-center gap-24 pt-14"
                  style={{ backgroundColor: card.marginBg }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        backgroundColor: card.paperBg,
                        borderColor: card.lineColor,
                      }}
                    />
                  ))}
                </div>

                {/* Paper content */}
                <div
                  className="flex-1 overflow-y-auto px-4 pt-5 pb-6"
                  style={{
                    backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${card.lineColor}88 31px, ${card.lineColor}88 32px)`,
                    backgroundSize: "100% 32px",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: card.lineColor,
                    }}
                  >
                    From: {card.from}
                  </p>
                  <p
                    className="text-sm text-zinc-700 leading-8 break-words"
                    style={{
                      fontFamily: "cursive, var(--font-body)",
                      lineHeight: "32px",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {card.message}
                  </p>
                  <p
                    className="mt-4 text-xs text-zinc-400"
                    style={{
                      fontFamily: "var(--font-body)",
                      lineHeight: "1.5",
                    }}
                  >
                    tap to close
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScreenTransition>
  );
}

// ─── WelcomeScreen ────────────────────────────────────────────────────────────

function WelcomeScreen({
  onEnter,
  confetti,
  exiting,
}: {
  onEnter: () => void;
  confetti: ConfettiPiece[];
  exiting: boolean;
}) {
  const [phase, setPhase] = useState<"greeting" | "main">("greeting");

  useEffect(() => {
    const t = setTimeout(() => setPhase("main"), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-amber-50"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting
          ? "translateY(-40px) scale(0.97)"
          : "translateY(0) scale(1)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
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

      {phase === "greeting" && (
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
          <span
            className="birthday-pop text-7xl sm:text-8xl"
            style={{ animationDelay: "0s" }}
            aria-hidden="true"
          >
            🎂
          </span>
          <h1
            className="birthday-pop text-5xl font-extrabold text-pink-600 sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "var(--font-heading)",
              animationDelay: "0.25s",
            }}
          >
            Happy Birthday
          </h1>
          <h2
            className="birthday-pop text-4xl font-extrabold text-rose-400 sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-heading)",
              animationDelay: "0.55s",
            }}
          >
            to you! 🎉
          </h2>
          <div
            className="birthday-pop flex gap-3 text-4xl mt-2"
            style={{ animationDelay: "0.8s" }}
            aria-hidden="true"
          >
            🎈 🌸 💖 🌸 🎈
          </div>
        </div>
      )}

      {phase === "main" && (
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center fade-in-up">
          {/* Animated name — each word slides up with stagger */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 overflow-hidden">
            {"Deborah Ama Zenaba Kontoh".split(" ").map((word, wi) => (
              <span
                key={wi}
                className="name-word-hero inline-block text-4xl font-extrabold text-rose-400 sm:text-5xl md:text-6xl drop-shadow-sm"
                style={{
                  fontFamily: "var(--font-heading)",
                  animationDelay: `${wi * 0.15}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-pink-600 drop-shadow-sm sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Happy Birthday 🎉
          </h1>
          <p
            className="text-lg font-medium text-pink-400 sm:text-xl max-w-xs"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A special day deserves a special surprise...
          </p>
          <button
            type="button"
            className="btn-pulse mt-2 px-10 py-4 text-lg font-bold text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            style={{ fontFamily: "var(--font-heading)" }}
            onClick={onEnter}
          >
            Open Your Day 🎀
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setConfetti(makeConfetti());
  }, []);

  const enterApp = () => {
    audioRef.current?.play().catch(() => {});
    // Animate welcome out first, then swap screen
    setWelcomeExiting(true);
    setTimeout(() => setScreen("menu"), 520);
  };

  return (
    <>
      <audio ref={audioRef} src="/music/cantstop.m4a" loop preload="auto" />

      {screen === "welcome" && (
        <WelcomeScreen
          onEnter={enterApp}
          confetti={confetti}
          exiting={welcomeExiting}
        />
      )}
      {screen === "menu" && <MenuScreen setScreen={setScreen} />}
      {screen === "gallery" && (
        <GalleryScreen onBack={() => setScreen("menu")} />
      )}
      {screen === "notes" && <NotesScreen onBack={() => setScreen("menu")} />}

      {/* ── Global animation styles ───────────────────────────────────────── */}
      <style>{`
        /* Name words slide up from below on welcome main phase */
        @keyframes nameWordIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .name-word-hero {
          opacity: 0;
          animation: nameWordIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Menu name words slide in */
        @keyframes nameWordMenu {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .name-word {
          opacity: 0;
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 800;
          color: #f43f5e;
          animation: nameWordMenu 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Menu subtitle fade */
        @keyframes menuFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .menu-fade-in {
          opacity: 0;
          animation: menuFadeIn 0.5s ease forwards;
        }

        /* Menu cards pop in */
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .menu-card-enter {
          opacity: 0;
          animation: cardEnter 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Note cards enter */
        @keyframes noteEnter {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .note-card-enter {
          opacity: 0;
          animation: noteEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Confetti */
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .confetti-piece {
          position: absolute;
          top: -10px;
          border-radius: 2px;
          animation: confettiFall linear infinite;
        }

        /* Birthday pop */
        @keyframes birthdayPop {
          0%   { opacity: 0; transform: scale(0.5) rotate(-5deg); }
          70%  { transform: scale(1.1) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .birthday-pop {
          opacity: 0;
          animation: birthdayPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Fade in up for main phase */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }

        /* Btn pulse */
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.5); }
          50%       { box-shadow: 0 0 0 12px rgba(236, 72, 153, 0); }
        }
        .btn-pulse {
          animation: btnPulse 2s ease-in-out infinite;
        }

        /* Flip cards */
        .flip-card { perspective: 1200px; }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
}
