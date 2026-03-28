import { Suspense } from 'react';
import DemandForm from '@/components/forms/DemandForm';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedir equipamento em leasing — CapVerde Leasing',
  description: 'Diz-nos o que precisas. Apresentamos o equipamento e as condições de leasing em 48h.',
};

export default function DemandePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb items={[{ label: 'Pedir equipamento em leasing' }]} />

      <h1 className="font-sora text-3xl font-bold text-navy mt-6 mb-2">
        Pedir equipamento em leasing
      </h1>
      <p className="text-gray-text mb-8">
        Diz-nos o que precisas. Apresentamos o equipamento e as condições de leasing em 48h.
      </p>

      <Suspense fallback={<div className="text-gray-text">A carregar...</div>}>
        <DemandForm />
      </Suspense>
    </div>
  );
}
