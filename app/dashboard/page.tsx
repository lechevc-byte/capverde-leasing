import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatEuro } from '@/lib/utils';
import { STATUT_LABELS, STATUT_COLORS } from '@/types';
import { Plus, FileText } from 'lucide-react';
import type { Metadata } from 'next';
import type { Demande } from '@/types';

export const metadata: Metadata = {
  title: 'Mon espace — CapVerde Leasing',
};

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  let demandes: Demande[] = [];
  const { data } = await supabase
    .from('demandes')
    .select('*, produits(nom)')
    .eq('utilisateur_id', user.id)
    .order('created_at', { ascending: false });

  if (data) demandes = data as Demande[];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sora text-3xl font-bold text-navy">Mon espace</h1>
          <p className="text-gray-text mt-1">Suivez vos demandes de leasing</p>
        </div>
        <Link href="/categories">
          <Button>
            <Plus size={16} />
            Nouvelle demande
          </Button>
        </Link>
      </div>

      {demandes.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText size={48} className="text-ocean/20 mx-auto mb-4" />
          <p className="text-gray-text mb-4">Vous n&apos;avez pas encore de demande de leasing.</p>
          <Link href="/categories">
            <Button>Découvrir les équipements</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {demandes.map((d) => (
            <Link key={d.id} href={`/dashboard/dossier/${d.id}`}>
              <Card hover className="p-4 sm:p-6">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-sora font-semibold text-navy">{d.reference}</span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUT_COLORS[d.statut]}`}>
                          {STATUT_LABELS[d.statut]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-text">
                        {d.produits?.nom || 'Produit'} &middot; {d.duree_mois} mois
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-sora font-bold text-gold text-lg">
                        {formatEuro(d.loyer_mensuel_estime)}/mois
                      </p>
                      <p className="text-xs text-gray-text">
                        {new Date(d.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
