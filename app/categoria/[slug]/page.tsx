import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
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

      {/* Banner top */}
      <div className="mt-6 mb-8 bg-navy rounded-2xl border border-gold/30 p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <p className="text-white font-semibold">
            Não encontra o equipamento exato que precisa?
          </p>
          <p className="text-white/60 text-sm mt-1">
            Nós encontramos por si — junto dos nossos fornecedores parceiros.
          </p>
        </div>
        <Link href="/contacto" className="shrink-0">
          <Button variant="gold" size="sm">
            Descrever o meu projeto
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
          {category.nom}
        </h1>
        <p className="mt-2 text-gray-text text-lg">
          Exemplos de equipamentos que financiamos nesta categoria. Financiamos também qualquer outro equipamento similar — diga-nos o que precisa.
        </p>
      </div>

      <ProductGrid produits={produits} />

      {/* CTA bottom */}
      <div className="mt-12 bg-navy rounded-2xl p-8 sm:p-10 text-center">
        <h2 className="font-sora text-xl sm:text-2xl font-bold text-white mb-3">
          Precisa de outro modelo ou especificação?
        </h2>
        <p className="text-white/60 mb-6 max-w-md mx-auto">
          Descreva-nos o seu projeto — encontramos o produto e o financiamento para si em 48h.
        </p>
        <Link href="/contacto">
          <Button variant="gold" size="lg">
            Fazer um pedido à medida
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
