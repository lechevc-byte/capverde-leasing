import { Banknote, BarChart3, Receipt, BookOpen, RefreshCw } from 'lucide-react';

const benefits = [
  {
    icon: Banknote,
    title: 'Zéro apport initial',
    description: 'Aucun investissement lourd. Conservez votre trésorerie pour votre activité.',
  },
  {
    icon: BarChart3,
    title: 'Loyers 100% déductibles',
    description: 'Chaque loyer réduit votre résultat imposable. Optimisez votre fiscalité.',
  },
  {
    icon: Receipt,
    title: 'TVA récupérable',
    description: 'La TVA sur les loyers est récupérable à chaque échéance mensuelle.',
  },
  {
    icon: BookOpen,
    title: 'Hors bilan',
    description: 'Le leasing n\'apparaît pas à l\'actif. Préservez votre capacité d\'emprunt.',
  },
  {
    icon: RefreshCw,
    title: 'Renouvellement facile',
    description: 'En fin de contrat, renouvelez vos équipements avec la dernière technologie.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
            Pourquoi le leasing ?
          </h2>
          <p className="mt-3 text-gray-text max-w-xl mx-auto">
            5 avantages concrets pour votre entreprise
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-teal/10 rounded-xl flex items-center justify-center">
                <b.icon size={24} className="text-teal" />
              </div>
              <h3 className="font-sora font-semibold text-navy text-sm mb-2">{b.title}</h3>
              <p className="text-xs text-gray-text leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
