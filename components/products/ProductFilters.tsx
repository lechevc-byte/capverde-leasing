'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ProductFiltersProps {
  marques: string[];
  onFilterChange: (filters: { marque?: string; prixMax?: number }) => void;
}

export default function ProductFilters({ marques, onFilterChange }: ProductFiltersProps) {
  const [marque, setMarque] = useState<string>('');
  const [prixMax, setPrixMax] = useState<string>('');
  const [open, setOpen] = useState(false);

  const applyFilters = () => {
    onFilterChange({
      marque: marque || undefined,
      prixMax: prixMax ? Number(prixMax) : undefined,
    });
  };

  const reset = () => {
    setMarque('');
    setPrixMax('');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <button
        className="flex items-center gap-2 font-semibold text-navy w-full md:cursor-default"
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal size={18} />
        Filtros
      </button>

      <div className={`mt-4 space-y-4 ${open ? 'block' : 'hidden md:block'}`}>
        <div>
          <label htmlFor="filter-marque" className="block text-sm font-medium text-navy mb-1">
            Marca
          </label>
          <select
            id="filter-marque"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean"
          >
            <option value="">Todas</option>
            {marques.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-prix" className="block text-sm font-medium text-navy mb-1">
            Preço máx. (EUR)
          </label>
          <input
            id="filter-prix"
            type="number"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
            placeholder="Ex: 30000"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean"
          />
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={applyFilters} className="flex-1">
            Aplicar
          </Button>
          <Button size="sm" variant="ghost" onClick={reset}>
            <X size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
