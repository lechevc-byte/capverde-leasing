'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Email ou palavra-passe incorreta.');
      setLoading(false);
      return;
    }

    router.push('/painel');
    router.refresh();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="font-sora text-2xl font-bold text-navy">Iniciar sessão</h1>
          <p className="text-sm text-gray-text mt-1">Aceda ao seu espaço cliente</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy mb-1">Palavra-passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-ocean focus:ring-1 focus:ring-ocean"
            />
          </div>

          {error && <p className="text-sm text-red">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            Entrar
          </Button>
        </form>

        <p className="text-sm text-gray-text text-center mt-4">
          Ainda não tem conta?{' '}
          <Link href="/auth/registar" className="text-ocean font-medium hover:underline">
            Registar-se
          </Link>
        </p>
      </div>
    </div>
  );
}
