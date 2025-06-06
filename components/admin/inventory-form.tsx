'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/admin/image-upload';
import { 
  createInventoryItem, 
  updateInventoryItem, 
  getInventoryItem,
  InventoryItem 
} from '@/lib/api/inventory';

interface InventoryFormProps {
  id?: string;
}

// Define the form data type that matches what we're creating
interface InventoryFormData {
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
}

export function InventoryForm({ id }: InventoryFormProps) {
  const router = useRouter();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<InventoryFormData>({
    title: '',
    price: 0,
    location: '',
    berths: 2,
    length: 0,
    make: '',
    model: '',
    year: new Date().getFullYear(),
    description: '',
    status: 'available'
  });

  // Load existing data for edit mode
  useEffect(() => {
    if (isEditMode && id) {
      loadInventoryItem(id);
    }
  }, [isEditMode, id]);

  const loadInventoryItem = async (itemId: string) => {
    try {
      setLoading(true);
      const item = await getInventoryItem(itemId);
      
      if (item) {
        setFormData({
          title: item.title,
          price: item.price,
          location: item.location,
          berths: item.berths,
          length: item.length,
          make: item.make,
          model: item.model,
          year: item.year,
          description: item.description,
          status: item.status
        });
        setExistingImages(item.images || []);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load inventory item');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isEditMode && id) {
        // For updates, we only pass the fields that can be updated
        const updateData: Partial<Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>> = {
          title: formData.title,
          price: formData.price,
          location: formData.location,
          berths: formData.berths,
          length: formData.length,
          make: formData.make,
          model: formData.model,
          year: formData.year,
          description: formData.description,
          status: formData.status
        };

        await updateInventoryItem(
          id,
          updateData,
          images.length > 0 ? images : undefined,
          imagesToDelete.length > 0 ? imagesToDelete : undefined
        );
        setSuccess('Vehicle updated successfully!');
      } else {
        // Create the inventory data object that matches the expected type
        const inventoryData: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'> = {
          title: formData.title,
          price: formData.price,
          location: formData.location,
          berths: formData.berths,
          length: formData.length,
          make: formData.make,
          model: formData.model,
          year: formData.year,
          description: formData.description,
          status: formData.status,
          images: [] // This will be handled by the API functions
        };

        await createInventoryItem(inventoryData, images);
        setSuccess('Vehicle added successfully!');
      }

      // Redirect after success
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Failed to save vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' || name === 'berths' || name === 'length' || name === 'year' 
        ? parseFloat(value) || 0 
        : value 
    }));
  };

  const handleSelectChange = (name: keyof InventoryFormData, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'berths' ? parseInt(value) : value 
    }));
  };

  const handleExistingImageRemove = (imageUrl: string) => {
    setImagesToDelete(prev => [...prev, imageUrl]);
    setExistingImages(prev => prev.filter(url => url !== imageUrl));
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Vehicle Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 2024 Signature Series Luxury"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (£)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="195000"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Yorkshire"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Select
                value={formData.make}
                onValueChange={(value) => handleSelectChange('make', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="fiat">Fiat</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. Signature"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                min="1900"
                max="2100"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="berths">Berths</Label>
              <Select
                value={formData.berths.toString()}
                onValueChange={(value) => handleSelectChange('berths', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select berths" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Berths</SelectItem>
                  <SelectItem value="4">4 Berths</SelectItem>
                  <SelectItem value="6">6 Berths</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Length (m)</Label>
              <Input
                id="length"
                name="length"
                type="number"
                value={formData.length}
                onChange={handleChange}
                placeholder="8.5"
                step="0.1"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter vehicle description..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange('status', value as 'available' | 'sold' | 'reserved')}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              existingImages={existingImages}
              onExistingImageRemove={handleExistingImageRemove}
              maxImages={10}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              isEditMode ? 'Update Vehicle' : 'Add Vehicle'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}