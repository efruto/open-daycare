"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isFeedActive = pathname === "/feed";
  const isKidsActive = pathname === "/kids" || pathname.startsWith("/kids/");
  const isAvisosActive = false;
  const isMiCuentaActive = false;

  return (
    <aside className="w-[248px] flex-none bg-tarjeta border-r border-borde flex flex-col p-6 px-4 sticky top-0 h-screen">
      <Link href="/" className="flex items-center gap-[11px] px-2 pb-[22px]">
        <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-coral-rosado to-coral-avatar flex items-center justify-center flex-none">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div className="font-display font-semibold text-[17px] text-texto leading-none">
            OpenDayCare
          </div>
          <div className="text-[11.5px] text-texto-nota mt-[2px]">
            Sala Soles
          </div>
        </div>
      </Link>

      <Link
        href="#"
        className="flex items-center justify-center gap-2 w-full p-3 rounded-[14px] bg-gradient-to-b from-coral-degradado-inicio to-coral-degradado-fin text-white font-extrabold text-[14.5px] shadow-boton-coral mb-[18px]"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Nueva publicación
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        <Link
          href="/feed"
          className={`flex items-center gap-3 px-3 py-[11px] rounded-xl text-[14.5px] ${
            isFeedActive
              ? "bg-coral-claro text-coral-fuerte font-extrabold"
              : "bg-transparent text-texto-inactivo font-semibold"
          }`}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
          </svg>
          Feed
        </Link>
        <Link
          href="/kids"
          className={`flex items-center gap-3 px-3 py-[11px] rounded-xl text-[14.5px] ${
            isKidsActive
              ? "bg-coral-claro text-coral-fuerte font-extrabold"
              : "bg-transparent text-texto-inactivo font-semibold"
          }`}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="7" r="3" />
            <circle cx="17" cy="9" r="2.4" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
          </svg>
          Niños
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 px-3 py-[11px] rounded-xl text-[14.5px] ${
            isAvisosActive
              ? "bg-coral-claro text-coral-fuerte font-extrabold"
              : "bg-transparent text-texto-inactivo font-semibold"
          }`}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          Avisos
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 px-3 py-[11px] rounded-xl text-[14.5px] ${
            isMiCuentaActive
              ? "bg-coral-claro text-coral-fuerte font-extrabold"
              : "bg-transparent text-texto-inactivo font-semibold"
          }`}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Mi cuenta
        </Link>
      </nav>

      <div className="border-t border-borde pt-[14px] mt-[10px]">
        <div className="flex items-center gap-[11px] px-2 py-[6px]">
          <div className="w-[38px] h-[38px] rounded-full bg-coral-avatar text-white font-display font-semibold text-[16px] flex items-center justify-center flex-none">
            C
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-[14px] text-texto">
              Caro Giménez
            </div>
            <div className="text-[12px] text-texto-nota">Maestra · Soles</div>
          </div>
          <Link
            href="#"
            title="Cerrar sesión"
            className="flex-none w-8 h-8 rounded-[10px] bg-fondo text-texto-secundario flex items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
