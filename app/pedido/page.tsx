import { Suspense } from 'react';
import DemandForm from '@/components/forms/DemandForm';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedido de financiamento — CapVerde Leasing',
  description: 'Descreva o seu projeto. Estudamos o seu dossier e voltamos com uma proposta em 48h.',
};

export default function DemandePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb items={[{ label: 'Pedido de financiamento' }]} />

      <h1 className="font-sora text-3xl font-bold text-navy mt-6 mb-2">
        Pedido de financiamento
      </h1>
      <p className="text-gray-text mb-8">
        Descreva o seu projeto. Estudamos o seu dossier e voltamos em 48h com uma proposta.
      </p>

      <Suspense fallback={<div className="text-gray-text">A carregar...</div>}>
        <DemandForm />
      </Suspense>
    </div>
  );
}
