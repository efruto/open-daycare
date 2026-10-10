import type { PostMock, TipoPost } from "@/app/lib/mock-feed";

const chipPorTipo: Record<
  TipoPost,
  { etiqueta: string; fondo: string; punto: string; texto: string }
> = {
  logro: {
    etiqueta: "LOGRO",
    fondo: "bg-chip-logro",
    punto: "bg-chip-logro-texto",
    texto: "text-chip-logro-texto",
  },
  actividad: {
    etiqueta: "ACTIVIDAD",
    fondo: "bg-chip-actividad",
    punto: "bg-chip-actividad-texto",
    texto: "text-chip-actividad-texto",
  },
  anuncio: {
    etiqueta: "ANUNCIO",
    fondo: "bg-chip-anuncio",
    punto: "bg-chip-anuncio-texto",
    texto: "text-chip-anuncio-texto",
  },
};

export default function PostCard({ post }: { post: PostMock }) {
  const chip = chipPorTipo[post.tipo];

  return (
    <article className="rounded-[20px] border border-borde bg-tarjeta px-[22px] py-5 shadow-tarjeta">
      <header className="mb-[14px] flex items-center gap-3">
        {post.iniciales ? (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-avatar-celeste font-display text-[17px] font-semibold text-avatar-celeste-texto">
            {post.iniciales}
          </div>
        ) : (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-chip-anuncio text-chip-anuncio-texto">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-display text-[16.5px] font-semibold text-texto">
            {post.autor}
          </div>
          <div className="text-[12.5px] text-texto-nota">
            {post.hora} · publicado por vos
          </div>
        </div>
        <div
          className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${chip.fondo}`}
        >
          <span className={`size-2 rounded-full ${chip.punto}`} />
          <span
            className={`text-xs font-extrabold tracking-[0.5px] ${chip.texto}`}
          >
            {chip.etiqueta}
          </span>
        </div>
      </header>

      <div className="mb-2.5 text-[12.5px] text-texto-nota">
        Para: {post.destinatarios}
      </div>

      <p className="text-[15.5px] leading-[1.55] text-texto-cuerpo">
        {post.texto}
      </p>

      {post.foto && (
        <div className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-foto-marco bg-foto-fondo text-foto-icono">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
          </svg>
          <span className="text-[13.5px]">{post.foto.etiqueta}</span>
        </div>
      )}

      <footer className="mt-4 flex items-center gap-[18px] border-t border-borde-suave pt-[14px]">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-coral">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {post.corazones}
        </span>
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-texto-secundario">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
          </svg>
          {post.comentarios}
        </span>
        <span className="flex-1" />
        <span className="text-[14px] font-extrabold text-coral-oscuro">
          Editar
        </span>
      </footer>
    </article>
  );
}
