import { Building2, ShieldCheck, Clock } from 'lucide-react';

const items = [
  { icon: Building2, text: 'Parceria bancária local' },
  { icon: ShieldCheck, text: 'Financiamento garantido' },
  { icon: Clock, text: 'Processo tratado em 5 dias' },
];

export default function TrustBanner() {
  return (
    <section className="bg-navy/5 border-y border-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon size={24} className="text-ocean shrink-0" />
              <span className="text-sm font-medium text-navy">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
