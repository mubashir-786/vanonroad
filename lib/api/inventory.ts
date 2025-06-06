// Mock data for development when Firebase is not available
const mockInventoryItems: any[] = [
  {
    id: '1',
    title: '2024 Signature Series Luxury',
    price: 195000,
    location: 'Yorkshire',
    berths: 6,
    length: 8.5,
    make: 'mercedes',
    model: 'Signature',
    year: 2024,
    description: 'Luxury motorhome with premium finishes and top-of-the-line amenities.',
    status: 'available',
    images: ['https://images.pexels.com/photos/2506711/pexels-photo-2506711.jpeg'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: '2023 Elite Range',
    price: 175000,
    location: 'Cornwall',
    berths: 4,
    length: 7.8,
    make: 'fiat',
    model: 'Elite',
    year: 2023,
    description: 'Premium motorhome with modern design and excellent build quality.',
    status: 'available',
    images: ['https://images.pexels.com/photos/2769583/pexels-photo-2769583.jpeg'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: '2022 Urban Explorer',
    price: 120000,
    location: 'Lake District',
    berths: 2,
    length: 6.4,
    make: 'volkswagen',
    model: 'Urban',
    year: 2022,
    description: 'Compact and efficient motorhome perfect for couples.',
    status: 'available',
    images: ['https://images.pexels.com/photos/2918521/pexels-photo-2918521.jpeg'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export interface InventoryItem {
  id?: string;
  title: string;
  price: number;
  location: string;
  berths: number;
  length: number;
  make: string;
  model: string;
  year: number;
  description: string;
  status: 'available' | 'sold' | 'reserved';
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryFilters {
  make?: string;
  berths?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  search?: string;
}

// Check if Firebase is properly initialized
async function isFirebaseAvailable(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const { db } = await import('@/lib/firebase');
    return typeof db === 'object' && 
           db !== null && 
           'collection' in db;
  } catch (error) {
    return false;
  }
}

// Upload multiple images to Firebase Storage
export async function uploadImages(files: File[], itemId: string): Promise<string[]> {
  const firebaseAvailable = await isFirebaseAvailable();
  
  if (!firebaseAvailable) {
    // Return mock URLs for development
    return files.map((_, index) => `https://images.pexels.com/photos/mock-${itemId}-${index}.jpeg`);
  }

  try {
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const { storage } = await import('@/lib/firebase');
    
    const uploadPromises = files.map(async (file, index) => {
      const fileName = `${itemId}_${index}_${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `inventory/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    });

    return Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}

// Delete images from Firebase Storage
export async function deleteImages(imageUrls: string[]): Promise<void> {
  const firebaseAvailable = await isFirebaseAvailable();
  
  if (!firebaseAvailable) {
    return; // Skip deletion in development mode
  }

  try {
    const { ref, deleteObject } = await import('firebase/storage');
    const { storage } = await import('@/lib/firebase');
    
    const deletePromises = imageUrls.map(async (url) => {
      try {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting images:', error);
  }
}

// Create new inventory item
export async function createInventoryItem(
  data: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>,
  imageFiles: File[]
): Promise<string> {
  const firebaseAvailable = await isFirebaseAvailable();
  
  if (!firebaseAvailable) {
    // Mock implementation for development
    const mockId = Date.now().toString();
    const mockItem: InventoryItem = {
      ...data,
      id: mockId,
      images: imageFiles.map((_, index) => `https://images.pexels.com/photos/mock-${mockId}-${index}.jpeg`),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockInventoryItems.push(mockItem);
    return mockId;
  }

  try {
    const { collection, addDoc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase');
    
    const now = new Date();
    const docRef = await addDoc(collection(db, 'inventory'), {
      ...data,
      images: [], // Will be updated after image upload
      createdAt: now,
      updatedAt: now,
    });

    // Upload images if provided
    if (imageFiles.length > 0) {
      const imageUrls = await uploadImages(imageFiles, docRef.id);
      await updateDoc(docRef, { images: imageUrls });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating inventory item:', error);
    throw error;
  }
}

// Get all inventory items with optional filters
export async function getInventoryItems(
  filters?: InventoryFilters,
  pageSize: number = 10
): Promise<{ items: InventoryItem[] }> {
  const firebaseAvailable = await isFirebaseAvailable();
  
  if (!firebaseAvailable) {
    // Return mock data for development
    let filteredItems = [...mockInventoryItems];
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.make.toLowerCase().includes(searchTerm) ||
        item.model.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters?.make) {
      filteredItems = filteredItems.filter(item => item.make === filters.make);
    }
    
    if (filters?.berths) {
      filteredItems = filteredItems.filter(item => item.berths === filters.berths);
    }
    
    if (filters?.status) {
      filteredItems = filteredItems.filter(item => item.status === filters.status);
    }
    
    if (filters?.minPrice) {
      filteredItems = filteredItems.filter(item => item.price >= filters.minPrice!);
    }
    
    if (filters?.maxPrice) {
      filteredItems = filteredItems.filter(item => item.price <= filters.maxPrice!);
    }
    
    return { items: filteredItems.slice(0, pageSize) };
  }

  try {
    const { collection, getDocs, query, orderBy, where, limit } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase');
    
    let q = query(collection(db, 'inventory'), orderBy('createdAt', 'desc'));

    // Apply filters
    if (filters?.make) {
      q = query(q, where('make', '==', filters.make));
    }
    if (filters?.berths) {
      q = query(q, where('berths', '==', filters.berths));
    }
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters?.minPrice) {
      q = query(q, where('price', '>=', filters.minPrice));
    }
    if (filters?.maxPrice) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }

    q = query(q, limit(pageSize));

    const querySnapshot = await getDocs(q);
    const items: InventoryItem[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      items.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as InventoryItem);
    });

    // Filter by search term (client-side for now)
    let filteredItems = items;
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.make.toLowerCase().includes(searchTerm) ||
        item.model.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }

    return { items: filteredItems };
  } catch (error) {
    console.error('Error getting inventory items:', error);
    throw error;
  }
}

// Get single inventory item by ID
export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  const firebaseAvailable = await isFirebaseAvailable();
  
  if (!firebaseAvailable) {
    // Return mock data for development
    return mockInventoryItems.find(item => item.id === id) || null;
  }

  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase');
    
    const docRef = doc(db, 'inventory', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as InventoryItem;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting inventory item:', error);
    throw error;
  }
}

// Update inventory item
export async function updateInventoryItem(
  id: string,
  data: Partial<Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>>,
  newImageFiles?: File[],
  imagesToDelete?: string[]
): Promise<void> {
  const firebaseAvailable = await isFirebaseAvailable();
  
  if (!firebaseAvailable) {
    // Mock implementation for development
    const itemIndex = mockInventoryItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      mockInventoryItems[itemIndex] = {
        ...mockInventoryItems[itemIndex],
        ...data,
        updatedAt: new Date(),
      };
    }
    return;
  }

  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase');
    
    const docRef = doc(db, 'inventory', id);
    
    // Delete old images if specified
    if (imagesToDelete && imagesToDelete.length > 0) {
      await deleteImages(imagesToDelete);
    }

    // Upload new images if provided
    let newImageUrls: string[] = [];
    if (newImageFiles && newImageFiles.length > 0) {
      newImageUrls = await uploadImages(newImageFiles, id);
    }

    // Update the document
    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };

    // Handle image updates
    if (newImageUrls.length > 0) {
      const currentItem = await getInventoryItem(id);
      const existingImages = currentItem?.images || [];
      const filteredExistingImages = existingImages.filter(url => 
        !imagesToDelete?.includes(url)
      );
      updateData.images = [...filteredExistingImages, ...newImageUrls];
    } else if (imagesToDelete && imagesToDelete.length > 0) {
      const currentItem = await getInventoryItem(id);
      const existingImages = currentItem?.images || [];
      updateData.images = existingImages.filter(url => 
        !imagesToDelete.includes(url)
      );
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    throw error;
  }
}

// Delete inventory item
export async function deleteInventoryItem(id: string): Promise<void> {
  const firebaseAvailable = await isFirebaseAvailable();
  
  if (!firebaseAvailable) {
    // Mock implementation for development
    const itemIndex = mockInventoryItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      mockInventoryItems.splice(itemIndex, 1);
    }
    return;
  }

  try {
    const { doc, deleteDoc } = await import('firebase/firestore');
    const { db } = await import('@/lib/firebase');
    
    // Get the item to delete its images
    const item = await getInventoryItem(id);
    
    if (item && item.images.length > 0) {
      await deleteImages(item.images);
    }

    // Delete the document
    const docRef = doc(db, 'inventory', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
}