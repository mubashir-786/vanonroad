'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Ruler, Users, Phone, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getInventoryItem, InventoryItem } from '@/lib/api/inventory';

interface InventoryDetailsProps {
  id: string;
}

export function InventoryDetails({ id }: InventoryDetailsProps) {
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

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
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${images[activeImage]})` }}
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
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
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-amber-500" />
              <span>{item.length}m</span>
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
                  <span className="text-slate-600 dark:text-slate-400">Length</span>
                  <span className="font-medium">{item.length}m</span>
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
    </div>
  );
}