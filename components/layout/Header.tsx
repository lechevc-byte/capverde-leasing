'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Calculator } from 'lucide-react';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

const navigation = [
  { name: 'Categorias', href: '/categorias' },
  { name: 'Contacto', href: '/contacto' },
];

interface HeaderProps {
  user?: { prenom: string; nom: string } | null;
}

export default function Header({ user }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <span className="font-sora font-bold text-navy text-sm">CV</span>
            </div>
            <span className="font-sora font-bold text-lg hidden sm:block">
              CapVerde <span className="text-gold">Leasing</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/simulador">
              <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-white">
                <Calculator size={16} />
                Simular
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="primary" size="sm">
                Orçamento personalizado
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} user={user} />
    </header>
  );
}
