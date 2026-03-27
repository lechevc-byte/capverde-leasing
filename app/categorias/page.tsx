import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import ProductCard from '@/components/products/ProductCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Truck, Monitor, Smartphone, Armchair, UtensilsCrossed, ArrowRight, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import type { Produit } from '@/types';

export const metadata: Metadata = {
  title: 'Soluções de financiamento — CapVerde Leasing',
  description: 'Financiamos todo o tipo de equipamento profissional em Cabo Verde. Descubra as nossas soluções.',
};

const iconMap: Record<string, LucideIcon> = {
  vehicules: Truck,
  informatique: Monitor,
  telephonie: Smartphone,
  mobilier: Armchair,
  chr: UtensilsCrossed,
};

interface CategoryWithProducts {
  id: string;
  slug: string;
  nom: string;
  description: string | null;
  produits: Produit[];
}

export default async function CategoriesPage() {
  const categoriesWithProducts: CategoryWithProducts[] = [];

  try {
    const supabase = createClient();
    const { data: cats } = await supabase
      .from('categories')
      .select('id, slug, nom, description')
      .eq('actif', true)
      .order('ordre');

    if (cats) {
      for (const cat of cats) {
        const { data: prods } = await supabase
          .from('produits')
          .select('*, categories(*)')
          .eq('categorie_id', cat.id)
          .eq('actif', true)
          .order('en_vedette', { ascending: false })
          .limit(3);

        categoriesWithProducts.push({
          ...cat,
          produits: (prods || []) as Produit[],
        });
      }
    }
  } catch {
    // Supabase not configured
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb items={[{ label: 'Soluções' }]} />

      <h1 className="font-sora text-3xl sm:text-4xl font-bold text-navy mt-6 mb-3">
        Soluções de financiamento
      </h1>
      <p className="text-gray-text text-lg mb-2 max-w-2xl">
        Financiamos qualquer equipamento profissional. Os produtos abaixo são exemplos — contacte-nos para um orçamento à medida.
      </p>
      <div className="mb-12">
        <Badge variant="info">B2B &middot; B2G &middot; Profissões liberais</Badge>
      </div>

      <div className="space-y-16">
        {categoriesWithProducts.map((cat) => {
          const Icon = iconMap[cat.slug] || Monitor;
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-ocean/10 rounded-xl flex items-center justify-center">
                  <Icon size={22} className="text-ocean" />
                </div>
                <h2 className="font-sora text-2xl font-bold text-navy">{cat.nom}</h2>
              </div>
              {cat.description && (
                <p className="text-gray-text mb-6">{cat.description}</p>
              )}

              {cat.produits.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.produits.map((produit) => (
                    <ProductCard key={produit.id} produit={produit} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-text text-sm">Contacte-nos para exemplos nesta categoria.</p>
              )}
            </section>
          );
        })}
      </div>

      {/* CTA bottom */}
      <div className="mt-16 bg-navy rounded-2xl p-8 sm:p-10 text-center">
        <h2 className="font-sora text-xl sm:text-2xl font-bold text-white mb-3">
          Não encontra o que procura?
        </h2>
        <p className="text-white/60 mb-6 max-w-md mx-auto">
          Estes são apenas exemplos. Financiamos qualquer equipamento profissional sob orçamento.
        </p>
        <Link href="/pedido">
          <Button variant="gold" size="lg">
            Pedir financiamento à medida
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
