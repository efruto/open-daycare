import Link from "next/link";
import type { Kid } from "@/lib/mocks";

type KidCardProps = {
  kid: Kid;
};

export default function KidCard({ kid }: KidCardProps) {
  const parentCount = kid.parents.length;
  const parentText =
    parentCount === 0
      ? "sin padres vinculados"
      : parentCount === 1
        ? "1 padre vinculado"
        : `${parentCount} padres vinculados`;

  const badge =
    kid.badge ?? (parentCount === 0
      ? { text: "VINCULAR", color: "#F9D2DE" }
      : null);

  const badgeTextColor =
    badge?.text === "VINCULAR" ? "#C56486" : "#D9684A";

  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex items-center gap-[14px] min-w-0 bg-tarjeta border border-borde rounded-[18px] p-4 shadow-tarjeta hover:border-[#F2A78E] hover:-translate-y-0.5 transition-transform duration-150"
    >
      <div
        className="w-12 h-12 rounded-full font-display font-semibold text-[19px] flex items-center justify-center flex-none"
        style={{ background: kid.avatarColor, color: getContrastColor(kid.avatarColor) }}
      >
        {kid.avatarLetter}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-[16px] text-texto">
          {kid.name}
        </div>
        <div className="text-[13px] text-texto-nota">
          {kid.age} años · {parentText}
        </div>
      </div>

      {badge ? (
        <span
          className="flex-none text-[11px] font-extrabold px-[9px] py-[5px] rounded-full"
          style={{ background: badge.color, color: badgeTextColor }}
        >
          {badge.text}
        </span>
      ) : (
        <svg
          className="flex-none"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBB89F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Link>
  );
}

function getContrastColor(hex: string): string {
  const colorMap: Record<string, string> = {
    "#A9D9E8": "#1F7A93",
    "#F4B8CC": "#C44A7A",
    "#B9DEC4": "#3E8B62",
    "#F4DC8E": "#9A7B1E",
    "#C9B6E8": "#7B5FC0",
    "#A9C7E8": "#2E6DA6",
  };
  return colorMap[hex] ?? "#3F362E";
}
