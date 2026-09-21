'use client';

import Link from 'next/link';
import { Search, UserRound, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSessionUser, type AuthUser } from '@/lib/auth';
import { getWishlistIds } from '@/lib/wishlist';

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const syncUser = () => setUser(getSessionUser());
    const syncWishlist = () => setWishlistCount(getWishlistIds().length);

    syncUser();
    syncWishlist();

    window.addEventListener('verane-auth', syncUser);
    window.addEventListener('verane-wishlist', syncWishlist);

    return () => {
      window.removeEventListener('verane-auth', syncUser);
      window.removeEventListener('verane-wishlist', syncWishlist);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f6f2]/95 backdrop-blur">
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <button className="focus-ring md:hidden" aria-label="Open menu" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="serif text-[24px] tracking-[0.16em]">
          VÉRANE
        </Link>

        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] md:flex">
          <Link className="hover:text-[#66715c]" href="/shop?sort=newest">New in</Link>
          <Link className="hover:text-[#66715c]" href="/women">Women</Link>
          <Link className="hover:text-[#66715c]" href="/men">Men</Link>
          <Link className="hover:text-[#66715c]" href="/shop">Collections</Link>
          <Link className="hover:text-[#66715c]" href="/journal">Journal</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="Search" className="focus-ring">
            <Search size={18} />
          </Link>

          <Link href="/account" aria-label="Account" className="hidden items-center gap-2 focus-ring sm:flex">
            <UserRound size={18} />
            {user ? <span className="text-[10px] uppercase tracking-[0.18em]">{user.firstName}</span> : null}
          </Link>

          <Link href="/wishlist" aria-label="Wishlist" className="relative hidden focus-ring sm:block">
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" aria-label="Shopping bag" className="focus-ring">
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/10 px-6 py-7 md:hidden">
          <div className="container flex flex-col gap-5 text-xs uppercase tracking-[0.18em]">
            <Link href="/shop?sort=newest" onClick={() => setOpen(false)}>New in</Link>
            <Link href="/women" onClick={() => setOpen(false)}>Women</Link>
            <Link href="/men" onClick={() => setOpen(false)}>Men</Link>
            <Link href="/shop" onClick={() => setOpen(false)}>Collections</Link>
            <Link href="/journal" onClick={() => setOpen(false)}>Journal</Link>
            <Link href="/account" onClick={() => setOpen(false)}>{user ? 'My account' : 'Account'}</Link>
            <Link href="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

