export default function FeedPage() {
  return (
    <div className="mx-auto w-full max-w-[880px] px-5 pb-20 pt-6 lg:px-10 lg:pt-[34px]">
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
  );
}
