/**
 * Tagesaktueller Öffnungs-Status aus `site.hours`.
 * Die Zeiten stehen als Text da ("11:30 – 14:00 · 17:30 – 23:00" oder
 * "geschlossen"), damit der Betrieb sie im CMS frei anpassen kann.
 * Nur clientseitig aufrufen – im Static Export darf der Wochentag nicht
 * zur Buildzeit fixiert werden.
 */
export type HourEntry = { day: string; value: string };

function toMinutes(hhmm: string): number | null {
  const m = hhmm.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

function parseRanges(value: string): Array<[number, number]> {
  return value
    .split("·")
    .map((part) => {
      const [a, b] = part.split(/[–—-]/).map((s) => s.trim());
      const start = toMinutes(a ?? "");
      const end = toMinutes(b ?? "");
      return start != null && end != null
        ? ([start, end] as [number, number])
        : null;
    })
    .filter((r): r is [number, number] => r !== null);
}

function fmt(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export function openStateFor(
  now: Date,
  hours: HourEntry[],
): { label: string; open: boolean } {
  // JS: 0 = Sonntag … 6 = Samstag. hours[]: 0 = Montag … 6 = Sonntag.
  const idx = (now.getDay() + 6) % 7;
  const entry = hours[idx];
  if (!entry || /geschlossen/i.test(entry.value)) {
    return { label: "Heute geschlossen", open: false };
  }

  const ranges = parseRanges(entry.value);
  if (ranges.length === 0) {
    return { label: entry.value, open: false };
  }

  const cur = now.getHours() * 60 + now.getMinutes();

  for (const [start, end] of ranges) {
    if (cur >= start && cur < end) {
      return { label: `Heute geöffnet bis ${fmt(end)}`, open: true };
    }
  }

  const next = ranges.find(([start]) => start > cur);
  if (next) {
    return { label: `Heute wieder ab ${fmt(next[0])}`, open: false };
  }

  return { label: "Für heute geschlossen", open: false };
}
