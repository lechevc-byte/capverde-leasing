import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import type { Produit } from '@/types';

export const metadata: Metadata = {
  title: 'Os nossos equipamentos — CapVerde Leasing',
  description: 'Vendemos qualquer equipamento profissional em leasing em Cabo Verde. Veículos, informática, telefonia, mobiliário, CHR.',
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
      <CategoryBreadcrumb items={[{ label: 'Equipamentos' }]} />

      <h1 className="font-sora text-3xl sm:text-4xl font-bold text-navy mt-6 mb-3">
        Os nossos equipamentos
      </h1>
      <p className="text-gray-text text-lg mb-4 max-w-2xl">
        Vendemos qualquer equipamento profissional em leasing. Escolhe da nossa seleção ou diz-nos o que precisas — encontramos por ti.
      </p>
      <div className="mb-12">
        <Link href="/contacto">
          <Button variant="gold" size="sm">
            Pedir um equipamento à medida
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      <div className="space-y-16">
        {categoriesWithProducts.map((cat) => {
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-sora text-2xl font-bold text-navy border-l-4 border-gold pl-4">{cat.nom}</h2>
              </div>
              {cat.description && (
                <p className="text-gray-text mb-6 pl-4 ml-1">{cat.description}</p>
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

              <p className="mt-4 text-sm text-gray-text">
                Não encontras o modelo exacto? Tens outras necessidades em {cat.nom.toLowerCase()}?{' '}
                <Link href="/contacto" className="text-ocean font-medium hover:underline">
                  Fala connosco &rarr;
                </Link>
              </p>
            </section>
          );
        })}
      </div>

      {/* Bottom banner — dark navy */}
      <div className="mt-16 bg-navy rounded-2xl p-8 sm:p-10 text-center">
        <h2 className="font-sora text-xl sm:text-2xl font-bold text-white mb-3">
          Precisas de algo que não está aqui?
        </h2>
        <p className="text-white/60 mb-6 max-w-lg mx-auto">
          Trabalhamos com centenas de fornecedores. Diz-nos o que precisas — marca, modelo, quantidade — e apresentamos-te uma proposta de leasing em 48h.
        </p>
        <Link href="/contacto">
          <Button variant="gold" size="lg">
            Pedir equipamento à medida
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
