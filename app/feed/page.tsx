import Sidebar from "@/components/Sidebar";

export default function FeedPage() {
  return (
    <div className="flex min-h-screen bg-fondo">
      <Sidebar />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[880px] w-full mx-auto py-[34px] px-10 pb-20">
          <div className="mb-[22px]">
            <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-coral-fuerte mb-1">
              FEED
            </div>
            <h1 className="font-display font-semibold text-[30px] m-0 text-texto">
              Publicaciones
            </h1>
          </div>

          <div className="bg-tarjeta border border-borde rounded-2xl p-8 text-center">
            <p className="text-texto-nota text-[15px]">
              Próximamente: Publicaciones y actividades de la sala
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
