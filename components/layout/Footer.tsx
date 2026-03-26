import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const categories = [
  { name: 'Véhicules', href: '/categorie/vehicules' },
  { name: 'Informatique', href: '/categorie/informatique' },
  { name: 'Téléphonie', href: '/categorie/telephonie' },
  { name: 'Mobilier', href: '/categorie/mobilier' },
  { name: 'Matériel CHR', href: '/categorie/chr' },
];

const liens = [
  { name: 'Simulateur de loyer', href: '/simulateur' },
  { name: 'Faire une demande', href: '/demande' },
  { name: 'Mon espace', href: '/dashboard' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <span className="font-sora font-bold text-navy text-sm">CV</span>
              </div>
              <span className="font-sora font-bold text-lg">
                CapVerde <span className="text-gold">Leasing</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              La première marketplace de leasing opérationnel au Cap-Vert. Financez vos équipements professionnels simplement.
            </p>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="font-sora font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens */}
          <div>
            <h3 className="font-sora font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {lien.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sora font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} className="text-gold shrink-0" />
                Praia, Santiago, Cap-Vert
              </li>
              <li>
                <a href="mailto:contact@capverde-leasing.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold shrink-0" />
                  contact@capverde-leasing.com
                </a>
              </li>
              <li>
                <a href="tel:+2389001234" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
                  <Phone size={16} className="text-gold shrink-0" />
                  +238 900 1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} CapVerde Leasing. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
