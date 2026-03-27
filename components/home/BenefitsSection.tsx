import { Banknote, BarChart3, Receipt, BookOpen, RefreshCw } from 'lucide-react';

const benefits = [
  {
    icon: Banknote,
    title: 'Zero entrada inicial',
    description: 'Sem investimento pesado. Conserve a sua tesouraria para a sua atividade.',
  },
  {
    icon: BarChart3,
    title: 'Rendas 100% dedutíveis',
    description: 'Cada renda reduz o seu resultado tributável. Otimize a sua fiscalidade.',
  },
  {
    icon: Receipt,
    title: 'IVA recuperável',
    description: 'O IVA sobre as rendas é recuperável a cada vencimento mensal.',
  },
  {
    icon: BookOpen,
    title: 'Fora do balanço',
    description: 'O leasing não aparece no ativo. Preserve a sua capacidade de endividamento.',
  },
  {
    icon: RefreshCw,
    title: 'Renovação fácil',
    description: 'No final do contrato, renove os seus equipamentos com a última tecnologia.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
            Porquê o leasing?
          </h2>
          <p className="mt-3 text-gray-text max-w-xl mx-auto">
            5 vantagens concretas para a sua empresa
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
