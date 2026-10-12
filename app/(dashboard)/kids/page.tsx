import SearchBar from "@/components/SearchBar";
import KidCard from "@/components/KidCard";
import { mockKids } from "@/lib/mocks";

export default function KidsPage() {
  return (
    <div className="mx-auto w-full max-w-[880px] px-5 pb-20 pt-6 lg:px-10 lg:pt-[34px]">
      <div className="flex items-end justify-between gap-4 mb-[22px]">
        <div>
          <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-coral-fuerte mb-1">
            GESTIÓN
          </div>
          <h1 className="font-display font-semibold text-[30px] m-0 text-texto">
            Niños
          </h1>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 px-[18px] py-3 rounded-[14px] bg-gradient-to-b from-coral-degradado-inicio to-coral-degradado-fin text-white font-extrabold text-[14.5px] shadow-boton-coral"
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
          Agregar niño
        </a>
      </div>

      <SearchBar />

      <div className="flex items-center gap-3 mb-[14px] mt-[22px]">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-texto">
          SALA SOLES
        </span>
        <span className="text-[13px] text-texto-nota">
          {mockKids.length} niños
        </span>
        <span className="flex-1 h-px bg-linea" />
      </div>

      <div className="grid grid-cols-2 gap-[14px]">
        {mockKids.map((kid) => (
          <KidCard key={kid.id} kid={kid} />
        ))}
      </div>
    </div>
  );
}
