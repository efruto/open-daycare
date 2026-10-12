type InfoTableProps = {
  rows: { label: string; value: string }[];
};

export default function InfoTable({ rows }: InfoTableProps) {
  return (
    <div className="bg-tarjeta border border-borde rounded-2xl overflow-hidden">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`flex justify-between px-[18px] py-[15px] ${
            index < rows.length - 1 ? "border-b border-borde-suave" : ""
          }`}
        >
          <span className="text-texto-secundario text-[14.5px]">{row.label}</span>
          <span className="font-extrabold text-texto text-[14.5px]">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
