'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  existingImages?: string[];
  onExistingImageRemove?: (imageUrl: string) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUpload({
  images,
  onImagesChange,
  existingImages = [],
  onExistingImageRemove,
  maxImages = 10,
  className
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const totalImages = images.length + existingImages.length;
    const remainingSlots = maxImages - totalImages;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      onImagesChange([...images, ...filesToAdd]);
    }
  }, [images, existingImages.length, maxImages, onImagesChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const totalImages = images.length + existingImages.length;
    const remainingSlots = maxImages - totalImages;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      onImagesChange([...images, ...filesToAdd]);
    }

    // Reset input
    e.target.value = '';
  }, [images, existingImages.length, maxImages, onImagesChange]);

  const removeNewImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  }, [images, onImagesChange]);

  const removeExistingImage = useCallback((imageUrl: string) => {
    if (onExistingImageRemove) {
      onExistingImageRemove(imageUrl);
    }
  }, [onExistingImageRemove]);

  const totalImages = images.length + existingImages.length;
  const canAddMore = totalImages < maxImages;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {canAddMore && (
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            dragActive
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
              : 'border-slate-300 dark:border-slate-600 hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
              <Upload className="h-8 w-8 text-slate-500" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">
                Drop images here or click to upload
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                PNG, JPG, WEBP up to 10MB each
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {totalImages}/{maxImages} images uploaded
              </p>
            </div>
            
            <Button type="button" variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </div>
      )}

      {/* Image Previews */}
      {(existingImages.length > 0 || images.length > 0) && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-slate-900 dark:text-white">
            Images ({totalImages}/{maxImages})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Existing Images */}
            {existingImages.map((imageUrl, index) => (
              <Card key={`existing-${index}`} className="relative group overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={imageUrl}
                      alt={`Existing image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeExistingImage(imageUrl)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Saved
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* New Images */}
            {images.map((file, index) => (
              <Card key={`new-${index}`} className="relative group overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeNewImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      New
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress Info */}
      {!canAddMore && (
        <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Maximum number of images ({maxImages}) reached
          </p>
        </div>
      )}
    </div>
  );
}