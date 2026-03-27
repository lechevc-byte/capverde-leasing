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
    <section style={{ background: '#00264D' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center" style={{ padding: '80px 0 60px' }}>
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Porquê o leasing?
          </h2>
          <p className="mt-4 text-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            5 vantagens concretas para a sua empresa
          </p>
        </div>

        {/* Rows */}
        {benefits.map((b, i) => {
          const isEven = i % 2 !== 0;
          return (
            <div key={b.number}>
              <div
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
                style={{ minHeight: '300px', padding: '60px 0' }}
              >
                {/* Text side */}
                <div className="flex-1" style={{ padding: '0 20px' }}>
                  <p
                    className="font-sora font-bold"
                    style={{ fontSize: '13px', color: '#C9960C', letterSpacing: '4px', marginBottom: '8px' }}
                  >
                    {b.number}
                  </p>
                  <h3
                    className="font-sora text-white"
                    style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '420px', lineHeight: 1.7 }}>
                    {b.text}
                  </p>
                </div>

                {/* Stat side */}
                <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '20px 0' }}>
                  <span
                    className="font-sora text-center"
                    style={{
                      fontSize: 'clamp(80px, 12vw, 140px)',
                      fontWeight: 900,
                      color: '#C9960C',
                      lineHeight: 1,
                    }}
                  >
                    {b.stat}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      letterSpacing: '3px',
                      color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase',
                      marginTop: '8px',
                    }}
                  >
                    {b.statLabel}
                  </span>
                </div>
              </div>

              {/* Separator */}
              {i < benefits.length - 1 && (
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
              )}
            </div>
          );
        })}

        {/* Bottom spacing */}
        <div style={{ height: '80px' }} />
      </div>
    </section>
  );
}
