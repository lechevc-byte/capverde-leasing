import { loyerMinimum } from '@/lib/leasing/calculator';
import { formatEuroCompact } from '@/lib/utils';

interface MonthlyPaymentBadgeProps {
  prixAchat: number;
  valeurResiduellePct?: number;
  className?: string;
}

export default function MonthlyPaymentBadge({
  prixAchat,
  valeurResiduellePct = 5,
  className = '',
}: MonthlyPaymentBadgeProps) {
  const loyer = loyerMinimum(prixAchat, valeurResiduellePct);

  return (
    <div
      className={`inline-flex items-center gap-1 bg-gold text-white px-3 py-1.5 rounded-full text-sm font-semibold ${className}`}
    >
      <span>A partir de</span>
      <span className="text-base font-bold">{formatEuroCompact(loyer)}</span>
      <span>/mês</span>
    </div>
  );
}
