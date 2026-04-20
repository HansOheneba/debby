import type { ConfettiPiece } from "@/app/types";

export function ConfettiLayer({ pieces }: { pieces: ConfettiPiece[] }) {
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
