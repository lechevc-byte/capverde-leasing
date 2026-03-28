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
      className={`inline-flex flex-col items-center bg-gold text-white px-3 py-1.5 rounded-full text-xs font-semibold leading-tight ${className}`}
    >
      <span>{formatEuroCompact(loyer)}/mês</span>
      <span className="text-[10px] font-normal opacity-80">renda por 60 meses</span>
    </div>
  );
}
