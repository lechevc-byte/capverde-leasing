const benefits = [
  { number: '01', title: 'Zero entrada inicial', text: 'Conserve a sua tesouraria. Sem investimento pesado.', stat: '0 CVE', label: 'de entrada' },
  { number: '02', title: 'Rendas 100% dedutíveis', text: 'Cada renda reduz o seu resultado tributável.', stat: '100%', label: 'dedutível' },
  { number: '03', title: 'IVA recuperável', text: 'O IVA sobre as rendas é recuperável a cada mês.', stat: 'IVA', label: 'recuperável' },
  { number: '04', title: 'Fora do balanço', text: 'Preserve a sua capacidade de endividamento.', stat: '∞', label: 'capacidade' },
  { number: '05', title: 'Renovação fácil', text: 'Renove os equipamentos no final do contrato.', stat: '24–60', label: 'meses' },
];

export default function BenefitsSection() {
  return (
    <section className="bg-navy py-14">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-sora text-2xl font-bold text-white text-center">Porquê o leasing?</h2>
        <p className="text-center text-white/40 text-xs mb-10">5 vantagens concretas para a sua empresa</p>

        {benefits.map((b, i) => (
          <div
            key={b.number}
            className={`flex items-center gap-4 py-4 ${i < benefits.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
          >
            <span className="text-gold/30 font-sora text-[10px] font-bold tracking-[3px] w-5 shrink-0">{b.number}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-sora text-white font-bold text-sm">{b.title}</h3>
              <p className="text-white/40 text-xs">{b.text}</p>
            </div>
            <div className="shrink-0 bg-gold/10 border border-gold/20 rounded-md px-3 py-1.5 text-center">
              <p className="font-sora font-black text-gold text-base leading-tight">{b.stat}</p>
              <p className="text-white/30 text-[8px] tracking-[1.5px] uppercase">{b.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
