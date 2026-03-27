import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import { Truck, Monitor, Smartphone, Armchair, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import type { Category } from '@/types';

export const metadata: Metadata = {
  title: 'Categorias — CapVerde Leasing',
  description: 'Explore as nossas 5 categorias de equipamentos profissionais disponíveis em leasing em Cabo Verde.',
};

const iconMap: Record<string, LucideIcon> = {
  vehicules: Truck,
  informatique: Monitor,
  telephonie: Smartphone,
  mobilier: Armchair,
  chr: UtensilsCrossed,
};

export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('actif', true)
      .order('ordre');
    if (data) categories = data;
  } catch {
    // Supabase not configured
  }

  if (categories.length === 0) {
    categories = [
      { id: '1', slug: 'vehicules', nom: 'Veículos', nom_pt: null, description: 'Carros de empresa, pick-ups, minibus, utilitários', icone: null, image_url: null, commission_min: 5, commission_max: 6, ordre: 1, actif: true, created_at: '' },
      { id: '2', slug: 'informatique', nom: 'Informática', nom_pt: null, description: 'PC, servidores, NAS, switches, hotspots Wi-Fi', icone: null, image_url: null, commission_min: 6, commission_max: 7, ordre: 2, actif: true, created_at: '' },
      { id: '3', slug: 'telephonie', nom: 'Telefonia', nom_pt: null, description: 'Smartphones, IPBX, tablets, terminais de pagamento', icone: null, image_url: null, commission_min: 6, commission_max: 8, ordre: 3, actif: true, created_at: '' },
      { id: '4', slug: 'mobilier', nom: 'Mobiliário', nom_pt: null, description: 'Mobiliário escritório, hoteleiro, restaurante, open-space', icone: null, image_url: null, commission_min: 5, commission_max: 7, ordre: 4, actif: true, created_at: '' },
      { id: '5', slug: 'chr', nom: 'Equipamento CHR', nom_pt: null, description: 'Fornos pro, refrigeração, máquinas café, exaustores', icone: null, image_url: null, commission_min: 6, commission_max: 8, ordre: 5, actif: true, created_at: '' },
    ];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb items={[{ label: 'Categorias' }]} />

      <h1 className="font-sora text-3xl sm:text-4xl font-bold text-navy mt-6 mb-8">
        Todas as categorias
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = iconMap[cat.slug] || Monitor;
          return (
            <Link key={cat.id} href={`/categoria/${cat.slug}`}>
              <Card hover className="p-8 h-full">
                <div className="w-16 h-16 mb-4 bg-ocean/10 rounded-2xl flex items-center justify-center">
                  <Icon size={32} className="text-ocean" />
                </div>
                <h2 className="font-sora text-xl font-bold text-navy mb-2">{cat.nom}</h2>
                <p className="text-sm text-gray-text mb-4">{cat.description}</p>
                <span className="text-sm font-medium text-ocean">
                  Ver produtos &rarr;
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
