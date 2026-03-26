import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Truck, Monitor, Smartphone, Armchair, UtensilsCrossed } from 'lucide-react';

const categories = [
  {
    slug: 'vehicules',
    nom: 'Véhicules',
    description: 'Voitures, pick-ups, minibus, utilitaires',
    icon: Truck,
  },
  {
    slug: 'informatique',
    nom: 'Informatique',
    description: 'PC, serveurs, NAS, switches, Wi-Fi',
    icon: Monitor,
  },
  {
    slug: 'telephonie',
    nom: 'Téléphonie',
    description: 'Smartphones, IPBX, tablettes, TPE',
    icon: Smartphone,
  },
  {
    slug: 'mobilier',
    nom: 'Mobilier',
    description: 'Bureau, hôtelier, restaurant, open-space',
    icon: Armchair,
  },
  {
    slug: 'chr',
    nom: 'Matériel CHR',
    description: 'Fours pro, réfrigération, machines café',
    icon: UtensilsCrossed,
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
            Nos catégories d&apos;équipements
          </h2>
          <p className="mt-3 text-gray-text max-w-xl mx-auto">
            Trouvez l&apos;équipement professionnel adapté à votre activité
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categorie/${cat.slug}`}>
              <Card hover className="p-6 text-center h-full">
                <div className="w-14 h-14 mx-auto mb-4 bg-ocean/10 rounded-xl flex items-center justify-center">
                  <cat.icon size={28} className="text-ocean" />
                </div>
                <h3 className="font-sora font-semibold text-navy mb-1">{cat.nom}</h3>
                <p className="text-xs text-gray-text line-clamp-2">{cat.description}</p>
                <p className="mt-3 text-xs font-medium text-ocean">Voir les produits &rarr;</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
