import ProductCard from './ProductCard';
import Skeleton from '@/components/ui/Skeleton';
import type { Produit } from '@/types';

interface ProductGridProps {
  produits: Produit[];
  loading?: boolean;
}

export default function ProductGrid({ produits, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (produits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-text">Aucun produit trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {produits.map((produit) => (
        <ProductCard key={produit.id} produit={produit} />
      ))}
    </div>
  );
}
