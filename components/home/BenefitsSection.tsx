const benefits = [
  { number: '01', title: 'Zero entrada inicial', text: 'Conserve a sua tesouraria. Sem investimento pesado.', stat: '0 CVE', statLabel: 'de entrada' },
  { number: '02', title: 'Rendas 100% dedutíveis', text: 'Cada renda reduz o seu resultado tributável.', stat: '100%', statLabel: 'dedutível' },
  { number: '03', title: 'IVA recuperável', text: 'O IVA sobre as rendas é recuperável a cada mês.', stat: 'IVA', statLabel: 'recuperável' },
  { number: '04', title: 'Fora do balanço', text: 'Preserve a sua capacidade de endividamento.', stat: '∞', statLabel: 'capacidade' },
  { number: '05', title: 'Renovação fácil', text: 'Renove os seus equipamentos no final do contrato.', stat: '24–60', statLabel: 'meses' },
];

export default function BenefitsSection() {
  return (
    <section className="bg-navy">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white text-center mb-2">
          Porquê o leasing?
        </h2>
        <p className="text-center text-white/40 text-sm mb-14">
          5 vantagens concretas para a sua empresa
        </p>

        <div className="divide-y divide-white/[0.06]">
          {benefits.map((b) => (
            <div key={b.number} className="flex items-center justify-between gap-8 py-7">
              {/* Left */}
              <div className="flex items-center gap-5 min-w-0">
                <span className="font-sora text-gold/40 text-xs font-bold tracking-[3px] shrink-0 w-6">
                  {b.number}
                </span>
                <div className="min-w-0">
                  <h3 className="font-sora text-white font-bold text-lg">{b.title}</h3>
                  <p className="text-white/50 text-sm mt-0.5">{b.text}</p>
                </div>
              </div>

              {/* Right — stat pill */}
              <div className="shrink-0 bg-gold/10 border border-gold/20 rounded-lg px-5 py-3 text-center min-w-[100px]">
                <p className="font-sora font-black text-gold text-2xl sm:text-3xl leading-none">
                  {b.stat}
                </p>
                <p className="text-white/40 text-[10px] tracking-[2px] uppercase mt-1">
                  {b.statLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
