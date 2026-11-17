import { DEMO_USERS } from '../data/admin-seed';
import type { User, UserRole } from '../types';
import { storage } from './storage';

const AUTH_SESSION_KEY = 'demo_session_user';
const USERS_REGISTRY_KEY = 'demo_users_registry';

function getUsersRegistry(): User[] {
  const saved = storage.get<User[] | null>(USERS_REGISTRY_KEY, null);
  if (!saved || saved.length === 0) {
    storage.set(USERS_REGISTRY_KEY, DEMO_USERS);
    return DEMO_USERS;
  }
  return saved;
}

export const authService = {
  getCurrentUser(): User | null {
    return storage.get<User | null>(AUTH_SESSION_KEY, null);
  },

  getAllUsers(): User[] {
    return getUsersRegistry();
  },

  async loginDemo(email: string, _password: string): Promise<{ user: User; error?: string }> {
    await new Promise((r) => setTimeout(r, 250));
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsersRegistry();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      storage.set(AUTH_SESSION_KEY, existing);
      return { user: existing };
    }
    // In demo mode, allow signing in with any valid-looking email as a demo student
    const role: UserRole = normalizedEmail.includes('admin') ? 'admin' : 'student';
    const created: User = {
      id: `usr-${Date.now()}`,
      fullName: normalizedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: normalizedEmail,
      phone: '+91 90000 00000',
      role,
      title: role === 'admin' ? 'Platform Administrator' : 'Software Engineer',
      joinedAt: new Date().toISOString(),
    };
    const nextUsers = [created, ...users];
    storage.set(USERS_REGISTRY_KEY, nextUsers);
    storage.set(AUTH_SESSION_KEY, created);
    return { user: created };
  },

  async quickDemoLogin(role: UserRole): Promise<User> {
    const users = getUsersRegistry();
    const target =
      users.find((u) => u.role === role) ??
      DEMO_USERS.find((u) => u.role === role) ??
      DEMO_USERS[0];
    storage.set(AUTH_SESSION_KEY, target);
    return target;
  },

  async registerDemo(input: {
    fullName: string;
    email: string;
    phone: string;
  }): Promise<User> {
    await new Promise((r) => setTimeout(r, 300));
    const users = getUsersRegistry();
    const existing = users.find((u) => u.email.toLowerCase() === input.email.trim().toLowerCase());
    if (existing) {
      storage.set(AUTH_SESSION_KEY, existing);
      return existing;
    }
    // Never store passwords in localStorage
    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      role: 'student',
      title: 'Software Engineer',
      joinedAt: new Date().toISOString(),
    };
    storage.set(USERS_REGISTRY_KEY, [newUser, ...users]);
    storage.set(AUTH_SESSION_KEY, newUser);
    return newUser;
  },

  async requestPasswordResetDemo(email: string): Promise<{ ok: boolean; message: string }> {
    await new Promise((r) => setTimeout(r, 250));
    return {
      ok: true,
      message: `Demo reset link simulated for ${email}. Production environments will dispatch a signed verification email.`,
    };
  },

  updateProfile(userId: string, patch: Partial<Pick<User, 'fullName' | 'phone' | 'title' | 'githubUrl' | 'linkedinUrl' | 'bio'>>): User | null {
    const users = getUsersRegistry();
    let updatedUser: User | null = null;
    const nextUsers = users.map((u) => {
      if (u.id === userId) {
        updatedUser = { ...u, ...patch };
        return updatedUser;
      }
      return u;
    });
    storage.set(USERS_REGISTRY_KEY, nextUsers);
    const current = this.getCurrentUser();
    if (current && current.id === userId && updatedUser) {
      storage.set(AUTH_SESSION_KEY, updatedUser);
    }
    return updatedUser;
  },

  logout(): void {
    storage.remove(AUTH_SESSION_KEY);
  },
};
