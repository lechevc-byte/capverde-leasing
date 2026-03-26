import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import type { Produit } from '@/types';

interface FeaturedProductsProps {
  produits: Produit[];
}

export default function FeaturedProducts({ produits }: FeaturedProductsProps) {
  if (produits.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
              Produits en vedette
            </h2>
            <p className="mt-2 text-gray-text">Les équipements les plus demandés</p>
          </div>
          <Link href="/categories" className="hidden sm:block">
            <Button variant="outline" size="sm">
              Tout voir
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.slice(0, 6).map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/categories">
            <Button variant="outline">
              Voir tous les équipements
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
