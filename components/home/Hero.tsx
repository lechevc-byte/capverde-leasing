import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, Calculator } from 'lucide-react';

const stats = [
  { value: '18 M\u20AC', label: 'de marché' },
  { value: '5', label: 'catégories' },
  { value: '100%', label: 'déductible' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlay : opaque navy left, transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00264D] from-40% via-[#00264D]/75 via-60% to-[#00264D]/20" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00264D] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Équipez votre entreprise.{' '}
            <span className="text-gold">Payez chaque mois.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            La première marketplace de leasing au Cap-Vert. Véhicules, IT, CHR, mobilier, téléphonie.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/categories">
              <Button size="lg" variant="gold">
                Découvrir les équipements
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/simulateur">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Calculator size={20} />
                Simuler mon loyer
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8 sm:gap-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-sora text-2xl sm:text-3xl font-bold text-gold">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
