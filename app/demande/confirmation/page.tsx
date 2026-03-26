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
        Demande envoyée !
      </h1>

      <p className="text-gray-text mb-2">
        Votre demande de leasing a été transmise avec succès.
      </p>
      <p className="text-gray-text mb-8">
        {reference ? (
          <>Votre numéro de référence est <strong className="text-navy">{reference}</strong>.</>
        ) : (
          <>Vous recevrez un email de confirmation avec votre numéro de référence.</>
        )}
        {' '}Notre équipe étudiera votre dossier sous 5 jours ouvrés.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="outline">
            <Home size={16} />
            Retour à l&apos;accueil
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button>
            <FileText size={16} />
            Suivre mon dossier
          </Button>
        </Link>
      </div>
    </div>
  );
}
