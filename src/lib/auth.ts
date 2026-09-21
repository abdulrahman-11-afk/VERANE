export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const USERS_KEY = 'verane-users';
const SESSION_KEY = 'verane-session';

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function emitAuthChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('verane-auth'));
}

export function getStoredUsers(): AuthUser[] {
  return safeRead<AuthUser[]>(USERS_KEY, []);
}

export function getSessionUser(): AuthUser | null {
  return safeRead<AuthUser | null>(SESSION_KEY, null);
}

export function saveSessionUser(user: AuthUser | null) {
  if (user) {
    safeWrite(SESSION_KEY, user);
    return;
  }

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

export function logoutUser() {
  saveSessionUser(null);
  emitAuthChange();
}

export function signUpUser({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();

  if (!firstName.trim() || !lastName.trim() || !normalizedEmail || !password.trim()) {
    throw new Error('Please complete every field.');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error('An account already exists with that email.');
  }

  const user: AuthUser = {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    password,
  };

  safeWrite(USERS_KEY, [...users, user]);
  saveSessionUser(user);
  emitAuthChange();

  return user;
}

export function loginUser({ email, password }: { email: string; password: string }) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const match = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
  );

  if (!match) {
    throw new Error('Invalid email or password.');
  }

  saveSessionUser(match);
  emitAuthChange();

  return match;
}
