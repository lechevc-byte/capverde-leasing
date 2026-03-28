import { MessageSquare, Handshake, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Diz-nos o que precisas',
    description: 'Equipamento, quantidade, especificações. Não precisas de procurar fornecedor — nós temos os acordos.',
  },
  {
    icon: Handshake,
    title: 'Nós fornecemos',
    description: 'Com os nossos acordos com fornecedores e parceiros bancários, apresentamos-te o produto e as condições de leasing em 48h.',
  },
  {
    icon: PackageCheck,
    title: 'Recebe e paga mensalmente',
    description: 'Entregamos o equipamento. Tu pagas uma renda mensal fixa, diretamente a nós.',
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
            Do pedido à entrega — tratamos de tudo
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
