import { createClient } from '@/lib/supabase/server';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import HowItWorks from '@/components/home/HowItWorks';
import BenefitsSection from '@/components/home/BenefitsSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustBanner from '@/components/home/TrustBanner';
import Button from '@/components/ui/Button';
import { Mail } from 'lucide-react';
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
      <HowItWorks />
      <BenefitsSection />
      <TrustBanner />
      <FeaturedProducts produits={featuredProducts} />

      {/* CTA final */}
      <section className="py-16 sm:py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white mb-4">
            Vous êtes une banque ?
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Devenez partenaire de CapVerde Leasing et proposez vos solutions de financement à nos clients professionnels.
          </p>
          <a href="mailto:partenaires@capverde-leasing.com">
            <Button variant="gold" size="lg">
              <Mail size={20} />
              Devenir partenaire
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
