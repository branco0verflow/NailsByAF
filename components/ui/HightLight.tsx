type Highlight = {
  k: string;
  v: string;
};

const items: Highlight[] = [
  { k: "Turnos coordinados", v: "Gestión ágil y confirmación clara." },
  { k: "Diseños a medida", v: "Referencia + asesoría personalizada." },
  { k: "Higiene y cuidado", v: "Protocolos y materiales de calidad." },
];

export function Highlights({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={[
        "grid grid-cols-1 gap-2",
        compact ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-1",
      ].join(" ")}
    >
      {items.map((item) => (
        <div
          key={item.k}
          className={[
            "border border-white/12 bg-white/6 backdrop-blur",
            compact
              ? "rounded-lg px-3 py-2"
              : "rounded-xl px-4 py-4",
          ].join(" ")}
        >
          <div
            className={[
              "font-semibold text-white/95",
              compact ? "text-[12px]" : "text-[14px]",
            ].join(" ")}
          >
            {item.k}
          </div>

          <div
            className={[
              "text-white/70",
              compact
                ? "mt-0.5 text-[11px] leading-snug"
                : "mt-1 text-sm leading-relaxed",
            ].join(" ")}
          >
            {item.v}
          </div>
        </div>
      ))}
    </div>
  );
}
