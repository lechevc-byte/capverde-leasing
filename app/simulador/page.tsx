'use client';

import { useState, useMemo } from 'react';
import { calculerLeasing } from '@/lib/leasing/calculator';
import { formatEuro } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

const DUREES = [24, 36, 48, 60];

export default function SimulateurPage() {
  const [prix, setPrix] = useState<string>('20000');
  const [duree, setDuree] = useState(36);

  const prixNum = Number(prix) || 0;

  const result = useMemo(
    () =>
      prixNum > 0
        ? calculerLeasing({ prixBien: prixNum, dureeMois: duree, valeurResiduellePct: 5 })
        : null,
    [prixNum, duree]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb items={[{ label: 'Simulador de renda' }]} />

      <h1 className="font-sora text-3xl sm:text-4xl font-bold text-navy mt-6 mb-2">
        Simulador de renda
      </h1>
      <p className="text-gray-text mb-8">
        Calcule a sua renda mensal em poucos segundos.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        {/* Prix input */}
        <div>
          <label htmlFor="prix" className="block text-sm font-medium text-navy mb-2">
            Preço do bem (EUR)
          </label>
          <input
            id="prix"
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            min={0}
            step={1000}
            placeholder="Ex: 20000"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-lg font-semibold focus:border-ocean focus:ring-1 focus:ring-ocean"
          />
        </div>

        {/* Durée selector */}
        <div>
          <label className="block text-sm font-medium text-navy mb-3">Duração do leasing</label>
          <div className="grid grid-cols-4 gap-2">
            {DUREES.map((d) => (
              <button
                key={d}
                onClick={() => setDuree(d)}
                className={cn(
                  'py-3 rounded-lg text-sm font-semibold transition-all',
                  d === duree
                    ? 'bg-ocean text-white shadow-md'
                    : 'bg-light text-navy hover:bg-ocean/10'
                )}
              >
                {d} meses
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {result && prixNum > 0 && (
          <>
            <div className="bg-navy rounded-xl p-6 text-center">
              <p className="text-sm text-white/60 mb-1">A sua renda mensal estimada</p>
              <p className="text-4xl font-sora font-bold text-gold transition-all duration-300">
                {formatEuro(result.loyerMensuel)}
                <span className="text-lg text-white/60 font-normal">/mês</span>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-text">Valor residual (5%)</span>
                <span className="font-semibold text-navy">{formatEuro(result.valeurResiduelle)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-text">Total em {duree} meses</span>
                <span className="font-semibold text-navy">{formatEuro(result.loyerTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-text">Custo do financiamento</span>
                <span className="font-semibold text-navy">{formatEuro(result.coutFinancement)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
                <span className="text-green font-medium flex items-center gap-1">
                  <Shield size={14} />
                  Poupança IS estimada (28%)
                </span>
                <span className="font-bold text-green">{formatEuro(result.economieImpot)}</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Badge variant="info">Rendas 100% dedutíveis fiscalmente</Badge>
            </div>

            <Link href={`/pedido?duree=${duree}`} className="block">
              <Button className="w-full" size="lg">
                Quero este financiamento
                <ArrowRight size={18} />
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
