import { Suspense } from 'react';
import DemandForm from '@/components/forms/DemandForm';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faire une demande de leasing — CapVerde Leasing',
  description: 'Soumettez votre demande de leasing en 4 étapes simples.',
};

export default function DemandePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb items={[{ label: 'Demande de leasing' }]} />

      <h1 className="font-sora text-3xl font-bold text-navy mt-6 mb-8">
        Demande de leasing
      </h1>

      <Suspense fallback={<div className="text-gray-text">Chargement...</div>}>
        <DemandForm />
      </Suspense>
    </div>
  );
}
