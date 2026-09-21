const WISHLIST_KEY = 'verane-wishlist';

export function emitWishlistChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('verane-wishlist'));
}

export function getWishlistIds(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
  } catch {
    return [];
  }
}

export function isInWishlist(productId: string) {
  return getWishlistIds().includes(productId);
}

export function toggleWishlist(productId: string) {
  const ids = getWishlistIds();
  const next = ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId];

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  }

  emitWishlistChange();
  return next;
}

export function clearWishlist() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(WISHLIST_KEY);
  }
  emitWishlistChange();
}
