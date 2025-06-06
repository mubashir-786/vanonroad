// Real database implementation using Supabase
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
  created_at?: string;
  updated_at?: string;
}

export interface InventoryFilters {
  make?: string;
  berths?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  search?: string;
}

// Supabase client setup
let supabase: any = null;

async function getSupabaseClient() {
  if (supabase) return supabase;
  
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
    }
    
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    return supabase;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    throw error;
  }
}

// Upload multiple images to Supabase Storage
export async function uploadImages(files: File[], itemId: string): Promise<string[]> {
  try {
    const supabase = await getSupabaseClient();
    
    const uploadPromises = files.map(async (file, index) => {
      const fileName = `${itemId}_${index}_${Date.now()}_${file.name}`;
      const filePath = `inventory/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('inventory-images')
        .upload(filePath, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('inventory-images')
        .getPublicUrl(filePath);
      
      return publicUrl;
    });

    return Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}

// Delete images from Supabase Storage
export async function deleteImages(imageUrls: string[]): Promise<void> {
  try {
    const supabase = await getSupabaseClient();
    
    const deletePromises = imageUrls.map(async (url) => {
      try {
        // Extract file path from URL
        const urlParts = url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `inventory/${fileName}`;
        
        const { error } = await supabase.storage
          .from('inventory-images')
          .remove([filePath]);
        
        if (error) console.error('Error deleting image:', error);
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
  data: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>,
  imageFiles: File[]
): Promise<string> {
  try {
    const supabase = await getSupabaseClient();
    
    // First create the inventory item without images
    const { data: item, error } = await supabase
      .from('inventory')
      .insert([{
        ...data,
        images: [], // Will be updated after image upload
      }])
      .select()
      .single();

    if (error) throw error;

    // Upload images if provided
    if (imageFiles.length > 0) {
      const imageUrls = await uploadImages(imageFiles, item.id);
      
      // Update the item with image URLs
      const { error: updateError } = await supabase
        .from('inventory')
        .update({ images: imageUrls })
        .eq('id', item.id);
      
      if (updateError) throw updateError;
    }

    return item.id;
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
  try {
    const supabase = await getSupabaseClient();
    
    let query = supabase
      .from('inventory')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(pageSize);

    // Apply filters
    if (filters?.make) {
      query = query.eq('make', filters.make);
    }
    if (filters?.berths) {
      query = query.eq('berths', filters.berths);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,make.ilike.%${filters.search}%,model.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { items: data || [] };
  } catch (error) {
    console.error('Error getting inventory items:', error);
    throw error;
  }
}

// Get single inventory item by ID
export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  try {
    const supabase = await getSupabaseClient();
    
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Item not found
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting inventory item:', error);
    throw error;
  }
}

// Update inventory item
export async function updateInventoryItem(
  id: string,
  data: Partial<Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>>,
  newImageFiles?: File[],
  imagesToDelete?: string[]
): Promise<void> {
  try {
    const supabase = await getSupabaseClient();
    
    // Delete old images if specified
    if (imagesToDelete && imagesToDelete.length > 0) {
      await deleteImages(imagesToDelete);
    }

    // Upload new images if provided
    let newImageUrls: string[] = [];
    if (newImageFiles && newImageFiles.length > 0) {
      newImageUrls = await uploadImages(newImageFiles, id);
    }

    // Prepare update data
    const updateData: any = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    // Handle image updates
    if (newImageUrls.length > 0 || (imagesToDelete && imagesToDelete.length > 0)) {
      const currentItem = await getInventoryItem(id);
      const existingImages = currentItem?.images || [];
      
      let updatedImages = existingImages;
      
      // Remove deleted images
      if (imagesToDelete && imagesToDelete.length > 0) {
        updatedImages = existingImages.filter(url => !imagesToDelete.includes(url));
      }
      
      // Add new images
      if (newImageUrls.length > 0) {
        updatedImages = [...updatedImages, ...newImageUrls];
      }
      
      updateData.images = updatedImages;
    }

    const { error } = await supabase
      .from('inventory')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating inventory item:', error);
    throw error;
  }
}

// Delete inventory item
export async function deleteInventoryItem(id: string): Promise<void> {
  try {
    const supabase = await getSupabaseClient();
    
    // Get the item to delete its images
    const item = await getInventoryItem(id);
    
    if (item && item.images.length > 0) {
      await deleteImages(item.images);
    }

    // Delete the item
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
}