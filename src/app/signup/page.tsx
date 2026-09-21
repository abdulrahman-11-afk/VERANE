'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { signUpUser } from '@/lib/auth';

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      signUpUser({ firstName, lastName, email, password });
      router.push('/account');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container min-h-[55vh] py-20">
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.04)]">
        <p className="eyebrow">Join VÉRANE</p>
        <h1 className="serif mt-4 text-5xl">Create account.</h1>

        {error && (
          <p className="mt-6 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <input
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
            className="border-b border-black/30 bg-transparent py-3 text-sm outline-none"
          />
          <input
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last name"
            className="border-b border-black/30 bg-transparent py-3 text-sm outline-none"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="border-b border-black/30 bg-transparent py-3 text-sm outline-none sm:col-span-2"
          />
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password (8+ characters)"
            className="border-b border-black/30 bg-transparent py-3 text-sm outline-none sm:col-span-2"
          />
        </div>

        <button disabled={loading} className="mt-8 w-full bg-black py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#2b2b2b] disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="mt-6 text-center text-xs text-black/60">
          Already have an account? <Link href="/login" className="underline underline-offset-4">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

