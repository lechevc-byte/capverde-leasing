import { MessageSquare, Handshake, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Diga-nos o que precisa',
    description: 'Veículo, equipamento informático, cozinha profissional, mobiliário — descreva simplesmente o seu projeto.',
  },
  {
    icon: Handshake,
    title: 'Nós tratamos de tudo',
    description: 'Encontramos o produto junto dos nossos fornecedores parceiros e estruturamos o financiamento com os nossos bancos parceiros.',
  },
  {
    icon: PackageCheck,
    title: 'Recebe sem stress',
    description: 'O banco paga o fornecedor diretamente. Você recebe o equipamento e paga uma renda mensal fixa.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
            Como funciona?
          </h2>
          <p className="mt-3 text-gray-text">
            Tratamos de tudo — produto e financiamento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-ocean/10 rounded-2xl rotate-6" />
                <div className="relative w-full h-full bg-ocean rounded-2xl flex items-center justify-center">
                  <step.icon size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-sm font-bold text-white font-sora">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-sora text-lg font-semibold text-navy mb-2">{step.title}</h3>
              <p className="text-sm text-gray-text max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
