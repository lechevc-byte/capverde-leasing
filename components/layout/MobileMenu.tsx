'use client';

import Link from 'next/link';
import { X, Home, Grid3x3, Mail } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user?: { prenom: string; nom: string } | null;
}

const links = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'Categorias', href: '/categorias', icon: Grid3x3 },
  { name: 'Contacto', href: '/contacto', icon: Mail },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-navy shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="font-sora font-bold text-gold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
          <div className="border-t border-white/10 my-4" />
          <Link
            href="/contacto"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gold hover:bg-white/10 transition-colors font-semibold"
          >
            <Mail size={20} />
            Orçamento personalizado
          </Link>
        </nav>
      </div>
    </div>
  );
}
