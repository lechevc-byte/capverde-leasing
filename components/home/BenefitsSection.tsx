const benefits = [
  {
    number: '01',
    title: 'Zero entrada inicial',
    text: 'Sem investimento pesado. Conserve a sua tesouraria para a sua atividade.',
    stat: '0 CVE',
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
    stat: 'IVA',
    statLabel: 'recuperável',
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
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '80px 20px 48px' }}>
        <h2 className="font-sora" style={{ fontSize: '40px', fontWeight: 800, color: '#fff' }}>
          Porquê o leasing?
        </h2>
        <p style={{ marginTop: '12px', fontSize: '16px', color: 'rgba(255,255,255,0.5)' }}>
          5 vantagens concretas para a sua empresa
        </p>
      </div>

      {/* Rows */}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {benefits.map((b, i) => (
          <div
            key={b.number}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              padding: '48px 40px',
              minHeight: '120px',
              borderBottom: i < benefits.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            {/* Left — text */}
            <div style={{ flex: '1 1 400px', minWidth: 0 }}>
              <p
                className="font-sora"
                style={{ fontSize: '11px', letterSpacing: '4px', color: '#C9960C', marginBottom: '6px', fontWeight: 700 }}
              >
                {b.number}
              </p>
              <h3
                className="font-sora"
                style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}
              >
                {b.title}
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.7 }}>
                {b.text}
              </p>
            </div>

            {/* Right — stat box */}
            <div
              style={{
                background: 'rgba(201,150,12,0.1)',
                border: '1px solid rgba(201,150,12,0.3)',
                borderRadius: '12px',
                padding: '24px 40px',
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              <p
                className="font-sora"
                style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, color: '#C9960C', lineHeight: 1 }}
              >
                {b.stat}
              </p>
              <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '4px' }}>
                {b.statLabel}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div style={{ height: '80px' }} />
    </section>
  );
}
