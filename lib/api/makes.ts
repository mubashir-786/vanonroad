export interface Make {
  id?: string;
  name: string;
  displayName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create new make
export async function createMake(
  data: Omit<Make, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const { collection, addDoc, query, where, getDocs } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    // Check if make already exists
    const q = query(
      collection(db, 'makes'),
      where('name', '==', data.name.toLowerCase())
    );
    const existingMakes = await getDocs(q);
    
    if (!existingMakes.empty) {
      throw new Error('Make already exists');
    }
    
    const now = new Date();
    const docRef = await addDoc(collection(db, 'makes'), {
      ...data,
      name: data.name.toLowerCase(), // Store lowercase for consistency
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating make:', error);
    throw error;
  }
}

// Get all makes
export async function getMakes(): Promise<Make[]> {
  try {
    const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    const q = query(
      collection(db, 'makes'), 
      orderBy('displayName', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const makes: Make[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      makes.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Make);
    });

    return makes;
  } catch (error) {
    console.error('Error getting makes:', error);
    throw error;
  }
}

// Get single make by ID
export async function getMake(id: string): Promise<Make | null> {
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    const docRef = doc(db, 'makes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Make;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting make:', error);
    throw error;
  }
}

// Update make
export async function updateMake(
  id: string,
  data: Partial<Omit<Make, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  try {
    const { doc, updateDoc, query, where, getDocs, collection } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    // If updating name, check if it already exists
    if (data.name) {
      const q = query(
        collection(db, 'makes'),
        where('name', '==', data.name.toLowerCase())
      );
      const existingMakes = await getDocs(q);
      
      // Check if any existing make has this name (excluding current make)
      const duplicateExists = existingMakes.docs.some(doc => doc.id !== id);
      if (duplicateExists) {
        throw new Error('Make already exists');
      }
    }
    
    const docRef = doc(db, 'makes', id);
    
    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };
    
    // Ensure name is lowercase
    if (data.name) {
      updateData.name = data.name.toLowerCase();
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating make:', error);
    throw error;
  }
}

// Delete make
export async function deleteMake(id: string): Promise<void> {
  try {
    const { doc, deleteDoc, collection, query, where, getDocs } = await import('firebase/firestore');
    const { getFirebaseDb } = await import('@/lib/firebase');
    
    const db = getFirebaseDb();
    if (!db) {
      throw new Error('Firebase Firestore not initialized');
    }
    
    // Get the make to check its name
    const make = await getMake(id);
    if (!make) {
      throw new Error('Make not found');
    }
    
    // Check if any inventory items use this make
    const inventoryQuery = query(
      collection(db, 'inventory'),
      where('make', '==', make.name)
    );
    const inventorySnapshot = await getDocs(inventoryQuery);
    
    if (!inventorySnapshot.empty) {
      throw new Error('Cannot delete make that is being used by inventory items');
    }
    
    // Delete the make
    const docRef = doc(db, 'makes', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting make:', error);
    throw error;
  }
}