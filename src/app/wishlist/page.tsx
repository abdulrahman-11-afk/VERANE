'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Product, products } from '@/lib/products';
import { clearWishlist, getWishlistIds, toggleWishlist } from '@/lib/wishlist';
import { money } from '@/lib/utils';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const syncWishlist = () => {
    const ids = getWishlistIds();
    setWishlist(products.filter((product) => ids.includes(product.id)));
  };

  useEffect(() => {
    syncWishlist();
    window.addEventListener('verane-wishlist', syncWishlist);
    return () => window.removeEventListener('verane-wishlist', syncWishlist);
  }, []);

  if (!wishlist.length) {
    return (
      <div className="container min-h-[55vh] py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Saved pieces</p>
          <h1 className="serif mt-4 text-5xl">Your wishlist is empty.</h1>
          <p className="mt-5 text-sm leading-6 text-black/60">
            Save pieces you love and keep them close for your next edit.
          </p>
          <Link href="/shop" className="mt-8 inline-block bg-black px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white">
            Shop the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Saved pieces</p>
          <h1 className="serif mt-3 text-5xl">Wishlist</h1>
        </div>

        <button
          type="button"
          onClick={() => {
            clearWishlist();
            syncWishlist();
          }}
          className="border border-black px-5 py-3 text-[10px] uppercase tracking-[0.2em]"
        >
          Clear all
        </button>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {wishlist.map((product) => (
          <article key={product.id} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e1d8]">
              <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
                <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  toggleWishlist(product.id);
                  syncWishlist();
                }}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#f7f6f2]/90"
                aria-label="Remove from wishlist"
              >
                <span className="text-base">♥</span>
              </button>
            </div>

            <div className="flex items-start justify-between gap-3 pt-4">
              <div>
                <Link href={`/product/${product.slug}`} className="text-sm hover:underline">{product.name}</Link>
                <p className="mt-1 text-xs text-black/50">{product.colors.join(' · ')}</p>
              </div>
              <p className="text-sm">{money(product.price)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
