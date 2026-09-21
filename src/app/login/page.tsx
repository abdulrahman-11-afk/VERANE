'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { loginUser } from '@/lib/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      loginUser({ email, password });
      router.push('/account');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container min-h-[55vh] py-20">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.04)]">
        <p className="eyebrow">Your VÉRANE</p>
        <h1 className="serif mt-4 text-5xl">Sign in.</h1>

        {error && (
          <p className="mt-6 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-10 space-y-5">
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="w-full border-b border-black/30 bg-transparent py-3 text-sm outline-none"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full border-b border-black/30 bg-transparent py-3 text-sm outline-none"
          />
        </div>

        <button disabled={loading} className="mt-8 w-full bg-black py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#2b2b2b] disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="mt-6 flex items-center justify-between text-xs underline underline-offset-4">
          <Link href="/signup">Create account</Link>
          <Link href="/shop">Continue shopping</Link>
        </div>
      </form>
    </div>
  );
}

