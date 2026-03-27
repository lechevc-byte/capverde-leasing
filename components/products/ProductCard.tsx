import Link from 'next/link';
import Card from '@/components/ui/Card';
import MonthlyPaymentBadge from '@/components/leasing/MonthlyPaymentBadge';
import Badge from '@/components/ui/Badge';
import ProductImage from '@/components/products/ProductImage';
import { formatEuro } from '@/lib/utils';
import type { Produit } from '@/types';

interface ProductCardProps {
  produit: Produit;
}

export default function ProductCard({ produit }: ProductCardProps) {
  return (
    <Link href={`/produto/${produit.slug}`}>
      <Card hover>
        <div className="relative h-48 bg-gradient-to-br from-light to-gray-100 flex items-center justify-center overflow-hidden">
          <ProductImage
            src={produit.images?.[0]}
            alt={produit.nom}
          />
          <div className="absolute top-3 right-3">
            <MonthlyPaymentBadge prixAchat={produit.prix_achat} valeurResiduellePct={produit.valeur_residuelle_pct} />
          </div>
          {produit.en_vedette && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold">Destaque</Badge>
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          {produit.marque && (
            <p className="text-xs font-medium text-ocean uppercase tracking-wider">{produit.marque}</p>
          )}
          <h3 className="font-sora font-semibold text-navy line-clamp-2">{produit.nom}</h3>
          {produit.description_courte && (
            <p className="text-sm text-gray-text line-clamp-2">{produit.description_courte}</p>
          )}
          <p className="text-xs text-gray-text">Valor: {formatEuro(produit.prix_achat)}</p>
        </div>
      </Card>
    </Link>
  );
}
