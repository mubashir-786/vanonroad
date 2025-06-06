import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  isAdmin: boolean;
}

// Admin email addresses (you can move this to environment variables)
const ADMIN_EMAILS = [
  'admin@vanonroad.com',
];

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function signInAdmin(email: string, password: string): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!isAdminEmail(user.email || '')) {
      await signOut(auth);
      throw new Error('Access denied. Admin privileges required.');
    }

    return {
      uid: user.uid,
      email: user.email,
      isAdmin: true
    };
  } catch (error: any) {
    throw new Error(error.message || 'Authentication failed');
  }
}

export async function signOutAdmin(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Sign out failed');
  }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user && isAdminEmail(user.email || '')) {
      callback({
        uid: user.uid,
        email: user.email,
        isAdmin: true
      });
    } else {
      callback(null);
    }
  });
}