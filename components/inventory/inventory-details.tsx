'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Ruler, Users, Phone, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// This would typically come from your database
const mockInventoryItem = {
  id: '1',
  title: '2024 Signature Series Luxury',
  price: '£195,000',
  location: 'Yorkshire',
  images: [
    'https://images.pexels.com/photos/2506711/pexels-photo-2506711.jpeg',
    'https://images.pexels.com/photos/2769583/pexels-photo-2769583.jpeg',
    'https://images.pexels.com/photos/2918521/pexels-photo-2918521.jpeg'
  ],
  berths: 6,
  length: '8.5m',
  make: 'Mercedes-Benz',
  model: 'Signature',
  year: 2024,
  mileage: 'New',
  description: `Experience luxury living on wheels with our flagship 2024 Signature Series. This premium motorhome combines elegant design with practical functionality, offering a truly exceptional travel experience.

Features include:
- Spacious master bedroom with king-size bed
- Full-size luxury bathroom with separate shower
- State-of-the-art kitchen with premium appliances
- Generous living area with high-end finishes
- Advanced climate control system
- Premium entertainment system
- Ample storage throughout
- Solar panel system
- Advanced security features`,
  features: [
    'King-size master bed',
    'Full bathroom with shower',
    'Premium kitchen appliances',
    'Solar panels',
    'Smart home technology',
    'Air conditioning',
    'Heating system',
    'Entertainment system',
    'Ample storage',
    'Security system'
  ],
  specifications: {
    engine: '3.0L Diesel',
    transmission: 'Automatic',
    fuel: 'Diesel',
    tankCapacity: '90L',
    power: '190bhp',
    length: '8.5m',
    width: '2.3m',
    height: '3.2m',
    weight: '3,500kg'
  }
};

export function InventoryDetails({ id }: { id: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const item = mockInventoryItem; // In real app, fetch based on ID

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/inventory">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Button>
        </Link>
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          {item.mileage}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.images[activeImage]})` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {item.images.map((image, index) => (
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
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-playfair mb-2">{item.title}</h1>
            <p className="text-2xl font-semibold text-amber-500">{item.price}</p>
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
              <span>{item.length}</span>
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
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-2 gap-3">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(item.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
        </div>
      </div>
    </div>
  );
}