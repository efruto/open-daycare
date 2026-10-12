"use client";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-[11px] bg-tarjeta border border-borde rounded-[14px] px-4 py-3 focus-within:border-coral-avatar focus-within:ring-2 focus-within:ring-coral-claro transition-all">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B0A290"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        placeholder="Buscar niño…"
        className="flex-1 border-none bg-transparent text-[15px] text-texto placeholder:text-texto-nota focus:outline-none"
      />
    </div>
  );
}
