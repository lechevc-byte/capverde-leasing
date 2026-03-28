import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const categories = [
  { name: 'Veículos', href: '/categoria/vehicules' },
  { name: 'Informática', href: '/categoria/informatique' },
  { name: 'Telefonia', href: '/categoria/telephonie' },
  { name: 'Mobiliário', href: '/categoria/mobilier' },
  { name: 'Equipamento CHR', href: '/categoria/chr' },
];

const links = [
  { name: 'Simulador de renda', href: '/simulador' },
  { name: 'Pedir proposta', href: '/pedido' },
  { name: 'O meu espaço', href: '/painel' },
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
                CaboVerde <span className="text-gold">Leasing</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Vendemos equipamentos profissionais em leasing em Cabo Verde. Sem entrada, pague mensalmente.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-sora font-semibold mb-4">Categorias</h3>
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

          {/* Links */}
          <div>
            <h3 className="font-sora font-semibold mb-4">Links úteis</h3>
            <ul className="space-y-2">
              {links.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {lien.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-sora font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} className="text-gold shrink-0" />
                Praia, Santiago, Cabo Verde
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
          &copy; {new Date().getFullYear()} CaboVerde Leasing. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
