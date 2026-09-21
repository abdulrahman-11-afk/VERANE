'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/lib/products';
import { money } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { isInWishlist, toggleWishlist } from '@/lib/wishlist';

export function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWishlist(product.id));

    const update = () => setSaved(isInWishlist(product.id));
    window.addEventListener('verane-wishlist', update);
    return () => window.removeEventListener('verane-wishlist', update);
  }, [product.id]);

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#e5e3dd]">
        <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
          <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
        </Link>

        {product.compareAt && (
          <span className="absolute left-3 top-3 bg-[#66715c] px-2 py-1 text-[9px] uppercase tracking-widest text-white">
            Sale
          </span>
        )}

        <button
          onClick={() => {
            toggleWishlist(product.id);
            setSaved((current) => !current);
          }}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          className="focus-ring absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#f7f6f2]/90"
        >
          <Heart size={15} fill={saved ? '#181817' : 'none'} />
        </button>

        <Link href={`/product/${product.slug}`} className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-center gap-2 bg-[#f7f6f2] py-3 text-[10px] uppercase tracking-[.18em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          Quick view <Plus size={13} />
        </Link>
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <div>
          <Link href={`/product/${product.slug}`} className="text-sm hover:underline">{product.name}</Link>
          <p className="mt-1 text-xs text-black/50">{product.colors.join(' · ')}</p>
        </div>
        <div className="text-right text-sm">
          {money(product.price)}
          {product.compareAt && <span className="ml-2 text-xs text-black/40 line-through">{money(product.compareAt)}</span>}
        </div>
      </div>
    </article>
  );
}
