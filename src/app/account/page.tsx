'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSessionUser, logoutUser, type AuthUser } from '@/lib/auth';

export default function Account() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(getSessionUser());
    syncUser();

    window.addEventListener('verane-auth', syncUser);
    return () => window.removeEventListener('verane-auth', syncUser);
  }, []);

  if (!user) {
    return (
      <div className="container min-h-[55vh] py-20">
        <div className="mx-auto max-w-md rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.04)]">
          <p className="eyebrow">Your VÉRANE</p>
          <h1 className="serif mt-4 text-5xl">Welcome back.</h1>
          <p className="mt-5 text-sm leading-6 text-black/60">
            Sign in to view orders, manage your details and keep your wishlist close.
          </p>
          <div className="mt-10 space-y-3">
            <Link href="/login" className="block bg-black py-4 text-center text-xs uppercase tracking-[0.2em] text-white">Sign in</Link>
            <Link href="/signup" className="block border border-black py-4 text-center text-xs uppercase tracking-[0.2em]">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-[55vh] py-20">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.04)]">
        <p className="eyebrow">Account</p>
        <h1 className="serif mt-4 text-5xl">Hello, {user.firstName}.</h1>
        <p className="mt-4 text-sm text-black/60">{user.email}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-[#f5f1ea] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">Orders</p>
            <p className="mt-3 text-3xl font-medium">03</p>
          </div>
          <div className="rounded-2xl bg-[#eef0ea] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">Wishlist</p>
            <p className="mt-3 text-3xl font-medium">12</p>
          </div>
          <div className="rounded-2xl bg-[#efebe8] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">Status</p>
            <p className="mt-3 text-lg font-medium">Member</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="bg-black px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white">Continue shopping</Link>
          <button
            type="button"
            onClick={() => {
              logoutUser();
            }}
            className="border border-black px-5 py-3 text-[10px] uppercase tracking-[0.2em]"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

