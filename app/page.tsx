import { createClient } from '@/lib/supabase/server';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import BenefitsSection from '@/components/home/BenefitsSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustBanner from '@/components/home/TrustBanner';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import type { Produit } from '@/types';

export default async function HomePage() {
  let featuredProducts: Produit[] = [];

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('produits')
      .select('*, categories(*)')
      .eq('en_vedette', true)
      .eq('actif', true)
      .limit(6);
    if (data) featuredProducts = data as Produit[];
  } catch {
    // Supabase not configured yet — show page without products
  }

  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts produits={featuredProducts} />
      <TrustBanner />
      <BenefitsSection />

      {/* CTA final — orçamento personalizado */}
      <section className="py-16 sm:py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white mb-4">
            Tem uma necessidade específica?
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Podemos financiar tudo. Descreva o seu projeto e receba um orçamento personalizado em 48h.
          </p>
          <a href="/contacto">
            <Button variant="gold" size="lg">
              <ArrowRight size={20} />
              Pedir orçamento
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
