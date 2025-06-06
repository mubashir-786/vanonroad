'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Phone, Mail, ArrowLeft, Loader2, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import { getInventoryItem, InventoryItem } from '@/lib/api/inventory';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface InventoryDetailsProps {
  id: string;
}

export function InventoryDetails({ id }: InventoryDetailsProps) {
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  useEffect(() => {
    loadInventoryItem();
  }, [id]);

  const loadInventoryItem = async () => {
    try {
      setLoading(true);
      const inventoryItem = await getInventoryItem(id);
      setItem(inventoryItem);
    } catch (error: any) {
      setError(error.message || 'Failed to load vehicle details');
    } finally {
      setLoading(false);
    }
  };

  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index);
    setIsFullscreenOpen(true);
  };

  const nextFullscreenImage = () => {
    if (item?.images) {
      setFullscreenImageIndex((prev) => (prev + 1) % item.images.length);
    }
  };

  const prevFullscreenImage = () => {
    if (item?.images) {
      setFullscreenImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isFullscreenOpen) return;
    
    if (e.key === 'ArrowLeft') {
      prevFullscreenImage();
    } else if (e.key === 'ArrowRight') {
      nextFullscreenImage();
    } else if (e.key === 'Escape') {
      setIsFullscreenOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenOpen, item?.images]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        <p className="text-red-500 mb-4">{error || 'Vehicle not found'}</p>
        <Link href="/inventory">
          <Button>Back to Inventory</Button>
        </Link>
      </div>
    );
  }

  const images = item.images && item.images.length > 0 
    ? item.images 
    : ['https://images.pexels.com/photos/2506711/pexels-photo-2506711.jpeg'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/inventory">Inventory</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{item.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 flex items-center justify-between">
        <Link href="/inventory">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Button>
        </Link>
        <Badge 
          variant="outline" 
          className={`${
            item.status === 'available' 
              ? 'text-green-500 border-green-500' 
              : item.status === 'sold'
              ? 'text-red-500 border-red-500'
              : 'text-yellow-500 border-yellow-500'
          }`}
        >
          {item.status}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer group">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${images[activeImage]})` }}
              onClick={() => openFullscreen(activeImage)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                Click to view full size
              </div>
            </div>
            {images.length > 1 && (
              <>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                  {activeImage + 1} / {images.length}
                </div>
                {activeImage > 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(activeImage - 1);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                {activeImage < images.length - 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(activeImage + 1);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Thumbnail Grid */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === index 
                      ? 'border-amber-500 ring-2 ring-amber-200' 
                      : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-200"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-playfair mb-2">{item.title}</h1>
            <p className="text-2xl font-semibold text-amber-500">£{item.price.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span>{item.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-500" />
              <span>{item.berths} Berths</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                {item.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Make</span>
                  <span className="font-medium capitalize">{item.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Model</span>
                  <span className="font-medium">{item.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Year</span>
                  <span className="font-medium">{item.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Berths</span>
                  <span className="font-medium">{item.berths}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Status</span>
                  <span className="font-medium capitalize">{item.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {item.status === 'available' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <div className="space-y-4">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Sales Team
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Enquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setIsFullscreenOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded text-sm">
              {fullscreenImageIndex + 1} / {images.length}
            </div>

            {/* Main Image */}
            <img
              src={images[fullscreenImageIndex]}
              alt={`${item.title} - Image ${fullscreenImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  onClick={prevFullscreenImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  onClick={nextFullscreenImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg max-w-[90vw] overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setFullscreenImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                      fullscreenImageIndex === index 
                        ? 'border-amber-500' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Instructions */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
              Use arrow keys or click arrows to navigate • Press ESC to close
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}