import MobileHeader from "@/app/components/mobile-header";
import PostCard from "@/app/components/post-card";
import Sidebar from "@/app/components/sidebar";
import { feedPosts, usuarioActual } from "@/app/lib/mock-feed";

export default function Home() {
  return (
    <div className="min-h-screen bg-fondo">
      <MobileHeader />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
          <div className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-6 lg:px-10 lg:pt-[34px]">
            <div className="mb-6">
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-coral-fuerte">
                GUARDERÍA · SALA {usuarioActual.sala.toUpperCase()}
              </div>
              <h1 className="font-display text-[30px] font-semibold text-texto">
                Buenas, {usuarioActual.nombre.split(" ")[0]}
              </h1>
              <p className="mt-[5px] text-[14.5px] text-texto-secundario">
                12 niños · martes 17 jun
              </p>
            </div>

            <div className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-borde bg-tarjeta px-[18px] py-[14px] shadow-trigger">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-coral-avatar font-display text-base font-semibold text-white">
                {usuarioActual.iniciales}
              </div>
              <span className="min-w-0 flex-1 text-[15px] text-texto-nota">
                Compartí un momento…
              </span>
              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-coral-claro text-coral">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </span>
            </div>

            <div className="mb-[14px] flex items-center gap-[14px]">
              <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-texto-etiqueta">
                PUBLICADO HOY
              </span>
              <span className="h-px flex-1 bg-linea" />
            </div>

            <div className="flex flex-col gap-4">
              {feedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
