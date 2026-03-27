'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { calculerLeasing } from '@/lib/leasing/calculator';
import { formatEuro } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ArrowLeft, ArrowRight, Check, Loader2, Upload, X as XIcon, FileText } from 'lucide-react';

const CLIENT_TYPES = [
  { value: 'entreprise', label: 'Empresa' },
  { value: 'hotel_resort', label: 'Hotel ou Resort' },
  { value: 'profession_liberale', label: 'Profissão liberal' },
  { value: 'administration', label: 'Administração' },
  { value: 'ong', label: 'ONG' },
];

const BUDGET_RANGES = [
  { value: '<500k', label: '< 500 000 CVE' },
  { value: '500k-2M', label: '500 000 – 2 000 000 CVE' },
  { value: '2M-10M', label: '2 000 000 – 10 000 000 CVE' },
  { value: '>10M', label: '> 10 000 000 CVE' },
];

const ILES = ['Santiago', 'Sal', 'Boavista', 'São Vicente', 'Fogo', 'Outras'];

const STEPS = ['Projeto', 'Informações', 'Documentos', 'Confirmação'];

export default function DemandForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const produitId = searchParams.get('produit') || '';
  const dureeParam = Number(searchParams.get('duree')) || 36;

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [produit, setProduit] = useState<{ nom: string; prix_achat: number; valeur_residuelle_pct: number } | null>(null);
  const [duree] = useState(dureeParam);
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    type_client: '',
    nom_entreprise: '',
    siret: '',
    secteur: '',
    ile: '',
    equipement: '',
    budget: '',
    message: '',
    accepte: false,
  });
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    identite: null,
    bilan: null,
    releve: null,
  });

  useEffect(() => {
    if (!produitId) return;
    const supabase = createClient();
    supabase
      .from('produits')
      .select('nom, prix_achat, valeur_residuelle_pct')
      .eq('id', produitId)
      .single()
      .then(({ data }) => {
        if (data) setProduit(data);
      });
  }, [produitId]);

  const result = produit
    ? calculerLeasing({
        prixBien: produit.prix_achat,
        dureeMois: duree,
        valeurResiduellePct: produit.valeur_residuelle_pct,
      })
    : null;

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) {
      // If coming from a product, auto-OK. Otherwise need equipment description
      return produitId || (form.equipement && form.budget);
    }
    if (step === 1) {
      return form.prenom && form.nom && form.email && form.telephone && form.type_client && form.ile;
    }
    if (step === 3) {
      return form.accepte;
    }
    return true;
  };

  const handleFileChange = (key: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const supabase = createClient();

      const uploadedUrls: string[] = [];
      for (const [key, file] of Object.entries(documents)) {
        if (!file) continue;
        const ext = file.name.split('.').pop();
        const path = `demandes/${Date.now()}-${key}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(path, file);
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('documents').getPublicUrl(path);
          uploadedUrls.push(urlData.publicUrl);
        }
      }

      const insertData: Record<string, unknown> = {
        produit_id: produitId || null,
        prix_bien: produit?.prix_achat || 0,
        duree_mois: duree,
        loyer_mensuel_estime: result?.loyerMensuel || 0,
        valeur_residuelle: result?.valeurResiduelle || 0,
        client_prenom: form.prenom,
        client_nom: form.nom,
        client_email: form.email,
        client_telephone: form.telephone,
        client_type: form.type_client,
        client_nom_entreprise: form.nom_entreprise || null,
        client_siret: form.siret || null,
        client_secteur: form.secteur || null,
        client_ile: form.ile,
        fournisseur_souhaite: form.equipement || null,
        notes_admin: [
          form.budget ? `Budget: ${form.budget}` : '',
          form.message ? `Message: ${form.message}` : '',
        ].filter(Boolean).join(' | ') || null,
        documents_urls: uploadedUrls.length > 0 ? uploadedUrls : null,
      };

      const { data, error } = await supabase.from('demandes').insert(insertData).select('reference').single();

      if (error) throw error;
      const ref = data?.reference || '';
      router.push(`/pedido/confirmation${ref ? `?ref=${encodeURIComponent(ref)}` : ''}`);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar. Por favor tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={cn(
                'h-2 rounded-full transition-colors',
                i <= step ? 'bg-ocean' : 'bg-gray-200'
              )}
            />
            <p className={cn(
              'text-xs mt-1 text-center',
              i <= step ? 'text-ocean font-medium' : 'text-gray-text'
            )}>
              {s}
            </p>
          </div>
        ))}
      </div>

      {/* Step 0 — Projeto */}
      {step === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-sora text-xl font-bold text-navy">O seu projeto</h2>

          {produit && result ? (
            <div className="bg-light rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium text-navy">Equipamento selecionado:</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-text">Equipamento</span>
                <span className="font-semibold text-navy">{produit.nom}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-text">Valor indicativo</span>
                <span className="font-semibold text-navy">{formatEuro(produit.prix_achat)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-text">Duração</span>
                <span className="font-semibold text-navy">{duree} meses</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                <span className="text-gray-text">Renda mensal estimada</span>
                <span className="font-bold text-gold">{formatEuro(result.loyerMensuel)}/mês</span>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="equipement" className="block text-sm font-medium text-navy mb-1">Equipamento pretendido *</label>
                <textarea
                  id="equipement"
                  value={form.equipement}
                  onChange={(e) => updateField('equipement', e.target.value)}
                  rows={3}
                  placeholder="Descreva o equipamento que pretende financiar (tipo, marca, quantidade...)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean resize-none"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-navy mb-1">Valor estimado *</label>
                <select
                  id="budget"
                  value={form.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean"
                >
                  <option value="">Selecionar...</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy mb-1">Observações (opcional)</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  rows={2}
                  placeholder="Prazo desejado, fornecedor preferido, etc."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean resize-none"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 1 — Informations */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-sora text-xl font-bold text-navy">As suas informações</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-navy mb-1">Nome próprio *</label>
              <input id="prenom" type="text" value={form.prenom} onChange={(e) => updateField('prenom', e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
            </div>
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-navy mb-1">Apelido *</label>
              <input id="nom" type="text" value={form.nom} onChange={(e) => updateField('nom', e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">Email *</label>
            <input id="email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
          </div>

          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-navy mb-1">Telefone *</label>
            <input id="telephone" type="tel" value={form.telephone} onChange={(e) => updateField('telephone', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
          </div>

          <div>
            <label htmlFor="type_client" className="block text-sm font-medium text-navy mb-1">Tipo de cliente *</label>
            <select id="type_client" value={form.type_client} onChange={(e) => updateField('type_client', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean">
              <option value="">Selecionar...</option>
              {CLIENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {(form.type_client === 'entreprise' || form.type_client === 'hotel_resort') && (
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div>
                <label htmlFor="nom_entreprise" className="block text-sm font-medium text-navy mb-1">Nome da empresa / hotel</label>
                <input id="nom_entreprise" type="text" value={form.nom_entreprise} onChange={(e) => updateField('nom_entreprise', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
              </div>
              <div>
                <label htmlFor="siret" className="block text-sm font-medium text-navy mb-1">NIF (número fiscal)</label>
                <input id="siret" type="text" value={form.siret} onChange={(e) => updateField('siret', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
              </div>
              <div>
                <label htmlFor="secteur" className="block text-sm font-medium text-navy mb-1">Setor de atividade</label>
                <input id="secteur" type="text" value={form.secteur} onChange={(e) => updateField('secteur', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="ile" className="block text-sm font-medium text-navy mb-1">Ilha *</label>
            <select id="ile" value={form.ile} onChange={(e) => updateField('ile', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean">
              <option value="">Selecionar...</option>
              {ILES.map((ile) => (
                <option key={ile} value={ile}>{ile}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2 — Documents */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-sora text-xl font-bold text-navy">Documentos</h2>
          <p className="text-sm text-gray-text">
            Documentos facultativos — aceleram o estudo do seu dossier.
          </p>

          <div className="space-y-4">
            {[
              { key: 'identite', label: 'Cartão de identidade ou passaporte' },
              { key: 'bilan', label: 'Último balanço / declaração fiscal' },
              { key: 'releve', label: 'Extrato bancário (últimos 3 meses)' },
            ].map((doc) => (
              <div key={doc.key} className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-ocean/50 transition-colors relative">
                {documents[doc.key] ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileText size={16} className="text-ocean" />
                    <span className="text-sm font-medium text-navy">{documents[doc.key]!.name}</span>
                    <button
                      type="button"
                      onClick={() => handleFileChange(doc.key, null)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <XIcon size={14} className="text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Upload size={20} className="mx-auto mb-1 text-gray-400" />
                    <p className="text-sm font-medium text-navy mb-1">{doc.label}</p>
                    <p className="text-xs text-gray-text">Clique para selecionar (PDF, JPG, PNG)</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.key, e.target.files?.[0] || null)}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>

          <Badge variant="info">Opcional — pode fornecer estes documentos mais tarde</Badge>
        </div>
      )}

      {/* Step 3 — Confirmation */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-sora text-xl font-bold text-navy">Confirmar o seu pedido de estudo</h2>

          <div className="bg-light rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-text">Nome</span>
              <span className="font-medium">{form.prenom} {form.nom}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Email</span>
              <span className="font-medium">{form.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Telefone</span>
              <span className="font-medium">{form.telephone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Ilha</span>
              <span className="font-medium">{form.ile}</span>
            </div>
            {produit && result && (
              <>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-gray-text">Equipamento</span>
                  <span className="font-medium">{produit.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-text">Renda mensal estimada</span>
                  <span className="font-bold text-gold">{formatEuro(result.loyerMensuel)}/mês</span>
                </div>
              </>
            )}
            {!produit && form.equipement && (
              <>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-gray-text">Equipamento</span>
                  <span className="font-medium text-right max-w-[60%]">{form.equipement}</span>
                </div>
                {form.budget && (
                  <div className="flex justify-between">
                    <span className="text-gray-text">Valor estimado</span>
                    <span className="font-medium">{BUDGET_RANGES.find(b => b.value === form.budget)?.label}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.accepte}
              onChange={(e) => updateField('accepte', e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-ocean focus:ring-ocean"
            />
            <span className="text-sm text-gray-text">
              Aceito que os meus dados sejam transmitidos ao banco parceiro para o estudo do meu pedido de financiamento.
            </span>
          </label>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 0 ? (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            <ArrowLeft size={16} />
            Voltar
          </Button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
            Seguinte
            <ArrowRight size={16} />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canProceed() || loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            Enviar pedido de estudo
          </Button>
        )}
      </div>
    </div>
  );
}
