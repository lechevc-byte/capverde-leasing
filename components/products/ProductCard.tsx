import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import MonthlyPaymentBadge from '@/components/leasing/MonthlyPaymentBadge';
import Badge from '@/components/ui/Badge';
import { formatEuro } from '@/lib/utils';
import type { Produit } from '@/types';
import { Package } from 'lucide-react';

interface ProductCardProps {
  produit: Produit;
}

export default function ProductCard({ produit }: ProductCardProps) {
  return (
    <Link href={`/produit/${produit.slug}`}>
      <Card hover>
        <div className="relative h-48 bg-gradient-to-br from-light to-gray-100 flex items-center justify-center overflow-hidden">
          {produit.images && produit.images.length > 0 ? (
            <Image
              src={produit.images[0]}
              alt={produit.nom}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Package size={48} className="text-ocean/30" />
          )}
          <div className="absolute top-3 right-3">
            <MonthlyPaymentBadge prixAchat={produit.prix_achat} valeurResiduellePct={produit.valeur_residuelle_pct} />
          </div>
          {produit.en_vedette && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold">En vedette</Badge>
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
          <p className="text-xs text-gray-text">Valeur : {formatEuro(produit.prix_achat)}</p>
        </div>
      </Card>
    </Link>
  );
}
