'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, MapPin, Users, ArrowLeft, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { getInventoryItem, InventoryItem } from '@/lib/api/inventory';
import { createContactMessage } from '@/lib/api/contact';
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
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState('');
  const [enquiryError, setEnquiryError] = useState('');
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
    // Prevent body scroll when fullscreen is open
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
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
      e.preventDefault();
      prevFullscreenImage();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextFullscreenImage();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeFullscreen();
    }
  };

  useEffect(() => {
    if (isFullscreenOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isFullscreenOpen, item?.images]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryLoading(true);
    setEnquiryError('');
    setEnquirySuccess('');

    try {
      await createContactMessage({
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        subject: `Enquiry about ${item?.title}`,
        message: enquiryData.message
      });
      setEnquirySuccess('Your enquiry has been sent successfully! We will get back to you soon.');
      setEnquiryData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setIsEnquiryOpen(false);
        setEnquirySuccess('');
      }, 2000);
    } catch (error: any) {
      setEnquiryError(error.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleEnquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEnquiryData(prev => ({ ...prev, [name]: value }));
  };

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
              <Link href="/" className="text-slate-900 dark:text-slate-100">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/inventory" className="text-slate-900 dark:text-slate-100">Inventory</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-slate-900 dark:text-slate-100">{item.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 flex items-center justify-between">
        <Link href="/inventory">
          <Button variant="ghost" className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
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
            <img
              src={images[activeImage]}
              alt={`${item.title} - Main image`}
              className="w-full h-full object-cover"
              onClick={() => openFullscreen(activeImage)}
            />
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
                  <img
                    src={image}
                    alt={`${item.title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-playfair mb-2 text-slate-900 dark:text-slate-100">{item.title}</h1>
            <p className="text-2xl font-semibold text-amber-500">£{item.price.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500" />
              <span className="text-slate-900 dark:text-slate-100">{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span className="text-slate-900 dark:text-slate-100">{item.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-500" />
              <span className="text-slate-900 dark:text-slate-100">{item.berths} Berths</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Description</h2>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                {item.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Make</span>
                  <span className="font-medium capitalize text-slate-900 dark:text-slate-100">{item.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Model</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{item.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Year</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{item.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Berths</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{item.berths}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Status</span>
                  <span className="font-medium capitalize text-slate-900 dark:text-slate-100">{item.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {item.status === 'available' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Contact</h2>
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => setIsEnquiryOpen(true)}
                  >
                    Enquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreenOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeFullscreen}
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
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevFullscreenImage();
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextFullscreenImage();
                  }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setFullscreenImageIndex(index);
                    }}
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
        </div>
      )}

      {/* Enquiry Dialog */}
      <Dialog open={isEnquiryOpen} onOpenChange={setIsEnquiryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vehicle Enquiry</DialogTitle>
          </DialogHeader>
          
          {enquirySuccess && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{enquirySuccess}</AlertDescription>
            </Alert>
          )}

          {enquiryError && (
            <Alert variant="destructive">
              <AlertDescription>{enquiryError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleEnquirySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="enquiry-name">Your Name</Label>
              <Input
                id="enquiry-name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={enquiryData.name}
                onChange={handleEnquiryChange}
                required
                disabled={enquiryLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enquiry-email">Email Address</Label>
              <Input
                id="enquiry-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={enquiryData.email}
                onChange={handleEnquiryChange}
                required
                disabled={enquiryLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enquiry-phone">Phone Number</Label>
              <Input
                id="enquiry-phone"
                name="phone"
                type="tel"
                placeholder="+44 1234 567890"
                value={enquiryData.phone}
                onChange={handleEnquiryChange}
                required
                disabled={enquiryLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enquiry-subject">Subject</Label>
              <Input
                id="enquiry-subject"
                type="text"
                value={`Enquiry about ${item.title}`}
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enquiry-message">Your Message</Label>
              <Textarea
                id="enquiry-message"
                name="message"
                placeholder="Tell us about your requirements..."
                value={enquiryData.message}
                onChange={handleEnquiryChange}
                required
                disabled={enquiryLoading}
                className="min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              disabled={enquiryLoading}
            >
              {enquiryLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Enquiry'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}