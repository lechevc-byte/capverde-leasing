import Link from 'next/link';
import Button from '@/components/ui/Button';
import { MessageSquare, Handshake, Truck, ArrowRight, Calculator, Hotel, HardHat, Briefcase, Landmark, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Como funciona — CapVerde Leasing',
  description: 'Em 3 passos simples, tratamos de tudo — do equipamento ao financiamento. Descubra o nosso processo.',
};

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Diz-nos o que precisas',
    text: 'Veículo, equipamento de cozinha, informática, mobiliário — descreve simplesmente o teu projeto. Não precisas de saber o modelo exato nem o fornecedor. Nós tratamos disso.',
    cta: { label: 'Descrever o meu projeto', href: '/contacto' },
  },
  {
    number: '02',
    icon: Handshake,
    title: 'Nós encontramos tudo',
    text: 'Com os nossos acordos com fornecedores parceiros e bancos locais, estruturamos a melhor solução para o teu caso — produto, preço e financiamento. Recebes uma proposta em 48h.',
    cta: null,
  },
  {
    number: '03',
    icon: Truck,
    title: 'Recebes e pagas mensalmente',
    text: 'O banco paga o fornecedor diretamente. Tu recebes o equipamento e pagas uma renda mensal fixa, 100% dedutível fiscalmente. Sem entrada, sem stress.',
    cta: null,
  },
];

const audiences = [
  { icon: Hotel, title: 'Hotéis & Resorts', description: 'Cozinhas, mobiliário de quartos, equipamento de lavandaria, veículos de shuttle.' },
  { icon: HardHat, title: 'Empresas & BTP', description: 'Veículos utilitários, informática, telefonia, equipamento de obra.' },
  { icon: Briefcase, title: 'Profissões liberais', description: 'Material informático, mobiliário de escritório, veículos de serviço.' },
  { icon: Landmark, title: 'Administrações & ONG', description: 'Frotas de veículos, equipamento de escritório, infraestrutura IT.' },
];

const faqs = [
  {
    q: 'Posso financiar qualquer equipamento?',
    a: 'Sim. Se tem uso profissional, financiamos. Veículos, informática, equipamento de cozinha, mobiliário, telefonia — e muito mais.',
  },
  {
    q: 'Quanto tempo demora o processo?',
    a: 'Proposta em 48h. Dossier instruído em 5 dias úteis. Entrega dependente do fornecedor e da ilha.',
  },
  {
    q: 'Preciso de ter conta bancária em Cabo Verde?',
    a: 'Sim, o contrato de leasing é feito com um banco parceiro local (BCA ou Caixa Económica).',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-gray-100 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white hover:bg-light transition-colors">
        <span className="font-sora font-semibold text-navy pr-4">{q}</span>
        <ChevronDown size={20} className="text-ocean shrink-0 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-6 pb-5 text-gray-text leading-relaxed">
        {a}
      </div>
    </details>
  );
}

export default function ComoFuncionaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Como funciona?
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Em 3 passos simples, tratamos de tudo — do equipamento ao financiamento.
          </p>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Left: number + icon */}
              <div className="shrink-0 flex flex-col items-center md:items-start">
                <span className="font-sora text-5xl sm:text-6xl font-extrabold text-ocean/15">{step.number}</span>
                <div className="w-16 h-16 bg-ocean rounded-2xl flex items-center justify-center -mt-4">
                  <step.icon size={32} className="text-white" />
                </div>
              </div>

              {/* Right: text */}
              <div className="flex-1">
                <h2 className="font-sora text-2xl sm:text-3xl font-bold text-navy mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-text text-lg leading-relaxed mb-6">
                  {step.text}
                </p>
                {step.cta && (
                  <Link href={step.cta.href}>
                    <Button variant="gold">
                      {step.cta.label}
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Para quem? */}
      <section className="py-16 sm:py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
              Para quem?
            </h2>
            <p className="mt-3 text-gray-text">
              O leasing operacional é a solução ideal para
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:border-ocean/30 hover:shadow-md transition-all">
                <div className="w-14 h-14 mx-auto mb-4 bg-ocean/10 rounded-xl flex items-center justify-center">
                  <a.icon size={28} className="text-ocean" />
                </div>
                <h3 className="font-sora font-semibold text-navy mb-2">{a.title}</h3>
                <p className="text-sm text-gray-text">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl sm:text-4xl font-bold text-navy">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button variant="gold" size="lg">
                Descrever o meu projeto
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/simulador">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Calculator size={20} />
                Simular a minha renda
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
