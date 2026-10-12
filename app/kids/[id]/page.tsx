import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AlertBox from "@/components/AlertBox";
import InfoTable from "@/components/InfoTable";
import ParentCard from "@/components/ParentCard";
import { mockKids } from "@/lib/mocks";
import Link from "next/link";

export const instant = false;

type KidProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function KidProfilePage({ params }: KidProfilePageProps) {
  const { id } = await params;
  const kid = mockKids.find((k) => k.id === id);

  if (!kid) {
    notFound();
  }

  const infoRows = [
    { label: "Fecha de nacimiento", value: kid.birthDate },
    { label: "Sala", value: kid.room },
    { label: "Ingreso", value: kid.enrollmentDate },
  ];

  const contrastColor = getContrastColor(kid.avatarColor);

  return (
    <div className="flex min-h-screen bg-fondo">
      <Sidebar />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[820px] w-full mx-auto py-[34px] px-10 pb-20">
          <Link
            href="/kids"
            className="flex items-center gap-[7px] text-texto-secundario font-bold text-[14px] mb-5"
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
            Volver a Niños
          </Link>

          <div className="flex gap-[26px] items-start flex-wrap">
            <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
              <div className="flex items-center gap-[18px]">
                <div
                  className="w-[84px] h-[84px] rounded-full font-display font-semibold text-[34px] flex items-center justify-center flex-none"
                  style={{ background: kid.avatarColor, color: contrastColor }}
                >
                  {kid.avatarLetter}
                </div>
                <div className="flex-1">
                  <h1 className="font-display font-semibold text-[28px] m-0 text-texto">
                    {kid.name}
                  </h1>
                  <p className="m-[3px]_0_0 text-texto-secundario text-[15px]">
                    {kid.age} años · Sala {kid.room}
                  </p>
                </div>
                <a
                  href="#"
                  className="border-[1.5px]_border-borde bg-tarjeta text-texto-inactivo font-bold text-[14px] px-4 py-[9px] rounded-xl"
                >
                  Editar
                </a>
              </div>

              {kid.allergies && <AlertBox message={kid.allergies} />}

              <InfoTable rows={infoRows} />
            </div>

            <div className="w-[300px] flex-none flex flex-col gap-[14px]">
              <a
                href="#"
                className="flex items-center justify-center gap-[9px] w-full p-[13px] rounded-[14px] bg-texto text-white font-extrabold text-[15px]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
                Resumen del día
              </a>

              <div className="bg-tarjeta border border-borde rounded-2xl px-[18px] py-4">
                <div className="text-[12.5px] font-extrabold tracking-[0.8px] text-texto-etiqueta mb-[14px]">
                  PADRES VINCULADOS
                </div>
                <div className="flex flex-col gap-[14px]">
                  {kid.parents.map((parent) => (
                    <ParentCard key={parent.id} parent={parent} />
                  ))}
                  <a
                    href="#"
                    className="flex items-center gap-3 pt-2"
                  >
                    <span className="w-10 h-10 rounded-full border-[1.5px] border-dashed border-[#D8CBBA] flex items-center justify-center text-[#B0A290] flex-none">
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
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <span className="font-extrabold text-[14.5px] text-coral-oscuro">
                      Vincular otro padre
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getContrastColor(hex: string): string {
  const colorMap: Record<string, string> = {
    "#A9D9E8": "#1F7A93",
    "#F4B8CC": "#C44A7A",
    "#B9DEC4": "#3E8B62",
    "#F4DC8E": "#9A7B1E",
    "#C9B6E8": "#7B5FC0",
    "#A9C7E8": "#2E6DA6",
  };
  return colorMap[hex] ?? "#3F362E";
}
