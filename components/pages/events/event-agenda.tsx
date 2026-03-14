interface AgendaItem {
  time: string;
  label: string;
}

export function EventAgenda({ agenda }: { agenda: AgendaItem[] }) {
  return (
    <div className="space-y-6">
      <h2 className="type-heading-2 text-foreground">Agenda</h2>
      <div className="space-y-0 divide-y divide-border">
        {agenda.map((item, i) => (
          <div key={i} className="flex items-center gap-6 py-4">
            <span className="type-monospaced text-muted-foreground w-14 shrink-0">
              {item.time}
            </span>
            <span className="type-paragraph-medium text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
