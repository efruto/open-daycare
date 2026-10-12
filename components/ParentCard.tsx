import type { Parent } from "@/lib/mocks";

type ParentCardProps = {
  parent: Parent;
};

export default function ParentCard({ parent }: ParentCardProps) {
  const statusConfig = {
    ACTIVA: {
      bg: "#CFEBD8",
      text: "#3E9B6C",
      label: "activa",
    },
    PENDIENTE: {
      bg: "#F7E7A6",
      text: "#9A7B1E",
      label: "invitación enviada",
    },
    VINCULAR: {
      bg: "#FBD8CC",
      text: "#D9684A",
      label: "vincular",
    },
  };

  const status = statusConfig[parent.status];

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full text-white font-display font-semibold text-[16px] flex items-center justify-center flex-none"
        style={{ background: parent.avatarColor }}
      >
        {parent.avatarLetter}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-extrabold text-[14.5px] text-texto">
          {parent.name}
        </div>
        <div className="text-[12.5px] text-texto-nota">
          {parent.relation} · {status.label}
        </div>
      </div>
      <span
        className="flex-none text-[10.5px] font-extrabold px-[9px] py-1 rounded-full"
        style={{ background: status.bg, color: status.text }}
      >
        {parent.status}
      </span>
    </div>
  );
}
