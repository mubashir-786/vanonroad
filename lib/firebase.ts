import { initializeApp, getApps } from 'firebase/app';

// Only import Firebase modules on the client side
let auth: any = null;
let storage: any = null;
let db: any = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase only on client side
let app: any = null;

if (typeof window !== 'undefined') {
  try {
    // Check if Firebase app is already initialized
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    // Dynamically import Firebase modules only on client side
    import('firebase/auth').then(({ getAuth }) => {
      auth = getAuth(app);
    }).catch(console.warn);
    
    import('firebase/storage').then(({ getStorage }) => {
      storage = getStorage(app);
    }).catch(console.warn);
    
    import('firebase/firestore').then(({ getFirestore }) => {
      db = getFirestore(app);
    }).catch(console.warn);
    
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

// Create mock objects for server-side rendering
if (typeof window === 'undefined') {
  auth = {} as any;
  storage = {} as any;
  db = {} as any;
}

export { auth, storage, db };
export default app;