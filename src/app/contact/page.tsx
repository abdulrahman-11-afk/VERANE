import Link from 'next/link';

export default function Contact() {
  return (
    <div className="container max-w-3xl py-16 md:py-20">
      <p className="eyebrow">Customer care</p>
      <h1 className="serif mt-3 text-5xl">Contact VÉRANE</h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
        Questions about an order, sizing, or a piece you have your eye on? Our care team is happy to help.
      </p>

      <div className="mt-12 grid gap-10 border-y border-black/15 py-10 sm:grid-cols-2">
        <section>
          <h2 className="serif text-2xl">Email</h2>
          <p className="mt-3 text-sm leading-6 text-black/60">
            Write to us and we&apos;ll reply within one business day.
          </p>
          <a href="mailto:care@verane.example" className="mt-5 inline-block text-sm underline underline-offset-4">
            care@verane.example
          </a>
        </section>

        <section>
          <h2 className="serif text-2xl">Order support</h2>
          <p className="mt-3 text-sm leading-6 text-black/60">
            Include your order number so we can help you more quickly with delivery or returns.
          </p>
          <Link href="/shipping" className="mt-5 inline-block text-sm underline underline-offset-4">
            Shipping &amp; returns
          </Link>
        </section>
      </div>
    </div>
  );
}
