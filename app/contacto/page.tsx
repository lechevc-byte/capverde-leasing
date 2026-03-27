import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contacto — CapVerde Leasing',
  description: 'Peça um orçamento personalizado. Financiamos todo o tipo de equipamento profissional em Cabo Verde.',
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24 bg-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
            Um projeto? <span className="text-gold">Vamos conversar.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-text max-w-2xl mx-auto">
            Necessidade personalizada, orçamento à medida, equipamento específico — podemos financiar tudo. Descreva o seu projeto e respondemos em 48h.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">

          {/* Form */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form action="https://formsubmit.co/contact@capverde-leasing.com" method="POST" className="space-y-5">
              <input type="hidden" name="_subject" value="Novo pedido de orçamento — CapVerde Leasing" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://capverde-leasing.vercel.app/contacto?sent=true" />
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">Nome completo *</label>
                  <input type="text" id="name" name="name" required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean"
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-navy mb-1">Empresa</label>
                  <input type="text" id="company" name="company"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean"
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">Email *</label>
                  <input type="email" id="email" name="email" required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean"
                    placeholder="joao@empresa.cv"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1">Telefone</label>
                  <input type="tel" id="phone" name="phone"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean"
                    placeholder="+238 xxx xx xx"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy mb-1">Descreva a sua necessidade *</label>
                <textarea id="message" name="message" required rows={5}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean resize-none"
                  placeholder="Tipo de equipamento, quantidade, orçamento estimado, prazo desejado..."
                />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full">
                <Send size={18} />
                Enviar o meu pedido
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h3 className="font-sora font-semibold text-navy text-lg">Contacte-nos</h3>

              <div className="flex items-start gap-3">
                <Mail size={20} className="text-ocean mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-navy">Email</p>
                  <a href="mailto:contact@capverde-leasing.com" className="text-sm text-ocean hover:underline">
                    contact@capverde-leasing.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="text-ocean mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-navy">Telefone</p>
                  <a href="tel:+2389001234" className="text-sm text-ocean hover:underline">
                    +238 900 12 34
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-ocean mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-navy">Morada</p>
                  <p className="text-sm text-gray-text">Praia, Santiago, Cabo Verde</p>
                </div>
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-6 text-white">
              <h3 className="font-sora font-semibold text-lg mb-2">À medida, sem limites</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Todo o tipo de equipamento profissional</li>
                <li>• Orçamento em 48h</li>
                <li>• Financiamento de 24 a 60 meses</li>
                <li>• Zero entrada, 100% dedutível</li>
                <li>• Entrega em todas as ilhas</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
