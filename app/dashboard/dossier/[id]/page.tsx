import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import Card, { CardContent } from '@/components/ui/Card';
import { formatEuro } from '@/lib/utils';
import { STATUT_LABELS, STATUT_COLORS } from '@/types';
import type { Demande } from '@/types';

interface Props {
  params: { id: string };
}

export default async function DossierPage({ params }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data } = await supabase
    .from('demandes')
    .select('*, produits(nom, marque)')
    .eq('id', params.id)
    .single();

  if (!data) return notFound();
  const demande = data as Demande;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb
        items={[
          { label: 'Mon espace', href: '/dashboard' },
          { label: demande.reference },
        ]}
      />

      <div className="flex items-center gap-4 mt-6 mb-8">
        <h1 className="font-sora text-2xl font-bold text-navy">{demande.reference}</h1>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STATUT_COLORS[demande.statut]}`}>
          {STATUT_LABELS[demande.statut]}
        </span>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-3">
            <h2 className="font-sora font-semibold text-navy">Leasing</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-text">Produit</span>
                <p className="font-medium">{demande.produits?.nom || '-'}</p>
              </div>
              <div>
                <span className="text-gray-text">Valeur du bien</span>
                <p className="font-medium">{formatEuro(demande.prix_bien)}</p>
              </div>
              <div>
                <span className="text-gray-text">Durée</span>
                <p className="font-medium">{demande.duree_mois} mois</p>
              </div>
              <div>
                <span className="text-gray-text">Loyer mensuel</span>
                <p className="font-bold text-gold text-lg">{formatEuro(demande.loyer_mensuel_estime)}/mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3">
            <h2 className="font-sora font-semibold text-navy">Contact</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-text">Nom</span>
                <p className="font-medium">{demande.client_prenom} {demande.client_nom}</p>
              </div>
              <div>
                <span className="text-gray-text">Email</span>
                <p className="font-medium">{demande.client_email}</p>
              </div>
              <div>
                <span className="text-gray-text">Île</span>
                <p className="font-medium">{demande.client_ile || '-'}</p>
              </div>
              <div>
                <span className="text-gray-text">Date</span>
                <p className="font-medium">{new Date(demande.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
