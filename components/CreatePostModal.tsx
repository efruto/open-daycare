"use client";

import { useState, useCallback } from "react";
import { mockKids, type Kid } from "@/lib/mocks";
import type { PostMock, TipoPost } from "@/app/lib/mock-feed";
import { usePosts } from "@/components/PostProvider";

const TIPOS: { tipo: TipoPost; label: string; bg: string; text: string }[] = [
  { tipo: "comida", label: "Comida", bg: "bg-[#9A7B1E]", text: "text-white" },
  { tipo: "siesta", label: "Siesta", bg: "bg-[#E7DCF6]", text: "text-[#7B5FC0]" },
  { tipo: "actividad", label: "Actividad", bg: "bg-[#2E89A6]", text: "text-white" },
  { tipo: "logro", label: "Logro", bg: "bg-[#CFEBD8]", text: "text-[#3E9B6C]" },
  { tipo: "animo", label: "Ánimo", bg: "bg-[#F9D2DE]", text: "text-[#C56486]" },
  { tipo: "foto", label: "Foto", bg: "bg-[#FBD8CC]", text: "text-[#D9684A]" },
  { tipo: "anuncio", label: "Anuncio", bg: "bg-[#CCD8F4]", text: "text-[#4E72C8]" },
];

function primerNombre(fullName: string) {
  return fullName.split(" ")[0];
}

function buildDestinatarios(selectedKids: Kid[]): string {
  if (selectedKids.length === 1) return `familia de ${primerNombre(selectedKids[0].name)}`;
  if (selectedKids.length === 2)
    return `${primerNombre(selectedKids[0].name)} y ${primerNombre(selectedKids[1].name)}`;
  const allButLast = selectedKids.slice(0, -1).map((k) => primerNombre(k.name));
  return `${allButLast.join(", ")} y ${primerNombre(selectedKids[selectedKids.length - 1].name)}`;
}

export default function CreatePostModal() {
  const { addPost, closeCreateModal } = usePosts();

  const [selectedKidIds, setSelectedKidIds] = useState<string[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoPost | null>(null);
  const [descripcion, setDescripcion] = useState("");
  const [errores, setErrores] = useState<{
    destinatarios?: string;
    tipo?: string;
    descripcion?: string;
  }>({});

  const handleKidToggle = useCallback((kidId: string) => {
    setSelectedKidIds((prev) =>
      prev.includes(kidId) ? prev.filter((id) => id !== kidId) : [...prev, kidId]
    );
  }, []);

  const handleTodaLaSala = useCallback(() => {
    setSelectedKidIds((prev) =>
      prev.length === mockKids.length ? [] : mockKids.map((k) => k.id)
    );
  }, []);

  const handleClose = useCallback(() => {
    setSelectedKidIds([]);
    setTipoSeleccionado(null);
    setDescripcion("");
    setErrores({});
    closeCreateModal();
  }, [closeCreateModal]);

  const handlePublicar = useCallback(() => {
    const newErrores: typeof errores = {};

    if (selectedKidIds.length === 0) {
      newErrores.destinatarios = "Seleccioná al menos un destinatario";
    }
    if (!tipoSeleccionado) {
      newErrores.tipo = "Seleccioná un tipo de publicación";
    }
    if (!descripcion.trim()) {
      newErrores.descripcion = "Escribí una descripción";
    }

    if (Object.keys(newErrores).length > 0) {
      setErrores(newErrores);
      return;
    }

    const selectedKids = mockKids.filter((k) => selectedKidIds.includes(k.id));
    const allKidsSelected = selectedKidIds.length === mockKids.length;
    const firstKid = selectedKids[0];

    const post: PostMock = {
      id: `post-${Date.now()}`,
      tipo: tipoSeleccionado!,
      autor: allKidsSelected ? "Anuncio general" : primerNombre(firstKid.name),
      iniciales: allKidsSelected ? undefined : firstKid.avatarLetter,
      hora: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      destinatarios: allKidsSelected ? "toda la sala" : buildDestinatarios(selectedKids),
      texto: descripcion.trim(),
      meEncanta: 0,
      comentarios: [],
    };

    addPost(post);
    handleClose();
  }, [selectedKidIds, tipoSeleccionado, descripcion, addPost, handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-10">
      <div
        className="w-full max-w-[580px] overflow-hidden rounded-3xl border border-borde bg-[#FBF4EC]"
        style={{ boxShadow: "0 20px 50px -24px rgba(63,54,46,.35)" }}
      >
        <div className="flex items-center justify-between border-b border-borde px-[26px] py-5">
          <button
            type="button"
            onClick={handleClose}
            className="text-[15px] font-bold text-texto-secundario"
          >
            Cancelar
          </button>
          <span className="font-display text-[18px] font-semibold text-texto">
            Nueva publicación
          </span>
          <button
            type="button"
            onClick={handlePublicar}
            className="text-[15px] font-extrabold text-coral-fuerte"
          >
            Publicar
          </button>
        </div>

        <div className="px-[26px] py-6">
          <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.7px] text-texto-secundario">
            PARA
          </div>
          <div className="mb-[22px] flex flex-wrap gap-[9px]">
            {mockKids.map((kid) => {
              const isSelected = selectedKidIds.includes(kid.id);
              return (
                <button
                  key={kid.id}
                  type="button"
                  onClick={() => handleKidToggle(kid.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] py-1.5 pr-3.5 pl-1.5 text-sm font-bold transition-colors ${
                    isSelected
                      ? "border-texto bg-texto text-white"
                      : "border-borde bg-tarjeta text-texto-inactivo"
                  }`}
                >
                  <span
                    className="flex size-[26px] items-center justify-center rounded-full font-display text-[13px] font-semibold"
                    style={{
                      backgroundColor: kid.avatarColor,
                      color: "#1F7A93",
                    }}
                  >
                    {kid.avatarLetter}
                  </span>
                  {primerNombre(kid.name)}
                </button>
              );
            })}
            <button
              type="button"
              onClick={handleTodaLaSala}
              className={`rounded-full border-[1.5px] px-4 py-1.5 text-sm font-bold transition-colors ${
                selectedKidIds.length === mockKids.length
                  ? "border-texto bg-texto text-white"
                  : "border-borde bg-tarjeta text-texto-inactivo"
              }`}
            >
              Toda la sala
            </button>
          </div>
          {errores.destinatarios && (
            <p className="-mt-4 mb-4 text-[13px] font-semibold text-coral-fuerte">
              {errores.destinatarios}
            </p>
          )}

          <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.7px] text-texto-secundario">
            TIPO
          </div>
          <div className="mb-[22px] flex flex-wrap gap-[9px]">
            {TIPOS.map((t) => {
              const isActive = tipoSeleccionado === t.tipo;
              return (
                <button
                  key={t.tipo}
                  type="button"
                  onClick={() => setTipoSeleccionado(t.tipo)}
                  className={`cursor-pointer rounded-full border-none px-4 py-2 text-[13.5px] font-extrabold transition-all ${t.bg} ${t.text} ${
                    isActive ? "opacity-100 shadow-md" : "opacity-40"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          {errores.tipo && (
            <p className="-mt-4 mb-4 text-[13px] font-semibold text-coral-fuerte">
              {errores.tipo}
            </p>
          )}

          <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.7px] text-texto-secundario">
            DESCRIPCIÓN
          </div>
          <textarea
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
              if (errores.descripcion) setErrores((prev) => ({ ...prev, descripcion: undefined }));
            }}
            placeholder="Contá cómo le fue hoy…"
            className="mb-[22px] min-h-[120px] w-full resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white p-[14px] text-[15px] leading-normal text-texto placeholder:text-[#B6A99B]"
          />
          {errores.descripcion && (
            <p className="-mt-4 mb-4 text-[13px] font-semibold text-coral-fuerte">
              {errores.descripcion}
            </p>
          )}

          <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.7px] text-texto-secundario">
            FOTOS
          </div>
          <div className="flex gap-3">
            <div className="flex size-[96px] items-center justify-center rounded-[14px] border border-borde bg-[#F4ECE1] text-[#CBB89F]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
              </svg>
            </div>
            <div className="flex size-[96px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5503A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-[12px]">Agregar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
