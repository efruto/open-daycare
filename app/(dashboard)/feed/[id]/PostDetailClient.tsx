"use client";

import { useState } from "react";
import Link from "next/link";
import { usePosts } from "@/components/PostProvider";
import { usuarioFamilia, type PostMock } from "@/app/lib/mock-feed";
import type { TipoPost } from "@/app/lib/mock-feed";

const chipConfig: Record<
  TipoPost,
  { label: string; bg: string; dot: string; text: string }
> = {
  comida: { label: "COMIDA", bg: "bg-[#9A7B1E]", dot: "bg-[#9A7B1E]", text: "text-white" },
  siesta: { label: "SIESTA", bg: "bg-[#E7DCF6]", dot: "bg-[#7B5FC0]", text: "text-[#7B5FC0]" },
  actividad: { label: "ACTIVIDAD", bg: "bg-[#C7E7F1]", dot: "bg-[#2E89A6]", text: "text-[#2E89A6]" },
  logro: { label: "LOGRO", bg: "bg-[#CFEBD8]", dot: "bg-[#3E9B6C]", text: "text-[#3E9B6C]" },
  animo: { label: "ÁNIMO", bg: "bg-[#F9D2DE]", dot: "bg-[#C56486]", text: "text-[#C56486]" },
  foto: { label: "FOTO", bg: "bg-[#FBD8CC]", dot: "bg-[#D9684A]", text: "text-[#D9684A]" },
  anuncio: { label: "ANUNCIO", bg: "bg-[#CCD8F4]", dot: "bg-[#4E72C8]", text: "text-[#4E72C8]" },
};

export default function PostDetailClient({ post }: { post: PostMock }) {
  const { toggleMeEncanta, addComment } = usePosts();
  const [comentarioText, setComentarioText] = useState("");

  const chip = chipConfig[post.tipo];

  const handleAgregarComentario = () => {
    if (!comentarioText.trim()) return;

    const nuevoComentario = {
      id: `c-${Date.now()}`,
      autor: usuarioFamilia.nombre,
      rol: usuarioFamilia.rol,
      avatarColor: usuarioFamilia.avatarColor,
      avatarLetter: usuarioFamilia.avatarLetter,
      hora: new Date().toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      texto: comentarioText.trim(),
    };

    addComment(post.id, nuevoComentario);
    setComentarioText("");
  };

  return (
    <div className="mx-auto max-w-[680px] px-10 py-[34px] pb-10">
      <Link
        href="/"
        className="mb-[18px] flex items-center gap-[7px] text-[14px] font-bold text-texto-secundario"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver al feed
      </Link>

      {/* Tarjeta de publicación */}
      <div
        className="rounded-[22px] border border-borde bg-tarjeta px-[26px] py-6"
        style={{ boxShadow: "0 6px 22px -14px rgba(120,90,60,.5)" }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-[13px]">
          {post.iniciales ? (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-avatar-celeste font-display text-[18px] font-semibold text-avatar-celeste-texto">
              {post.iniciales}
            </div>
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-chip-anuncio text-chip-anuncio-texto">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </svg>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-display text-[17px] font-semibold text-texto">
              {post.autor}
            </div>
            <div className="text-[13px] text-texto-nota">
              {post.hora} · Maestra Caro · Sala Soles
            </div>
          </div>
          <div className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${chip.bg}`}>
            <span className={`size-2 rounded-full ${chip.dot}`} />
            <span className={`text-[12px] font-extrabold tracking-[0.5px] ${chip.text}`}>
              {chip.label}
            </span>
          </div>
        </div>

        {/* Texto */}
        <p className="mb-1 text-[16px] leading-[1.6] text-texto-cuerpo">{post.texto}</p>

        {/* Foto placeholder */}
        {post.foto && (
          <div className="mt-4 flex h-[280px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-foto-marco bg-foto-fondo text-foto-icono">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
            </svg>
            <span className="text-[14px]">{post.foto.etiqueta}</span>
          </div>
        )}

        {/* Likes */}
        <div className="mt-[18px] flex items-center gap-[10px] text-[14px] text-texto-secundario">
          <span className="flex">
            <span className="size-6 rounded-full border-2 border-tarjeta bg-[#F8D2DE]" />
            <span className="-ml-[9px] size-6 rounded-full border-2 border-tarjeta bg-[#F7E7A6]" />
            <span className="-ml-[9px] size-6 rounded-full border-2 border-tarjeta bg-[#CFEBD8]" />
          </span>
          A {post.meEncanta} personas les gusta
        </div>

        {/* Botones de acción */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => toggleMeEncanta(post.id)}
            className="flex flex-1 items-center justify-center gap-[9px] rounded-[14px] border-[1.5px] border-[#F2A78E] bg-chip-foto py-[13px] text-[15px] font-extrabold text-coral-fuerte"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="#D9583C"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            Me encanta
          </button>
          <div className="flex flex-1 items-center justify-center gap-[9px] rounded-[14px] border-[1.5px] border-borde bg-tarjeta py-[13px] text-[15px] font-extrabold text-texto-inactivo">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
            </svg>
            Comentar
          </div>
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="my-6 text-[12.5px] font-extrabold tracking-[0.8px] text-texto-etiqueta">
        COMENTARIOS · {post.comentarios.length}
      </div>

      <div className="mb-[18px] flex flex-col gap-[14px]">
        {post.comentarios.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <div
              className="flex size-[38px] shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold text-white"
              style={{ backgroundColor: c.avatarColor }}
            >
              {c.avatarLetter}
            </div>
            <div className="flex-1 rounded-[14px] border border-borde bg-tarjeta px-[15px] py-3">
              <div className="mb-[3px] flex items-baseline gap-2">
                <span className="text-[14px] font-extrabold text-texto">{c.autor}</span>
                <span className="text-[12px] text-texto-nota">· {c.rol}</span>
                <span className="flex-1" />
                <span className="text-[12px] text-texto-nota">{c.hora}</span>
              </div>
              <div className="text-[14.5px] leading-[1.45] text-texto-cuerpo">{c.texto}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input sticky para nuevo comentario */}
      <div className="sticky bottom-0 flex items-center gap-3 bg-fondo py-2">
        <div
          className="flex size-[38px] shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold text-white"
          style={{ backgroundColor: usuarioFamilia.avatarColor }}
        >
          {usuarioFamilia.avatarLetter}
        </div>
        <input
          type="text"
          value={comentarioText}
          onChange={(e) => setComentarioText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAgregarComentario();
            }
          }}
          placeholder="Escribí un comentario…"
          className="flex-1 rounded-[14px] border-[1.5px] border-borde bg-white px-4 py-[13px] text-[15px] text-texto placeholder:text-[#B6A99B]"
        />
        <button
          onClick={handleAgregarComentario}
          className="flex size-[46px] shrink-0 items-center justify-center rounded-[14px] border-none bg-gradient-to-b from-coral-degradado-inicio to-coral-degradado-fin text-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
