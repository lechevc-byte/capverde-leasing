import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, Calculator } from 'lucide-react';

const stats = [
  { value: '18 M€', label: 'de marché' },
  { value: '5', label: 'catégories' },
  { value: '100%', label: 'déductible' },
];

export default function Hero() {
  return (
    <section style={{ background: '#00264D' }} className="relative flex flex-col md:flex-row min-h-[90vh]">

      {/* LEFT : text */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20">
        <div className="max-w-xl">
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

      {/* RIGHT : image */}
      <div className="relative w-full md:w-1/2 h-[40vh] md:h-auto overflow-hidden order-first md:order-last">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'left center' }}
        />
        {/* Left fade to blend with navy */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#00264D] to-transparent" />
        {/* Bottom fade on mobile */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#00264D] to-transparent" />
      </div>

    </section>
  );
}
