import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Card, { CardContent } from '@/components/ui/Card';
import { formatEuro } from '@/lib/utils';
import { STATUT_LABELS, STATUT_COLORS } from '@/types';
import type { Metadata } from 'next';
import type { Demande } from '@/types';

export const metadata: Metadata = {
  title: 'Admin — CaboVerde Leasing',
};

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/entrar');

  const { data: profil } = await supabase
    .from('profils')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profil || profil.role !== 'admin') {
    redirect('/painel');
  }

  const { data } = await supabase
    .from('demandes')
    .select('*, produits(nom)')
    .order('created_at', { ascending: false });

  const demandes = (data || []) as Demande[];

  const counts = {
    nouvelle: demandes.filter((d) => d.statut === 'nouvelle').length,
    en_etude: demandes.filter((d) => d.statut === 'en_etude').length,
    approuvee: demandes.filter((d) => d.statut === 'approuvee').length,
    total: demandes.length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-sora text-3xl font-bold text-navy mb-8">Administração</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: counts.total, color: 'bg-navy' },
          { label: 'Novos', value: counts.nouvelle, color: 'bg-ocean' },
          { label: 'Em análise', value: counts.en_etude, color: 'bg-gold' },
          { label: 'Aprovados', value: counts.approuvee, color: 'bg-green' },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="text-center">
              <p className="text-sm text-gray-text">{s.label}</p>
              <p className={`font-sora text-3xl font-bold text-navy`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demandes table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 font-medium text-gray-text">Referência</th>
                <th className="text-left px-4 py-3 font-medium text-gray-text">Cliente</th>
                <th className="text-left px-4 py-3 font-medium text-gray-text">Produto</th>
                <th className="text-left px-4 py-3 font-medium text-gray-text">Renda</th>
                <th className="text-left px-4 py-3 font-medium text-gray-text">Estado</th>
                <th className="text-left px-4 py-3 font-medium text-gray-text">Data</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((d) => (
                <tr key={d.id} className="border-b border-gray-50 hover:bg-light/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/dossier/${d.id}`} className="font-semibold text-ocean hover:underline">
                      {d.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {d.client_prenom} {d.client_nom}
                    <br />
                    <span className="text-xs text-gray-text">{d.client_email}</span>
                  </td>
                  <td className="px-4 py-3">{d.produits?.nom || '-'}</td>
                  <td className="px-4 py-3 font-semibold">{formatEuro(d.loyer_mensuel_estime)}/m</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUT_COLORS[d.statut]}`}>
                      {STATUT_LABELS[d.statut]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-text">
                    {new Date(d.created_at).toLocaleDateString('pt-PT')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
