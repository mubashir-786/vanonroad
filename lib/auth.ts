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
  if (typeof window === 'undefined') {
    throw new Error('Authentication only available on client side');
  }

  try {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { auth } = await import('@/lib/firebase');
    
    if (!auth || typeof auth !== 'object') {
      throw new Error('Firebase not properly initialized');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!isAdminEmail(user.email || '')) {
      const { signOut } = await import('firebase/auth');
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
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const { signOut } = await import('firebase/auth');
    const { auth } = await import('@/lib/firebase');
    
    if (!auth || typeof auth !== 'object') {
      throw new Error('Firebase not properly initialized');
    }
    
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Sign out failed');
  }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
  if (typeof window === 'undefined') {
    callback(null);
    return () => {};
  }

  try {
    import('firebase/auth').then(({ onAuthStateChanged }) => {
      import('@/lib/firebase').then(({ auth }) => {
        if (!auth || typeof auth !== 'object') {
          callback(null);
          return;
        }
        
        return onAuthStateChanged(auth, (user: any) => {
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
      });
    }).catch(() => {
      callback(null);
    });
    
    return () => {};
  } catch (error) {
    console.warn('Auth state change listener failed:', error);
    callback(null);
    return () => {};
  }
}