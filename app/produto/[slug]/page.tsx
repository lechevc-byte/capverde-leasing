import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import LeasingConfigurator from '@/components/leasing/LeasingConfigurator';
import Badge from '@/components/ui/Badge';
import { formatEuro } from '@/lib/utils';
import ProductImage from '@/components/products/ProductImage';
import type { Metadata } from 'next';
import type { Produit } from '@/types';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('produits')
      .select('nom, description_courte')
      .eq('slug', params.slug)
      .single();

    if (data) {
      return {
        title: `${data.nom} — Leasing | CapVerde Leasing`,
        description: data.description_courte || `Alugue ${data.nom} em leasing operacional em Cabo Verde.`,
      };
    }
  } catch {
    // fallback
  }

  return {
    title: 'Produto — CapVerde Leasing',
  };
}

export default async function ProduitPage({ params }: Props) {
  let produit: Produit | null = null;

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('produits')
      .select('*, categories(*)')
      .eq('slug', params.slug)
      .eq('actif', true)
      .single();

    if (!data) return notFound();
    produit = data as Produit;
  } catch {
    return notFound();
  }

  const category = produit.categories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb
        items={[
          { label: 'Categorias', href: '/categorias' },
          ...(category
            ? [{ label: category.nom, href: `/categoria/${category.slug}` }]
            : []),
          { label: produit.nom },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-gradient-to-br from-light to-gray-100 rounded-xl h-64 sm:h-96 flex items-center justify-center overflow-hidden relative">
            <ProductImage
              src={produit.images?.[0]}
              alt={produit.nom}
              priority
              className="rounded-xl"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              {category && <Badge>{category.nom}</Badge>}
              {produit.marque && <Badge variant="info">{produit.marque}</Badge>}
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl font-bold text-navy">
              {produit.nom}
            </h1>
            {produit.modele && (
              <p className="text-gray-text mt-1">Modelo: {produit.modele}</p>
            )}
            <p className="text-sm text-gray-text mt-1">
              Valor indicativo: {formatEuro(produit.prix_achat)}
            </p>
            <div className="mt-3">
              <Badge variant="info">B2B &middot; B2G &middot; Profissões liberais</Badge>
            </div>
          </div>

          {produit.description_courte && (
            <div>
              <h2 className="font-sora text-lg font-semibold text-navy mb-3">Descrição</h2>
              <p className="text-gray-text leading-relaxed">{produit.description_courte}</p>
            </div>
          )}

          {produit.description && (
            <div>
              <p className="text-gray-text leading-relaxed">{produit.description}</p>
            </div>
          )}

          {produit.specifications && Object.keys(produit.specifications).length > 0 && (
            <div>
              <h2 className="font-sora text-lg font-semibold text-navy mb-3">
                Especificações técnicas
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {Object.entries(produit.specifications).map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex justify-between px-4 py-3 text-sm ${
                      i % 2 === 0 ? 'bg-light/50' : 'bg-white'
                    }`}
                  >
                    <span className="text-gray-text capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium text-navy">
                      {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <LeasingConfigurator
              produitId={produit.id}
              prixAchat={produit.prix_achat}
              valeurResiduellePct={produit.valeur_residuelle_pct}
              dureesDisponibles={produit.durees_disponibles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
