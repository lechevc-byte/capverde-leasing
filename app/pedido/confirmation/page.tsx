'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { CheckCircle, Home, FileText } from 'lucide-react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-green/10 rounded-full flex items-center justify-center">
        <CheckCircle size={48} className="text-green" />
      </div>

      <h1 className="font-sora text-3xl font-bold text-navy mb-4">
        Pedido de estudo enviado!
      </h1>

      <p className="text-gray-text mb-2">
        O seu pedido de financiamento foi transmitido com sucesso.
      </p>
      <p className="text-gray-text mb-8">
        {reference ? (
          <>O seu número de referência é <strong className="text-navy">{reference}</strong>.</>
        ) : (
          <>Receberá um email de confirmação com o seu número de referência.</>
        )}
        {' '}A nossa equipa analisará o seu processo em 5 dias úteis.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="outline">
            <Home size={16} />
            Voltar ao início
          </Button>
        </Link>
        <Link href="/painel">
          <Button>
            <FileText size={16} />
            Acompanhar o meu processo
          </Button>
        </Link>
      </div>
    </div>
  );
}
