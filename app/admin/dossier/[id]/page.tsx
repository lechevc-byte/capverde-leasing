'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CategoryBreadcrumb from '@/components/products/CategoryBreadcrumb';
import { formatEuro } from '@/lib/utils';
import { STATUT_LABELS, STATUT_COLORS } from '@/types';
import { Save, Loader2 } from 'lucide-react';
import type { Demande } from '@/types';

const ALL_STATUTS: Demande['statut'][] = [
  'nouvelle', 'en_etude', 'approuvee', 'refusee', 'en_cours', 'terminee', 'annulee',
];

export default function AdminDossierPage() {
  const params = useParams();
  const router = useRouter();
  const [demande, setDemande] = useState<Demande | null>(null);
  const [statut, setStatut] = useState<Demande['statut']>('nouvelle');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('demandes')
      .select('*, produits(nom, marque)')
      .eq('id', params.id)
      .single()
      .then(({ data }) => {
        if (data) {
          const d = data as Demande;
          setDemande(d);
          setStatut(d.statut);
          setNotes(d.notes_admin || '');
        }
      });
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from('demandes')
      .update({ statut, notes_admin: notes, updated_at: new Date().toISOString() })
      .eq('id', params.id);
    setSaving(false);
    router.refresh();
  };

  if (!demande) {
    return <div className="max-w-3xl mx-auto px-4 py-12 text-gray-text">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryBreadcrumb
        items={[
          { label: 'Admin', href: '/admin' },
          { label: demande.reference },
        ]}
      />

      <div className="flex items-center gap-4 mt-6 mb-8">
        <h1 className="font-sora text-2xl font-bold text-navy">{demande.reference}</h1>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STATUT_COLORS[demande.statut]}`}>
          {STATUT_LABELS[demande.statut]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-3">
              <h2 className="font-sora font-semibold text-navy">Client</h2>
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
                  <span className="text-gray-text">Téléphone</span>
                  <p className="font-medium">{demande.client_telephone || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-text">Type</span>
                  <p className="font-medium">{demande.client_type || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-text">Entreprise</span>
                  <p className="font-medium">{demande.client_nom_entreprise || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-text">Île</span>
                  <p className="font-medium">{demande.client_ile || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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

          {demande.documents_urls && demande.documents_urls.length > 0 && (
            <Card>
              <CardContent>
                <h2 className="font-sora font-semibold text-navy mb-3">Documents</h2>
                <ul className="space-y-2">
                  {demande.documents_urls.map((url, i) => (
                    <li key={i}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline text-sm">
                        Document {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="font-sora font-semibold text-navy">Gestion</h2>

              <div>
                <label htmlFor="statut" className="block text-sm font-medium text-navy mb-1">Statut</label>
                <select
                  id="statut"
                  value={statut}
                  onChange={(e) => setStatut(e.target.value as Demande['statut'])}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean"
                >
                  {ALL_STATUTS.map((s) => (
                    <option key={s} value={s}>{STATUT_LABELS[s]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-navy mb-1">Notes admin</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean resize-none"
                  placeholder="Notes internes..."
                />
              </div>

              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
