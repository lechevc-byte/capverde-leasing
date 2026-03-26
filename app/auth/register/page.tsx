'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { UserPlus, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          prenom: form.prenom,
          nom: form.nom,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="font-sora text-2xl font-bold text-navy">Créer un compte</h1>
          <p className="text-sm text-gray-text mt-1">Suivez vos demandes de leasing</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-navy mb-1">Prénom</label>
              <input id="prenom" type="text" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} required
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
            </div>
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-navy mb-1">Nom</label>
              <input id="nom" type="text" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">Email</label>
            <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy mb-1">Mot de passe</label>
            <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean" />
          </div>

          {error && <p className="text-sm text-red">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
            Créer mon compte
          </Button>
        </form>

        <p className="text-sm text-gray-text text-center mt-4">
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="text-ocean font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
