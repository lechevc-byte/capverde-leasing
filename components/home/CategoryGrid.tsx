import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Truck, Monitor, Smartphone, Armchair, UtensilsCrossed } from 'lucide-react';

const categories = [
  {
    slug: 'vehicules',
    nom: 'Veículos',
    description: 'Carros, pick-ups, minibus, utilitários',
    icon: Truck,
  },
  {
    slug: 'informatique',
    nom: 'Informática',
    description: 'PC, servidores, NAS, switches, Wi-Fi',
    icon: Monitor,
  },
  {
    slug: 'telephonie',
    nom: 'Telefonia',
    description: 'Smartphones, IPBX, tablets, TPE',
    icon: Smartphone,
  },
  {
    slug: 'mobilier',
    nom: 'Mobiliário',
    description: 'Escritório, hoteleiro, restaurante, open-space',
    icon: Armchair,
  },
  {
    slug: 'chr',
    nom: 'Equipamento CHR',
    description: 'Fornos pro, refrigeração, máquinas café',
    icon: UtensilsCrossed,
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
            O que vendemos
          </h2>
          <p className="mt-3 text-gray-text max-w-2xl mx-auto">
            Vendemos qualquer equipamento profissional em leasing — nestas categorias e muito mais.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categoria/${cat.slug}`}>
              <Card hover className="p-6 text-center h-full">
                <div className="w-14 h-14 mx-auto mb-4 bg-ocean/10 rounded-xl flex items-center justify-center">
                  <cat.icon size={28} className="text-ocean" />
                </div>
                <h3 className="font-sora font-semibold text-navy mb-1">{cat.nom}</h3>
                <p className="text-xs text-gray-text line-clamp-2">{cat.description}</p>
                <p className="mt-3 text-xs font-medium text-ocean">Ver exemplos &rarr;</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
