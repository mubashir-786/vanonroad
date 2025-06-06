import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only on client side
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

function initializeFirebase() {
  if (typeof window !== 'undefined' && !app) {
    try {
      // Check if Firebase app is already initialized
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
      
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
    } catch (error) {
      console.warn('Firebase initialization failed:', error);
    }
  }
}

// Initialize on module load if on client side
if (typeof window !== 'undefined') {
  initializeFirebase();
}

// Getter functions to ensure Firebase is initialized before access
export function getFirebaseAuth() {
  if (typeof window === 'undefined') return null;
  if (!auth) initializeFirebase();
  return auth;
}

export function getFirebaseDb() {
  if (typeof window === 'undefined') return null;
  if (!db) initializeFirebase();
  return db;
}

export function getFirebaseStorage() {
  if (typeof window === 'undefined') return null;
  if (!storage) initializeFirebase();
  return storage;
}

// Legacy exports for backward compatibility
export { auth, db, storage };
export default app;