const dateFormatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" });

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(date.getTime()) ? isoDate : dateFormatter.format(date);
}
