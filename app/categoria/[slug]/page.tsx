import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';
import { ArrowRight, Info } from 'lucide-react';
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
    title: `${nom} — Financiamento | CapVerde Leasing`,
    description: `Exemplos de ${nom.toLowerCase()} que financiamos em leasing operacional em Cabo Verde.`,
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
          { label: 'Soluções', href: '/categorias' },
          { label: category.nom },
        ]}
      />

      <div className="mt-6 mb-6">
        <h1 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
          {category.nom}
        </h1>
        {category.description && (
          <p className="mt-2 text-gray-text text-lg">{category.description}</p>
        )}
      </div>

      {/* Bandeau indicatif */}
      <div className="bg-ocean/5 border border-ocean/20 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info size={20} className="text-ocean shrink-0 mt-0.5" />
        <p className="text-sm text-navy">
          Estes equipamentos são apresentados a título indicativo. Financiamos todo o tipo de material profissional sob orçamento.
        </p>
      </div>

      <ProductGrid produits={produits} />

      {/* CTA bottom */}
      <div className="mt-12 bg-navy rounded-2xl p-8 sm:p-10 text-center">
        <h2 className="font-sora text-xl sm:text-2xl font-bold text-white mb-3">
          Não encontra o que procura?
        </h2>
        <p className="text-white/60 mb-6 max-w-md mx-auto">
          Descreva a sua necessidade — estudamos qualquer pedido de financiamento.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pedido">
            <Button variant="gold" size="lg">
              Pedir financiamento
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/contacto">
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              Contactar-nos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
