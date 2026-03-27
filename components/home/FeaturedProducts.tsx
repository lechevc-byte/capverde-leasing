import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import Card from '@/components/ui/Card';
import { ArrowRight, MessageSquare } from 'lucide-react';
import type { Produit } from '@/types';

interface FeaturedProductsProps {
  produits: Produit[];
}

export default function FeaturedProducts({ produits }: FeaturedProductsProps) {
  if (produits.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
            Exemplos de equipamentos financiados
          </h2>
          <p className="mt-2 text-gray-text">
            A título indicativo — financiamos muito mais
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.slice(0, 5).map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}

          {/* CTA card */}
          <Link href="/pedido">
            <Card hover className="h-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-ocean/30 bg-ocean/5">
              <div className="w-14 h-14 mb-4 bg-ocean/10 rounded-xl flex items-center justify-center">
                <MessageSquare size={28} className="text-ocean" />
              </div>
              <h3 className="font-sora font-semibold text-navy mb-2">
                O seu equipamento não está aqui?
              </h3>
              <p className="text-sm text-gray-text mb-4">
                Financiamos tudo. Peça um orçamento à medida.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-ocean">
                Pedir financiamento <ArrowRight size={16} />
              </span>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
