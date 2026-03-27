import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import ProductGrid from '@/components/products/ProductGrid';
import type { Metadata } from 'next';
import type { Category, Produit } from '@/types';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryNames: Record<string, string> = {
    vehicules: 'Veículos',
    informatique: 'Informática',
    telephonie: 'Telefonia',
    mobilier: 'Mobiliário',
    chr: 'Equipamento CHR',
  };

  const nom = categoryNames[params.slug] || params.slug;

  return {
    title: `${nom} em leasing — CapVerde Leasing`,
    description: `Descubra os nossos ${nom.toLowerCase()} disponíveis em leasing operacional em Cabo Verde.`,
  };
}

export default async function CategoriePage({ params }: Props) {
  let category: Category | null = null;
  let produits: Produit[] = [];

  try {
    const supabase = createClient();

    const { data: catData } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', params.slug)
      .eq('actif', true)
      .single();

    if (!catData) return notFound();
    category = catData;

    const { data: prodData } = await supabase
      .from('produits')
      .select('*, categories(*)')
      .eq('categorie_id', category!.id)
      .eq('actif', true)
      .order('en_vedette', { ascending: false });

    if (prodData) produits = prodData as Produit[];
  } catch {
    const categoryNames: Record<string, string> = {
      vehicules: 'Veículos',
      informatique: 'Informática',
      telephonie: 'Telefonia',
      mobilier: 'Mobiliário',
      chr: 'Equipamento CHR',
    };

    if (!categoryNames[params.slug]) return notFound();

    category = {
      id: '0',
      slug: params.slug,
      nom: categoryNames[params.slug],
      nom_pt: null,
      description: null,
      icone: null,
      image_url: null,
      commission_min: 5,
      commission_max: 8,
      ordre: 0,
      actif: true,
      created_at: '',
    };
  }

  if (!category) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb
        items={[
          { label: 'Categorias', href: '/categorias' },
          { label: category.nom },
        ]}
      />

      <div className="mt-6 mb-8">
        <h1 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
          {category.nom}
        </h1>
        {category.description && (
          <p className="mt-2 text-gray-text text-lg">{category.description}</p>
        )}
      </div>

      <ProductGrid produits={produits} />
    </div>
  );
}
