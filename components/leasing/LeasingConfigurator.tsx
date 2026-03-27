'use client';

import { useState, useMemo } from 'react';
import { calculerLeasing } from '@/lib/leasing/calculator';
import { formatEuro } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ArrowRight, Bookmark, Shield } from 'lucide-react';
import Link from 'next/link';

interface LeasingConfiguratorProps {
  produitId: string;
  prixAchat: number;
  valeurResiduellePct: number;
  dureesDisponibles: number[];
}

const ALL_DUREES = [24, 36, 48, 60];

export default function LeasingConfigurator({
  produitId,
  prixAchat,
  valeurResiduellePct,
  dureesDisponibles,
}: LeasingConfiguratorProps) {
  const defaultDuree = dureesDisponibles.includes(36) ? 36 : dureesDisponibles[0];
  const [duree, setDuree] = useState(defaultDuree);

  const result = useMemo(
    () => calculerLeasing({ prixBien: prixAchat, dureeMois: duree, valeurResiduellePct }),
    [prixAchat, duree, valeurResiduellePct]
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-text">Valor do bem financiado</p>
        <p className="text-lg font-semibold text-navy">{formatEuro(prixAchat)}</p>
      </div>

      {/* Durée selector */}
      <div>
        <label className="block text-sm font-medium text-navy mb-3">Duração do leasing</label>
        <div className="grid grid-cols-4 gap-2">
          {ALL_DUREES.map((d) => {
            const available = dureesDisponibles.includes(d);
            return (
              <button
                key={d}
                onClick={() => available && setDuree(d)}
                disabled={!available}
                className={cn(
                  'py-3 rounded-lg text-sm font-semibold transition-all',
                  d === duree
                    ? 'bg-ocean text-white shadow-md'
                    : available
                    ? 'bg-light text-navy hover:bg-ocean/10'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                )}
              >
                {d} meses
              </button>
            );
          })}
        </div>
      </div>

      {/* Renda mensal - big display */}
      <div className="bg-navy rounded-xl p-6 text-center">
        <p className="text-sm text-white/60 mb-1">A sua renda mensal</p>
        <p className="text-4xl font-sora font-bold text-gold transition-all duration-300">
          {formatEuro(result.loyerMensuel)}
          <span className="text-lg text-white/60 font-normal">/mês</span>
        </p>
      </div>

      {/* Resumo */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-text">Renda mensal</span>
          <span className="font-semibold text-navy">{formatEuro(result.loyerMensuel)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-text">Valor residual</span>
          <span className="font-semibold text-navy">{formatEuro(result.valeurResiduelle)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-text">Total em {duree} meses</span>
          <span className="font-semibold text-navy">{formatEuro(result.loyerTotal)}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
          <span className="text-green font-medium flex items-center gap-1">
            <Shield size={14} />
            Poupança IS estimada (28%)
          </span>
          <span className="font-bold text-green">{formatEuro(result.economieImpot)}</span>
        </div>
      </div>

      {/* Badge */}
      <div className="flex justify-center">
        <Badge variant="info">Rendas 100% dedutíveis fiscalmente</Badge>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Link href={`/pedido?produit=${produitId}&duree=${duree}`} className="block">
          <Button className="w-full" size="lg">
            Fazer o meu pedido
            <ArrowRight size={18} />
          </Button>
        </Link>
        <Button variant="outline" className="w-full" size="sm">
          <Bookmark size={16} />
          Guardar a simulação
        </Button>
      </div>
    </div>
  );
}
