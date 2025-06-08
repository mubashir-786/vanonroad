export interface AuthUser {
  uid: string;
  email: string | null;
  isAdmin: boolean;
}

// Admin email addresses
const ADMIN_EMAILS = [
  'joshuamontevalde@gmail.com',
  'alinapopa9629@gmail.com',
'test@mailinator.com'
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
    const { getFirebaseAuth } = await import('@/lib/firebase');
    
    const auth = getFirebaseAuth();
    if (!auth) {
      throw new Error('Firebase not properly initialized');
    }
    
    if (!isAdminEmail(email)) {
      throw new Error('Access denied. Admin privileges required.');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return {
      uid: user.uid,
      email: user.email,
      isAdmin: true
    };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.');
    }
    throw new Error(error.message || 'Authentication failed');
  }
}

export async function resetPassword(email: string): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('Password reset only available on client side');
  }

  try {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    const { getFirebaseAuth } = await import('@/lib/firebase');
    
    const auth = getFirebaseAuth();
    if (!auth) {
      throw new Error('Firebase not properly initialized');
    }
    
    if (!isAdminEmail(email)) {
      throw new Error('Access denied. Admin privileges required.');
    }
    
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    }
    throw new Error(error.message || 'Failed to send password reset email');
  }
}

export async function signOutAdmin(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const { signOut } = await import('firebase/auth');
    const { getFirebaseAuth } = await import('@/lib/firebase');
    
    const auth = getFirebaseAuth();
    if (!auth) {
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

  let unsubscribe: (() => void) | null = null;

  import('firebase/auth').then(({ onAuthStateChanged }) => {
    import('@/lib/firebase').then(({ getFirebaseAuth }) => {
      const auth = getFirebaseAuth();
      if (!auth) {
        callback(null);
        return;
      }
      
      unsubscribe = onAuthStateChanged(auth, (user: any) => {
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
  
  return () => {
    if (unsubscribe) unsubscribe();
  };
}
