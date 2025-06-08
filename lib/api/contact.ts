export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  createdAt?: Date;
  updatedAt?: Date;
}

// Create new contact message
export async function createContactMessage(
  data: Omit<ContactMessage, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const { collection, addDoc } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    const now = new Date();
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...data,
      status: 'unread',
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating contact message:', error);
    throw error;
  }
}

// Get all contact messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    const q = query(
      collection(db, 'contact_messages'), 
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const messages: ContactMessage[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as ContactMessage);
    });

    return messages;
  } catch (error) {
    console.error('Error getting contact messages:', error);
    throw error;
  }
}

// Update message status
export async function updateMessageStatus(id: string, status: 'read' | 'unread'): Promise<void> {
  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    const docRef = doc(db, 'contact_messages', id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
}

// Delete contact message
export async function deleteContactMessage(id: string): Promise<void> {
  try {
    const { doc, deleteDoc } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    const docRef = doc(db, 'contact_messages', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
}