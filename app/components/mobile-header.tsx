"use client";

import { useState } from "react";
import { SidebarContent } from "@/app/components/sidebar";
import { usuarioActual } from "@/app/lib/mock-feed";

export default function MobileHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-borde bg-tarjeta lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-[11px]">
            <div className="flex size-[38px] items-center justify-center rounded-xl bg-[linear-gradient(155deg,var(--color-coral-rosado),var(--color-coral-avatar))] text-white">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </div>
            <div>
              <div className="font-display text-[17px] leading-none font-semibold text-texto">
                OpenDayCare
              </div>
              <div className="mt-[2px] text-[11.5px] text-texto-nota">
                Sala {usuarioActual.sala}
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto(true)}
            className="flex size-10 items-center justify-center rounded-xl bg-fondo text-texto-secundario"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {menuAbierto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[rgba(63,54,46,0.45)]"
            onClick={() => setMenuAbierto(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[248px] flex-col border-r border-borde bg-tarjeta px-4 py-6">
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMenuAbierto(false)}
              className="absolute right-4 top-6 flex size-8 items-center justify-center rounded-[10px] bg-fondo text-texto-secundario"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      <button
        type="button"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,var(--color-coral-degradado-inicio),var(--color-coral-degradado-fin))] px-5 py-3.5 text-[14.5px] font-extrabold text-white shadow-boton-coral lg:hidden"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Nueva publicación
      </button>
    </>
  );
}
