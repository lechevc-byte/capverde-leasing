import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import Card from '@/components/ui/Card';
import { ArrowRight, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
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
            Exemplos de equipamentos disponíveis
          </h2>
          <p className="mt-2 text-gray-text max-w-xl mx-auto">
            A título indicativo — vendemos qualquer equipamento profissional em leasing, mesmo que não esteja aqui.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.slice(0, 5).map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}

          {/* CTA card */}
          <Link href="/contacto">
            <Card hover className="h-full flex flex-col items-center justify-center p-8 text-center bg-navy border-2 border-gold/30">
              <div className="w-14 h-14 mb-4 bg-gold/20 rounded-xl flex items-center justify-center">
                <Plus size={28} className="text-gold" />
              </div>
              <h3 className="font-sora font-semibold text-white mb-2">
                O seu equipamento não está aqui?
              </h3>
              <p className="text-sm text-white/60 mb-4">
                Diz-nos o que precisas — encontramos e entregamos.
              </p>
              <Button variant="gold" size="sm">
                Pedir equipamento à medida
                <ArrowRight size={16} />
              </Button>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
