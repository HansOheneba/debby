"use client";

export function BackButton({ onBack }: { onBack: () => void }) {
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
