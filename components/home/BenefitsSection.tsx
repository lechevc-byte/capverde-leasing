const benefits = [
  {
    number: '01',
    title: 'Zero entrada inicial',
    text: 'Sem investimento pesado. Conserve a sua tesouraria para a sua atividade.',
    stat: '0$',
    statLabel: 'de entrada',
  },
  {
    number: '02',
    title: 'Rendas 100% dedutíveis',
    text: 'Cada renda reduz o seu resultado tributável. Otimize a sua fiscalidade.',
    stat: '100%',
    statLabel: 'dedutível',
  },
  {
    number: '03',
    title: 'IVA recuperável',
    text: 'O IVA sobre as rendas é recuperável a cada vencimento mensal.',
    stat: '15%',
    statLabel: 'IVA recuperado',
  },
  {
    number: '04',
    title: 'Fora do balanço',
    text: 'O leasing não aparece no ativo. Preserve a sua capacidade de endividamento.',
    stat: '∞',
    statLabel: 'capacidade preservada',
  },
  {
    number: '05',
    title: 'Renovação fácil',
    text: 'No final do contrato, renove os seus equipamentos com a última tecnologia.',
    stat: '24–60',
    statLabel: 'meses',
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-navy py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Porquê o leasing?
          </h2>
          <p className="mt-4 text-white/50 text-lg">
            5 vantagens concretas para a sua empresa
          </p>
        </div>

        <div className="space-y-20 sm:space-y-28">
          {benefits.map((b, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={b.number}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}
              >
                {/* Text side */}
                <div className="flex-1 space-y-4">
                  <span className="font-sora text-sm font-bold text-gold tracking-widest uppercase">
                    {b.number}
                  </span>
                  <h3 className="font-sora text-2xl sm:text-3xl font-bold text-white">
                    {b.title}
                  </h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    {b.text}
                  </p>
                </div>

                {/* Stat side */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <span className="font-sora font-extrabold text-gold leading-none" style={{ fontSize: 'clamp(100px, 15vw, 180px)' }}>
                    {b.stat}
                  </span>
                  <span className="text-white/40 text-sm font-medium uppercase tracking-wider mt-2">
                    {b.statLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
