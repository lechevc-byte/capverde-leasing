export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('pt-CV', {
    style: 'currency',
    currency: 'CVE',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatEuroCompact(amount: number): string {
  return new Intl.NumberFormat('pt-CV', {
    style: 'currency',
    currency: 'CVE',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
