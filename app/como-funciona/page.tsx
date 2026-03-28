import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, Calculator, Hotel, HardHat, Briefcase, Landmark, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Como funciona — CapVerde Leasing',
  description: 'Vendemos equipamentos profissionais em leasing em Cabo Verde. Do pedido à entrega, tratamos de tudo.',
};

const audiences = [
  { icon: Hotel, title: 'Hotéis & Resorts', description: 'Cozinhas, mobiliário de quartos, equipamento de lavandaria, veículos de shuttle.' },
  { icon: HardHat, title: 'Empresas & BTP', description: 'Veículos utilitários, informática, telefonia, equipamento de obra.' },
  { icon: Briefcase, title: 'Profissões liberais', description: 'Material informático, mobiliário de escritório, veículos de serviço.' },
  { icon: Landmark, title: 'Administrações & ONG', description: 'Frotas de veículos, equipamento de escritório, infraestrutura IT.' },
];

const faqs = [
  {
    q: 'Posso adquirir qualquer equipamento em leasing?',
    a: 'Sim. Se tem uso profissional, vendemos em leasing. Veículos, informática, equipamento de cozinha, mobiliário, telefonia — e muito mais.',
  },
  {
    q: 'Quanto tempo demora o processo?',
    a: 'Proposta em 48h. Dossier instruído em 5 dias úteis. Entrega dependente do fornecedor e da ilha.',
  },
  {
    q: 'Preciso de ter conta bancária em Cabo Verde?',
    a: 'Sim, o leasing é operado através de um banco parceiro local (BCA ou Caixa Económica).',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-white/10 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer px-6 py-5 bg-white/5 hover:bg-white/10 transition-colors">
        <span className="font-sora font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={20} className="text-gold shrink-0 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-6 pb-5 text-white/60 leading-relaxed">
        {a}
      </div>
    </details>
  );
}

export default function ComoFuncionaPage() {
  return (
    <div className="bg-navy">
      {/* Hero */}
      <section className="pt-20 sm:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Como funciona?
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
            Do pedido à entrega — tratamos de tudo por ti.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 1 */}
          <div className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start pb-20 sm:pb-28">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/20" />

            <div className="flex-1 relative">
              <span className="font-sora font-extrabold text-gold/10 leading-none absolute -top-8 left-0" style={{ fontSize: '150px' }}>01</span>
              <div className="relative pt-16">
                <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white mb-4">
                  Diz-nos o que precisas
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Equipamento, quantidade, especificações. Não precisas de procurar fornecedor — nós temos os acordos.
                </p>
                <Link href="/contacto">
                  <Button variant="gold">
                    Pedir equipamento
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white/5 border border-gold/30 rounded-2xl p-8 w-full max-w-md">
                <p className="text-white/80 text-lg leading-relaxed italic mb-4">
                  &ldquo;Preciso de 3 pick-ups para a minha empresa de construção em Santiago. Orçamento máximo 15 000 000 CVE.&rdquo;
                </p>
                <p className="text-gold text-sm font-semibold">Exemplo real de pedido</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-start pb-20 sm:pb-28">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/20" />

            <div className="flex-1 relative">
              <span className="font-sora font-extrabold text-gold/10 leading-none absolute -top-8 left-0" style={{ fontSize: '150px' }}>02</span>
              <div className="relative pt-16">
                <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white mb-4">
                  Nós fornecemos
                </h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  Com os nossos acordos com fornecedores e parceiros bancários, apresentamos-te o produto e as condições de leasing em 48h.
                </p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-4 sm:gap-6 w-full max-w-md justify-center">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 text-center flex-1">
                  <div className="text-2xl mb-1">🏭</div>
                  <p className="text-white/70 text-xs font-semibold">Fornecedor</p>
                </div>
                <div className="text-gold text-2xl font-bold">&rarr;</div>
                <div className="bg-gold/20 border-2 border-gold rounded-xl p-4 sm:p-5 text-center flex-1">
                  <span className="font-sora font-bold text-gold text-sm">CV</span>
                  <p className="text-white text-xs font-semibold mt-1">CapVerde Leasing</p>
                </div>
                <div className="text-gold text-2xl font-bold">&rarr;</div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 text-center flex-1">
                  <div className="text-2xl mb-1">🏦</div>
                  <p className="text-white/70 text-xs font-semibold">Banco</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="flex-1 relative">
              <span className="font-sora font-extrabold text-gold/10 leading-none absolute -top-8 left-0" style={{ fontSize: '150px' }}>03</span>
              <div className="relative pt-16">
                <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white mb-4">
                  Recebes e pagas mensalmente
                </h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  Entregamos o equipamento. Tu pagas uma renda mensal fixa, diretamente a nós. 100% dedutível fiscalmente. Sem entrada, sem stress.
                </p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white/5 border border-gold/30 rounded-2xl p-8 w-full max-w-sm">
                <p className="text-gold text-xs font-bold uppercase tracking-wider mb-6">Resumo do contrato</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white/50 text-sm">Renda mensal</span>
                    <span className="font-sora font-bold text-gold text-xl">245 000 CVE</span>
                  </div>
                  <div className="border-t border-white/10" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-white/50 text-sm">Duração</span>
                    <span className="font-sora font-semibold text-white">48 meses</span>
                  </div>
                  <div className="border-t border-white/10" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-white/50 text-sm">Entrada</span>
                    <span className="font-sora font-bold text-white text-xl">0 CVE</span>
                  </div>
                  <div className="border-t border-white/10" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-white/50 text-sm">Dedutível</span>
                    <span className="font-sora font-bold text-gold text-xl">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Para quem? */}
      <section className="py-16 sm:py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white">
              Para quem?
            </h2>
            <p className="mt-3 text-white/50">
              O leasing operacional é a solução ideal para
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-gold/30 transition-all">
                <div className="w-14 h-14 mx-auto mb-4 bg-gold/10 rounded-xl flex items-center justify-center">
                  <a.icon size={28} className="text-gold" />
                </div>
                <h3 className="font-sora font-semibold text-white mb-2">{a.title}</h3>
                <p className="text-sm text-white/50">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white">
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
      <section className="py-20 sm:py-28 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-white/50 text-lg mb-10">
            O primeiro passo é simples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button variant="gold" size="lg">
                Pedir equipamento
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
