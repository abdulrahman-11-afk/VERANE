import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

const featureList = [
  { icon: Sparkles, title: 'Curated edits', text: 'Neutral silhouettes, tactile layers and thoughtful staples.' },
  { icon: ShieldCheck, title: 'Material first', text: 'Premium fibers selected for longevity, softness and ease.' },
  { icon: Truck, title: 'Global delivery', text: 'Free shipping and easy returns on all full-price pieces.' },
];

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const categories = [
    { name: 'Women', href: '/women', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85' },
    { name: 'Men', href: '/men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85' },
    { name: 'Accessories', href: '/shop?category=Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85' },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#dfe0d8]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90"
            alt="VÉRANE collection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/30" />

        <div className="container relative flex min-h-[680px] flex-col justify-end py-16 text-white md:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-white/80">Autumn / Winter 2026</p>
            <h1 className="serif mt-5 text-5xl leading-[0.9] md:text-7xl lg:text-8xl">
              Defined by<br />your style.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/85 md:text-base">
              Considered wardrobe essentials and expressive silhouettes built to move with you through the day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/women" className="bg-white px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-black transition hover:bg-[#efece4]">
                Shop women
              </Link>
              <Link href="/men" className="border border-white/70 bg-white/5 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10">
                Shop men
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f6f2]">
        <div className="container grid gap-6 py-8 md:grid-cols-3">
          {featureList.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white/70 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#dfe4d9] text-[#2d372d]">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-black/70">{title}</p>
                <p className="mt-2 text-sm leading-6 text-black/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The edit</p>
            <h2 className="serif mt-3 text-4xl md:text-5xl">A new perspective</h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] md:flex">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>

        <Link href="/shop" className="mt-10 flex items-center justify-center gap-2 border-b border-black pb-3 text-xs uppercase tracking-[0.2em] md:hidden">
          View all pieces <ArrowUpRight size={15} />
        </Link>
      </section>

      <section className="bg-[#e7e1d8] py-20 md:py-28">
        <div className="container">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Shop by mood</p>
              <h2 className="serif mt-3 text-4xl md:text-5xl">A wardrobe for every rhythm</h2>
            </div>
            <Link href="/shop" className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] md:flex">
              Explore all <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((item) => (
              <Link key={item.name} href={item.href} className="group relative block overflow-hidden rounded-[28px] bg-[#d9d3cb]">
                <div className="relative h-[420px]">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/80">Collection</p>
                  <div className="mt-3 flex items-center justify-between">
                    <h3 className="serif text-3xl">{item.name}</h3>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/60 bg-white/10 backdrop-blur-sm">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Loved by clients</p>
            <h2 className="serif mt-3 text-4xl md:text-5xl">Quiet confidence, everyday ease</h2>
          </div>
          <div className="flex items-center gap-2 text-[#b18c42]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} className="fill-current" />
            ))}
            <span className="ml-2 text-sm text-black/65">4.9 / 5</span>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            'The tailoring is polished without feeling rigid — every piece feels considered.',
            'I wanted a wardrobe that was elevated but still wearable day to day. VÉRANE gets it.',
            'Beautiful fabrics and a truly modern silhouette. Everything feels personal and easy.',
          ].map((quote, index) => (
            <blockquote key={quote} className="rounded-[28px] border border-black/10 bg-white p-6">
              <p className="text-lg leading-8 text-black/75">“{quote}”</p>
              <footer className="mt-6 text-[10px] uppercase tracking-[0.2em] text-black/50">
                Client {index + 1}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
